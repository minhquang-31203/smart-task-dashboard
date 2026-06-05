import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMutation } from '../hooks/useMutation';
import { useFormValidation } from '../hooks/useFormValidation';
import { fetchTaskById, updateTask } from '../api/tasksApi';
import { parseTags } from '../utils/taskHelpers';
import { taskSchema } from '../validations/schemas';
import { mockUsers } from '../data/mockUsers';
import FormField, { inputClass } from '../components/FormField';
import LoadingButton from '../components/LoadingButton';

/**
 * Trang Chỉnh sửa Công việc
 * Tương tự như trang Tạo mới, nhưng có thêm bước gọi API lấy dữ liệu cũ lên trước
 */
export default function EditTaskPage() {
  useDocumentTitle('Chỉnh sửa công việc');
  const { id } = useParams(); // Lấy ID công việc từ đường dẫn URL (ví dụ: /tasks/edit/123 -> id = 123)
  const navigate = useNavigate();
  const toast = useToast();
  
  // Hook xử lý gọi API cập nhật dữ liệu
  const { mutate, loading: saving } = useMutation(
    (data) => updateTask(id, data)
  );
  
  const { errors, validate, clearField } = useFormValidation(taskSchema);

  // form ban đầu là null, chỉ khi tải dữ liệu xong mới gắn giá trị
  const [form, setForm] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Khi mở trang, gọi API lấy dữ liệu cũ của công việc theo ID
  useEffect(() => {
    async function load() {
      try {
        const task = await fetchTaskById(id);
        // Sau khi lấy được task, đổ dữ liệu cũ vào state của Form
        setForm({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee: task.assignee,
          dueDate: task.dueDate,
          tags: task.tags?.join(', ') || '', // Mảng tags biến thành chuỗi phân cách bởi dấu phẩy
        });
      } catch (err) {
        toast.error(err.message || 'Không tìm thấy công việc');
        navigate('/tasks'); // Lỗi thì văng về trang danh sách
      } finally {
        setPageLoading(false); // Dù lỗi hay thành công thì cũng tắt loading ban đầu của trang
      }
    }
    load();
  }, [id, toast, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearField(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = validate(form); // Kiểm tra qua schema Zod
    if (!data) return;
    
    // Gọi API cập nhật
    try {
      await mutate({
        ...data,
        tags: parseTags(data.tags), // Chuyển chuỗi tags về lại mảng
      });
      toast.success('Cập nhật công việc thành công!');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.message || 'Cập nhật thất bại');
    }
  };

  // Nếu đang tải dữ liệu lần đầu, hiện màn hình xoay xoay
  if (pageLoading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="spinner" />
          <p>Đang tải công việc...</p>
        </div>
      </div>
    );
  }

  // Chờ cho form có dữ liệu rồi mới hiện giao diện (tránh lỗi giá trị form bị undefined)
  if (!form) return null;

  return (
    <div className="page" id="edit-task-page">
      <div className="page-header">
        <h1 className="page-title">✏️ Chỉnh sửa công việc</h1>
      </div>

      <form className="task-form" onSubmit={handleSubmit} id="edit-task-form" noValidate>
        <FormField label="Tiêu đề" htmlFor="edit-title" error={errors.title}>
          <input
            id="edit-title"
            name="title"
            type="text"
            className={inputClass(errors.title)}
            value={form.title}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Mô tả" htmlFor="edit-description" error={errors.description}>
          <textarea
            id="edit-description"
            name="description"
            className={inputClass(errors.description, 'form-textarea')}
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Trạng thái" htmlFor="edit-status" error={errors.status}>
            <select
              id="edit-status"
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

          <FormField label="Độ ưu tiên" htmlFor="edit-priority" error={errors.priority}>
            <select
              id="edit-priority"
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
          <FormField label="Người thực hiện" htmlFor="edit-assignee" error={errors.assignee}>
            <select
              id="edit-assignee"
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

          <FormField label="Hạn chót" htmlFor="edit-dueDate" error={errors.dueDate}>
            <input
              id="edit-dueDate"
              name="dueDate"
              type="date"
              className={inputClass(errors.dueDate)}
              value={form.dueDate}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Nhãn (phân cách bằng dấu phẩy)" htmlFor="edit-tags" error={errors.tags}>
          <input
            id="edit-tags"
            name="tags"
            type="text"
            className={inputClass(errors.tags)}
            value={form.tags}
            onChange={handleChange}
          />
        </FormField>

        <div className="form-actions">
          <LoadingButton loading={saving} type="submit" id="edit-task-submit">
            Lưu thay đổi
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
