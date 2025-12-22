import React from 'react';
import { SearchProvider } from '@/context/SearchProvider';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default RootLayout;
