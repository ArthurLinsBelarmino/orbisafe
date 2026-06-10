import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { LoadingBox, ErrorBox, StatCard, BadgeRisco, BadgeStatus, SectionHeader } from '../components/ui';

type AnyObj = Record<string, unknown>;

export default function Dashboard() {
  const resumo = useFetch(() => api.dashboardResumo(), []);
  const r = resumo.data as AnyObj | null;

  function fmt(date: unknown): string {
    if (!date || typeof date !== 'string') return 'Sem data';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'Sem data';
      return d.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return 'Sem data'; }
  }

  const ultimosAlertas = (r?.ultimosAlertas as AnyObj[] | undefined) ?? [];
  const locaisRisco    = (r?.locaisMaiorRisco as AnyObj[] | undefined) ?? [];

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="/ Dashboard"
        title="Painel de Monitoramento"
        sub="Visão geral do sistema OrbiSafe — alertas, locais e métricas em tempo real."
      />

      {resumo.loading && <LoadingBox />}
      {resumo.error && <ErrorBox message={String(resumo.error)} />}

      {r && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Locais monitorados"
            value={String(r.totalLocaisMonitorados ?? '—')}
            icon="📍" color="cyan"
          />
          <StatCard
            label="Alertas abertos"
            value={String(r.totalAlertasAbertos ?? '—')}
            icon="🔔" color="red"
          />
          <StatCard
            label="Previsões críticas"
            value={String(r.totalPrevisoesCriticas ?? '—')}
            icon="⚠️" color="orange"
          />
          <StatCard
            label="Índice de severidade"
            value={r.mediaIndiceSeveridade ? `${Number(r.mediaIndiceSeveridade).toFixed(1)}` : '—'}
            icon="🌡️" color="yellow"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div>
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-4">
            Alertas recentes
          </p>
          {resumo.loading && <LoadingBox />}
          {!resumo.loading && ultimosAlertas.length === 0 && (
            <div className="orbi-card text-center py-8 text-orbi-muted text-sm">
              Nenhum alerta recente.
            </div>
          )}
          <div className="flex flex-col gap-3">
            {ultimosAlertas.map((a, i) => (
              <div key={(a.id as number | undefined) ?? i} className="orbi-card hover:border-orbi-cyan/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-display font-semibold text-sm text-orbi-text line-clamp-1">
                    {String(a.titulo ?? a.descricao ?? a.tipoEvento ?? `Alerta #${i + 1}`)}
                  </p>
                  <div className="flex gap-1.5 shrink-0">
                    {a.nivelRisco  && <BadgeRisco  nivel={String(a.nivelRisco)} />}
                    {a.status      && <BadgeStatus status={String(a.status)} />}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-orbi-muted font-mono">
                  {a.tipoEvento && <span>{String(a.tipoEvento)}</span>}
                  {a.nomeLocal  && <span>📍 {String(a.nomeLocal)}</span>}
                  {a.local      && <span>📍 {String((a.local as AnyObj).nome ?? '')}</span>}
                  <span className="ml-auto">
                    {fmt(a.dataHora ?? a.dataHoraAlerta ?? a.dataCriacao ?? a.data)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-4">
            Locais em risco
          </p>
          {resumo.loading && <LoadingBox />}
          {!resumo.loading && locaisRisco.length === 0 && (
            <div className="orbi-card text-center py-8 text-orbi-muted text-sm">
              Nenhum local em risco.
            </div>
          )}
          <div className="flex flex-col gap-3">
            {locaisRisco.map((l, i) => (
              <div
                key={(l.id as number | undefined) ?? i}
                className="orbi-card hover:border-orbi-orange/20 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-display font-semibold text-sm text-orbi-text">
                    {String(l.nome ?? l.nomeLocal ?? `Local ${i + 1}`)}
                  </p>
                  {l.totalAlertas !== undefined && (
                    <p className="text-xs text-orbi-muted font-mono mt-0.5">
                      {String(l.totalAlertas)} alerta(s)
                    </p>
                  )}
                  {l.indiceSeveridade !== undefined && (
                    <p className="text-xs text-orbi-muted font-mono mt-0.5">
                      Severidade: {Number(l.indiceSeveridade).toFixed(1)}
                    </p>
                  )}
                </div>
                {l.nivelRisco && <BadgeRisco nivel={String(l.nivelRisco)} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}