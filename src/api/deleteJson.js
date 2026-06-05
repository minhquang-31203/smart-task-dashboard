// Hàm tạo độ trễ giả lập mạng internet (mặc định 300ms)
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Giả lập gọi API với phương thức DELETE (Xóa dữ liệu)
 * Chú ý: Ở dự án thật, bạn sẽ thay code này bằng fetch(url, { method: 'DELETE' })
 */
export async function deleteJson(url) {
  await delay(); // Đợi 1 chút để giống mạng thật
  console.log(`[DELETE] ${url}`);
  return { ok: true };
}
