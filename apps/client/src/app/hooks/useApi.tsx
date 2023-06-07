/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { HttpError, useGlobalError } from '../contexts/GlobalErrorContext';

type UnravelPromise<A> = A extends Promise<infer U> ? U : A;

export const useApi = <F extends (...args: any[]) => any>(
  method: F,
  shouldSetGlobalError = true,
  defaultValue: any = null
): [
  (...args: any) => Promise<UnravelPromise<ReturnType<F>>>,
  UnravelPromise<ReturnType<F>>,
  boolean,
  HttpError
] => {
  const { setError: setGlobalError } = useGlobalError();
  const [data, setData] = useState<UnravelPromise<ReturnType<F>>>(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpError>(null);

  // keeping unmounted components from rerenders
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const invoke = async (...args: any) => {
    setError(null);
    setLoading(true);
    try {
      const res = await method(...args);
      if (mounted) {
        setData(res);
      }
      return res;
    } catch (err) {
      if (shouldSetGlobalError) {
        setGlobalError(err as HttpError);
      }
      return data || defaultValue;
    } finally {
      setLoading(false);
    }
  };

  return [invoke, data, loading, error];
};

export const useApiEffect = <F extends () => any>(
  method: F,
  deps: any[] = [],
  shouldSetGlobalError = true,
  defaultValue: any = null
): [
  UnravelPromise<ReturnType<F>>,
  boolean,
  () => Promise<UnravelPromise<ReturnType<F>>>,
  HttpError
] => {
  const [invoke, data, loading, error] = useApi(method, defaultValue, shouldSetGlobalError);
  useEffect(() => {
    if (Array.isArray(deps)) {
      invoke();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [data, loading, invoke, error];
};
