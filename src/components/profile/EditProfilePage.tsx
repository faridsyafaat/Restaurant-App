import EditProfileModal from '@/components/profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';

export default function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <>
      <NavbarAfterWhite />

      <main className='min-h-[calc(100vh-160px)]'>
        <EditProfileModal open={true} onClose={() => navigate(-1)} />
      </main>

      <FooterSection />
    </>
  );
}
