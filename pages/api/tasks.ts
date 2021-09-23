import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middlewares/connectDB';
import jwtValidator from '../../middlewares/jwtValidator';
import { TaskModel } from '../../models/TaskModel';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { Task } from '../../types/Task';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
  try {
    if(req.method === 'POST') {
      return await saveTask(req, res);
    } else if (req.method === 'GET') {
      return;
    } else if (req.method === 'PUT') {
      return;
    } else if (req.method === 'DELETE') {
      return;
    }

    res.status(400).json({ error: 'Método solicitado não existe'});
  } catch(e) {
    const errorMsg = 'Ocorreu erro ao gerenciar tarefas';

    console.log(`${errorMsg}: `, e);
    res.status(500).json({ error: `${errorMsg}, tente novamente!` });
  }
}

const saveTask = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
  if(req.body) {
    const userId = req.body.userId;
    if(!userId) {
      return res.status(400).json({ error: 'Usuário não informado' });
    }

    const userFound = await UserModel.findById(userId);
    if(!userFound) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const task = req.body as Task;

    if (!task.name || task.name.length < 2) {
      return res.status(400).json({ error: 'Nome da tarefa inválida' });
    }

    if(!task.finishPrevisionDate
      || dateBeginningOfDay(stringToDate(task.finishPrevisionDate)) < dateBeginningOfDay()) {
      return res.status(400).json({ error: 'Data de previsão invalda ou menor que hoje' });
    }

    const final = {
      ...task,
      userId,
      finishDate: undefined
    } as Task;

    await TaskModel.create(final);
    return res.status(200).json({ msg: 'Tarefa criada'});
  }

  return res.status(400).json({ error: 'Parâmetros de entrada inválido'})
}

function stringToDate(date: string): Date {
  const [year, month, day] = date.split('-');

  return new Date(Number(year), Number(month) - 1, Number(day));
}

function dateBeginningOfDay(date?: Date): Date {
  const iternalDate = date?? new Date;

  return new Date(iternalDate.setHours(0, 0, 0, 0));
}


export default connectDB(jwtValidator(handler));
