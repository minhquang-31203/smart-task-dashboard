import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';

/**
 * Thanh điều hướng ngang (Navigation Bar) nằm trên cùng của ứng dụng.
 */
export default function Navbar() {
  // Lấy trạng thái từ các Context
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const navigate = useNavigate(); // Hook chuyển trang
  const toast = useToast();       // Hook hiển thị thông báo góc

  // Xử lý khi bấm nút Đăng xuất
  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    navigate('/login'); // Đá về trang đăng nhập
  };

  return (
    <nav className="navbar" id="main-navbar">
      {/* Logo và tên ứng dụng */}
      <div className="navbar-brand">
        <span className="navbar-logo">⚡</span>
        <span className="navbar-title">SmartTask</span>
      </div>

      {/* Các đường link chính */}
      <div className="navbar-links">
        {/* Dùng NavLink thay cho <a> để Router tự động bắt sự kiện mà không cần load lại trang */}
        <NavLink to="/dashboard" className="nav-link" id="nav-dashboard">
          📊 Tổng quan
        </NavLink>
        <NavLink to="/tasks" className="nav-link" id="nav-tasks">
          📋 Công việc
        </NavLink>
        <NavLink to="/tasks/create" className="nav-link" id="nav-create-task">
          ➕ Tạo công việc
        </NavLink>
        {/* Chỉ hiển thị nút Quản trị nếu user có quyền Admin */}
        {isAdmin && (
          <NavLink to="/admin" className="nav-link" id="nav-admin">
            🛡️ Quản trị
          </NavLink>
        )}
      </div>

      {/* Khu vực bên phải (Avatar, nút Theme, nút Đăng xuất) */}
      <div className="navbar-right">
        {/* Nút bật/tắt giao diện Tối/Sáng */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title="Chuyển đổi giao diện"
          id="theme-toggle"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Thông tin User */}
        <NavLink to="/profile" className="nav-link nav-user" id="nav-profile">
          <span className="user-avatar">{user?.avatar}</span>
          <span className="user-name">{user?.fullName}</span>
        </NavLink>

        {/* Nút đăng xuất */}
        <button
          className="btn btn-sm btn-outline"
          onClick={handleLogout}
          id="logout-btn"
        >
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
