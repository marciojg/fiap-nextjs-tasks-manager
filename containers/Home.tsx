import type { NextPage } from 'next';
import React from 'react';
import { Header } from '../components/Header';
import { AccessTokenProps } from '../types/AccessTokenProps';

const Home: NextPage<AccessTokenProps> = ({ setAccessToken }) => {

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <>
      <Header logout={logout} />
    </>
  )
}

export { Home };
