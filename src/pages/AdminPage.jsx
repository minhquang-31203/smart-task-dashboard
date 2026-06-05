import { useState, useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchUsers } from '../api/usersApi';
import { fetchTasks } from '../api/tasksApi';
import { computeTaskStats } from '../utils/taskHelpers';

export default function AdminPage() {
  useDocumentTitle('Bảng quản trị');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [u, t] = await Promise.all([fetchUsers(), fetchTasks()]);
        setUsers(u);
        setTasks(t);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const roleLabels = {
    admin: 'Quản trị viên',
    member: 'Thành viên',
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="spinner" />
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page" id="admin-page">
      <div className="page-header">
        <h1 className="page-title">🛡️ Bảng quản trị</h1>
        <p className="page-subtitle">Quản lý thành viên nhóm và giám sát toàn bộ công việc.</p>
      </div>

      <div className="admin-grid">
        <section className="admin-section">
          <h2 className="section-title">👥 Thành viên nhóm ({users.length})</h2>
          <div className="table-container">
            <table className="data-table" id="users-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Họ tên</th>
                  <th>Tên đăng nhập</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Ngày tham gia</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.avatar}</td>
                    <td>{u.fullName}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge badge--role-${u.role}`}>
                        {roleLabels[u.role] || u.role}
                      </span>
                    </td>
                    <td>{u.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2 className="section-title">📊 Tổng quan công việc</h2>
          {(() => {
            const stats = computeTaskStats(tasks);
            return (
              <div className="admin-stats">
                <div className="stat-card">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Tổng công việc</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value" style={{ color: 'var(--status-done)' }}>
                    {stats.done}
                  </span>
                  <span className="stat-label">Đã hoàn thành</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value" style={{ color: 'var(--priority-high)' }}>
                    {stats.highPriority}
                  </span>
                  <span className="stat-label">Ưu tiên cao chưa làm</span>
                </div>
              </div>
            );
          })()}
        </section>
      </div>
    </div>
  );
}
