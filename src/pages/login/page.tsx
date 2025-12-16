import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // login(token, user)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post(
        'https://restaurant-be-400174736012.asia-southeast2.run.app/api/auth/login',
        { email, password }
      );

      if (res.data.success) {
        const { token, user } = res.data.data;

        // ✅ FIX UTAMA — SESUAI AuthContext
        login(token, user);

        navigate('/home');
      } else {
        setErrorMsg(res.data.message || 'Invalid email or password');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Login failed');
      } else if (err instanceof Error) {
        setErrorMsg(err.message || 'Login failed');
      } else {
        setErrorMsg('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col md:flex-row bg-white'>
      {/* LEFT IMAGE */}
      <div className='hidden md:block md:w-1/2'>
        <img
          src='/image/food-bg.png'
          alt='food background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* RIGHT SIDE */}
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

          <h2 className='text-3xl font-bold mb-2'>Welcome Back</h2>
          <p className='text-gray-500 mb-6'>Good to see you again! Let’s eat</p>

          {/* TABS */}
          <div className='flex border rounded-full overflow-hidden mb-6'>
            <button
              type='button'
              className='w-1/2 py-2 font-semibold bg-primary text-white'
            >
              Sign in
            </button>
            <button
              type='button'
              className='w-1/2 py-2 font-semibold bg-gray-200'
              onClick={() => navigate('/register')}
            >
              Sign up
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Email</label>
              <input
                type='email'
                className='border rounded-xl px-4 py-2 w-full'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Password</label>
              <div className='relative'>
                <input
                  type={showPass ? 'text' : 'password'}
                  className='border rounded-xl px-4 py-2 w-full'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPass(!showPass)}
                  className='absolute right-3 top-2.5 text-gray-500'
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember' className='text-sm'>
                Remember Me
              </label>
            </div>

            {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}

            <Button
              type='submit'
              variant='default'
              size='lg'
              className='w-full mt-4 bg-primary text-white'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
