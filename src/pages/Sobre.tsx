export default function Sobre() {
  return (
    <main className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
      <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">/ Sobre</p>
      <h1 className="font-display font-bold text-4xl text-orbi-text mb-6">
        O que é o <span className="text-orbi-cyan">OrbiSafe</span>?
      </h1>

      <div className="orbi-card mb-6">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-3">O Problema</p>
        <p className="text-orbi-muted leading-relaxed">
          Mudanças climáticas estão tornando eventos extremos mais frequentes e devastadores.
          Enchentes, queimadas, secas e ondas de calor causam bilhões em prejuízos e colocam vidas em risco.
          A falta de informação precisa e antecipada impede que cidades, empresas e comunidades se preparem adequadamente.
        </p>
      </div>

      <div className="orbi-card mb-6">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-3">A Solução</p>
        <p className="text-orbi-muted leading-relaxed">
          O OrbiSafe é uma plataforma que usa dados satelitais em combinação com inteligência artificial
          para monitorar regiões em tempo real e prever riscos climáticos antes que se tornem desastres.
          Satélites monitoram temperatura, umidade, índice de vegetação, precipitação e outros indicadores —
          e nossos modelos de IA transformam esses dados em alertas acionáveis.
        </p>
      </div>

      <div className="orbi-card mb-6">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-3">Economia Espacial</p>
        <p className="text-orbi-muted leading-relaxed">
          O OrbiSafe exemplifica como a economia espacial pode gerar valor direto na Terra.
          Satélites que antes serviam apenas para comunicação e GPS agora são sensores ambientais globais.
          Dados da NASA, ESA e Space Charter — disponíveis gratuitamente — são a matéria-prima da nossa IA.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: '🌍', title: 'ODS 13', desc: 'Ação contra a mudança do clima' },
          { icon: '🌾', title: 'ODS 2',  desc: 'Fome zero e agricultura sustentável' },
          { icon: '🏙️', title: 'ODS 11', desc: 'Cidades e comunidades sustentáveis' },
        ].map(o => (
          <div key={o.title} className="orbi-card text-center">
            <div className="text-3xl mb-2">{o.icon}</div>
            <p className="font-display font-bold text-orbi-cyan text-sm">{o.title}</p>
            <p className="text-orbi-muted text-xs mt-1">{o.desc}</p>
          </div>
        ))}
      </div>

      <div className="orbi-card">
        <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-3">Stack Tecnológica</p>
        <div className="flex flex-wrap gap-2">
          {['React + Vite + TypeScript','Tailwind CSS','Java + Quarkus','Oracle Database','Python + ML','Flask REST API'].map(t => (
            <span key={t} className="text-xs font-mono px-3 py-1 bg-orbi-bg2 border border-orbi-border rounded text-orbi-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}