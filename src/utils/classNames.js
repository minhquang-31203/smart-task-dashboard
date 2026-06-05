// ==========================================
//  Tiện ích hỗ trợ nối các className (tương tự thư viện clsx hoặc classnames)
// ==========================================

/**
 * Hàm 'cn' (viết tắt của classNames) dùng để kết hợp nhiều tên class CSS lại với nhau dựa trên điều kiện.
 * Hàm này giúp code gọn gàng hơn khi bạn cần thêm hoặc bớt class động (dynamic class) trong React Component.
 *
 * Cách sử dụng thực tế:
 *   cn('btn', isActive && 'btn--active', size && `btn--${size}`)
 *   // Nếu biến isActive = true và size = 'lg', kết quả sẽ là → "btn btn--active btn--lg"
 *   // Những tham số bị sai (falsy) như false, null, undefined sẽ tự động bị loại bỏ.
 *
 * @param  {...(string|false|null|undefined)} args - Dấu ...args cho phép nhận vào vô số các đối số. Mỗi đối số có thể là chuỗi (tên class) hoặc các giá trị falsy.
 * @returns {string} - Trả về một chuỗi gồm các tên class hợp lệ, cách nhau bởi một khoảng trắng.
 */
export function cn(...args) {
  // Bước 1: args.filter(Boolean) 
  // Sẽ lặp qua mảng các tham số bạn truyền vào, và CHỈ giữ lại những giá trị đúng (truthy).
  // Nó sẽ loại bỏ đi false, null, undefined, 0, chuỗi rỗng "".
  //
  // Bước 2: .join(' ')
  // Nối các giá trị hợp lệ còn lại thành một chuỗi duy nhất, phân cách nhau bằng dấu cách (khoảng trắng).
  return args.filter(Boolean).join(' ');
}
