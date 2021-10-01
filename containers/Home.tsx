import moment from 'moment';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Filter } from '../components/Filter';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { Task } from '../types/Task';

const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [periodoDe, setPeriodoDe] = useState('');
  const [periodoAte, setPeriodoAte] = useState('');
  const [status, setStatus] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [name, setName] = useState('');
  const [finishPrevisionDate, setFinishPrevisionDate] = useState('');

  const getFilteredList = async () => {
    try{

      let filtros = `?status=${status}`;

      if(periodoAte
         && periodoDe
         && moment(periodoAte).isBefore(moment(periodoDe))) {
            return setMsgErro('Período até deve ser menor que Período de');
         }

      if(periodoDe) {
        filtros += `&finishPrevisionDateStart=${periodoDe}`
      }

      if(periodoAte) {
        filtros += `&finishPrevisionDateEnd=${periodoAte}`
      }

      setMsgErro('');
      const result = await executeRequest(`tasks${filtros}`, 'GET');

      if(result && result.data){
        setTasks(result.data);
      }
    }catch(e){
      console.log(e);
    }
  }

  const doSave = async (e : any) =>{
    try{
      setLoading(true);
      e.preventDefault();

      if(!name || !finishPrevisionDate){
        setMsgErro('Favor preencher o nome e data de previsão');
        setLoading(false);
        return;
      }

      const body = {
        name,
        finishPrevisionDate
      }

      await executeRequest('tasks', 'POST', body);
      await getFilteredList();
      closeModal();
    }catch(e : any){
      console.log(e);
      if(e?.response?.data?.error){
        setMsgErro(e?.response?.data?.error);
      }else{
        setMsgErro('Ocorreu erro ao adicionar tarefa tente novamente!');
      }
    }

    setLoading(false);
  }

  const closeModal = () => {
    setName('');
    setFinishPrevisionDate('');
    setLoading(false);
    setMsgErro('');
    setShowModal(false);
  }

  useEffect(() => {
    getFilteredList();
  }, [periodoDe, periodoAte, status]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <>
      <Header logout={logout} setShowModal={setShowModal}/>
      <Filter
        periodoDe={periodoDe}
        periodoAte={periodoAte}
        status={status}
        msgErro={msgErro}
        setPeriodoDe={setPeriodoDe}
        setPeriodoAte={setPeriodoAte}
        setStatus={setStatus}
      />
      <List tasks={tasks} getFilteredList={getFilteredList}/>
      <Footer setShowModal={setShowModal}/>
      <Modal show={showModal}
        onHide={() => closeModal()}
        className="container-modal">
          <Modal.Body>
              <p>Adicionar uma tarefa</p>
              {msgErro && <p className="error">{msgErro}</p>}
              <input type="text"
                placeholder="Nome da tarefa"
                value={name}
                onChange={e => setName(e.target.value)}/>
              <input type="text"
                placeholder="Data de previsão de conclusão"
                value={finishPrevisionDate}
                onChange={e => setFinishPrevisionDate(e.target.value)}
                onFocus={e => e.target.type = "date"}
                onBlur={e => finishPrevisionDate ? e.target.type = "date" : e.target.type = "text" }/>
          </Modal.Body>
          <Modal.Footer>
              <div className="button col-12">
                  <button
                    onClick={doSave}
                    disabled={isLoading}
                    >{isLoading ? "...Enviando dados" : "Salvar"}</button>
                  <span onClick={closeModal}>Cancelar</span>
              </div>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export { Home };
