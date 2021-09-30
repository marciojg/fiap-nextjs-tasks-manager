import type { NextPage } from 'next';
import { Task } from '../types/Task';

type ItemProps = {
  task: Task
}

const Item: NextPage<ItemProps> = ({ task }) => {
  return (
    <div className="container-item">
      <p>{task.name}</p>
    </div>
  )
}

export { Item };
