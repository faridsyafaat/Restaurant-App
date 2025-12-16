'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const NavbarAfterWhite = () => {
  const { totalQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (totalQty > 0) {
      navigate('/mycart'); // ✅ SESUAI AppRouter
    } else {
      alert('Belum ada pesanan di keranjang!');
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between container-custom mx-auto'>
      {/* Logo */}
      <Link to='/home' className='flex items-center gap-4'>
        <img
          src='/image/logo2.png'
          alt='Logo'
          className='w-[149px] h-[42px] object-contain'
        />
      </Link>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* Cart */}
        <div className='relative cursor-pointer' onClick={handleCartClick}>
          <img src='/image/bag.png' alt='Cart' className='w-6 h-6' />

          {totalQty > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
              {totalQty}
            </span>
          )}
        </div>

        {/* User */}
        <div className='flex items-center gap-2 cursor-pointer'>
          <img
            src={user?.avatar || '/image/author.png'}
            alt='User'
            className='w-9 h-9 rounded-full'
          />
          <span className='font-medium hidden sm:inline-block text-black'>
            {user?.name || 'John Doe'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterWhite;
