import { useEffect, useReducer, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchTasks } from '../api/tasksApi';
import { tasksReducer, initialTasksState, ACTIONS } from '../reducers/tasksReducer';
import { TASK_STATUS, STATUS_LABELS } from '../utils/constants';
import { getGreeting } from '../utils/dateHelpers';
import TaskStats from '../components/TaskStats';

/**
 * Trang Tổng quan (Dashboard)
 * Hiển thị các thống kê công việc và các công việc được giao cho user hiện tại.
 */
export default function DashboardPage() {
  useDocumentTitle('Tổng quan'); // Đổi tiêu đề tab trình duyệt
  
  const { user } = useAuth(); // Lấy thông tin người đang đăng nhập
  // Sử dụng useReducer thay cho useState để quản lý state phức tạp (danh sách tasks, loading, error)
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);
  const greeting = getGreeting(); // Lấy câu chào theo buổi sáng/chiều/tối

  // Hàm tải dữ liệu công việc từ API
  const loadTasks = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true }); // Bật loading
    try {
      const tasks = await fetchTasks();
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks }); // Lưu dữ liệu vào state
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  }, []);

  // Chạy loadTasks() lần đầu tiên khi mở trang
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Lấy ra 5 task mới nhất
  const recentTasks = state.tasks.slice(0, 5);
  // Lọc ra các task được giao cho chính User này và chưa hoàn thành
  const myTasks = state.tasks.filter(
    (t) => t.assignee === user?.fullName && t.status !== TASK_STATUS.DONE
  );

  return (
    <div className="page dashboard-page" id="dashboard-page">
      {/* Tiêu đề trang */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {greeting}, {user?.fullName} {user?.avatar}
          </h1>
          <p className="page-subtitle">
            Đây là tổng quan công việc của bạn hôm nay.
          </p>
        </div>
        <Link to="/tasks/create" className="btn btn-primary" id="dashboard-create-task">
          ➕ Tạo công việc
        </Link>
      </div>

      {/* Hiển thị Loading hoặc Dữ liệu */}
      {state.loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {/* Component thống kê số lượng */}
          <TaskStats tasks={state.tasks} />

          <div className="dashboard-grid">
            {/* Cột 1: Công việc của tôi */}
            <section className="dashboard-section">
              <h2 className="section-title">📌 Công việc của tôi ({myTasks.length})</h2>
              {myTasks.length === 0 ? (
                <p className="text-muted">Không có công việc nào được giao cho bạn.</p>
              ) : (
                <ul className="simple-task-list">
                  {myTasks.map((task) => (
                    <li key={task.id} className="simple-task-item">
                      <Link to={`/tasks/edit/${task.id}`} className="simple-task-link">
                        <span className={`dot dot--${task.priority}`} />
                        <span className="simple-task-title">{task.title}</span>
                        <span className={`badge badge--${task.status}`}>
                          {STATUS_LABELS[task.status]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Cột 2: Công việc vừa tạo gần đây */}
            <section className="dashboard-section">
              <h2 className="section-title">🕐 Công việc gần đây</h2>
              <ul className="simple-task-list">
                {recentTasks.map((task) => (
                  <li key={task.id} className="simple-task-item">
                    <Link to={`/tasks/edit/${task.id}`} className="simple-task-link">
                      <span className={`dot dot--${task.priority}`} />
                      <span className="simple-task-title">{task.title}</span>
                      <span className="simple-task-date">{task.dueDate}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
