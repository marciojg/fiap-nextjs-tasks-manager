import type { NextPage } from 'next';

type HeaderProps = {
  logout(): void
}

const Header: NextPage<HeaderProps> = ({ logout }) => {

  const fullName = localStorage.getItem('userName');
  const userName = fullName?.split(' ')[0] || '';

  return (
    <div className="container-header">
      <img src="logo.svg" alt="Logo Fiap" className="logo"/>

      <button><span>+</span> Adicionar Tarefa</button>

      <div className="mobile">
        <span>Olá, {userName}</span>
        <img src="/exit-mobile.svg" alt="Deslogar" onClick={logout}/>
      </div>

      <div className="desktop">
        <span>Olá, {userName}</span>
        <img src="/exit-desktop.svg" alt="Deslogar" onClick={logout}/>
      </div>
    </div>
  )
}

export { Header };
