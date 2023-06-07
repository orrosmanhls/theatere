import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { GlobalErrorProvider } from './contexts/GlobalErrorContext';

interface Props {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<Props> = ({ children }) => {
  return <GlobalErrorProvider>{children}</GlobalErrorProvider>;
};

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
