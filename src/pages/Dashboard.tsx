import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { LoadingBox, ErrorBox, StatCard, BadgeRisco, BadgeStatus, SectionHeader } from '../components/ui';
import type { Alerta, LocalRisco, DashboardResumo } from '../types';

export default function Dashboard() {
  const resumo   = useFetch(() => api.dashboardResumo(), []);
  const alertas  = useFetch(() => api.dashboardAlertasRecentes(), []);
  const locais   = useFetch(() => api.dashboardLocaisRisco(), []);

  const r = resumo.data as DashboardResumo | null;

  function fmt(date: string) {
    try { return new Date(date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return date; }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="/ Dashboard"
        title="Painel de Monitoramento"
        sub="Visão geral do sistema OrbiSafe — alertas, locais e métricas em tempo real."
      />

      {resumo.loading && <LoadingBox />}
      {resumo.error   && <ErrorBox message={resumo.error} />}
      {r && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Locais monitorados" value={r.totalLocaisMonitorados ?? r.totalLocais ?? '—'} icon="📍" color="cyan" />
          <StatCard label="Alertas ativos"     value={r.alertasAtivos ?? '—'} icon="🔔" color="red" />
          <StatCard label="Locais em risco"    value={r.locaisEmRiscoCritico ?? r.locaisEmRiscoAlto ?? '—'} icon="⚠️" color="orange" />
          <StatCard label="Total de previsões" value={r.totalPrevisoes ?? '—'} icon="🤖" color="green" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div>
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-4">Alertas recentes</p>
          {alertas.loading && <LoadingBox />}
          {alertas.error   && <ErrorBox message={alertas.error} />}
          {alertas.data && (alertas.data as Alerta[]).length === 0 && (
            <div className="orbi-card text-center py-8 text-orbi-muted text-sm">Nenhum alerta recente.</div>
          )}
          <div className="flex flex-col gap-3">
            {(alertas.data as Alerta[] | null)?.map((a) => (
              <div key={a.id} className="orbi-card hover:border-orbi-cyan/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-display font-semibold text-sm text-orbi-text line-clamp-1">{a.titulo}</p>
                  <div className="flex gap-1.5 shrink-0">
                    <BadgeRisco nivel={a.nivelRisco} />
                    <BadgeStatus status={a.status} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-orbi-muted font-mono">
                  <span>{a.tipoEvento}</span>
                  {a.nomeLocal && <span>📍 {a.nomeLocal}</span>}
                  <span className="ml-auto">{fmt(a.dataHora)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-4">Locais em risco</p>
          {locais.loading && <LoadingBox />}
          {locais.error   && <ErrorBox message={locais.error} />}
          {locais.data && (locais.data as LocalRisco[]).length === 0 && (
            <div className="orbi-card text-center py-8 text-orbi-muted text-sm">Nenhum local em risco.</div>
          )}
          <div className="flex flex-col gap-3">
            {(locais.data as LocalRisco[] | null)?.map((l, i) => (
              <div key={l.id ?? i} className="orbi-card hover:border-orbi-orange/20 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-sm text-orbi-text">{l.nome ?? `Local ${l.id}`}</p>
                  {l.totalAlertas !== undefined && (
                    <p className="text-xs text-orbi-muted font-mono mt-0.5">{l.totalAlertas} alerta(s)</p>
                  )}
                </div>
                {l.nivelRisco && <BadgeRisco nivel={l.nivelRisco} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}