import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { SignIn } from '../containers/SignIn';

const Index: NextPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const [goToLogin, setgoToLogin] = useState(true);

  useEffect(() => {
    console.log(goToLogin);
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if(token) {
        setAccessToken(token);
      }
    }
  }, [accessToken, goToLogin])

  return (
    !accessToken
    ? goToLogin
      ? <Login setAccessToken={setAccessToken} setgoToLogin={setgoToLogin} />
      : <SignIn setgoToLogin={setgoToLogin} />
    : <Home setAccessToken={setAccessToken} />
  )
}

export default Index
