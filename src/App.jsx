import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import các Providers (những lớp bọc ngoài cùng cung cấp dữ liệu toàn cục cho toàn bộ ứng dụng)
// Ví dụ: AuthProvider quản lý đăng nhập, ThemeProvider quản lý giao diện sáng/tối
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';

// Import các thành phần (components) bảo vệ Route để kiểm soát quyền truy cập
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import RoleRoute from './components/RoleRoute';

// Import các trang (Pages) của ứng dụng
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import UsersManagementPage from './pages/UsersManagementPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    // BrowserRouter: Kích hoạt tính năng định tuyến (routing) cho ứng dụng React
    <BrowserRouter>
      {/* ThemeProvider: Quản lý giao diện, cung cấp trạng thái Sáng/Tối cho toàn bộ các components con */}
      <ThemeProvider>
        {/* AuthProvider: Cung cấp thông tin user hiện tại (đã đăng nhập hay chưa) */}
        <AuthProvider>
          {/* ToastProvider: Cung cấp các thông báo popup (Toast notifications) như "Lưu thành công", "Lỗi mạng" */}
          <ToastProvider>
            
            {/* Routes: Chứa tất cả các đường dẫn (URL) của trang web */}
            <Routes>
              
              {/* =========================================
                  1. CÁC ĐƯỜNG DẪN CÔNG KHAI (PUBLIC ROUTES) 
                  - PublicRoute sẽ kiểm tra: Nếu user đã đăng nhập rồi thì sẽ tự động đá (redirect) về trang chủ.
                  - Nếu chưa đăng nhập thì mới cho phép vào xem form Đăng nhập/Đăng ký.
                  ========================================= */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

              {/* =========================================
                  2. CÁC ĐƯỜNG DẪN ĐƯỢC BẢO VỆ (PROTECTED ROUTES) 
                  - ProtectedRoute: Sẽ kiểm tra nếu user CHƯA đăng nhập thì sẽ đá văng ra trang /login.
                  - Layout: Bọc xung quanh các trang con để hiển thị Navbar/Sidebar chung.
                  ========================================= */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                {/* Khi đường dẫn là /dashboard thì hiển thị component DashboardPage */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/create" element={<CreateTaskPage />} />
                <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users" element={<UsersManagementPage />} />

                {/* =========================================
                    3. CÁC ĐƯỜNG DẪN DÀNH CHO ADMIN (ADMIN ROUTES)
                    - RoleRoute kiểm tra quyền: Nếu user không phải là 'admin', sẽ bị chuyển hướng đến trang lỗi.
                    ========================================= */}
                <Route path="/admin" element={<RoleRoute role="admin"><AdminPage /></RoleRoute>} />
              </Route>

              {/* =========================================
                  4. CÁC TRANG BÁO LỖI VÀ CHUYỂN HƯỚNG
                  ========================================= */}
              {/* Trang hiển thị khi user vào route yêu cầu quyền admin nhưng họ chỉ là user thường */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Nếu truy cập URL gốc ('/'), tự động đổi hướng (Navigate) sang trang /dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Dấu '*' bắt mọi đường dẫn không tồn tại (Ví dụ: /xyz) -> Hiển thị trang 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
