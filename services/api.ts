import axios, { Method } from 'axios';

export const executeRequest = (endpoint: string, method: Method, body?: any) => {
  const headers = { 'Content-Type': 'application/json' } as any;

  // if(!process.env.FRONTEND_API_URL) {
  //   throw new Error('FRONTEND_API_URL not found');
  // }
  const FRONTEND_API_URL = 'http://localhost:3000/api/';

  const URL = `${FRONTEND_API_URL}${endpoint}`;
  console.log(`executando: ${URL}, metodo: ${method}, body: ${body}, headers: ${headers}`);

  return axios.request({
    url: URL,
    method: method,
    data: body?? body,
    headers: headers,
    timeout: 30000
  })
}
