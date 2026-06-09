import { useState, useEffect } from 'react';
import type { ApiState } from '../types';

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Erro desconhecido';
          setState({ data: null, loading: false, error: msg });
        }
      });

    return () => { cancelled = true; };
  }, deps);

  return state;
}