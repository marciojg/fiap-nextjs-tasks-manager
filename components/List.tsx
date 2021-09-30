import type { NextPage } from 'next';
import React from 'react';
import { Task } from '../types/Task';
import { Item } from './Item';

type ListrProps = {
  tasks: Task[]
}

const List: NextPage<ListrProps> = ({ tasks }) => {
  return (
    <div className={"container-list" + (tasks && tasks.length === 0 ? "vazia" : "" )}>
      {
        tasks && tasks.length > 0 ?
        tasks.map(task => <Item task={task} />)
        :
        <>
        <img src="/empty-list.svg" alt="Nenhuma tarefa encontrada" />
        <p>Você ainda não possui tarefas cadastradas!</p>
        </>
      }

    </div>
  )
}

export { List };
