import { cn } from '../utils/classNames';

/**
 * Component bọc ngoài (Wrapper) tái sử dụng cho các ô nhập liệu (input, textarea).
 * Có chức năng tự động hiển thị nhãn (label) và thông báo lỗi (error) ngay bên dưới.
 */
export default function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {/* Component con (thường là thẻ <input> hoặc <select>) sẽ được render ở đây */}
      {children}
      {/* Nếu có lỗi sẽ hiển thị thẻ span báo lỗi */}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

/**
 * Hàm tiện ích để tự động thêm class CSS 'form-input--error' 
 * nếu trường nhập liệu đó bị lỗi.
 */
export function inputClass(error, extra = '') {
  return cn('form-input', error && 'form-input--error', extra);
}
