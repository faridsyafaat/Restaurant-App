import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const NavbarAfter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalQty } = useCart(); 

  const handleCartClick = () => {
    if (totalQty > 0) {
      navigate('/mycart'); 
    } else {
      alert('Belum ada pesanan di keranjang!');
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-black shadow-sm px-4 py-3'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link to='/home' className='flex items-center gap-4'>
          <img
            src='/image/logo.png'
            alt='Logo'
            className='w-[149px] h-[42px] object-contain'
          />
        </Link>

        {/* Bag + User */}
        <div className='flex items-center gap-4'>
          {/* Cart */}
          <div className='relative cursor-pointer' onClick={handleCartClick}>
            <img src='/image/bag2.png' alt='Cart' className='w-6 h-6' />
            {totalQty > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {totalQty}
              </span>
            )}
          </div>

          {/* User */}
          <div className='flex items-center gap-2'>
            <img
              src={user?.photo || '/image/author.png'}
              alt='User'
              className='w-9 h-9 rounded-full'
            />
            <span className='font-medium hidden sm:inline-block text-white'>
              {user?.name || user?.email || 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfter;
