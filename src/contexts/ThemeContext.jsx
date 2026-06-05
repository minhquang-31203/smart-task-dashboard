import { createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Tạo Context để lưu trữ trạng thái Giao diện (Sáng/Tối)
const ThemeContext = createContext(null);

/**
 * ThemeProvider: Quản lý chế độ hiển thị Sáng (light) hoặc Tối (dark).
 */
export function ThemeProvider({ children }) {
  // Đọc/Lưu theme từ localStorage (Mặc định là 'light')
  const [theme, setTheme] = useLocalStorage('smarttask_theme', 'light');

  // Mỗi khi theme thay đổi, cập nhật thuộc tính 'data-theme' vào thẻ <html> 
  // để CSS nhận diện và áp dụng màu sắc tương ứng.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Hàm chuyển đổi qua lại giữa Sáng và Tối
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // Tối ưu hiệu suất bằng useMemo
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook tùy chỉnh để sử dụng Theme.
 * Ví dụ: const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
