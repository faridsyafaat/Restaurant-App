import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router/AppRouter';
import { CartProvider } from '@/context/CartProvider';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';
import { ApiProvider } from './context/ApiProvider';
import { AddressProvider } from '@/context/address/AddressProvider';
import './index.css';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(_jsxs(React.StrictMode, { children: [_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(ApiProvider, { children: _jsx(AuthProvider, { children: _jsx(AddressProvider, { children: _jsx(CartProvider, { children: _jsx(SearchProvider, { children: _jsx(AppRouter, {}) }) }) }) }) }) }) }), _jsx(Toaster, { position: 'top-center', toastOptions: {
                duration: 3000,
            } })] }));
