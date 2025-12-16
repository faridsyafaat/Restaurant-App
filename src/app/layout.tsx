// src/app/layout.tsx
import React from 'react';
import { SearchProvider } from '@/context/SearchContext';
import './globals.css'; // tetap bisa diimport jika ada

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default RootLayout;
