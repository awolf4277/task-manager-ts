import { Task } from '../types/task';
import { TaskCard } from './TaskCard';


export default function TaskList({ tasks }: { tasks: Task[] }) {
if (tasks.length === 0) return <p>No tasks yet. Create your first task!</p>;
return (
<div style={{ display: 'grid', gap: 12 }}>
{tasks.map(t => <TaskCard key={t.id} task={t} />)}
</div>
);
}