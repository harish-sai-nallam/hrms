import { Outlet } from 'react-router-dom';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/Footer';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
