import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EditProfileModal from '@/components/profile/EditProfileModal';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';

export default function ProfilePage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavbarAfterWhite />
      <div className='bg-black container-custom justify-between px-8 py-12'>
        <main className='max-w-xl mx-auto p-6 min-h-[calc(100vh-160px)]'>
          <div className='flex items-center gap-4'>
            <img
              src={user?.avatar || '/image/author.png'}
              className='w-20 h-20 rounded-full object-cover'
            />
            <div>
              <h2 className='font-semibold text-2xl text-white'>
                {user?.name}
              </h2>
              <p className='text-sm text-gray-500'>{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className='mt-6 bg-red-500 text-white px-6 py-2 rounded-full'
          >
            Edit Profile
          </button>

          <EditProfileModal open={open} onClose={() => setOpen(false)} />
        </main>
      </div>

      <FooterSection />
    </>
  );
}
