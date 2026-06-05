import { useState, useCallback } from 'react';

/**
 * Hook quản lý trạng thái Đóng/Mở (True/False).
 * Rất tiện lợi dùng cho Modal, Dropdown, Menu, Sidebar.
 * @param {boolean} initialValue - Trạng thái ban đầu (mặc định: false)
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Đảo ngược trạng thái (True <-> False)
  const toggle = useCallback(() => setValue((v) => !v), []);
  // Bật trạng thái
  const setTrue = useCallback(() => setValue(true), []);
  // Tắt trạng thái
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}
