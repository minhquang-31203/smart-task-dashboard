// Hàm tạo độ trễ giả lập mạng internet
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Giả lập gọi API với phương thức PUT (Cập nhật toàn bộ dữ liệu hoặc ghi đè)
 */
export async function putJson(url, data) {
  await delay();
  console.log(`[PUT] ${url}`, data);
  return { ok: true, data };
}
