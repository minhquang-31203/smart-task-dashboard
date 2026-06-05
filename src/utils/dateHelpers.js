// ==========================================
// Các hàm tiện ích để xử lý Ngày tháng (Date)
// ==========================================

/**
 * Trả về ngày hôm nay dưới định dạng chuỗi YYYY-MM-DD
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Kiểm tra xem một ngày đã qua (quá hạn) hay chưa
 * @param {string} dateStr - Ví dụ: "2026-06-10"
 * @returns {boolean} - true nếu đã quá hạn, false nếu chưa
 */
export function isOverdue(dateStr) {
  return new Date(dateStr) < new Date();
}

/**
 * So sánh 2 chuỗi ngày tháng để dùng cho việc sắp xếp (sort) mảng
 * @param {'asc'|'desc'} order - 'asc' là tăng dần, 'desc' là giảm dần
 */
export function compareDates(a, b, order = 'asc') {
  const diff = new Date(a) - new Date(b);
  return order === 'asc' ? diff : -diff;
}

/**
 * Trả về câu chào dựa theo giờ hiện tại trong ngày
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

/**
 * Định dạng chuỗi ngày tháng (VD: "2026-06-10") sang chuẩn hiển thị của Việt Nam (VD: "10/06/2026")
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
