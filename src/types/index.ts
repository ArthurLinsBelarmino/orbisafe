export type NivelRisco = 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';
export type StatusAlerta = 'ATIVO' | 'RESOLVIDO' | 'MONITORANDO';
export type TipoEvento = 'ENCHENTE' | 'QUEIMADA' | 'CALOR_EXTREMO' | 'SECA' | 'TEMPESTADE' | string;


export interface Local {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  cidade?: string;
  estado?: string;
  pais?: string;
  nivelRisco?: NivelRisco;
  descricao?: string;
}

export interface Alerta {
  id: number;
  titulo: string;
  descricao?: string;
  tipoEvento: TipoEvento;
  nivelRisco: NivelRisco;
  status: StatusAlerta;
  dataHora: string;
  local?: Local;
  localId?: number;
  nomeLocal?: string;
}

export interface Previsao {
  id: number;
  dataHoraPrevisao: string;
  tipoEvento: TipoEvento;
  probabilidade: number;
  nivelRiscoPrevisto: NivelRisco;
  descricao?: string;
  local?: Local;
  localId?: number;
  nomeLocal?: string;
  modeloIaId?: number;
}

export interface Medicao {
  id: number;
  dataHora: string;
  temperatura?: number;
  umidade?: number;
  precipitacao?: number;
  indiceVegetacao?: number;
  areaQueimada?: number;
  localId?: number;
  nomeLocal?: string;
  fonteId?: number;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil?: string;
  ativo?: boolean;
}

export interface FonteDados {
  id: number;
  nome: string;
  tipo?: string;
  url?: string;
  descricao?: string;
}

export interface ModeloIA {
  id: number;
  nome: string;
  versao?: string;
  descricao?: string;
  acuracia?: number;
}


export interface DashboardResumo {
  totalLocaisMonitorados?: number;
  totalAlertas?: number;
  alertasAtivos?: number;
  totalPrevisoes?: number;
  totalMedicoes?: number;
  locaisEmRiscoCritico?: number;
  locaisEmRiscoAlto?: number;
  [key: string]: unknown;
}

export interface LocalRisco {
  id?: number;
  nome?: string;
  nivelRisco?: NivelRisco;
  totalAlertas?: number;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}


export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}