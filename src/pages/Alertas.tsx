import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import {
  LoadingBox, ErrorBox, EmptyBox, BadgeRisco, BadgeStatus, SectionHeader
} from '../components/ui';
import type { Alerta, NivelRisco } from '../types';

function AlertaForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    mensagem: '', 
    nivelAlerta: 'BAIXO', 
    status: 'ABERTO', 
    idLocal: '',
    idPrevisao: '1'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createAlerta({
        idLocal: Number(form.idLocal),
        idPrevisao: Number(form.idPrevisao),
        nivelAlerta: form.nivelAlerta,
        mensagem: form.mensagem,
        status: form.status,
      });
      onSuccess();
      setForm({ mensagem: '', nivelAlerta: 'BAIXO', status: 'ABERTO', idLocal: '', idPrevisao: '1' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar alerta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="orbi-card mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-4">+ Novo Alerta</p>
      </div>
      
      <div>
        <label className="orbi-label">Nível de Risco</label>
        <select className="orbi-input" value={form.nivelAlerta}
          onChange={e => setForm(p => ({ ...p, nivelAlerta: e.target.value }))}>
          {['BAIXO','MEDIO','ALTO','CRITICO'].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className="orbi-label">Status</label>
        <select className="orbi-input" value={form.status}
          onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
          {['ABERTO','EM_ANALISE','RESOLVIDO'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="orbi-label">ID do Local *</label>
        <input required type="number" className="orbi-input" value={form.idLocal}
          onChange={e => setForm(p => ({ ...p, idLocal: e.target.value }))} />
      </div>
      <div>
        <label className="orbi-label">ID da Previsão (Opcional/Referência)</label>
        <input type="number" className="orbi-input" value={form.idPrevisao}
          onChange={e => setForm(p => ({ ...p, idPrevisao: e.target.value }))} />
      </div>
      <div className="sm:col-span-2">
        <label className="orbi-label">Mensagem do Alerta *</label>
        <input required className="orbi-input" placeholder="Ex: Risco de enchente na região..." value={form.mensagem}
          onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))} />
      </div>
      
      {error && <p className="sm:col-span-2 text-orbi-red text-xs font-mono">{error}</p>}
      <div className="sm:col-span-2 flex justify-end">
        <button type="submit" disabled={loading} className="orbi-btn-primary disabled:opacity-50">
          {loading ? 'Criando...' : 'Criar Alerta'}
        </button>
      </div>
    </form>
  );
}

export default function Alertas() {
  const [refresh, setRefresh] = useState(0);
  const [filterStatus, setFilterStatus] = useState<'ABERTO' | 'EM_ANALISE' | 'RESOLVIDO' | ''>('');
  const [deleting, setDeleting] = useState<number | null>(null);

  const { data, loading, error } = useFetch(
    () => filterStatus ? api.getAlertasByStatus(filterStatus) : api.getAlertas(),
    [refresh, filterStatus]
  );

  function fmt(date: string) {
    if (!date) return 'Data indisponível';
    try { return new Date(date).toLocaleString('pt-BR'); }
    catch { return date; }
  }

  async function handleDelete(idAlerta: number) {
    if (!confirm('Deletar este alerta?')) return;
    setDeleting(idAlerta);
    try { await api.deleteAlerta(idAlerta); setRefresh(r => r + 1); }
    catch (err) { alert(err instanceof Error ? err.message : 'Erro ao deletar.'); }
    finally { setDeleting(null); }
  }

  const alertas = (data as Alerta[] | null) ?? [];

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader tag="/ Alertas" title="Alertas Climáticos"
        sub="Gerencie alertas de risco em tempo real." />

      <AlertaForm onSuccess={() => setRefresh(r => r + 1)} />

      <div className="flex flex-wrap gap-2 mb-6">
        {['', 'ABERTO', 'EM_ANALISE', 'RESOLVIDO'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s as any)}
            className={`orbi-btn text-xs ${filterStatus === s ? 'bg-orbi-cyan text-orbi-bg' : 'border border-orbi-border text-orbi-muted hover:border-orbi-cyan/40'}`}>
            {s || 'Todos'}
          </button>
        ))}
      </div>

      {loading && <LoadingBox />}
      {error   && <ErrorBox message={error} />}
      {!loading && !error && alertas.length === 0 && <EmptyBox label="Nenhum alerta encontrado." />}

      <div className="flex flex-col gap-3">
        {alertas.map((a) => (
          <div key={a.idAlerta} className="orbi-card hover:border-orbi-cyan/20">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-display font-semibold text-orbi-text">Alerta #{a.idAlerta}</p>
                  <BadgeRisco nivel={a.nivelAlerta as NivelRisco} />
                  <BadgeStatus status={a.status} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-orbi-muted font-mono">
                  <span>Local ID: {a.idLocal}</span>
                  <span>{fmt(a.dataCriacao)}</span>
                </div>
                {a.mensagem && <p className="text-sm text-orbi-text mt-2">{a.mensagem}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <Link to={`/alertas/${a.idAlerta}/editar`} className="orbi-btn-ghost text-xs">Editar</Link>
                <button onClick={() => handleDelete(a.idAlerta)} disabled={deleting === a.idAlerta}
                  className="orbi-btn text-xs border border-orbi-red/40 text-orbi-red hover:bg-orbi-red/10 disabled:opacity-50">
                  {deleting === a.idAlerta ? '...' : 'Deletar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export function EditarAlerta() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(() => api.getAlertaById(Number(id)), [id]);
  const [form, setForm] = useState<Partial<Alerta>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const alerta = data as Alerta | null;

  if (loading) return <main className="pt-24 max-w-2xl mx-auto px-4"><LoadingBox /></main>;
  if (error)   return <main className="pt-24 max-w-2xl mx-auto px-4"><ErrorBox message={error} /></main>;

  const current = { ...alerta, ...form };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      await api.updateAlerta(Number(id), {
        idLocal: current.idLocal,
        idPrevisao: current.idPrevisao,
        nivelAlerta: current.nivelAlerta,
        mensagem: current.mensagem,
        status: current.status
      });
      navigate('/alertas');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
      <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">/ Alertas / Editar</p>
      <h1 className="font-display font-bold text-2xl mb-8">Editar Alerta #{id}</h1>
      <form onSubmit={handleSave} className="orbi-card flex flex-col gap-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="orbi-label">Nível de Risco</label>
            <select className="orbi-input" defaultValue={alerta?.nivelAlerta}
              onChange={e => setForm(p => ({ ...p, nivelAlerta: e.target.value as NivelRisco }))}>
              {['BAIXO','MEDIO','ALTO','CRITICO'].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="orbi-label">Status</label>
            <select className="orbi-input" defaultValue={alerta?.status}
              onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}>
              {['ABERTO','EM_ANALISE','RESOLVIDO'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="orbi-label">Mensagem</label>
          <input className="orbi-input" defaultValue={alerta?.mensagem ?? ''}
            onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))} />
        </div>
        {saveError && <p className="text-orbi-red text-xs font-mono">{saveError}</p>}
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={() => navigate('/alertas')} className="orbi-btn-ghost">Cancelar</button>
          <button type="submit" disabled={saving} className="orbi-btn-primary disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </main>
  );
}