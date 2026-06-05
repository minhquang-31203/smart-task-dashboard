import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Không tìm thấy trang');

  return (
    <div className="page error-page" id="not-found-page">
      <div className="error-card">
        <span className="error-icon">🔍</span>
        <h1 className="error-title">404 — Không tìm thấy trang</h1>
        <p className="error-message">
          Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển sang địa chỉ khác.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          ← Quay lại Tổng quan
        </Link>
      </div>
    </div>
  );
}
