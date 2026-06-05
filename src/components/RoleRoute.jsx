import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Component bảo vệ đường dẫn theo Quyền (Role-based Route).
 * Ví dụ: Chỉ Admin mới được vào trang Quản lý Users.
 * @param {string} role - Tên quyền yêu cầu (VD: 'admin')
 */
export default function RoleRoute({ children, role }) {
  const { user, isAuthenticated } = useAuth();

  // Bước 1: Phải đăng nhập trước
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Bước 2: Kiểm tra xem quyền của user có khớp với quyền yêu cầu không
  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />; // Báo lỗi Không có quyền truy cập
  }

  return children; // Hợp lệ thì cho vào
}
