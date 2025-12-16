import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '@/context/ApiContext';
import { AuthContext } from '@/context/AuthContext';

/* ================= TYPES ================= */

interface Recommendation {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
}

interface RecommendationApiResponse {
  success: boolean;
  data: {
    recommendations: Recommendation[];
  };
}

/* ================= FETCHERS ================= */

const fetchRecommendations = async (
  baseUrl: string,
  token: string
): Promise<Recommendation[]> => {
  const res = await fetch(`${baseUrl}/api/resto/recommended`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  const json: RecommendationApiResponse = await res.json();
  return json.data.recommendations;
};

const fetchRestaurantDetail = async (
  baseUrl: string,
  token: string,
  id: number
) => {
  const res = await fetch(`${baseUrl}/api/resto/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch restaurant detail');
  }

  return res.json();
};

/* ================= COMPONENT ================= */

export default function RecommendationAfter() {
  const { apiBaseUrl } = useContext(ApiContext);
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const token = auth?.token;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => fetchRecommendations(apiBaseUrl, token!),
    enabled: !!token,
  });

  if (!token) return null;

  return (
    <section className='py-6 px-4 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Recommended</h2>
        <button className='text-primary text-sm font-semibold'>See All</button>
      </div>

      {isLoading && <p className='text-center text-gray-400'>Loading...</p>}

      {isError && (
        <p className='text-center text-red-500'>
          Failed to load recommendations
        </p>
      )}

      {data && (
        <div
          className='
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          '
        >
          {data.map((item) => (
            <Link
              key={item.id}
              to={`/restaurant/${item.id}`}
              onMouseEnter={() =>
                queryClient.prefetchQuery({
                  queryKey: ['restaurant-detail', item.id],
                  queryFn: () =>
                    fetchRestaurantDetail(apiBaseUrl, token, item.id),
                })
              }
              className='
                flex items-center gap-4
                bg-white rounded-xl p-4
                shadow-sm hover:shadow-md
                transition
                cursor-pointer
              '
            >
              <img
                src={item.logo}
                alt={item.name}
                className='w-14 h-14 rounded-xl object-contain bg-gray-100'
              />

              <div>
                <h3 className='font-semibold text-sm'>{item.name}</h3>

                <div className='flex items-center text-xs text-gray-600 gap-1'>
                  ⭐ {item.star}
                </div>

                <p className='text-xs text-gray-500'>{item.place}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
