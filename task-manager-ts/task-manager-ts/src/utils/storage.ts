const KEY = 'tm_tasks_v1';


export function loadTasks(): string | null {
return localStorage.getItem(KEY);
}


export function saveTasks(payload: string) {
localStorage.setItem(KEY, payload);
}


export function clearTasks() {
localStorage.removeItem(KEY);
}