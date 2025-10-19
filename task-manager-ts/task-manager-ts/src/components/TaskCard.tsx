import { Link } from 'react-router-dom';
import { Task } from '../types/task';


export function TaskCard({ task }: { task: Task }) {
return (
<div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
<h3 style={{ margin: 0 }}>{task.title}</h3>
<small>{new Date(task.updatedAt).toLocaleString()}</small>
</div>
{task.description && <p style={{ marginTop: 8 }}>{task.description}</p>}
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
<span style={{ fontSize: 12, padding: '2px 8px', border: '1px solid #e5e7eb', borderRadius: 999 }}>{task.status}</span>
{task.dueDate && <span style={{ fontSize: 12 }}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
</div>
<div style={{ marginTop: 12 }}>
<Link to={`/tasks/${task.id}`}>Open</Link>
</div>
</div>
);
}