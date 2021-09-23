import jwt from 'jsonwebtoken';
import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middlewares/connectDB';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { Login } from '../../types/Login';
import { LoginResponse } from '../../types/LoginResponse';

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | LoginResponse>) => {
  try {
    if(req.method !== 'POST') {
      res.status(400).json({ error: 'Método solicitado não existe'});
      return;
    }

    const { MY_SECRET_KEY } = process.env;
    if(!MY_SECRET_KEY) {
      res.status(500).json({ error: 'ENV MY_SECRET_KEY não encontrada'});
      return;
    }

    if(req.body) {
      const auth = req.body as Login;

      if(auth.login && auth.password) {
        const usersFound = await UserModel.find({ email: auth.login, password: md5(auth.password) });
        if(usersFound && usersFound.length > 0) {
          const user = usersFound[0];
          const token = jwt.sign({ _id: user._id }, MY_SECRET_KEY);

          return res.status(200).json({ token, name: user.name, email: user.email });
        }
      }
    }

    res.status(400).json({ error: 'Usuário ou senha inválidos' });
  } catch(e) {
    const errorMsg = 'Ocorreu erro ao autenticar usuário';

    console.log(`${errorMsg}: `, e);
    res.status(500).json({ error: `${errorMsg}, tente novamente!` });
  }
}

export default connectDB(handler);
