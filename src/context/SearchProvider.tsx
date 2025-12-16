import { useState, useCallback, ReactNode } from 'react';
import { SearchContext, type Resto } from './SearchContext';

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Resto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchResto = useCallback(async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://restaurant-be-400174736012.asia-southeast2.run.app/api/resto/search?q=${encodeURIComponent(
          query
        )}&page=1&limit=20`
      );

      if (!res.ok) throw new Error('Failed to fetch');

      const json = await res.json();
      setSearchResults(json.data?.restaurants || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        loading,
        error,
        searchResto,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
