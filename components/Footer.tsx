import type { NextPage } from 'next';

type FooterProps = {
  setShowModal(b: boolean): void
}

const Footer: NextPage<FooterProps> = ({ setShowModal }) => {

   return (
    <div className="container-footer">
      <button onClick={() => setShowModal(true)}>
        <img src="/add.svg" alt="Adicionar Tarefa"/>
        Adicionar Tarefa
      </button>
      <span>© Copyright {new Date().getFullYear()} Fiap. Todos os direitos reservados.</span>

    </div>
  )
}

export { Footer };
