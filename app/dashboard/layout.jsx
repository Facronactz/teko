import 'react-tagsinput/react-tagsinput.css';
import DashboardNavbar from './navbar';

export default function DashboardLayout({ children }) {
  return (
    <main>
      <div className="bg-white shadow m-3 rounded pb-3">
        <DashboardNavbar />
        <div className="flex">
          {children}
        </div>
      </div>
    </main>
  );
}
