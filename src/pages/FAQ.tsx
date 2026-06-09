import { useState } from 'react';

const faqs = [
  {
    q: 'O que é o OrbiSafe?',
    a: 'OrbiSafe é uma plataforma de monitoramento e previsão de riscos climáticos que utiliza dados satelitais e inteligência artificial para alertar sobre eventos como enchentes, queimadas e calor extremo antes que se tornem desastres.',
  },
  {
    q: 'De onde vêm os dados satelitais?',
    a: 'Utilizamos dados públicos de agências como NASA (nasa.gov), ESA (esa.int) e Space & Major Disasters Charter (disasterscharter.org), além de outras fontes de sensoriamento remoto disponíveis.',
  },
  {
    q: 'Quem pode usar o OrbiSafe?',
    a: 'A plataforma é voltada para órgãos de defesa civil, prefeituras, produtores rurais, empresas de logística, seguradoras e qualquer pessoa ou organização que precise monitorar riscos climáticos em uma região específica.',
  },
  {
    q: 'Como funciona a previsão de risco?',
    a: 'Modelos de inteligência artificial analisam séries históricas de dados climáticos e satelitais para identificar padrões e calcular a probabilidade de eventos extremos. O resultado é apresentado com nível de risco (BAIXO, MÉDIO, ALTO ou CRÍTICO) e probabilidade em percentual.',
  },
  {
    q: 'Os alertas são em tempo real?',
    a: 'Sim. O sistema gera alertas assim que os dados monitorados ultrapassam os limiares configurados para cada tipo de evento e região. Os alertas ficam disponíveis com status ATIVO, MONITORANDO ou RESOLVIDO.',
  },
  {
    q: 'Qual é a relação com a Economia Espacial?',
    a: 'O OrbiSafe é um exemplo de como a infraestrutura espacial — satélites de observação da Terra — gera valor econômico e social diretamente na superfície. É a mesma lógica que transformou o GPS em um serviço essencial do cotidiano.',
  },
  {
    q: 'Este projeto foi desenvolvido por quem?',
    a: 'É um projeto acadêmico desenvolvido para a Global Solution 2026/1 da FIAP, curso de Análise e Desenvolvimento de Sistemas, turmas de agosto.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
      <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">/ FAQ</p>
      <h1 className="font-display font-bold text-4xl text-orbi-text mb-2">Perguntas Frequentes</h1>
      <p className="text-orbi-muted mb-10">Tudo o que você precisa saber sobre o OrbiSafe.</p>

      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <div key={i} className="orbi-card cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-display font-semibold text-sm text-orbi-text">{f.q}</p>
              <span className={`text-orbi-cyan transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </div>
            {open === i && (
              <p className="text-orbi-muted text-sm leading-relaxed mt-3 pt-3 border-t border-orbi-border animate-fade-in">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="orbi-card mt-10 text-center">
        <p className="text-orbi-muted text-sm mb-2">Tem mais dúvidas?</p>
        <p className="text-orbi-cyan font-mono text-sm">orbisafe@fiap.com.br</p>
      </div>
    </main>
  );
}