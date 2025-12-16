import { Star } from 'lucide-react';
import type { Review } from '@/types/Review';

/* ============================
   TIPE DATA API REVIEW
=============================== */
interface ApiUser {
  id?: number;
  name?: string;
}

interface ApiMenu {
  menuId?: number;
  menuName?: string;
  price?: number;
  type?: string;
  image?: string;
  quantity?: number;
}

interface ApiReview {
  id: number;
  star?: number;
  comment?: string;
  createdAt?: string;
  user?: ApiUser;
  transactionId?: string;
  menus?: ApiMenu[];
}

/* ============================
   REVIEW SECTION
=============================== */
export default function ReviewSection({ reviews }: { reviews?: ApiReview[] }) {
  /* Dummy Review */
  const dummy: Review[] = [
    {
      id: 1,
      username: 'Michael Brown',
      comment:
        'What a fantastic place! The food was delicious, and the ambiance was delightful. A must-visit for anyone looking for a great time!',
      rating: 5,
      date: '12 Desember 2025 13.20',
      avatar: '/image/author.png',
    },
    {
      id: 2,
      username: 'Sarah Davis',
      comment:
        'I can’t say enough good things! The service was exceptional and the menu had great options.',
      rating: 5,
      date: '12 Desember 2025 13.20',
      avatar: '/image/author.png',
    },
  ];

  /* Mapping API → Frontend Review */
  const mapReviewFromAPI = (rev: ApiReview): Review => ({
    id: rev.id,
    username: rev.user?.name ?? 'Anonymous',
    comment: rev.comment ?? '',
    rating: rev.star ?? 0,
    date: rev.createdAt
      ? new Date(rev.createdAt).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-',
    avatar: '/image/author.png',
  });

  /* Combine API Review + Dummy */
  const list: Review[] = [
    ...(Array.isArray(reviews) ? reviews.map(mapReviewFromAPI) : []),
    ...dummy,
  ];

  return (
    <div className='px-4 mt-10 container-custom'>
      {/* Header */}
      <div className='flex flex-col items-start gap-1 mb-4'>
        <h2 className='text-2xl font-bold'>Review</h2>

        <div className='flex items-center gap-1 text-yellow-600'>
          <Star size={18} fill='gold' />
          <span className='font-semibold text-base'>4.9</span>
          <span className='text-gray-500 text-sm'>(24 Ulasan)</span>
        </div>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {list.map((rev) => (
          <div
            key={rev.id}
            className='bg-white p-4 rounded-xl shadow-sm border flex flex-col gap-3'
          >
            {/* Top row: avatar + name */}
            <div className='flex items-center gap-3'>
              <img
                src={rev.avatar}
                alt={rev.username}
                className='w-12 h-12 rounded-full object-cover'
              />

              <div>
                <p className='font-semibold'>{rev.username}</p>
                <p className='text-xs text-gray-500 mt-1'>{rev.date}</p>
              </div>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-1 text-yellow-600'>
              {Array.from({ length: Math.max(0, rev.rating) }).map((_, i) => (
                <Star key={i} size={14} fill='gold' />
              ))}
            </div>

            {/* Caption */}
            <p className='text-gray-700 text-sm leading-relaxed text-left'>
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show More */}
      <div className='flex justify-center mt-6'>
        <button className='px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm'>
          Show More
        </button>
      </div>
    </div>
  );
}
