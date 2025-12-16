import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (form.password !== form.confirmPassword) {
      setErrorMsg('Password dan Confirm Password tidak sama');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        'https://restaurant-be-400174736012.asia-southeast2.run.app/api/auth/register',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      if (res.data.success) {
        alert('Register sukses! Silahkan login.');
        navigate('/login');
      } else {
        setErrorMsg(res.data.message || 'Register gagal');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-white'>
      {/* KIRI - IMAGE */}
      <div className='hidden md:block md:w-1/2'>
        <img
          src='/image/food-bg.png'
          alt='Food Background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* KANAN - FORM */}
      <div className='flex items-center justify-center md:w-1/2 p-6'>
        <div className='w-full max-w-md'>
          {/* LOGO */}
          <div className='flex items-center gap-2 mb-6'>
            <img
              src='/image/logo2.png'
              alt='logo'
              className='w-[149px] h-[42px]'
            />
          </div>

          {/* TEKS */}
          <h2 className='text-3xl font-bold mb-2'>Welcome Back</h2>
          <p className='text-gray-500 mb-6'>Good to see you again! Let’s eat</p>

          {/* TABS */}
          <div className='flex border rounded-full overflow-hidden mb-6'>
            <button
              className='w-1/2 py-2 font-semibold bg-gray-200'
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button
              type='button'
              className='w-1/2 py-2 font-semibold bg-primary text-white'
            >
              Sign Up
            </button>
          </div>

          {/* FORM REGISTER */}
          <form onSubmit={handleRegister} className='space-y-4'>
            <input
              className='border rounded-xl px-4 py-2 w-full'
              placeholder='Name'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className='border rounded-xl px-4 py-2 w-full'
              placeholder='Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className='border rounded-xl px-4 py-2 w-full'
              placeholder='Phone'
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <div className='relative'>
              <input
                type={showPass ? 'text' : 'password'}
                className='border rounded-xl px-4 py-2 w-full'
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type='button'
                onClick={() => setShowPass(!showPass)}
                className='absolute right-3 top-2.5 text-gray-500'
              >
                {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div className='relative'>
              <input
                type={showConfirm ? 'text' : 'password'}
                className='border rounded-xl px-4 py-2 w-full'
                placeholder='Confirm Password'
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className='absolute right-3 top-2.5 text-gray-500'
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}

            <Button type='submit' className='w-full mt-4 bg-primary text-white'>
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
