import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
      </Routes>
    </div>
  )
}

export default App;