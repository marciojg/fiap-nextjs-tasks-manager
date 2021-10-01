import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middlewares/connectDB';
import jwtValidator from '../../middlewares/jwtValidator';
import { TaskModel } from '../../models/TaskModel';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { GetTasksQueryParams } from '../../types/GetTasksQueryParams';
import { TaksStatusEnum } from '../../types/TaksStatusEnum';
import { Task } from '../../types/Task';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | Task[]>) => {
  try {
    const userId = req?.body?.userId ? req?.body?.userId : req?.query?.userId as string;
    const failedValidation = await validateUser(userId);

    if(failedValidation) {
      return res.status(400).json({ error: failedValidation });
    }

    if(req.method === 'POST') {
      return await saveTask(req, res, userId);
    } else if (req.method === 'GET') {
      return await getTasks(req, res, userId);
    } else if (req.method === 'PUT') {
      return await upateTask(req, res, userId);
    } else if (req.method === 'DELETE') {
      return await deleteTask(req, res, userId);
    }

    res.status(400).json({ error: 'Método solicitado não existe'});
  } catch(e) {
    const errorMsg = 'Ocorreu erro ao gerenciar tarefas';

    console.log(`${errorMsg}: `, e);
    res.status(500).json({ error: `${errorMsg}, tente novamente!` });
  }
}

const validateTaskndReturnValue = async (req: NextApiRequest, userId: string) => {
  const id = req.query?.id as string;

  if(!id || id.trim() === '') {
    return null;
  }

  const taskFound = await TaskModel.findById(id);
  if(!taskFound || taskFound.userId !== userId) {
    return null;
  }

  return taskFound;
}

const upateTask = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | Task[]>, userId: string) => {
  const taskFound = await validateTaskndReturnValue(req, userId);

  if(!taskFound) {
    return res.status(400).json({ error: 'Tarefa não encontrada' });
  }

  if(req.body) {
    const changedTask = req.body as Task;

    if(changedTask.name && changedTask.name.trim() !== '') {
      taskFound.name = changedTask.name;
    }

    if(changedTask.finishPrevisionDate) {
      taskFound.finishPrevisionDate = changedTask.finishPrevisionDate;
    }

    if(changedTask.finishDate) {
      taskFound.finishDate = changedTask.finishDate;
    }

    await TaskModel.findByIdAndUpdate({ _id: taskFound._id }, taskFound);
    return res.status(200).json({ msg: 'Tarefa atualizada com sucesso' });
  }

  return res.status(400).json({ error: 'Parâmetros de entrada inválidos' });

}

const deleteTask = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | Task[]>, userId: string) => {
  const taskFound = await validateTaskndReturnValue(req, userId);

  if(!taskFound) {
    return res.status(400).json({ error: 'Tarefa não encontrada' });
  }

  await TaskModel.findByIdAndDelete({ _id: taskFound._id });
  return res.status(200).json({ msg: 'Tarefa deletada com sucesso' });
}

const getTasks = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | Task[]>, userId: string) => {
  const params = req.query as GetTasksQueryParams;
  const query = { userId } as any;

  if(params?.finishPrevisionDateStart) {
    const inputDate = new Date(params?.finishPrevisionDateStart)
    if(!query.finishPrevisionDate) {
      query.finishPrevisionDate = {};
    }

    query.finishPrevisionDate.$lte = inputDate;
  }

  if(params?.finishPrevisionDateEnd) {
    const inputDate = new Date(params?.finishPrevisionDateEnd)
    query.finishPrevisionDate = { $lte: inputDate }
  }

  if(params?.status) {
    const status = Number(params.status);

    switch(status) {
      case TaksStatusEnum.Ativos: query.finishDate = null; //2
        break;
      case TaksStatusEnum.Concluidos: query.finishDate = { $ne: null }; //3
        break;
      default: break;
    }
  }

  console.log('query', query);
  const result = await TaskModel.find(query);
  return res.status(200).json(result);
}

const validateUser = async (userId: string) => {
  if(!userId) {
    return 'Usuário não informado';
  }

  const userFound = await UserModel.findById(userId);
  if(!userFound) {
    return 'Usuário não encontrado';
  }
}

const saveTask = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>, userId: string) => {
  if(req.body) {
    const task = req.body as Task;

    if (!task.name || task.name.length < 2) {
      return res.status(400).json({ error: 'Nome da tarefa inválida' });
    }

    if(!task.finishPrevisionDate
      || moment(task.finishPrevisionDate).isBefore(moment())) {
      return res.status(400).json({ error: 'Data de previsão invalda ou menor que hoje' });
    }

    const final = {
      ...task,
      userId,
      finishDate: undefined
    } as Task;

    await TaskModel.create(final);
    return res.status(200).json({ msg: 'Tarefa criada' });
  }

  return res.status(400).json({ error: 'Parâmetros de entrada inválido' })
}

export default connectDB(jwtValidator(handler));
