import axios, { Method } from 'axios';

export const executeRequest = (endpoint: string, method: Method, body?: any) => {
  const headers = { 'Content-Type': 'application/json' } as any;

  const NEXT_PUBLIC_FRONTEND_API_URL = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
  const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  if(!NEXT_PUBLIC_FRONTEND_API_URL && !NEXT_PUBLIC_VERCEL_URL) {
    throw new Error('NEXT_PUBLIC_FRONTEND_API_URL OR NEXT_PUBLIC_VERCEL_URL not found');
  }

  const accessToken = localStorage.getItem('accessToken');
  if(accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const API_URL = NEXT_PUBLIC_FRONTEND_API_URL || NEXT_PUBLIC_VERCEL_URL;

  console.log('API_URL', API_URL)

  const URL = `${API_URL}/api/${endpoint}`;
  console.log(`executando: ${URL}, metodo: ${method}, body: ${body}, headers: ${headers}`);

  return axios.request({
    url: URL,
    method: method,
    data: body?? body,
    headers: headers,
    timeout: 30000
  })
}
