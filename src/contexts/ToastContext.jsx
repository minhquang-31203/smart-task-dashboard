import { createContext, useContext, useState, useCallback, useMemo } from 'react';

// 1. Tạo Context để lưu trữ và gọi thông báo (Toast notifications)
const ToastContext = createContext(null);

let toastId = 0; // Biến đếm để tạo ID duy nhất cho mỗi thông báo

/**
 * ToastProvider: Quản lý việc hiển thị các thông báo popup trên màn hình.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]); // Mảng chứa danh sách các thông báo đang hiển thị

  // Hàm cốt lõi để thêm 1 thông báo mới vào màn hình
  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    // Thêm thông báo mới vào cuối mảng
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Đặt giờ để tự động xóa thông báo sau `duration` mili-giây
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  // Hàm xóa thủ công thông báo (khi bấm dấu x)
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cung cấp các hàm tiện ích gọi nhanh từng loại thông báo
  const toast = useMemo(
    () => ({
      success: (msg) => addToast(msg, 'success', 5000), // Thành công (Xanh lá)
      error: (msg) => addToast(msg, 'error', 7000),     // Lỗi (Đỏ)
      warning: (msg) => addToast(msg, 'warning', 6000), // Cảnh báo (Vàng)
      info: (msg) => addToast(msg, 'info', 5000),       // Thông tin (Xanh dương)
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Khu vực render giao diện hiển thị các thông báo ở góc màn hình */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            <span className="toast-icon">
              {t.type === 'success' && '✅'}
              {t.type === 'error' && '❌'}
              {t.type === 'warning' && '⚠️'}
              {t.type === 'info' && 'ℹ️'}
            </span>
            <span className="toast-message">{t.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(t.id)}
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook tùy chỉnh để hiển thị thông báo.
 * Ví dụ: 
 * const toast = useToast();
 * toast.success("Lưu thành công!");
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
