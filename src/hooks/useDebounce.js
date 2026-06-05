import { useState, useEffect } from 'react';

/**
 * Hook trì hoãn cập nhật giá trị (Debounce).
 * Giúp giảm số lần gọi API khi người dùng gõ phím liên tục vào ô tìm kiếm.
 * @param {any} value - Giá trị cần trì hoãn
 * @param {number} delay - Thời gian chờ (ms), mặc định 300ms
 * @returns {any} - Giá trị sau khi đã trì hoãn
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt bộ đếm giờ: sau khoảng 'delay' thì mới cập nhật giá trị
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Nếu 'value' thay đổi trước khi hết giờ, hủy bộ đếm cũ và đếm lại từ đầu
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
