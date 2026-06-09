import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { LoadingBox, ErrorBox, EmptyBox, BadgeRisco, SectionHeader } from '../components/ui';
import type { Previsao, NivelRisco } from '../types';

function PrevisaoForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    tipoEvento: '', probabilidade: '', nivelRiscoPrevisto: 'BAIXO', descricao: '',
    localId: '', modeloIaId: '', dataHoraPrevisao: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createPrevisao({
        ...form,
        probabilidade: form.probabilidade ? Number(form.probabilidade) : undefined,
        localId: form.localId ? Number(form.localId) : undefined,
        modeloIaId: form.modeloIaId ? Number(form.modeloIaId) : undefined,
        dataHoraPrevisao: form.dataHoraPrevisao || new Date().toISOString(),
      });
      onSuccess();
      setForm({ tipoEvento: '', probabilidade: '', nivelRiscoPrevisto: 'BAIXO', descricao: '', localId: '', modeloIaId: '', dataHoraPrevisao: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar previsão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="orbi-card mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">+ Nova Previsão</p>
      </div>
      <div>
        <label className="orbi-label">Tipo de Evento *</label>
        <input required className="orbi-input" placeholder="ENCHENTE, QUEIMADA..." value={form.tipoEvento}
          onChange={e => setForm(p => ({ ...p, tipoEvento: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">Probabilidade (0-100)</label>
        <input type="number" min="0" max="100" className="orbi-input" value={form.probabilidade}
          onChange={e => setForm(p => ({ ...p, probabilidade: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">Nível de Risco Previsto</label>
        <select className="orbi-input" value={form.nivelRiscoPrevisto}
          onChange={e => setForm(p => ({ ...p, nivelRiscoPrevisto: e.target.value }))}>
          {['BAIXO','MEDIO','ALTO','CRITICO'].map(n => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className="orbi-label">ID do Local</label>
        <input type="number" className="orbi-input" value={form.localId}
          onChange={e => setForm(p => ({ ...p, localId: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">ID do Modelo IA</label>
        <input type="number" className="orbi-input" value={form.modeloIaId}
          onChange={e => setForm(p => ({ ...p, modeloIaId: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">Descrição</label>
        <input className="orbi-input" value={form.descricao}
          onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} />
      </div>
      {error && <p className="sm:col-span-2 text-orbi-red text-xs font-mono">{error}</p>}
      <div className="sm:col-span-2 flex justify-end">
        <button type="submit" disabled={loading} className="orbi-btn-primary disabled:opacity-50">
          {loading ? 'Criando...' : 'Criar Previsão'}
        </button>
      </div>
    </form>
  );
}

export default function Previsoes() {
  const [refresh, setRefresh] = useState(0);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { data, loading, error } = useFetch(() => api.getPrevisoes(), [refresh]);

  const previsoes = (data as Previsao[] | null) ?? [];

  function fmt(date: string) {
    try { return new Date(date).toLocaleString('pt-BR'); }
    catch { return date; }
  }

  function probColor(p?: number) {
    if (!p) return 'text-orbi-muted';
    if (p >= 75) return 'text-orbi-red';
    if (p >= 50) return 'text-orbi-orange';
    if (p >= 25) return 'text-orbi-yellow';
    return 'text-orbi-green';
  }

  async function handleDelete(id: number) {
    if (!confirm('Deletar esta previsão?')) return;
    setDeleting(id);
    try { await api.deletePrevisao(id); setRefresh(r => r + 1); }
    catch (err) { alert(err instanceof Error ? err.message : 'Erro.'); }
    finally { setDeleting(null); }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader tag="/ Previsões" title="Previsões de Risco"
        sub="Modelos de IA analisam dados satelitais e geram previsões para cada região monitorada." />

      <PrevisaoForm onSuccess={() => setRefresh(r => r + 1)} />

      {loading && <LoadingBox />}
      {error   && <ErrorBox message={error} />}
      {!loading && !error && previsoes.length === 0 && <EmptyBox label="Nenhuma previsão encontrada." />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {previsoes.map((p) => (
          <div key={p.id} className="orbi-card flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-orbi-muted mb-0.5">#{p.id} · {p.tipoEvento}</p>
                <BadgeRisco nivel={p.nivelRiscoPrevisto as NivelRisco} />
              </div>
              {p.probabilidade !== undefined && (
                <div className="text-right">
                  <p className="font-mono text-xs text-orbi-muted">Probabilidade</p>
                  <p className={`font-display font-bold text-xl ${probColor(p.probabilidade)}`}>
                    {p.probabilidade}%
                  </p>
                </div>
              )}
            </div>

            {p.probabilidade !== undefined && (
              <div className="h-1.5 bg-orbi-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${p.probabilidade}%`,
                    background: p.probabilidade >= 75 ? '#ff3b5c' : p.probabilidade >= 50 ? '#ff6b2b' : p.probabilidade >= 25 ? '#ffd200' : '#00ff88'
                  }}
                />
              </div>
            )}

            {p.descricao && <p className="text-xs text-orbi-muted">{p.descricao}</p>}

            <div className="flex items-center justify-between text-xs text-orbi-muted font-mono mt-auto pt-2 border-t border-orbi-border">
              <span>{p.nomeLocal ? `📍 ${p.nomeLocal}` : p.localId ? `Local #${p.localId}` : '—'}</span>
              <span>{fmt(p.dataHoraPrevisao)}</span>
            </div>

            <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
              className="orbi-btn text-xs border border-orbi-red/30 text-orbi-red/70 hover:bg-orbi-red/10 disabled:opacity-50 w-full">
              {deleting === p.id ? 'Deletando...' : 'Remover'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}