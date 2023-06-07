import React, { useContext, createContext, useState, useEffect } from 'react';

// TODO: replace with server error interface
export interface HttpError {
  status: number;
  message: string;
}

const GlobalErrorContext = createContext<{
  error: HttpError;
  setError: React.Dispatch<React.SetStateAction<HttpError>>;
}>(null);

interface GlobalErrorProps {
  children: React.ReactNode;
}

export const GlobalErrorProvider: React.FC<GlobalErrorProps> = ({ children }) => {
  const [error, setError] = useState<HttpError>(null);
  const value = { error, setError };

  // TODO: replace with global error logic
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return <GlobalErrorContext.Provider value={value}>{children}</GlobalErrorContext.Provider>;
};

export const useGlobalError = () => useContext(GlobalErrorContext);
