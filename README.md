## Ghi chú về các file Utils
### folder Utils
### constants.js
Chú thích rõ các biến lưu trữ trạng thái (status), độ ưu tiên (priority), mã màu sắc và quyền hạn (roles).
### dateHelpers.js
Giải thích các hàm kiểm tra quá hạn (isOverdue), so sánh ngày để sắp xếp (compareDates) và format ngày tháng.
### taskHelpers.js
Ghi rõ mục đích của các hàm lọc (filter), sắp xếp (sort) và tính toán thống kê (computeTaskStats) cho công việc.

### folder Hooks
### useClickOutside.js
Hook dùng để phát hiện click chuột ra ngoài (rất hữu ích khi làm Popup, Modal, Dropdown).
### useDebounce.js
Hook trì hoãn cập nhật (chống gọi API liên tục khi gõ phím tìm kiếm).
### useDocumentTitle.js
Hook giúp thay đổi tiêu đề (title) của thẻ trình duyệt tự động.
### useFetch.js
Hook để lấy dữ liệu GET từ API, tự động quản lý trạng thái loading và error.
### useFormValidation.js
Hook xử lý việc xác thực Form dùng thư viện Zod.
### useLocalStorage.js
Hook lưu trữ state thẳng xuống ổ cứng trình duyệt để f5 không bị mất dữ liệu.
### useMutation.js
Hook dùng cho các hành động thay đổi dữ liệu (như Thêm, Sửa, Xóa).
### useToggle.js
Hook bật/tắt (true/false) đơn giản cho Menu/Sidebar.

### folder Contexts
### AuthContext.jsx
Giải thích luồng quản lý người dùng (đăng nhập, đăng ký, đăng xuất) và cách sử dụng localStorage để không bị văng ra ngoài khi F5.
### ThemeContext.jsx
Chú thích cách đổi chế độ Sáng/Tối (Light/Dark mode) và cập nhật thẳng vào thẻ <html> qua data-theme.
### ToastContext.jsx
Hướng dẫn cách tạo Context hiển thị các bong bóng thông báo (Toast popup) như Báo lỗi, Báo thành công ở góc màn hình và tự động biến mất sau vài giây.

### folder Api
### deleteJson.js, patchJson.js, postJson.js, putJson.js
Giải thích ý nghĩa và cách hoạt động của các phương thức gọi API phổ biến.

### tasksApi.js
Các hàm giả lập thao tác CRUD (Tạo, Đọc, Sửa, Xóa) cho danh sách Công việc.

### usersApi.js
Xử lý logic Đăng nhập, Đăng ký và Lấy danh sách thành viên (có chú ý bảo mật không trả về password).

### folder Reducers
### tasksReducer.js
Chứa lõi logic (sử dụng `useReducer`) để quản lý trạng thái phức tạp của danh sách công việc (thêm, sửa, xóa, hiển thị loading, báo lỗi) thay vì phải dùng nhiều `useState` lắt nhắt.

### folder Components
### EmptyState.jsx
Giao diện khi không có dữ liệu (Ví dụ: Không tìm thấy công việc).
### FormField.jsx
Một thẻ bọc (wrapper) rất hay để tự động hiển thị Nhãn (Label) và Thông báo lỗi ở dưới các ô nhập liệu.
### Layout.jsx & Navbar.jsx
Khung xương trang web (Thanh menu trên cùng và phần nội dung bên dưới).
### MessageAlert.jsx & LoadingButton.jsx
Nút bấm có hiệu ứng xoay xoay khi đang tải, và khung thông báo (Alert) có thể tự động tắt.
### Các Route bảo vệ (ProtectedRoute, PublicRoute, RoleRoute)
Các "chốt chặn" để đá người dùng văng ra ngoài nếu họ chưa đăng nhập hoặc không có quyền Admin.
### Bộ ba Quản lý Công việc (TaskCard, TaskList, TaskFilters, TaskStats)
Giải thích luồng hoạt động từ ô tìm kiếm, đến việc lọc danh sách (useMemo để tối ưu) và in ra từng thẻ công việc.

### folder Pages
#### DashboardPage.jsx
Giải thích cách trang Tổng quan lấy dữ liệu thông qua hàm loadTasks() và phân chia giao diện thành "Công việc của tôi" và "Công việc gần đây".
#### TasksPage.jsx
Giải thích cách áp dụng tính năng tìm kiếm có độ trễ (useDebounce để không bị lag khi gõ) và cách quản lý trạng thái tải trang.
#### CreateTaskPage.jsx & EditTaskPage.jsx
Chú thích chi tiết luồng xử lý Form: từ lúc nhập liệu -> kiểm tra tính hợp lệ bằng zod schema -> gọi API lưu trữ -> chuyển hướng quay về trang danh sách.
#### LoginPage.jsx & RegisterPage.jsx
Cách quản lý Form đăng nhập/đăng ký bằng 1 object state chung thay vì chia lắt nhắt, và cách chặn trình duyệt tự động hiển thị popup báo lỗi HTML5 mặc định (dùng thuộc tính noValidate).
#### UnauthorizedPage.jsx
Trang thông báo lỗi 403 (Không có quyền) hiển thị khi người dùng cố truy cập vào trang Admin nhưng không đủ quyền.
#### ErrorPage.jsx
Trang thông báo lỗi chung (404 Not Found, 500 Internal Server Error) với hình ảnh động và nút thử lại.