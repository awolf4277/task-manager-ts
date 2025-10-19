import { FormEvent, useEffect, useState } from 'react';
import './TaskForm.css';


type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

type NewTask = Omit<Task, 'id'>;

interface Props {
initial?: Partial<Task>;
onSubmit: (payload: NewTask | Task) => void;
submitLabel?: string;
}


const STATUS: TaskStatus[] = ['todo', 'in-progress', 'done'];


export default function TaskForm({ initial, onSubmit, submitLabel = 'Save Task' }: Props) {
// demonstrate typed useState hooks
const [title, setTitle] = useState<string>(initial?.title ?? '');
const [description, setDescription] = useState<string>(initial?.description ?? '');
const [status, setStatus] = useState<TaskStatus>((initial?.status as TaskStatus) ?? 'todo');
const [dueDate, setDueDate] = useState<string>(initial?.dueDate ?? '');
const [errors, setErrors] = useState<Record<string, string>>({});


useEffect(() => {
setTitle(initial?.title ?? '');
setDescription(initial?.description ?? '');
setStatus((initial?.status as TaskStatus) ?? 'todo');
setDueDate(initial?.dueDate ?? '');
}, [initial]);


function validate() {
const e: Record<string, string> = {};
if (!title.trim()) e.title = 'Title is required';
if (title.length > 100) e.title = 'Title must be ≤ 100 characters';
if (description.length > 500) e.description = 'Description must be ≤ 500 characters';
if (dueDate && Number.isNaN(Date.parse(dueDate))) e.dueDate = 'Invalid date';
setErrors(e);
return Object.keys(e).length === 0;
}


function handleSubmit(ev: FormEvent) {
ev.preventDefault();
if (!validate()) return;
const base: NewTask = { title: title.trim(), description: description.trim() || undefined, status, dueDate: dueDate || undefined };
onSubmit(initial && 'id' in initial ? ({ ...(initial as Task), ...base }) : base);
}

return (
<form onSubmit={handleSubmit} className="task-form">
<label>
<div>Title</div>
<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
{errors.title && <small className="error">{errors.title}</small>}
</label>


<label>
<div>Description</div>
<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Details" rows={4} />
{errors.description && <small className="error">{errors.description}</small>}
</label>


<label>
<div>Status</div>
<select value={status} onChange={(e) => setStatus(e.target.value as any)}>
{STATUS.map(s => <option key={s} value={s}>{s}</option>)}
</select>
</label>


<label>
<div>Due Date</div>
<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
{errors.dueDate && <small className="error">{errors.dueDate}</small>}
</label>


<button type="submit">{submitLabel}</button>
</form>
);
}