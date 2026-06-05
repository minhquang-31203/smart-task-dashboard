import { memo, useMemo, useCallback } from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { applyTaskFilters } from '../utils/taskHelpers';

/**
 * Component hiển thị Danh sách các Công việc.
 * Chịu trách nhiệm gọi hàm Lọc (applyTaskFilters) và render ra danh sách các Thẻ (TaskCard).
 */
function TaskList({ tasks, search, statusFilter, priorityFilter, sortOrder, onDelete }) {
  
  // Dùng useMemo để chỉ tính toán lại mảng filteredTasks khi nào các thông số lọc thực sự thay đổi
  // Giúp tối ưu hiệu suất, tránh giật lag khi gõ tìm kiếm.
  const filteredTasks = useMemo(
    () =>
      applyTaskFilters(tasks, {
        search,
        status: statusFilter,
        priority: priorityFilter,
        sortOrder,
      }),
    [tasks, search, statusFilter, priorityFilter, sortOrder]
  );

  const handleDelete = useCallback(
    (id) => onDelete?.(id),
    [onDelete]
  );

  // Nếu lọc xong mà không còn task nào
  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Không tìm thấy công việc"
        message="Thử điều chỉnh bộ lọc hoặc tạo một công việc mới."
      />
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        // Render từng cái thẻ
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default memo(TaskList);
