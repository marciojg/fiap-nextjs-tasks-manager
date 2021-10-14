import moment from 'moment';
import type { NextPage } from 'next';
import { Task } from '../types/Task';

type ItemProps = {
  task: Task,
  selectTaskToEdit(t : Task) : void
}

const Item: NextPage<ItemProps> = ({ task, selectTaskToEdit }) => {

  const getDateText = (finishDate : Date | undefined, finishPrevisionDate : Date) => {
    if(finishDate) {
      return `Concluído em: ${moment.utc(finishDate).format('DD/MM/YYYY')}`;
    }

    return `Previsão de conclusão em: ${moment.utc(finishPrevisionDate).format('DD/MM/YYYY')}`
  }

  return (
    <div className={ `container-item ${(task.finishDate ? "" : "ativo")}` }
         onClick={() => (task.finishDate ? null : selectTaskToEdit(task))}
    >
      <img src={ task.finishDate ? "/finished.svg" : "/not-finished.svg" }
           alt={ task.finishDate ? "Tarefa concluída" : "Tarefa não concluída" }/>
      <div>
        <p className={ task.finishDate ? "concluido" : "" }>{ task.name }</p>
        <span>{getDateText(task.finishDate, task.finishPrevisionDate)}</span>
      </div>
    </div>
  )
}

export { Item };
