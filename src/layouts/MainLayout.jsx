import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';


export default function MainLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  return (
    <>
      <Header currentPage={currentPath} />
      <main>{children}</main>
    </>
  );
}