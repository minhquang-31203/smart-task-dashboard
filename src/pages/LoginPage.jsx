import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFormValidation } from '../hooks/useFormValidation';
import { loginSchema } from '../validations/schemas';
import FormField, { inputClass } from '../components/FormField';
import LoadingButton from '../components/LoadingButton';

/**
 * Trang Đăng nhập
 */
export default function LoginPage() {
  useDocumentTitle('Đăng nhập');
  
  const { login, loading } = useAuth(); // Lấy hàm login từ Context
  const toast = useToast();
  
  // Gọi hook kiểm tra lỗi nhập liệu theo cấu trúc của loginSchema
  const { errors, validate, clearField } = useFormValidation(loginSchema);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự động load lại trang khi bấm Submit
    
    // Kiểm tra dữ liệu trước khi gửi
    const data = validate({ username, password });
    if (!data) return; // Nếu có lỗi thì dừng lại
    
    try {
      await login(data.username, data.password); // Gọi hàm đăng nhập
      toast.success('Đăng nhập thành công!');
    } catch (err) {
      toast.error(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">⚡</span>
          <h1 className="auth-title">Chào mừng trở lại</h1>
          <p className="auth-subtitle">Đăng nhập vào Smart Task Dashboard</p>
        </div>

        {/* noValidate để tắt thông báo lỗi mặc định xấu xí của trình duyệt HTML5 */}
        <form className="auth-form" onSubmit={handleSubmit} id="login-form" noValidate>
          <FormField label="Tên đăng nhập" htmlFor="username" error={errors.username}>
            <input
              id="username"
              type="text"
              className={inputClass(errors.username)}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearField('username'); // Tự động xóa chữ báo lỗi khi user bắt đầu gõ lại
              }}
            />
          </FormField>

          <FormField label="Mật khẩu" htmlFor="password" error={errors.password}>
            <input
              id="password"
              type="password"
              className={inputClass(errors.password)}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearField('password');
              }}
            />
          </FormField>

          <LoadingButton loading={loading} type="submit" id="login-submit">
            Đăng nhập
          </LoadingButton>
        </form>

        <p className="auth-footer">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>

        {/* Gợi ý tài khoản mẫu để test nhanh */}
        <div className="auth-demo">
          <p className="demo-title">Tài khoản demo</p>
          <div className="demo-accounts">
            <code>admin / admin123</code>
            <code>member / member123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
