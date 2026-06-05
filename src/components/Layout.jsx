import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Component Bố cục chung (Layout) cho toàn bộ các trang đã đăng nhập.
 * Chứa thanh điều hướng (Navbar) ở trên cùng và nội dung động (Outlet) ở dưới.
 */
export default function Layout() {
  return (
    <div className="layout">
      {/* Thanh menu luôn cố định */}
      <Navbar />
      <main className="main-content">
        {/* React Router sẽ tự động thay thế <Outlet /> bằng Component của trang hiện tại */}
        <Outlet />
      </main>
    </div>
  );
}
