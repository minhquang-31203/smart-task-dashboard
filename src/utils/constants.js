// ==========================================
// File chứa các hằng số (constants) dùng chung cho toàn dự án
// Giúp đồng bộ dữ liệu và tránh gõ sai chữ (typo) khi code
// ==========================================

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Map trạng thái sang tiếng Việt để hiển thị ra UI
export const STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'Chờ xử lý',
  [TASK_STATUS.IN_PROGRESS]: 'Đang thực hiện',
  [TASK_STATUS.DONE]: 'Hoàn thành',
};

// Map độ ưu tiên sang tiếng Việt
export const PRIORITY_LABELS = {
  [TASK_PRIORITY.HIGH]: 'Cao',
  [TASK_PRIORITY.MEDIUM]: 'Trung bình',
  [TASK_PRIORITY.LOW]: 'Thấp',
};

// Icon tương ứng với độ ưu tiên
export const PRIORITY_ICONS = {
  [TASK_PRIORITY.HIGH]: '🔴',
  [TASK_PRIORITY.MEDIUM]: '🟡',
  [TASK_PRIORITY.LOW]: '🟢',
};

// Class/Biến màu sắc CSS cho độ ưu tiên
export const PRIORITY_COLORS = {
  [TASK_PRIORITY.HIGH]: 'var(--priority-high)',
  [TASK_PRIORITY.MEDIUM]: 'var(--priority-medium)',
  [TASK_PRIORITY.LOW]: 'var(--priority-low)',
};

// Class/Biến màu sắc CSS cho trạng thái
export const STATUS_COLORS = {
  [TASK_STATUS.TODO]: 'var(--status-todo)',
  [TASK_STATUS.IN_PROGRESS]: 'var(--status-progress)',
  [TASK_STATUS.DONE]: 'var(--status-done)',
};

// Các quyền của người dùng (Roles)
export const ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
};
