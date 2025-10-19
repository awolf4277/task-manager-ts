import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';


export default function TaskDetails() {
const { id } = useParams();
const nav = useNavigate();
const { state, removeTask } = useTasks();
const task = state.tasks.find(t => t.id === id);


if (!task) return <p style={{ padding: 16 }}>Task not found.</p>;


function handleDelete() {
if (confirm('Delete this task?')) {
removeTask(task.id);
nav('/');
}
}


return (
<section style={{ padding: 16, display: 'grid', gap: 8 }}>
<h2>{task.title}</h2>
{task.description && <p>{task.description}</p>}
<p><b>Status:</b> {task.status}</p>
{task.dueDate && <p><b>Due:</b> {new Date(task.dueDate).toLocaleDateString()}</p>}
<p><small>Created: {new Date(task.createdAt).toLocaleString()}</small></p>
<p><small>Updated: {new Date(task.updatedAt).toLocaleString()}</small></p>
<div style={{ display: 'flex', gap: 12 }}>
<Link to={`/tasks/${task.id}/edit`}>Edit</Link>
<button onClick={handleDelete}>Delete</button>
<Link to="/">Back</Link>
</div>
</section>
);
}