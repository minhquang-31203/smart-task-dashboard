import { useEffect, useState } from 'react';

/**
 * Component thông báo tĩnh trên màn hình (Alert).
 * Có thể cấu hình tự động ẩn sau một khoảng thời gian.
 */
export default function MessageAlert({ type = 'info', message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  // Thiết lập bộ đếm giờ tự động đóng
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.(); // Gọi hàm callback truyền từ ngoài vào (nếu có)
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible || !message) return null;

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`alert alert-${type}`} role="alert">
      <span className="alert-icon">{icons[type]}</span>
      <span className="alert-message">{message}</span>
      <button
        className="alert-close"
        onClick={() => {
          setVisible(false);
          onClose?.(); // Đóng thủ công
        }}
        aria-label="Đóng"
      >
        ×
      </button>
    </div>
  );
}
