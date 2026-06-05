import { useEffect } from 'react';

/**
 * Hook thay đổi tiêu đề (title) của thẻ trình duyệt (tab)
 * @param {string} title - Tiêu đề trang (vd: "Tổng quan")
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    // Nối thêm tên dự án vào sau tiêu đề trang
    document.title = title ? `${title} — Smart Task` : 'Smart Task & Team Dashboard';
    
    // Khôi phục lại tiêu đề cũ khi rời khỏi trang (unmount)
    return () => {
      document.title = prev;
    };
  }, [title]);
}
