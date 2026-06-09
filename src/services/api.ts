const BASE_URL = 'https://orbisafe-api-java-gs.onrender.com';

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function put<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function del(path: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
}

export const api = {
  health: () => get<unknown>('/health'),

  dashboardResumo: () => get<unknown>('/dashboard/resumo'),
  dashboardAlertasRecentes: () => get<unknown[]>('/dashboard/alertas-recentes'),
  dashboardLocaisRisco: () => get<unknown[]>('/dashboard/locais-risco'),

  getLocais: () => get<unknown[]>('/locais'),
  getLocalById: (id: number) => get<unknown>(`/locais/${id}`),
  createLocal: (body: unknown) => post<unknown>('/locais', body),
  updateLocal: (id: number, body: unknown) => put<unknown>(`/locais/${id}`, body),
  deleteLocal: (id: number) => del(`/locais/${id}`),

  getAlertas: () => get<unknown[]>('/alertas'),
  getAlertaById: (id: number) => get<unknown>(`/alertas/${id}`),
  getAlertasByLocal: (localId: number) => get<unknown[]>(`/alertas/local/${localId}`),
  getAlertasByStatus: (status: string) => get<unknown[]>(`/alertas/status/${status}`),
  createAlerta: (body: unknown) => post<unknown>('/alertas', body),
  updateAlerta: (id: number, body: unknown) => put<unknown>(`/alertas/${id}`, body),
  deleteAlerta: (id: number) => del(`/alertas/${id}`),

  getPrevisoes: () => get<unknown[]>('/previsoes'),
  getPrevisaoById: (id: number) => get<unknown>(`/previsoes/${id}`),
  getPrevisoesByLocal: (localId: number) => get<unknown[]>(`/previsoes/local/${localId}`),
  createPrevisao: (body: unknown) => post<unknown>('/previsoes', body),
  updatePrevisao: (id: number, body: unknown) => put<unknown>(`/previsoes/${id}`, body),
  deletePrevisao: (id: number) => del(`/previsoes/${id}`),

  getMedicoes: () => get<unknown[]>('/medicoes'),
  getMedicaoById: (id: number) => get<unknown>(`/medicoes/${id}`),
  getMedicoesByLocal: (localId: number) => get<unknown[]>(`/medicoes/local/${localId}`),
  createMedicao: (body: unknown) => post<unknown>('/medicoes', body),
  updateMedicao: (id: number, body: unknown) => put<unknown>(`/medicoes/${id}`, body),
  deleteMedicao: (id: number) => del(`/medicoes/${id}`),

  getUsuarios: () => get<unknown[]>('/usuarios'),
  getUsuarioById: (id: number) => get<unknown>(`/usuarios/${id}`),
  createUsuario: (body: unknown) => post<unknown>('/usuarios', body),
  updateUsuario: (id: number, body: unknown) => put<unknown>(`/usuarios/${id}`, body),
  deleteUsuario: (id: number) => del(`/usuarios/${id}`),

  getFontes: () => get<unknown[]>('/fontes'),

  getModelosIA: () => get<unknown[]>('/modelos-ia'),
};