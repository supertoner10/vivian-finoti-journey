const KEY = "vf_plan_v1";
type State = { startDate: string; completed: number[]; weight?: number; goal?: number };

function read(): State {
  if (typeof window === "undefined") return { startDate: new Date().toISOString(), completed: [] };
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const init: State = { startDate: new Date().toISOString(), completed: [] };
    localStorage.setItem(KEY, JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(raw); } catch { return { startDate: new Date().toISOString(), completed: [] }; }
}
function write(s: State) { localStorage.setItem(KEY, JSON.stringify(s)); }

export function getPlan() { return read(); }
export function currentDay() {
  const s = read();
  const days = Math.floor((Date.now() - new Date(s.startDate).getTime()) / 86400000) + 1;
  return Math.min(30, Math.max(1, days));
}
export function completeDay(day: number) {
  const s = read();
  if (!s.completed.includes(day)) s.completed.push(day);
  write(s);
}
export function resetPlan() {
  write({ startDate: new Date().toISOString(), completed: [] });
}
export function setProfile(weight?: number, goal?: number) {
  const s = read();
  if (weight !== undefined) s.weight = weight;
  if (goal !== undefined) s.goal = goal;
  write(s);
}
