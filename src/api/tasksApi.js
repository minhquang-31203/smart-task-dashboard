import { mockTasks } from '../data/mockTasks';
import { todayISO } from '../utils/dateHelpers';

// Key lưu trong localStorage
const STORAGE_KEY = 'smarttask_tasks';
const NEXT_ID_KEY = 'smarttask_next_id';

// Hàm giả lập độ trễ của mạng internet (400ms)
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Đọc danh sách tasks từ localStorage.
 * Nếu chưa có dữ liệu (lần đầu mở app) → dùng mockTasks làm dữ liệu ban đầu và lưu luôn.
 */
function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Lỗi đọc tasks từ localStorage:', err);
  }
  // Lần đầu: ghi mockTasks vào localStorage rồi trả về
  saveTasks(mockTasks);
  return [...mockTasks];
}

/**
 * Ghi danh sách tasks xuống localStorage.
 */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Lỗi ghi tasks vào localStorage:', err);
  }
}

/**
 * Đọc nextId từ localStorage (hoặc tính toán từ dữ liệu hiện có).
 */
function loadNextId(tasks) {
  try {
    const stored = localStorage.getItem(NEXT_ID_KEY);
    if (stored) return Number(stored);
  } catch {
    // Bỏ qua lỗi, tính lại từ mảng tasks
  }
  // Tìm ID lớn nhất trong mảng hiện tại + 1
  const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0);
  return maxId + 1;
}

/**
 * Lưu nextId vào localStorage.
 */
function saveNextId(id) {
  try {
    localStorage.setItem(NEXT_ID_KEY, String(id));
  } catch {
    // Bỏ qua lỗi
  }
}

// Khởi tạo dữ liệu từ localStorage (hoặc mock nếu lần đầu)
let tasks = loadTasks();
let nextId = loadNextId(tasks);

/**
 * API Lấy danh sách toàn bộ công việc
 */
export async function fetchTasks() {
  await delay();
  tasks = loadTasks(); // Luôn đọc lại từ localStorage để đồng bộ
  return [...tasks];
}

/**
 * API Lấy chi tiết 1 công việc dựa theo ID
 */
export async function fetchTaskById(id) {
  await delay();
  tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) throw new Error('Không tìm thấy công việc này'); // Báo lỗi nếu ID không tồn tại
  return { ...task };
}

/**
 * API Tạo công việc mới — tự động lưu vào localStorage
 */
export async function createTask(taskData) {
  await delay();
  tasks = loadTasks(); // Đọc lại để tránh mất dữ liệu
  nextId = loadNextId(tasks);

  const newTask = {
    ...taskData,
    id: nextId++,            // Cấp ID mới tự động tăng
    createdAt: todayISO(),   // Gắn ngày tạo là ngày hôm nay
  };
  tasks = [newTask, ...tasks]; // Thêm task mới lên đầu mảng danh sách

  saveTasks(tasks);   // 💾 Lưu xuống localStorage
  saveNextId(nextId); // 💾 Lưu nextId
  return { ...newTask };
}

/**
 * API Cập nhật thông tin công việc — tự động lưu vào localStorage
 */
export async function updateTask(id, updates) {
  await delay();
  tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) throw new Error('Không tìm thấy công việc này');
  
  // Trộn dữ liệu cũ và dữ liệu cập nhật mới vào với nhau
  tasks[index] = { ...tasks[index], ...updates };
  
  saveTasks(tasks); // 💾 Lưu xuống localStorage
  return { ...tasks[index] };
}

/**
 * API Xóa công việc — tự động lưu vào localStorage
 */
export async function deleteTask(id) {
  await delay();
  tasks = loadTasks();
  // Lọc ra các task có ID khác với ID cần xóa (tức là xóa task đó đi khỏi mảng)
  tasks = tasks.filter((t) => t.id !== Number(id));
  
  saveTasks(tasks); // 💾 Lưu xuống localStorage
  return { ok: true };
}
