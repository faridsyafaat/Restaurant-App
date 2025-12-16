import { Routes, Route } from 'react-router-dom';
import HomeBefore from '@/pages/homebefore/HomeBefore';
import LoginPage from '@/pages/login/page';
import RegisterPage from '@/pages/register/page';
import HomeAfter from '@/pages/homeafter/HomeAfter';
import RestaurantDetail from '@/pages/restaurant/RestaurantDetail';
import MyCart from '@/pages/MyCart/MyCart';
import CategoryPage from '@/pages/category/CategoryPage';
import CheckoutPage from '@/pages/checkout/CheckoutPage';
import PaymentSuccessPage from '@/pages/paymentsuccess/PaymentSuccessPage';
import MyOrdersPage from '@/pages/my-orders/MyOrdersPage';
import ReviewPage from '@/components/review/ReviewPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import EditProfilePage from '@/components/profile/EditProfilePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomeBefore />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<HomeAfter />} />
      <Route path='/category/:slug' element={<CategoryPage />} />
      <Route path='/restaurant/:id' element={<RestaurantDetail />} />
      <Route path='/mycart' element={<MyCart />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/payment-success' element={<PaymentSuccessPage />} />
      <Route path='/my-orders' element={<MyOrdersPage />} />
      <Route path='/review' element={<ReviewPage />} />

      {/* ✅ PROFILE */}
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/profile/edit' element={<EditProfilePage />} />
    </Routes>
  );
}
