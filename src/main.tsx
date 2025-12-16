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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <AddressProvider>
              <CartProvider>
                <SearchProvider>
                  <AppRouter />
                </SearchProvider>
              </CartProvider>
            </AddressProvider>
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </QueryClientProvider>
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
      }}
    />
  </React.StrictMode>
);
