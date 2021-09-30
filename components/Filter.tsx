import type { NextPage } from 'next';
import { useState } from 'react';

type FilterProps = {

}

const Filter: NextPage<FilterProps> = ({ }) => {

  const [showFilters, setShowFilter] = useState(false);

  return (
    <div className="container-filter">
      <div className="title">
        <span>Tarefas</span>
        <img src="/filtro.svg" alt="Filtrar tarefas" onClick={() => setShowFilter(!showFilters)} />
        <div className="form">
          <div>
            <label>Data prevista de conclusão de:</label>
            <input type="date" />
          </div>
          <div>
            <label> até:</label>
            <input type="date" />
          </div>
          <div className="line"/>
          <div>
            <label>Status:</label>
            <select>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluídas</option>
            </select>
          </div>
        </div>
      </div>
      {showFilters && <div className="filtrosMobile">
        <div>
          <label>Período de:</label>
          <input type="date" />
        </div>
        <div>
          <label>Período até:</label>
          <input type="date" />
        </div>
        <div>
          <label>Status:</label>
          <select>
            <option value={0}>Todas</option>
            <option value={1}>Ativas</option>
            <option value={2}>Concluídas</option>
          </select>
        </div>
      </div>}
    </div>
  )
}

export { Filter };
