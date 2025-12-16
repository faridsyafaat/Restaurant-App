import { useLocation, useNavigate } from 'react-router-dom';
import ReviewModal from '@/components/review/ReviewModal';

/* ================= TYPES ================= */
interface ReviewLocationState {
  transactionId: string;
  restaurantId: number;
}

/* ================= PAGE ================= */
export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ReviewLocationState | null;

 if (!state) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Invalid review data</p>
      </div>
    );
  }

  const { transactionId, restaurantId } = state;

  return (
    <ReviewModal
      isOpen={true}
      transactionId={transactionId}
      restaurantId={restaurantId}
      onClose={() => navigate(-1)}
      onSuccess={() => navigate('/my-orders', { replace: true })}
    />
  );
}
