import EditProfileForm from './EditProfileForm';
import AvatarUpload from './AvatarUpload';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center'>
      <div className='bg-white rounded-xl w-[400px] p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='font-semibold text-lg'>Edit Profile</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <AvatarUpload />
        <div className='mt-6'>
          <EditProfileForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
