import { useEffect, useCallback } from 'react';

/**
 * Component Modal xác nhận — thay thế cho window.confirm().
 * Hiển thị hộp thoại đẹp, hỗ trợ dark mode, có animation mượt.
 *
 * Props:
 *  - isOpen      : boolean — có đang hiển thị hay không
 *  - title       : string  — tiêu đề modal (VD: "Xác nhận xoá")
 *  - message     : string  — nội dung thông báo
 *  - confirmText : string  — text nút xác nhận (mặc định: "Xác nhận")
 *  - cancelText  : string  — text nút huỷ (mặc định: "Huỷ")
 *  - variant     : 'danger' | 'warning' | 'info' — kiểu hiển thị (mặc định: 'danger')
 *  - onConfirm   : () => void — callback khi bấm Xác nhận
 *  - onCancel    : () => void — callback khi bấm Huỷ hoặc đóng modal
 */
export default function ConfirmModal({
  isOpen,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Huỷ',
  variant = 'danger',
  onConfirm,
  onCancel,
}) {
  // Đóng modal khi bấm phím Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCancel?.();
      }
    },
    [onCancel]
  );

  // Gắn / gỡ sự kiện bàn phím và khoá scroll body khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Không render gì nếu modal đang đóng
  if (!isOpen) return null;

  // Icon tương ứng với từng variant
  const icons = {
    danger: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
  };

  return (
    // Lớp phủ nền mờ — bấm vào nền sẽ đóng modal
    <div
      className="confirm-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
    >
      {/* Hộp thoại chính — ngăn sự kiện click lan ra overlay */}
      <div
        className={`confirm-modal confirm-modal--${variant}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + Tiêu đề */}
        <div className="confirm-modal-header">
          <span className="confirm-modal-icon">{icons[variant]}</span>
          <h3 className="confirm-modal-title" id="confirm-modal-title">
            {title}
          </h3>
        </div>

        {/* Nội dung thông báo */}
        <p className="confirm-modal-message" id="confirm-modal-message">
          {message}
        </p>

        {/* Các nút hành động */}
        <div className="confirm-modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            className={`btn ${variant === 'danger' ? 'btn-confirm-danger' : variant === 'warning' ? 'btn-confirm-warning' : 'btn-primary'}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
