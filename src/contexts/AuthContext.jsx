import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { loginUser, registerUser } from '../api/usersApi';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Tạo Context để lưu trữ trạng thái đăng nhập
const AuthContext = createContext(null);

/**
 * AuthProvider: Lớp bọc ngoài cùng cung cấp thông tin User cho toàn bộ ứng dụng.
 */
export function AuthProvider({ children }) {
  // Lấy/Lưu thông tin user từ localStorage để F5 không bị mất đăng nhập
  const [user, setUser] = useLocalStorage('smarttask_user', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm xử lý đăng nhập
  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(username, password);
      setUser(userData); // Lưu thông tin user vào state & localStorage
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  // Hàm xử lý đăng ký
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  // Hàm xử lý đăng xuất
  const logout = useCallback(() => {
    setUser(null); // Xóa user khỏi state & localStorage
    setError(null);
  }, [setUser]);

  // Hàm xóa thông báo lỗi
  const clearError = useCallback(() => setError(null), []);

  // Đóng gói các giá trị để truyền xuống các component con (dùng useMemo để tối ưu hiệu suất)
  const value = useMemo(
    () => ({
      user,               // Thông tin người dùng hiện tại
      loading,            // Trạng thái đang tải gọi API
      error,              // Lỗi nếu có
      login,              // Hàm gọi đăng nhập
      register,           // Hàm gọi đăng ký
      logout,             // Hàm gọi đăng xuất
      clearError,         // Hàm xóa lỗi
      isAuthenticated: !!user,          // Cờ kiểm tra đã đăng nhập chưa
      isAdmin: user?.role === 'admin',  // Cờ kiểm tra có phải admin không
    }),
    [user, loading, error, login, register, logout, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook tùy chỉnh để lấy dữ liệu từ AuthContext nhanh gọn.
 * Ví dụ: const { user, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
