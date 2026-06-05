// Các tên hành động (Actions) được định nghĩa dưới dạng hằng số
// Việc này giúp tránh gõ sai chữ (typo) khi gửi action đi
export const ACTIONS = {
  SET_TASKS: 'SET_TASKS',       // Gán toàn bộ danh sách công việc
  ADD_TASK: 'ADD_TASK',         // Thêm một công việc mới
  UPDATE_TASK: 'UPDATE_TASK',   // Cập nhật công việc hiện tại
  DELETE_TASK: 'DELETE_TASK',   // Xóa một công việc
  SET_LOADING: 'SET_LOADING',   // Bật/Tắt trạng thái đang tải (loading spinner)
  SET_ERROR: 'SET_ERROR',       // Cập nhật thông báo lỗi nếu có
};

// Trạng thái khởi tạo mặc định (Initial State)
export const initialTasksState = {
  tasks: [],      // Danh sách công việc ban đầu rỗng
  loading: false, // Chưa tải dữ liệu
  error: null,    // Không có lỗi
};

/**
 * Hàm Reducer: Nhận vào state hiện tại và 1 action, sau đó trả về state mới.
 * Đây là lõi logic quản lý trạng thái phức tạp thay cho việc dùng nhiều useState rời rạc.
 * @param {Object} state - Trạng thái hiện tại của danh sách task
 * @param {Object} action - Đối tượng chứa { type: Tên_Hành_Động, payload: Dữ_Liệu_Kèm_Theo }
 */
export function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      // Khi lấy xong dữ liệu từ API: cập nhật mảng tasks, tắt loading, xóa sạch lỗi cũ
      return { ...state, tasks: action.payload, loading: false, error: null };

    case ACTIONS.ADD_TASK:
      // Thêm task mới (payload) lên ĐẦU mảng danh sách cũ
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      };

    case ACTIONS.UPDATE_TASK:
      // Dùng map() tìm task cần sửa qua ID, trộn dữ liệu cập nhật (payload) vào task đó
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        loading: false,
      };

    case ACTIONS.DELETE_TASK:
      // Dùng filter() để lọc bỏ task có ID trùng với payload ra khỏi mảng
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        loading: false,
      };

    case ACTIONS.SET_LOADING:
      // Cập nhật trạng thái loading (bật hoặc tắt)
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      // Cập nhật thông báo lỗi và tắt luôn trạng thái loading
      return { ...state, error: action.payload, loading: false };

    default:
      // Nếu gửi action không tồn tại, thì giữ nguyên state cũ không làm gì cả
      return state;
  }
}
