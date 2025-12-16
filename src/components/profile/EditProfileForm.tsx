import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface Props {
  onSuccess: () => void;
}

export default function EditProfileForm({ onSuccess }: Props) {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateProfile({ name, phone });
      toast.success('Profile updated');
      onSuccess();
    } catch {
      toast.error('Failed update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='text-sm'>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border rounded-lg px-3 py-2'
        />
      </div>

      <div>
        <label className='text-sm'>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='w-full border rounded-lg px-3 py-2'
        />
      </div>

      <button
        disabled={loading}
        className='w-full bg-red-600 text-white py-2 rounded-full'
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
