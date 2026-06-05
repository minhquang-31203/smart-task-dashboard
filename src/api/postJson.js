// Hàm tạo độ trễ giả lập mạng internet
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Giả lập gọi API với phương thức POST (Tạo mới dữ liệu)
 */
export async function postJson(url, data) {
  await delay();
  console.log(`[POST] ${url}`, data);
  return { ok: true, data };
}
