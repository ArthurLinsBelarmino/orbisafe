export type NivelRisco = 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';

export interface Alerta {
  idAlerta: number;
  idLocal: number;
  idPrevisao: number;
  nivelAlerta: string;
  mensagem: string;
  status: 'ABERTO' | 'EM_ANALISE' | 'RESOLVIDO';
  dataCriacao: string;
}

export interface Local {
  idLocal: number;
  nome: string;
  tipoLocal: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
}

export interface Previsao {
  idPrevisao: number;
  idLocal: number;
  idModelo: number;
  indiceSeveridade: number;
  probabilidadeOcorrencia: number;
  nivelRisco: string;
  dataPrevisao: string;
}

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  perfil: string;
}

export interface FonteDados {
  idFonte: number;
  nome: string;
  tipo?: string;
  url?: string;
  descricao?: string;
}

export interface ModeloIA {
  idModelo: number;
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
  idLocal?: number;
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