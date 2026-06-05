import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Component bảo vệ đường dẫn (Route).
 * Bắt buộc người dùng PHẢI ĐĂNG NHẬP thì mới được xem nội dung bên trong.
 * Nếu chưa đăng nhập, tự động đá văng ra trang /login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // replace để không lưu lịch sử quay lại trang cũ
  }

  return children; // Cho phép render component con
}
