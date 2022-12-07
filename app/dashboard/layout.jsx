import 'react-tagsinput/react-tagsinput.css';
import DashboardNavbar from './navbar';

export default function DashboardLayout({ children }) {
  return (
    <main>
      <div className="bg-white shadow w-full my-[100px] container rounded h-full clear-both pb-3">
        <DashboardNavbar />
        <div className="container">
          <div className="row">{children}</div>
        </div>
      </div>
    </main>
  );
}
