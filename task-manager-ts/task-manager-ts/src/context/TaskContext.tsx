import React, { createContext, useContext, useMemo, useReducer } from 'react';

// Types and helpers
export type Task = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type TaskUpdate = { id: string } & Partial<Omit<Task, 'id' | 'createdAt'>>;

export type TaskState = { tasks: Task[] };

const STORAGE_KEY = 'task-manager.tasks';

function saveTasks(raw: string) {
  try {
	if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, raw);
  } catch {}
}

function loadTasks(): string | null {
  try {
	return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  } catch {
	return null;
  }
}

type Action =
| { type: 'add'; payload: Task }
| { type: 'update'; payload: TaskUpdate }
| { type: 'remove'; payload: { id: string } }
| { type: 'hydrate'; payload: Task[] };


const TaskContext = createContext<{
state: TaskState;
addTask: (t: NewTask) => Task;
updateTask: (u: TaskUpdate) => void;
removeTask: (id: string) => void;
} | null>(null);


function reducer(state: TaskState, action: Action): TaskState {
switch (action.type) {
case 'hydrate': {
return { tasks: action.payload };
}
case 'add': {
const tasks = [action.payload, ...state.tasks];
saveTasks(JSON.stringify(tasks));
return { tasks };
}
case 'update': {
const tasks = state.tasks.map(t => t.id === action.payload.id ? { ...t, ...action.payload, updatedAt: new Date().toISOString() } : t);
saveTasks(JSON.stringify(tasks));
return { tasks };
}
case 'remove': {
const tasks = state.tasks.filter(t => t.id !== action.payload.id);
saveTasks(JSON.stringify(tasks));
return { tasks };
}
default:
return state;
}
}


export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
const [state, dispatch] = useReducer(reducer, { tasks: [] });


// hydrate from localStorage once
React.useEffect(() => {
const raw = loadTasks();
if (raw) {
try {
const parsed = JSON.parse(raw) as Task[];
dispatch({ type: 'hydrate', payload: parsed });
} catch {}
}
}, []);


function addTask(t: NewTask): Task {
const now = new Date().toISOString();
const task: Task = {
id: crypto.randomUUID(),
createdAt: now,
updatedAt: now,
...t,
};
dispatch({ type: 'add', payload: task });
return task;
}


function updateTask(u: TaskUpdate) {
dispatch({ type: 'update', payload: u });
}


function removeTask(id: string) {
dispatch({ type: 'remove', payload: { id } });
}


const value = useMemo(() => ({ state, addTask, updateTask, removeTask }), [state]);
return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};


export function useTaskContext() {
const ctx = useContext(TaskContext);
if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
return ctx;
}