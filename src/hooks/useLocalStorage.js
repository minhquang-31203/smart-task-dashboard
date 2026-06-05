import { useState, useCallback } from 'react';

/**
 * Hook lưu trữ dữ liệu vào Local Storage của trình duyệt (Dữ liệu không mất khi F5).
 * Hoạt động giống như useState, nhưng tự động lưu xuống ổ cứng.
 * @param {string} key - Tên khóa lưu trong localStorage (vd: 'smarttask_user')
 * @param {any} initialValue - Giá trị mặc định nếu chưa có
 */
export function useLocalStorage(key, initialValue) {
  // Khởi tạo state bằng cách đọc từ localStorage trước tiên
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Hàm cập nhật dữ liệu: Cập nhật state VÀ ghi đè xuống localStorage
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('useLocalStorage error:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
