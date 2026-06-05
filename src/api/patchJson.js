// Hàm tạo độ trễ giả lập mạng internet
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Giả lập gọi API với phương thức PATCH (Cập nhật 1 phần dữ liệu)
 * Chú ý: Ở dự án thật, bạn sẽ thay bằng fetch(url, { method: 'PATCH', body: ... })
 */
export async function patchJson(url, data) {
  await delay();
  console.log(`[PATCH] ${url}`, data);
  return { ok: true, data };
}
