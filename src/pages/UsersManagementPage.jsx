import { useState, useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchUsers } from '../api/usersApi';

export default function UsersManagementPage() {
  useDocumentTitle('Quản lý thành viên');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false));
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
          <p>Đang tải danh sách...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page" id="users-management-page">
      <div className="page-header">
        <h1 className="page-title">👥 Quản lý thành viên</h1>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Họ tên</th>
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
    </div>
  );
}
