import { useState, useEffect, useCallback } from 'react';

/**
 * Hook dùng để lấy dữ liệu (Fetch Data) và quản lý trạng thái loading, error tự động.
 * Thường dùng cho các hàm GET (Lấy danh sách, lấy chi tiết).
 * @param {Function} fetchFn - Hàm gọi API lấy dữ liệu
 * @param {Array} dependencies - Mảng phụ thuộc (khi nào cần gọi lại API)
 */
export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi lại API thủ công
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  // Tự động gọi API lần đầu hoặc khi dependencies thay đổi
  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
}
