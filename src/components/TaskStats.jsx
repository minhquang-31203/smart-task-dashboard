import { computeTaskStats } from '../utils/taskHelpers';

/**
 * Component hiển thị Thanh thống kê (Số lượng Tổng, Đang làm, Hoàn thành...).
 */
export default function TaskStats({ tasks }) {
  // Lấy các con số thống kê từ hàm tiện ích
  const { total, todo, inProgress, done, highPriority } = computeTaskStats(tasks);

  // Định nghĩa mảng để render ra giao diện cho gọn
  const stats = [
    { label: 'Tổng cộng', value: total, color: 'var(--accent)' },
    { label: 'Chờ xử lý', value: todo, color: 'var(--status-todo)' },
    { label: 'Đang thực hiện', value: inProgress, color: 'var(--status-progress)' },
    { label: 'Hoàn thành', value: done, color: 'var(--status-done)' },
    { label: 'Ưu tiên cao', value: highPriority, color: 'var(--priority-high)' },
  ];

  return (
    <div className="task-stats">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
