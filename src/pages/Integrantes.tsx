import { useState } from 'react';

import arthurImg from '../assets/Arthur.jpeg';
import henriqueImg from '../assets/henrique.jpeg';
import raphaelImg from '../assets/Raphael.jpeg';

interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  foto?: string;
  papel?: string;
}

const integrantes: Integrante[] = [
  {
    nome: 'Arthur Lins Belarmino',
    rm: '566845',
    turma: '1TDSPS',
    github: 'https://github.com/ArthurLinsBelarmino',
    linkedin: 'https://www.linkedin.com/in/arthur-lins-belarmino-3b1369328/',
    papel: 'Front-End & Business',
    foto: arthurImg,
  },
  {
    nome: 'Henrique Spoltore Moreno Pavão dos Santos',
    rm: '568130',
    turma: '1TDSPS',
    github: 'https://github.com/henrique477',
    linkedin: 'https://www.linkedin.com/in/henrique-pav%C3%A3o-849407251',
    papel: 'Front-End & Business',
    foto: henriqueImg,
  },
 {
    nome: 'Raphael Mendonça',
    rm: '568346',
    turma: '1TDSPS',
    github: 'https://github.com/Raphael-Sinelli',
    linkedin: 'https://www.linkedin.com/in/raphael-sinelli-675310321',
    papel: 'Front-End & Business',
    foto: raphaelImg,
  }
];

function AvatarFallback({ nome }: { nome: string }) {
  const initials = nome.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <div className="w-20 h-20 rounded-full bg-orbi-panel border-2 border-orbi-cyan/40 flex items-center justify-center mx-auto mb-4">
      <span className="font-display font-bold text-xl text-orbi-cyan">{initials}</span>
    </div>
  );
}

export default function Integrantes() {
  return (
    <main className="min-h-screen pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">/ Integrantes</p>
      <h1 className="font-display font-bold text-4xl text-orbi-text mb-2">Nossa Equipe</h1>
      <p className="text-orbi-muted mb-12 max-w-xl">
        Conheça os desenvolvedores por trás do OrbiSafe — Global Solution 2026, FIAP.
      </p>

      <div className={`grid gap-6 ${integrantes.length === 1 ? 'max-w-sm' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {integrantes.map((p) => (
          <div key={p.rm} className="orbi-card text-center group">
            {p.foto
              ? <img src={p.foto} alt={p.nome} className="w-20 h-20 rounded-full object-cover border-2 border-orbi-cyan/40 mx-auto mb-4" />
              : <AvatarFallback nome={p.nome} />
            }

            <h2 className="font-display font-bold text-orbi-text mb-1 group-hover:text-orbi-cyan transition-colors">
              {p.nome}
            </h2>

            {p.papel && (
              <p className="text-xs font-mono text-orbi-cyan/70 mb-3">{p.papel}</p>
            )}

            <div className="flex flex-col gap-1 text-xs font-mono text-orbi-muted mb-5">
              <span>RM: <span className="text-orbi-text">{p.rm}</span></span>
              <span>Turma: <span className="text-orbi-text">{p.turma}</span></span>
            </div>

            <div className="flex gap-3 justify-center">
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs orbi-btn-ghost px-3 py-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs orbi-btn-ghost px-3 py-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="orbi-card mt-10 text-center border-orbi-cyan/10">
        <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest mb-2">Projeto</p>
        <p className="text-orbi-text font-display font-semibold">Global Solution 2026 — FIAP</p>
        <p className="text-orbi-muted text-sm mt-1">Análise e Desenvolvimento de Sistemas · Turmas 1TDSPS</p>
        <p className="text-orbi-cyan text-sm mt-1 font-mono">Tema: Economia Espacial</p>
      </div>
    </main>
  );
}