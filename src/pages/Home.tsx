import { Link } from 'react-router-dom';

const features = [
  { icon: '🛰️', title: 'Dados Satelitais', desc: 'Integração com fontes de dados espaciais e sensoriamento remoto em tempo real.' },
  { icon: '🤖', title: 'Inteligência Artificial', desc: 'Modelos preditivos que analisam padrões e antecipam riscos climáticos com alta precisão.' },
  { icon: '🔔', title: 'Alertas em Tempo Real', desc: 'Notificações instantâneas para eventos críticos como enchentes, queimadas e calor extremo.' },
  { icon: '📍', title: 'Monitoramento Local', desc: 'Acompanhe regiões específicas com métricas detalhadas de temperatura, umidade e precipitação.' },
  { icon: '🌿', title: 'Índice de Vegetação', desc: 'Análise do NDVI para detectar desmatamento e risco de queimadas em áreas de interesse.' },
  { icon: '🏙️', title: 'Gestão de Riscos', desc: 'Apoio à tomada de decisão para defesa civil, agronegócio, cidades e empresas.' },
];

const risks = [
  { icon: '🌊', label: 'Enchentes',     color: 'text-blue-400' },
  { icon: '🔥', label: 'Queimadas',     color: 'text-orange-400' },
  { icon: '🌡️', label: 'Calor Extremo', color: 'text-red-400' },
  { icon: '🏜️', label: 'Secas',         color: 'text-yellow-400' },
  { icon: '⛈️', label: 'Tempestades',   color: 'text-purple-400' },
  { icon: '💨', label: 'Ventos Fortes', color: 'text-cyan-400' },
];

export default function Home() {
  return (
    <main className="min-h-screen">

      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

        <div className="absolute inset-0 grid-bg opacity-60" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />

        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-20">
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
            <circle cx="180" cy="180" r="170" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="180" cy="180" r="120" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="180" cy="180" r="70"  stroke="#ff6b2b" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="180" cy="180" r="25"  fill="#00e5ff22" stroke="#00e5ff" strokeWidth="1.5"/>
            <circle cx="50"  cy="180" r="6"   fill="#00e5ff"/>
            <circle cx="290" cy="100" r="4"   fill="#ff6b2b"/>
            <circle cx="220" cy="310" r="5"   fill="#00e5ff"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 animate-fade-in">
          <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-4">
            🛰️ Global Solution 2026/1 — FIAP
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 max-w-3xl">
            O espaço monitorando<br/>
            <span className="text-orbi-cyan text-glow-cyan">a Terra em tempo real</span>
          </h1>
          <p className="text-orbi-muted text-lg max-w-xl mb-10 leading-relaxed">
            OrbiSafe usa dados satelitais e IA para prever e alertar sobre riscos climáticos —
            enchentes, queimadas, calor extremo — antes que se tornem desastres.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="orbi-btn-primary">
              Ver Dashboard →
            </Link>
            <Link to="/alertas" className="orbi-btn-ghost">
              Alertas Ativos
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-8">
            {[
              { value: '24/7', label: 'Monitoramento contínuo' },
              { value: 'IA', label: 'Modelos preditivos' },
              { value: '🛰️', label: 'Dados satelitais' },
              { value: '⚡', label: 'Alertas instantâneos' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="font-display font-bold text-xl text-orbi-cyan">{s.value}</span>
                <span className="text-sm text-orbi-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orbi-bg2 border-y border-orbi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest text-center mb-8">
            Riscos monitorados
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {risks.map((r) => (
              <div key={r.label} className="flex items-center gap-2 orbi-card py-3 px-5">
                <span className="text-xl">{r.icon}</span>
                <span className={`font-display font-semibold text-sm ${r.color}`}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">Funcionalidades</p>
          <h2 className="font-display font-bold text-3xl text-orbi-text">Como o OrbiSafe protege você</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="orbi-card group cursor-default">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display font-semibold text-orbi-text mb-2 group-hover:text-orbi-cyan transition-colors">
                {f.title}
              </h3>
              <p className="text-orbi-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="orbi-card border-orbi-cyan/20 text-center py-14"
          style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, rgba(255,107,43,0.04) 100%)' }}>
          <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-3">Comece agora</p>
          <h2 className="font-display font-bold text-3xl text-orbi-text mb-4">
            Monitore sua região com dados do espaço
          </h2>
          <p className="text-orbi-muted max-w-md mx-auto mb-8 text-sm">
            Acesse o dashboard e veja em tempo real os alertas, previsões e medições da sua área.
          </p>
          <Link to="/dashboard" className="orbi-btn-primary inline-block">
            Acessar Dashboard →
          </Link>
        </div>
      </section>
    </main>
  );
}