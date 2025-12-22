import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { SearchContext } from './SearchContext';
export function SearchProvider({ children }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchResto = useCallback(async (query) => {
        if (!query)
            return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://restaurant-be-400174736012.asia-southeast2.run.app/api/resto/search?q=${encodeURIComponent(query)}&page=1&limit=20`);
            if (!res.ok)
                throw new Error('Failed to fetch');
            const json = await res.json();
            setSearchResults(json.data?.restaurants || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setSearchResults([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return (_jsx(SearchContext.Provider, { value: {
            search,
            setSearch,
            searchResults,
            loading,
            error,
            searchResto,
        }, children: children }));
}
