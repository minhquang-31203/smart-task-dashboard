import { useState, useCallback } from 'react';
import { formatZodErrors } from '../validations/schemas';

/**
 * Hook hỗ trợ kiểm tra dữ liệu form (Validation) sử dụng thư viện Zod.
 * 
 * Cách dùng:
 *   const { errors, validate, clearErrors, clearField } = useFormValidation(loginSchema);
 * 
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     const data = validate(formValues);   // Kiểm tra formValues
 *     if (!data) return;                   // Có lỗi thì dừng lại
 *     // Nếu hợp lệ thì tiếp tục gửi data
 *   };
 */
export function useFormValidation(schema) {
  // Biến lưu trữ lỗi của các trường nhập liệu
  const [errors, setErrors] = useState({});

  // Hàm chạy kiểm tra (validate) toàn bộ dữ liệu
  const validate = useCallback(
    (values) => {
      const result = schema.safeParse(values);
      if (result.success) {
        setErrors({}); // Không có lỗi
        return result.data;
      }
      // Định dạng lại lỗi của Zod cho dễ hiển thị và lưu vào state
      setErrors(formatZodErrors(result.error));
      return null;
    },
    [schema]
  );

  // Xóa toàn bộ báo lỗi
  const clearErrors = useCallback(() => setErrors({}), []);

  // Xóa báo lỗi của một trường cụ thể (VD: khi người dùng bắt đầu gõ vào ô bị lỗi)
  const clearField = useCallback(
    (field) =>
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }),
    []
  );

  return { errors, validate, clearErrors, clearField };
}
