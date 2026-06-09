import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/dashboard',  label: 'Dashboard' },
  { to: '/alertas',    label: 'Alertas' },
  { to: '/previsoes',  label: 'Previsões' },
  { to: '/sobre',      label: 'Sobre' },
  { to: '/faq',        label: 'FAQ' },
  { to: '/integrantes',label: 'Integrantes' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-orbi-border bg-orbi-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="13" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="5" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
              <ellipse cx="16" cy="16" rx="13" ry="4.5" fill="none" stroke="#ff6b2b" strokeWidth="1.5" transform="rotate(-30 16 16)"/>
              <circle cx="16" cy="16" r="2" fill="#00e5ff"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Orbi<span className="text-orbi-cyan">Safe</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-body transition-all duration-200 ${
                  isActive
                    ? 'text-orbi-cyan bg-orbi-cyan/10'
                    : 'text-orbi-muted hover:text-orbi-text hover:bg-orbi-panel'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-orbi-muted hover:text-orbi-text transition-colors"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-orbi-border bg-orbi-bg px-4 py-3 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-body transition-all ${
                  isActive
                    ? 'text-orbi-cyan bg-orbi-cyan/10'
                    : 'text-orbi-muted hover:text-orbi-text hover:bg-orbi-panel'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}