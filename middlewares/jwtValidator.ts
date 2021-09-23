import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';

const jwtValidator = (handler : NextApiHandler) =>
  async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    const { MY_SECRET_KEY } = process.env;

    if(!MY_SECRET_KEY){
      res.status(500).json({ error: 'ENV MY_SECRET_KEY não encontrada '});
      return;
    }

    if(!req || !req.headers) {
      return res.status(400).json({ error: 'Não foi possível validar o token de acesso'});
    }

    if(req.method !== 'OPTIONS') {
      const authorization = req.headers['authorization'];

      if(!authorization) {
        return res.status(401).json({ error: 'Nenhum token de acesso foi informado' });
      }

      const token = authorization.substr(7);
      if(!token) {
        return res.status(401).json({ error: 'Nenhum token de acesso foi informado' });
      }

      try {
        const decoded = await jwt.verify(token, MY_SECRET_KEY) as JwtPayload;
        if(!decoded) {
          return res.status(401).json({ error: 'Nao foi possivel validar o token' });
        }

        if(req.body) {
          req.body.userId = decoded._id;
        } else if(req.query) {
          req.query.userId = decoded._id;
        }
      } catch(e) {
        console.log(e);
        return res.status(500).json({ error: 'Ocorreu erro ao tratar o token JWS' });
      }

    }


  return handler(req, res);
}

export default jwtValidator;
