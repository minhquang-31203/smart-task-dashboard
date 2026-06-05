import { z } from 'zod';
import { TASK_STATUS, TASK_PRIORITY } from '../utils/constants';

// ==========================================
//  Login Schema
// ==========================================
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Tên đăng nhập không được để trống')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

// ==========================================
//  Register Schema
// ==========================================
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Họ và tên không được để trống')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ và tên tối đa 50 ký tự'),
  username: z
    .string()
    .min(1, 'Tên đăng nhập không được để trống')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(20, 'Tên đăng nhập tối đa 20 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'),
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu tối đa 50 ký tự'),
});

// ==========================================
//  Task Schema (Create & Edit)
// ==========================================
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Tiêu đề không được để trống')
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(100, 'Tiêu đề tối đa 100 ký tự'),
  description: z
    .string()
    .min(1, 'Mô tả không được để trống')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả tối đa 500 ký tự'),
  status: z.enum(
    [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE],
    { errorMap: () => ({ message: 'Vui lòng chọn trạng thái hợp lệ' }) }
  ),
  priority: z.enum(
    [TASK_PRIORITY.HIGH, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.LOW],
    { errorMap: () => ({ message: 'Vui lòng chọn độ ưu tiên hợp lệ' }) }
  ),
  assignee: z
    .string()
    .min(1, 'Người thực hiện không được để trống')
    .max(50, 'Tên người thực hiện quá dài'),
  dueDate: z
    .string()
    .min(1, 'Hạn chót không được để trống')
    .refine((val) => !isNaN(Date.parse(val)), 'Định dạng ngày không hợp lệ'),
  tags: z
    .string()
    .max(200, 'Nhãn quá dài')
    .optional()
    .default(''),
});

// ==========================================
//  Helper: extract first error per field
// ==========================================
export function formatZodErrors(zodError) {
  const errors = {};
  for (const issue of zodError.issues) {
    const field = issue.path[0];
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}
