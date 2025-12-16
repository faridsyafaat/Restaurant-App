import { createContext } from 'react';

export interface ApiContextType {
  apiBaseUrl: string;
}

export const ApiContext = createContext<ApiContextType>({
  apiBaseUrl: 'https://restaurant-be-400174736012.asia-southeast2.run.app',
});
