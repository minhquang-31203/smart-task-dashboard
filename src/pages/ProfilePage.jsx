import { useAuth } from '../contexts/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ProfilePage() {
  useDocumentTitle('Hồ sơ cá nhân');
  const { user } = useAuth();

  const roleLabels = {
    admin: 'Quản trị viên',
    member: 'Thành viên',
  };

  const fields = [
    { label: 'Họ và tên', value: user?.fullName },
    { label: 'Tên đăng nhập', value: user?.username },
    { label: 'Email', value: user?.email },
    { label: 'Vai trò', value: roleLabels[user?.role] || user?.role },
    { label: 'Ngày tham gia', value: user?.joinedAt },
  ];

  return (
    <div className="page" id="profile-page">
      <div className="page-header">
        <h1 className="page-title">👤 Hồ sơ của tôi</h1>
      </div>
      <div className="profile-card">
        <div className="profile-avatar-section">
          <span className="profile-avatar-large">{user?.avatar}</span>
          <h2 className="profile-name">{user?.fullName}</h2>
          <span className={`badge badge--role-${user?.role}`}>
            {roleLabels[user?.role] || user?.role}
          </span>
        </div>
        <div className="profile-details">
          {fields.map((f) => (
            <div className="profile-field" key={f.label}>
              <span className="profile-field-label">{f.label}</span>
              <span className="profile-field-value">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
