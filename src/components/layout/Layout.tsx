import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar';
import { Props } from '@/types/types';
import { ThemeContext } from '@/contexts/ThemeContext';

const Layout = ({ children }: Props) => {
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    console.log(isDarkMode, 'main');
  }, [isDarkMode]);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
