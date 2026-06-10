const BASE_URL = import.meta.env.PROD
  ? 'https://orbisafe-api-java-gs.onrender.com'
  : '/api';

const validateId = (id: number, entidade: string) => {
  if (id === undefined || id === null || isNaN(Number(id))) {
    throw new Error(`ID inválido (${id}) bloqueado no front-end ao acessar: ${entidade}`);
  }
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

async function put<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

async function patch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

async function del(path: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
}

export const api = {
  health: () => get<unknown>('/health'),

  dashboardResumo: () => get<unknown>('/dashboard/resumo'),
  dashboardAlertasRecentes: () => get<unknown[]>('/dashboard/alertas-recentes'),
  dashboardLocaisRisco: () => get<unknown[]>('/dashboard/locais-risco'),

  getLocais: () => get<unknown[]>('/locais'),
  getLocalById: (id: number) => { validateId(id, 'Local'); return get<unknown>(`/locais/${id}`); },
  createLocal: (body: unknown) => post<unknown>('/locais', body),
  updateLocal: (id: number, body: unknown) => { validateId(id, 'Local'); return put<unknown>(`/locais/${id}`, body); },
  deleteLocal: (id: number) => { validateId(id, 'Local'); return del(`/locais/${id}`); },

  getAlertas: () => get<unknown[]>('/alertas'),
  getAlertaById: (id: number) => { validateId(id, 'Alerta'); return get<unknown>(`/alertas/${id}`); },
  getAlertasByLocal: (localId: number) => { validateId(localId, 'Alerta-Local'); return get<unknown[]>(`/alertas/local/${localId}`); },
  getAlertasByStatus: (status: 'ABERTO' | 'EM_ANALISE' | 'RESOLVIDO') => get<unknown[]>(`/alertas/status/${status}`),
  createAlerta: (body: unknown) => post<unknown>('/alertas', body),
  updateAlerta: (id: number, body: unknown) => { validateId(id, 'Alerta'); return put<unknown>(`/alertas/${id}`, body); },
  updateAlertaStatus: (id: number, status: 'ABERTO' | 'EM_ANALISE' | 'RESOLVIDO') => { validateId(id, 'Alerta'); return patch<unknown>(`/alertas/${id}/status`, { status }); },
  deleteAlerta: (id: number) => { validateId(id, 'Alerta'); return del(`/alertas/${id}`); },

  getPrevisoes: () => get<unknown[]>('/previsoes'),
  getPrevisaoById: (id: number) => { validateId(id, 'Previsao'); return get<unknown>(`/previsoes/${id}`); },
  getPrevisoesByLocal: (localId: number) => { validateId(localId, 'Previsao-Local'); return get<unknown[]>(`/previsoes/local/${localId}`); },
  createPrevisao: (body: unknown) => post<unknown>('/previsoes', body),
  updatePrevisao: (id: number, body: unknown) => { validateId(id, 'Previsao'); return put<unknown>(`/previsoes/${id}`, body); },
  deletePrevisao: (id: number) => { validateId(id, 'Previsao'); return del(`/previsoes/${id}`); },

  getMedicoes: () => get<unknown[]>('/medicoes'),
  getMedicaoById: (id: number) => { validateId(id, 'Medicao'); return get<unknown>(`/medicoes/${id}`); },
  getMedicoesByLocal: (localId: number) => { validateId(localId, 'Medicao-Local'); return get<unknown[]>(`/medicoes/local/${localId}`); },
  createMedicao: (body: unknown) => post<unknown>('/medicoes', body),
  updateMedicao: (id: number, body: unknown) => { validateId(id, 'Medicao'); return put<unknown>(`/medicoes/${id}`, body); },
  deleteMedicao: (id: number) => { validateId(id, 'Medicao'); return del(`/medicoes/${id}`); },

  getUsuarios: () => get<unknown[]>('/usuarios'),
  getUsuarioById: (id: number) => { validateId(id, 'Usuario'); return get<unknown>(`/usuarios/${id}`); },
  createUsuario: (body: unknown) => post<unknown>('/usuarios', body),
  updateUsuario: (id: number, body: unknown) => { validateId(id, 'Usuario'); return put<unknown>(`/usuarios/${id}`, body); },
  deleteUsuario: (id: number) => { validateId(id, 'Usuario'); return del(`/usuarios/${id}`); },

  getFontes: () => get<unknown[]>('/fontes'),
  getModelosIA: () => get<unknown[]>('/modelos-ia'),
};