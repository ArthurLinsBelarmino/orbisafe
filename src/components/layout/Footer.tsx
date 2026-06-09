import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-orbi-border bg-orbi-bg mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 32 32" className="w-6 h-6">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
                <circle cx="16" cy="16" r="5" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
                <ellipse cx="16" cy="16" rx="13" ry="4.5" fill="none" stroke="#ff6b2b" strokeWidth="1.5" transform="rotate(-30 16 16)"/>
                <circle cx="16" cy="16" r="2" fill="#00e5ff"/>
              </svg>
              <span className="font-display font-bold text-lg">
                Orbi<span className="text-orbi-cyan">Safe</span>
              </span>
            </div>
            <p className="text-orbi-muted text-sm leading-relaxed">
              Plataforma de monitoramento e previsão de riscos climáticos usando dados satelitais e inteligência artificial.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-3">Navegação</p>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/alertas', label: 'Alertas' },
                { to: '/previsoes', label: 'Previsões' },
                { to: '/sobre', label: 'Sobre' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="text-sm text-orbi-muted hover:text-orbi-cyan transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-3">Projeto</p>
            <p className="text-sm text-orbi-muted">Global Solution 2026</p>
            <p className="text-sm text-orbi-muted">FIAP — Análise e Desenvolvimento de Sistemas</p>
            <p className="text-sm text-orbi-muted mt-2">Tema: Economia Espacial</p>
          </div>
        </div>

        <div className="border-t border-orbi-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-orbi-muted font-mono">© 2026 OrbiSafe. Global Solution FIAP.</p>
          <p className="text-xs text-orbi-muted">
            API: <span className="text-orbi-cyan">orbisafe-api-java-gs.onrender.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}