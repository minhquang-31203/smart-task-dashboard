/**
 * Component hiển thị trạng thái trống (khi không có dữ liệu).
 * Dùng cho danh sách rỗng, không tìm thấy kết quả, v.v.
 * @param {string} icon - Biểu tượng (Emoji hoặc Icon)
 * @param {string} title - Tiêu đề chính
 * @param {string} message - Lời khuyên/giải thích phụ
 * @param {ReactNode} action - Nút bấm hành động (ví dụ: Tạo mới)
 */
export default function EmptyState({ icon = '📭', title, message, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">{icon}</span>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && action}
    </div>
  );
}
