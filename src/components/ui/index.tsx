import type { NivelRisco, StatusAlerta } from '../../types';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
  return (
    <div className={`${s} border-2 border-orbi-border border-t-orbi-cyan rounded-full animate-spin`} />
  );
}

export function LoadingBox() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Spinner size="lg" />
      <p className="text-orbi-muted text-sm font-mono animate-pulse">Conectando à API...</p>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="orbi-card border-orbi-red/30 bg-orbi-red/5 text-center py-10">
      <div className="text-3xl mb-3">⚠️</div>
      <p className="text-orbi-red font-mono text-sm">{message}</p>
      <p className="text-orbi-muted text-xs mt-2">Verifique a conexão com a API.</p>
    </div>
  );
}

export function EmptyBox({ label = 'Nenhum dado encontrado.' }: { label?: string }) {
  return (
    <div className="orbi-card text-center py-10">
      <div className="text-3xl mb-3">📭</div>
      <p className="text-orbi-muted text-sm">{label}</p>
    </div>
  );
}

export function BadgeRisco({ nivel }: { nivel: NivelRisco | string }) {
  const map: Record<string, string> = {
    BAIXO:   'bg-emerald-500/15 text-emerald-400',
    MEDIO:   'bg-yellow-500/15 text-yellow-400',
    ALTO:    'bg-orange-500/15 text-orange-400',
    CRITICO: 'bg-red-500/15 text-red-400',
  };
  return (
    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${map[nivel] ?? 'bg-orbi-border text-orbi-muted'}`}>
      {nivel}
    </span>
  );
}

export function BadgeStatus({ status }: { status: StatusAlerta | string }) {
  const map: Record<string, string> = {
    ATIVO:       'bg-red-500/15 text-red-400',
    MONITORANDO: 'bg-yellow-500/15 text-yellow-400',
    RESOLVIDO:   'bg-emerald-500/15 text-emerald-400',
  };
  return (
    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${map[status] ?? 'bg-orbi-border text-orbi-muted'}`}>
      {status}
    </span>
  );
}

export function SectionHeader({ tag, title, sub }: { tag?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      {tag && <p className="font-mono text-xs text-orbi-cyan uppercase tracking-widest mb-2">{tag}</p>}
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-orbi-text">{title}</h2>
      {sub && <p className="text-orbi-muted mt-2 max-w-xl">{sub}</p>}
    </div>
  );
}

export function StatCard({
  label, value, sub, color = 'cyan', icon,
}: {
  label: string; value: string | number; sub?: string;
  color?: 'cyan' | 'orange' | 'green' | 'red' | 'yellow';
  icon?: string;
}) {
  const colorMap = {
    cyan:   'text-orbi-cyan',
    orange: 'text-orbi-orange',
    green:  'text-orbi-green',
    red:    'text-orbi-red',
    yellow: 'text-orbi-yellow',
  };
  return (
    <div className="orbi-card">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-xs text-orbi-muted uppercase tracking-widest">{label}</p>
          <p className={`font-display font-bold text-3xl mt-1 ${colorMap[color]}`}>{value}</p>
          {sub && <p className="text-orbi-muted text-xs mt-1">{sub}</p>}
        </div>
        {icon && <span className="text-2xl opacity-60">{icon}</span>}
      </div>
    </div>
  );
}