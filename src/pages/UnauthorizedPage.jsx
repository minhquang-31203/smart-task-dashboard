import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function UnauthorizedPage() {
  useDocumentTitle('Từ chối truy cập');

  return (
    <div className="page error-page" id="unauthorized-page">
      <div className="error-card">
        <span className="error-icon">🚫</span>
        <h1 className="error-title">403 — Không có quyền</h1>
        <p className="error-message">
          Bạn không có quyền hạn cần thiết để truy cập trang này.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          ← Quay lại Tổng quan
        </Link>
      </div>
    </div>
  );
}
