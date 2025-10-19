import type { ComponentProps } from 'react';
import { TaskCard } from '../components/TaskCard';
import styles from './Dashboard.module.css';


export default function TaskList({ tasks }: { tasks: Array<ComponentProps<typeof TaskCard>['task']> }) {
return (
<div className={styles.grid}>
{tasks.map(t => <TaskCard key={t.id} task={t} />)}
</div>
);
);
}