import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(HomeBefore, {}) }), _jsx(Route, { path: '/login', element: _jsx(LoginPage, {}) }), _jsx(Route, { path: '/register', element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: '/home', element: _jsx(HomeAfter, {}) }), _jsx(Route, { path: '/category/:slug', element: _jsx(CategoryPage, {}) }), _jsx(Route, { path: '/restaurant/:id', element: _jsx(RestaurantDetail, {}) }), _jsx(Route, { path: '/mycart', element: _jsx(MyCart, {}) }), _jsx(Route, { path: '/checkout', element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: '/payment-success', element: _jsx(PaymentSuccessPage, {}) }), _jsx(Route, { path: '/my-orders', element: _jsx(MyOrdersPage, {}) }), _jsx(Route, { path: '/review', element: _jsx(ReviewPage, {}) }), _jsx(Route, { path: '/profile', element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: '/profile/edit', element: _jsx(EditProfilePage, {}) })] }));
}
