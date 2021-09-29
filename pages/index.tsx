import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msgError, setMsgError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doLogin = async(e: any) => {
    try {
      setLoading(true);

      e.preventDefault();
      setMsgError('');

      if(!login || !password) {
        setMsgError('Parâmetros de entrada inválidos');
        setLoading(false);
        return;
      }

    } catch (error) {
      console.log(error);
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

export default Home
