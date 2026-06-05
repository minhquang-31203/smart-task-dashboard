import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Component xử lý đường dẫn công khai (Public Route).
 * Thường dùng cho trang Đăng nhập / Đăng ký.
 * NẾU ĐÃ ĐĂNG NHẬP RỒI, không cho xem trang đăng nhập nữa mà tự động đá vào Dashboard.
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
