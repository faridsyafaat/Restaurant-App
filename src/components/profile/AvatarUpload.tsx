import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function AvatarUpload() {
  const { user, updateProfile } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      await updateProfile(formData);
      toast.success('Avatar updated');
    } catch {
      toast.error('Failed update avatar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center gap-3'>
      <img
        src={preview || user?.avatar || '/image/author.png'}
        className='w-24 h-24 rounded-full object-cover'
      />

      <label className='cursor-pointer text-sm text-red-600 font-medium'>
        {loading ? 'Uploading...' : 'Change Photo'}
        <input type='file' accept='image/*' hidden onChange={handleChange} />
      </label>
    </div>
  );
}
