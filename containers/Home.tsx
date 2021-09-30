import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Filter } from '../components/Filter';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { Task } from '../types/Task';

const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
  const [tasks, setTasks] = useState<Task[]>([
    // {_id: 'asd', name: 'asasds', finishPrevisionDate: '1232', userId: '123', finishDate: new Date() }
  ])

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <>
      <Header logout={logout} />
      <Filter />
      <List tasks={tasks}/>
    </>
  )
}

export { Home };
