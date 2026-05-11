const KEY = "vf_auth_v1";
const REMEMBER = "vf_remember_v1";
export const ACCESS_PASSWORD = "vivian2026";

export function isAuthed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1" || sessionStorage.getItem(KEY) === "1";
}
export function login(password: string, remember: boolean) {
  if (password.trim().toLowerCase() !== ACCESS_PASSWORD) return false;
  if (remember) {
    localStorage.setItem(KEY, "1");
    localStorage.setItem(REMEMBER, "1");
  } else {
    sessionStorage.setItem(KEY, "1");
  }
  return true;
}
export function logout() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}
