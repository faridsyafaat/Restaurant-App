import { BASE_URL } from '@/constans/api';
export async function getRestaurants(params) {
    const query = new URLSearchParams();
    if (params.page)
        query.append('page', String(params.page));
    if (params.limit)
        query.append('limit', String(params.limit));
    if (params.category)
        query.append('category', params.category);
    // ✅ FILTER QUERY
    if (params.priceMin !== undefined)
        query.append('priceMin', String(params.priceMin));
    if (params.priceMax !== undefined)
        query.append('priceMax', String(params.priceMax));
    if (params.rating !== undefined)
        query.append('rating', String(params.rating));
    const res = await fetch(`${BASE_URL}/api/resto?${query.toString()}`);
    if (!res.ok)
        throw new Error('Failed to fetch restaurants');
    const json = await res.json();
    return json.data;
}
