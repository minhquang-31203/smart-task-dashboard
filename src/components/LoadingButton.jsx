/**
 * Nút bấm (Button) có tích hợp hiệu ứng tải (Loading spinner).
 * Giúp ngăn người dùng click nhiều lần (spam) trong khi chờ gọi API.
 */
export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button className="btn btn-primary" disabled={loading} {...props}>
      {loading ? (
        <span className="loading-spinner-inline">
          <span className="spinner-dot" />
          Đang xử lý...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
