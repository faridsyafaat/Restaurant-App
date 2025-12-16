import { createContext } from 'react';

export interface Resto {
  id: string;
  name: string;
  address: string;
  image: string;
}

export interface SearchContextType {
  search: string;
  setSearch: (value: string) => void;
  searchResults: Resto[];
  loading: boolean;
  error: string | null;
  searchResto: (query: string) => Promise<void>;
}

export const SearchContext = createContext<SearchContextType | null>(null);
