import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MainLayout({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/admin"].includes(
    location.pathname,
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - chiều cao tự động */}
      {!hideLayout && <Header />}

      {/* Main content - chiếm hết không gian còn lại */}
      <main className={`flex-1 ${!hideLayout ? 'mt-22' : ''}`}>{children}</main>

      {/* Footer - tự động xuống dưới cùng */}
      {!hideLayout && <Footer />}
    </div>
  );
}
