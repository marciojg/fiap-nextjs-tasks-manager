import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middlewares/connectDB';
import cors from '../../middlewares/cors';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { User } from '../../types/User';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
  try {
    if(req.method !== 'POST') {
      res.status(400).json({ error: 'Método solicitado não existe'});
      return;
    }

    if(req.body) {
      const user = req.body as User;

      if(!user.name || user.name.length < 3) {
        return res.status(400).json({ error: 'Nome do usuário inválido' });
      }

      if(!user.email
        || !user.email.includes('@')
        || !user.email.includes('.')
        || user.email.length < 4)
      {
        return res.status(400).json({ error: 'Email do usuário inválido' });
      }

      if(!user.password || user.password.length < 3) {
        return res.status(400).json({ error: 'Senha do usuário inválido' });
      }

      const existingUser = await UserModel.find({ email: user.email });
      if(existingUser && existingUser.length > 0) {
        return res.status(400).json({ error: 'Usuário já existe'})
      }

      const final = {
        ...user,
        password: md5(user.password)
      } as User;

      await UserModel.create(final);
      return res.status(200).json({ msg: 'Usuário criado'});
    }

    res.status(400).json({ error: 'Parametros de entrada inválidos' });
  } catch(e) {
    const errorMsg = 'Ocorreu erro ao criar usuário';

    console.log(`${errorMsg}: `, e);
    res.status(500).json({ error: `${errorMsg}, tente novamente!` });
  }
}

export default cors(connectDB(handler));
