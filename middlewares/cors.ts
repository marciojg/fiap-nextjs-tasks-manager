import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

const cors = (handler : NextApiHandler) =>
  async (req : NextApiRequest, res : NextApiResponse) => {

  await NextCors(req, res, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
  })

  return handler(req, res);
}

export default cors;
