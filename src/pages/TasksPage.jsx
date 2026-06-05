import { useEffect, useReducer, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../contexts/ToastContext';
import { fetchTasks, deleteTask } from '../api/tasksApi';
import { tasksReducer, initialTasksState, ACTIONS } from '../reducers/tasksReducer';
import TaskStats from '../components/TaskStats';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';

/**
 * Trang Danh sách toàn bộ Công việc
 */
export default function TasksPage() {
  useDocumentTitle('Công việc');
  const toast = useToast();
  
  // Dùng useReducer để quản lý danh sách tasks từ API
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);
  
  // Các state lưu trữ giá trị của bộ lọc (Filter)
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  // Debounce chữ tìm kiếm (Tránh giật lag, đợi gõ xong mới bắt đầu lọc)
  const debouncedSearch = useDebounce(search);

  // Hàm tải dữ liệu
  const loadTasks = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const tasks = await fetchTasks();
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Hàm xử lý Xóa task
  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteTask(id); // Gọi API xóa
        dispatch({ type: ACTIONS.DELETE_TASK, payload: id }); // Xóa khỏi giao diện
        toast.success('Đã xoá công việc thành công!');
      } catch (err) {
        toast.error(err.message || 'Xoá công việc thất bại');
      }
    },
    [toast]
  );

  return (
    <div className="page tasks-page" id="tasks-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">📋 Tất cả công việc</h1>
          <p className="page-subtitle">
            Quản lý và theo dõi toàn bộ công việc của nhóm.
          </p>
        </div>
        <Link to="/tasks/create" className="btn btn-primary" id="tasks-create-btn">
          ➕ Tạo mới
        </Link>
      </div>

      {state.loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Đang tải công việc...</p>
        </div>
      ) : (
        <>
          {/* Thanh thống kê */}
          <TaskStats tasks={state.tasks} />

          {/* Thanh công cụ Bộ lọc (truyền state và hàm setState xuống Component con) */}
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          {/* Hiển thị danh sách thẻ. Việc áp dụng bộ lọc được xử lý tối ưu bên trong TaskList */}
          <TaskList
            tasks={state.tasks}
            search={debouncedSearch}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            sortOrder={sortOrder}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
