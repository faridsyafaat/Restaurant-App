import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NavbarBefore() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full bg-black shadow-sm'>
      {/* Wrapper agar sisi kiri/kanan menjorok */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between'>
        {/* Logo */}
        <img
          src='/image/logo.png'
          alt='Logo'
          className='w-[149px] h-[42px] object-contain'
        />

        {/* Desktop Buttons */}
        <div className='hidden sm:flex gap-3'>
          <Link to='/login'>
            <Button
              variant='outline'
              className='w-[163px] h-[48px] !bg-transparent border-2 !border-white text-white
             hover:!bg-white hover:!text-black transition'
            >
              Sign In
            </Button>
          </Link>

          <Link to='/register'>
            <Button
              variant='outline'
              className='w-[163px] h-[48px] bg-white text-black border-2 !border-white 
                         hover:bg-transparent hover:text-white transition'
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='sm:hidden text-white'
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className='sm:hidden bg-black px-6 py-4 flex flex-col gap-3 shadow-md'>
          <Link to='/login'>
            <Button
              variant='outline'
              className='w-full border-2 !bg-transparent !border-white text-white
             hover:!bg-white hover:!text-black transition'
            >
              Sign In
            </Button>
          </Link>

          <Link to='/register'>
            <Button
              variant='outline'
              className='w-full bg-white text-black border-2 !border-white 
                         hover:bg-transparent hover:text-white transition'
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
