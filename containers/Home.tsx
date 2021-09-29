import type { NextPage } from 'next';
import { AccessTokenProps } from '../types/AccessTokenProps';

const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <div className="container-home">
      <h1>Home</h1>
      <button value="Sair" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export { Home };
