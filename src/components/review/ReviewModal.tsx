import { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  restaurantId: number;
  menuId?: number;
  onSuccess?: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  transactionId,
  restaurantId,
  menuId,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Please give rating');
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      const res = await fetch(
        'https://restaurant-be-400174736012.asia-southeast2.run.app/api/review',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            transactionId,
            restaurantId,
            menuId,
            star: rating,
            comment,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success('Review submitted successfully!');
      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-2xl w-[420px] p-6 relative'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
        >
          <X size={20} />
        </button>

        <h2 className='text-lg font-semibold text-center mb-4'>Give Review</h2>

        {/* Rating */}
        <div className='flex justify-center gap-2 mb-4'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          placeholder='Please share your thoughts about our service!'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-full h-[120px] border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500'
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className='mt-4 w-full bg-red-600 text-white py-2 rounded-full font-semibold disabled:opacity-50'
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
