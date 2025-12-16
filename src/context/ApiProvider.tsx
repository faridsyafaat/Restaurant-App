import { ReactNode } from 'react';
import { ApiContext } from './api-context';

export function ApiProvider({ children }: { children: ReactNode }) {
  return (
    <ApiContext.Provider
      value={{
        apiBaseUrl:
          'https://restaurant-be-400174736012.asia-southeast2.run.app',
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
