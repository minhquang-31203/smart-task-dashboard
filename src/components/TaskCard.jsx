import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS_LABELS, PRIORITY_LABELS, PRIORITY_ICONS } from '../utils/constants';
import { isTaskOverdue } from '../utils/taskHelpers';
import { cn } from '../utils/classNames';
import ConfirmModal from './ConfirmModal';

/**
 * Component hiển thị một Thẻ Công việc (Task Card) riêng lẻ.
 * Dùng React.memo để tránh re-render những thẻ không thay đổi.
 */
function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();
  const overdue = isTaskOverdue(task); // Kiểm tra xem có bị trễ hạn không
  const [showConfirm, setShowConfirm] = useState(false); // State điều khiển modal xác nhận

  // Chuyển sang trang Edit khi bấm Sửa
  const handleEdit = useCallback(() => {
    navigate(`/tasks/edit/${task.id}`);
  }, [navigate, task.id]);

  // Mở modal xác nhận trước khi Xoá
  const handleDeleteClick = useCallback(() => {
    setShowConfirm(true);
  }, []);

  // Xác nhận xoá — gọi callback và đóng modal
  const handleConfirmDelete = useCallback(() => {
    onDelete?.(task?.id);
    setShowConfirm(false);
  }, [onDelete, task?.id]);

  // Huỷ xoá — đóng modal
  const handleCancelDelete = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <>
      {/* Nếu trễ hạn, thêm class 'task-card--overdue' để đổi màu cảnh báo */}
      <div className={cn('task-card', overdue && 'task-card--overdue')}>
        
        {/* Phần trên cùng: Trạng thái và Độ ưu tiên */}
        <div className="task-card-header">
          <span className={cn('task-status badge', `badge--${task.status}`)}>
            {STATUS_LABELS[task.status]}
          </span>
          <span className="task-priority" title={PRIORITY_LABELS[task.priority]}>
            {PRIORITY_ICONS[task.priority]} {PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {/* Thông tin chính */}
        <h3 className="task-card-title">{task.title}</h3>
        <p className="task-card-desc">{task.description}</p>

        {/* Các thông tin phụ */}
        <div className="task-card-meta">
          <span className="task-assignee">👤 {task.assignee}</span>
          <span className={cn('task-due', overdue && 'task-due--overdue')}>
            📅 {task.dueDate}
          </span>
        </div>

        {/* Danh sách Tags (nếu có) */}
        {task.tags?.length > 0 && (
          <div className="task-card-tags">
            {task.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {/* Nút thao tác */}
        <div className="task-card-actions">
          <button className="btn btn-sm btn-outline" onClick={handleEdit}>
            ✏️ Sửa
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDeleteClick}>
            🗑️ Xoá
          </button>
        </div>
      </div>

      {/* Modal xác nhận xoá — thay thế window.confirm */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Xác nhận xoá"
        message={`Bạn có chắc muốn xoá "${task?.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xoá"
        cancelText="Huỷ"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default memo(TaskCard);

