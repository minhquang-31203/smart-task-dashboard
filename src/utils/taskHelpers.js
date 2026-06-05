// ==========================================
// Các hàm tiện ích xử lý logic riêng cho Công việc (Tasks)
// ==========================================

import { TASK_STATUS } from './constants';
import { isOverdue, compareDates } from './dateHelpers';

/**
 * Kiểm tra xem task có bị trễ hạn không (chưa xong + đã qua ngày kết thúc)
 */
export function isTaskOverdue(task) {
  return task.status !== TASK_STATUS.DONE && isOverdue(task.dueDate);
}

/**
 * Lọc mảng công việc dựa trên từ khóa tìm kiếm (tìm trong tiêu đề, mô tả, người làm, tag)
 */
export function filterBySearch(tasks, query) {
  if (!query) return tasks;
  const q = query.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(q))
  );
}

/**
 * Lọc mảng công việc theo trạng thái (Chờ xử lý, Đang làm, Hoàn thành)
 */
export function filterByStatus(tasks, status) {
  if (!status || status === 'all') return tasks;
  return tasks.filter((t) => t.status === status);
}

/**
 * Lọc mảng công việc theo độ ưu tiên (Cao, Trung bình, Thấp)
 */
export function filterByPriority(tasks, priority) {
  if (!priority || priority === 'all') return tasks;
  return tasks.filter((t) => t.priority === priority);
}

/**
 * Sắp xếp công việc theo ngày hết hạn (tăng dần/giảm dần)
 */
export function sortByDueDate(tasks, order = 'asc') {
  return [...tasks].sort((a, b) => compareDates(a.dueDate, b.dueDate, order));
}

/**
 * Gom tất cả các bộ lọc và sắp xếp vào 1 hàm duy nhất.
 * Thứ tự: Tìm kiếm -> Lọc trạng thái -> Lọc ưu tiên -> Sắp xếp thời gian.
 */
export function applyTaskFilters(tasks, { search, status, priority, sortOrder }) {
  let result = filterBySearch(tasks, search);
  result = filterByStatus(result, status);
  result = filterByPriority(result, priority);
  result = sortByDueDate(result, sortOrder);
  return result;
}

/**
 * Tính toán thống kê nhanh số lượng task (Tổng số, đang làm, hoàn thành, ưu tiên cao...)
 */
export function computeTaskStats(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === TASK_STATUS.TODO).length,
    inProgress: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
    done: tasks.filter((t) => t.status === TASK_STATUS.DONE).length,
    highPriority: tasks.filter(
      (t) => t.priority === 'high' && t.status !== TASK_STATUS.DONE
    ).length,
  };
}

/**
 * Chuyển chuỗi tags cách nhau bằng dấu phẩy thành một mảng sạch (bỏ khoảng trắng thừa)
 * VD: "react, js , css" -> ["react", "js", "css"]
 */
export function parseTags(tagString) {
  if (!tagString) return [];
  return tagString
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}
