import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFormValidation } from '../hooks/useFormValidation';
import { registerSchema } from '../validations/schemas';
import FormField, { inputClass } from '../components/FormField';
import LoadingButton from '../components/LoadingButton';

/**
 * Trang Đăng ký tài khoản
 */
export default function RegisterPage() {
  useDocumentTitle('Đăng ký');
  const { register, loading } = useAuth();
  const toast = useToast();
  const { errors, validate, clearField } = useFormValidation(registerSchema);
  
  // Thay vì chia ra 4 state nhỏ lắt nhắt, ta gom chung vào 1 Object để dễ quản lý
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    // Kỹ thuật cập nhật state cho Object: giữ lại các thuộc tính cũ, chỉ ghi đè cái đang thay đổi
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearField(e.target.name); // Xóa lỗi đỏ tương ứng dưới ô input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = validate(form); // Trả về null nếu có lỗi, ngược lại trả về data hợp lệ
    if (!data) return;
    
    try {
      await register(data);
      toast.success('Đăng ký thành công!');
    } catch (err) {
      toast.error(err.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">⚡</span>
          <h1 className="auth-title">Tạo tài khoản</h1>
          <p className="auth-subtitle">Tham gia cộng đồng Smart Task</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} id="register-form" noValidate>
          <FormField label="Họ và tên" htmlFor="fullName" error={errors.fullName}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={inputClass(errors.fullName)}
              placeholder="Nguyễn Văn A"
              value={form.fullName}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Tên đăng nhập" htmlFor="reg-username" error={errors.username}>
            <input
              id="reg-username"
              name="username"
              type="text"
              className={inputClass(errors.username)}
              placeholder="nguyenvana"
              value={form.username}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass(errors.email)}
              placeholder="nguyenvana@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Mật khẩu" htmlFor="reg-password" error={errors.password}>
            <input
              id="reg-password"
              name="password"
              type="password"
              className={inputClass(errors.password)}
              placeholder="Tối thiểu 6 ký tự"
              value={form.password}
              onChange={handleChange}
            />
          </FormField>

          <LoadingButton loading={loading} type="submit" id="register-submit">
            Tạo tài khoản
          </LoadingButton>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
