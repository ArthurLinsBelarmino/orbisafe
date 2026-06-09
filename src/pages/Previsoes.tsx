import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { LoadingBox, ErrorBox, EmptyBox, BadgeRisco, SectionHeader } from '../components/ui';
import type { Previsao, NivelRisco } from '../types';

function PrevisaoForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    idLocal: '', 
    idModelo: '1', 
    indiceSeveridade: '', 
    probabilidadeOcorrencia: '', 
    nivelRisco: 'BAIXO'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createPrevisao({
        idLocal: Number(form.idLocal),
        idModelo: Number(form.idModelo),
        indiceSeveridade: Number(form.indiceSeveridade),
        probabilidadeOcorrencia: Number(form.probabilidadeOcorrencia),
        nivelRisco: form.nivelRisco,
      });
      onSuccess();
      setForm({ idLocal: '', idModelo: '1', indiceSeveridade: '', probabilidadeOcorrencia: '', nivelRisco: 'BAIXO' });
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
        <label className="orbi-label">ID do Local *</label>
        <input required type="number" className="orbi-input" value={form.idLocal}
          onChange={e => setForm(p => ({ ...p, idLocal: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">ID do Modelo IA *</label>
        <input required type="number" className="orbi-input" value={form.idModelo}
          onChange={e => setForm(p => ({ ...p, idModelo: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">Índice de Severidade (0-100) *</label>
        <input required type="number" min="0" max="100" className="orbi-input" value={form.indiceSeveridade}
          onChange={e => setForm(p => ({ ...p, indiceSeveridade: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">Probabilidade de Ocorrência (%) *</label>
        <input required type="number" min="0" max="100" className="orbi-input" value={form.probabilidadeOcorrencia}
          onChange={e => setForm(p => ({ ...p, probabilidadeOcorrencia: e.target.value }))} />
      </div>
      <div className="sm:col-span-2">
        <label className="orbi-label">Nível de Risco Previsto</label>
        <select className="orbi-input" value={form.nivelRisco}
          onChange={e => setForm(p => ({ ...p, nivelRisco: e.target.value }))}>
          {['BAIXO','MEDIO','ALTO','CRITICO'].map(n => <option key={n}>{n}</option>)}
        </select>
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
    if (!date) return 'Data não definida';
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

  async function handleDelete(idPrevisao: number) {
    if (!confirm('Deletar esta previsão?')) return;
    setDeleting(idPrevisao);
    try { await api.deletePrevisao(idPrevisao); setRefresh(r => r + 1); }
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
          <div key={p.idPrevisao} className="orbi-card flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-orbi-muted mb-0.5">Previsão #{p.idPrevisao}</p>
                <BadgeRisco nivel={p.nivelRisco as NivelRisco} />
              </div>
              {p.probabilidadeOcorrencia !== undefined && (
                <div className="text-right">
                  <p className="font-mono text-xs text-orbi-muted">Probabilidade</p>
                  <p className={`font-display font-bold text-xl ${probColor(p.probabilidadeOcorrencia)}`}>
                    {p.probabilidadeOcorrencia}%
                  </p>
                </div>
              )}
            </div>

            {p.probabilidadeOcorrencia !== undefined && (
              <div className="h-1.5 bg-orbi-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${p.probabilidadeOcorrencia}%`,
                    background: p.probabilidadeOcorrencia >= 75 ? '#ff3b5c' : p.probabilidadeOcorrencia >= 50 ? '#ff6b2b' : p.probabilidadeOcorrencia >= 25 ? '#ffd200' : '#00ff88'
                  }}
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-orbi-muted font-mono mt-auto pt-2 border-t border-orbi-border">
              <span>Local ID: {p.idLocal}</span>
              <span>{fmt(p.dataPrevisao)}</span>
            </div>

            <button onClick={() => handleDelete(p.idPrevisao)} disabled={deleting === p.idPrevisao}
              className="orbi-btn text-xs border border-orbi-red/30 text-orbi-red/70 hover:bg-orbi-red/10 disabled:opacity-50 w-full">
              {deleting === p.idPrevisao ? 'Deletando...' : 'Remover'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}