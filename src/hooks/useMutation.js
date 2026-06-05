import { useState, useCallback } from 'react';

/**
 * Hook dùng cho các hành động thay đổi dữ liệu (Thêm mới, Cập nhật, Xóa).
 * Tự động quản lý cờ trạng thái `loading` và `error`.
 * @param {Function} mutationFn - Hàm API thực hiện thao tác (VD: createTask)
 */
export function useMutation(mutationFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm kích hoạt việc gọi API
  const mutate = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(...args);
        setLoading(false);
        return result; // Trả về kết quả nếu thành công
      } catch (err) {
        setError(err.message);
        setLoading(false);
        throw err; // Ném lỗi ra ngoài để component xử lý (như hiển thị Toast)
      }
    },
    [mutationFn]
  );

  return { mutate, loading, error };
}
