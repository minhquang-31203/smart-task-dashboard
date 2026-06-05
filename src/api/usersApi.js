import { mockUsers } from '../data/mockUsers';

// Hàm giả lập độ trễ của mạng internet (400ms)
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API Đăng nhập
 * Kiểm tra xem username và password có khớp với dữ liệu giả không
 */
export async function loginUser(username, password) {
  await delay();
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) throw new Error('Sai tài khoản hoặc mật khẩu'); // Đăng nhập thất bại
  
  // Loại bỏ trường password trước khi trả về thông tin user (để bảo mật)
  const { password: _, ...safeUser } = user;
  return safeUser;
}

/**
 * API Đăng ký tài khoản mới
 */
export async function registerUser(userData) {
  await delay();
  // Kiểm tra xem username hoặc email đã bị người khác dùng chưa
  const exists = mockUsers.find(
    (u) => u.username === userData.username || u.email === userData.email
  );
  if (exists) throw new Error('Tài khoản hoặc email đã tồn tại');
  
  // Tạo thông tin user mới
  const newUser = {
    ...userData,
    id: mockUsers.length + 1,
    role: 'member', // Mặc định người mới là thành viên thường
    avatar: '🧑',
    joinedAt: new Date().toISOString().split('T')[0],
  };
  
  mockUsers.push(newUser); // Thêm vào mảng dữ liệu giả
  
  const { password: _, ...safeUser } = newUser; // Lại loại bỏ password trước khi trả về
  return safeUser;
}

/**
 * API Lấy danh sách toàn bộ người dùng (Dành cho trang Quản lý Users của Admin)
 */
export async function fetchUsers() {
  await delay();
  // Trả về danh sách user nhưng đã dùng hàm map() để lọc bỏ password của tất cả mọi người
  return mockUsers.map(({ password, ...user }) => user);
}
