import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MainLayout({ children }) {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main className={`min-h-screen ${!hideLayout ? 'mt-22' : ''}`}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
