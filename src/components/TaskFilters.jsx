/**
 * Component hiển thị dải các ô Lọc (Filter) và Tìm kiếm (Search).
 * Nhận các state và hàm setState từ component cha (TasksPage) truyền xuống.
 */
export default function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="task-filters">
      {/* Ô tìm kiếm bằng chữ */}
      <div className="filter-group">
        <label htmlFor="search-input" className="filter-label">Tìm kiếm</label>
        <input
          id="search-input"
          type="text"
          className="filter-input"
          placeholder="Tìm kiếm công việc..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Lọc theo Trạng thái */}
      <div className="filter-group">
        <label htmlFor="status-filter" className="filter-label">Trạng thái</label>
        <select
          id="status-filter"
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="todo">Chờ xử lý</option>
          <option value="in-progress">Đang thực hiện</option>
          <option value="done">Hoàn thành</option>
        </select>
      </div>

      {/* Lọc theo Độ ưu tiên */}
      <div className="filter-group">
        <label htmlFor="priority-filter" className="filter-label">Độ ưu tiên</label>
        <select
          id="priority-filter"
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="all">Tất cả độ ưu tiên</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
      </div>

      {/* Lọc theo Hạn chót (sắp xếp) */}
      <div className="filter-group">
        <label htmlFor="sort-order" className="filter-label">Sắp xếp theo hạn</label>
        <select
          id="sort-order"
          className="filter-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="asc">Hạn gần nhất trước</option>
          <option value="desc">Hạn xa nhất trước</option>
        </select>
      </div>
    </div>
  );
}
