// Refresh karne par test progress na jaye isliye localStorage me save karte hain
const KEY = "The WebEcho Innvoations_test_session_v1";

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}
export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}
export function clear() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
