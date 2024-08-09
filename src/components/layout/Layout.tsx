import React from 'react';
import Navbar from '../Navbar';
import { Props } from '@/types/types';

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
