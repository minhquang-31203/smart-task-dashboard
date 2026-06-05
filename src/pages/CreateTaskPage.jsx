import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMutation } from '../hooks/useMutation';
import { useFormValidation } from '../hooks/useFormValidation';
import { createTask } from '../api/tasksApi';
import { TASK_STATUS, TASK_PRIORITY } from '../utils/constants';
import { parseTags } from '../utils/taskHelpers';
import { taskSchema } from '../validations/schemas';
import { mockUsers } from '../data/mockUsers';
import FormField, { inputClass } from '../components/FormField';
import LoadingButton from '../components/LoadingButton';

/**
 * Trang Tạo công việc mới
 */
export default function CreateTaskPage() {
  useDocumentTitle('Tạo công việc');
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Dùng hook tự viết để gọi API (tự động có biến loading theo dõi trạng thái gọi mạng)
  const { mutate, loading } = useMutation(createTask);
  
  // Dùng hook xác thực Form bằng schema Zod (xem thư mục validations)
  const { errors, validate, clearField } = useFormValidation(taskSchema);

  // State lưu trữ dữ liệu các ô nhập (Form State)
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    assignee: '',
    dueDate: '',
    tags: '',
  });

  // Hàm xử lý khi người dùng gõ phím
  const handleChange = (e) => {
    // Cập nhật giá trị vào form
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Nếu đang có báo lỗi ở ô đó thì tự động xóa lỗi đi
    clearField(e.target.name);
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu (validate) qua Zod
    const data = validate(form);
    if (!data) return; // Nếu có lỗi (data = null), dừng lại không gọi API
    
    // Nếu hợp lệ, tiến hành gọi API tạo mới
    try {
      await mutate({
        ...data,
        createdBy: user.id, // Đính kèm ID người tạo (là user hiện tại)
        tags: parseTags(data.tags), // Chuyển chuỗi tags thành mảng
      });
      toast.success('Tạo công việc thành công!');
      navigate('/tasks'); // Chuyển về trang danh sách
    } catch (err) {
      toast.error(err.message || 'Tạo công việc thất bại');
    }
  };

  return (
    <div className="page" id="create-task-page">
      <div className="page-header">
        <h1 className="page-title">➕ Tạo công việc mới</h1>
      </div>

      <form className="task-form" onSubmit={handleSubmit} id="create-task-form" noValidate>
        {/* Component FormField sẽ tự động hiển thị lỗi (nếu có) dưới thẻ input */}
        <FormField label="Tiêu đề" htmlFor="task-title" error={errors.title}>
          <input
            id="task-title"
            name="title"
            type="text"
            className={inputClass(errors.title)}
            placeholder="Nhập tiêu đề công việc"
            value={form.title}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Mô tả" htmlFor="task-description" error={errors.description}>
          <textarea
            id="task-description"
            name="description"
            className={inputClass(errors.description, 'form-textarea')}
            placeholder="Mô tả chi tiết công việc..."
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Trạng thái" htmlFor="task-status" error={errors.status}>
            <select
              id="task-status"
              name="status"
              className={inputClass(errors.status)}
              value={form.status}
              onChange={handleChange}
            >
              <option value="todo">Chờ xử lý</option>
              <option value="in-progress">Đang thực hiện</option>
              <option value="done">Hoàn thành</option>
            </select>
          </FormField>

          <FormField label="Độ ưu tiên" htmlFor="task-priority" error={errors.priority}>
            <select
              id="task-priority"
              name="priority"
              className={inputClass(errors.priority)}
              value={form.priority}
              onChange={handleChange}
            >
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
          </FormField>
        </div>

        <div className="form-row">
          <FormField label="Người thực hiện" htmlFor="task-assignee" error={errors.assignee}>
            <select
              id="task-assignee"
              name="assignee"
              className={inputClass(errors.assignee)}
              value={form.assignee}
              onChange={handleChange}
            >
              <option value="">-- Chọn người thực hiện --</option>
              {mockUsers.map((u) => (
                <option key={u.id} value={u.fullName}>
                  {u.avatar} {u.fullName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Hạn chót" htmlFor="task-dueDate" error={errors.dueDate}>
            <input
              id="task-dueDate"
              name="dueDate"
              type="date"
              className={inputClass(errors.dueDate)}
              value={form.dueDate}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Nhãn (phân cách bằng dấu phẩy)" htmlFor="task-tags" error={errors.tags}>
          <input
            id="task-tags"
            name="tags"
            type="text"
            className={inputClass(errors.tags)}
            placeholder="frontend, bugfix, ux"
            value={form.tags}
            onChange={handleChange}
          />
        </FormField>

        <div className="form-actions">
          {/* Nút bấm hiển thị vòng tròn xoay xoay khi đang lưu vào API */}
          <LoadingButton loading={loading} type="submit" id="create-task-submit">
            Tạo công việc
          </LoadingButton>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/tasks')}
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}
