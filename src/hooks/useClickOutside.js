import { useEffect, useRef } from 'react';

/**
 * Hook phát hiện sự kiện click chuột ra ngoài một phần tử (element).
 * Rất hữu ích để đóng dropdown, modal, popup khi bấm ra ngoài.
 * @param {Function} handler - Hàm sẽ chạy khi click ra ngoài
 * @returns {React.RefObject} - Gắn ref này vào phần tử cần theo dõi
 */
export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      // Nếu có ref và điểm click chuột không nằm trong ref đó
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    // Lắng nghe sự kiện click
    document.addEventListener('mousedown', handleClick);
    // Dọn dẹp sự kiện khi component unmount
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handler]);

  return ref;
}
