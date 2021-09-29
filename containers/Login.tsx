import type { NextPage } from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { LoginResponse } from '../types/LoginResponse';

const Login: NextPage<AccessTokenProps> = ({ setAccessToken }) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doLogin = async(e: any) => {
    try {
      setLoading(true);

      e.preventDefault();

      if(!login || !password) {
        setMsgError('Parâmetros de entrada inválidos');
        return;
      }

      const result = await executeRequest('login', 'POST', { login, password });

      setMsgError('');
      if(result && result.data) {
        const data = result.data as LoginResponse;

        console.log(result);

        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);

        setAccessToken(result.data.token);
      } else {
        setMsgError('Não foi possível processar o login, tente novamente');
      }
    } catch (error: any) {
      console.log(error);

      if(error?.response?.data?.error) {
        setMsgError(error?.response?.data?.error);
      } else {
        setMsgError('Ocorreu um erro ao processar o login, tente novamente');
      }
    }

    setLoading(false);
  }

  return (
    <div className="container-login">
      <img src="logo.svg" alt="Logo Fiap" className="logo"/>
      <form>
        {msgError && <p>{msgError}</p>}
        <div className="input">
          <img src="mail.svg" alt="Email"/>
          <input type="text" placeholder="Email"
            value={login} onChange={e => setLogin(e.target.value)}
          />
        </div>

        <div className="input">
          <img src="lock.svg" alt="Cadeado"/>
          <input type="password" placeholder="Senha"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <img src="eye.svg" alt="Olho" className="show-password" />
        </div>

        <button type="button"
          disabled={isLoading}
          className={isLoading ? 'disabled' : '' }
          onClick={doLogin}
        >
          {isLoading ? 'Carregando' : 'Login' }
        </button>
      </form>
    </div>
  )
}

export { Login };
