import type { NextPage } from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';
import { AccessProps } from '../types/AccessProps';

const SignIn: NextPage<AccessProps> = ({ setgoToLogin }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doSignIn = async(e: any) => {
    try {
      setLoading(true);

      e.preventDefault();

      if(!name || !email || !password) {
        setMsgError('Parâmetros de entrada inválidos');
        return;
      }

      const result = await executeRequest('user', 'POST', { name, email, password });

      setMsgError('');
      if(result && result.data) {
        console.log(result);
        setgoToLogin(true);
      } else {
        setMsgError('Não foi possível criar este usuário, tente novamente');
      }
    } catch (error: any) {
      console.log(error);

      if(error?.response?.data?.error) {
        setMsgError(error?.response?.data?.error);
      } else {
        setMsgError('Ocorreu um erro ao processar o cadastro, tente novamente');
      }
    }

    setLoading(false);
    // setgoToLogin(false);
  }

  return (
    <div className="container-signin">
      <img src="logo.svg" alt="Logo Fiap" className="logo"/>
      <form>
        {msgError && <p>{msgError}</p>}

        <div className="input">
          <img src="name.svg" alt="Nome"/>
          <input type="text" placeholder="Nome"
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src="mail.svg" alt="Email"/>
          <input type="text" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)}
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
          onClick={doSignIn}
        >
          {isLoading ? 'Carregando' : 'Cadastrar' }
        </button>

        <span onClick={ () => setgoToLogin(true) }>
          Já tem uma conta? Entre
        </span>
      </form>
    </div>
  )
}

export { SignIn };
