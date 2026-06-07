import { memo } from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword';
const App = () => {
  return (
    <div className='text-4xl'>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/EmailVerify' element={<EmailVerify/>}/>
     <Route path='/ResetPassword' element={<ResetPassword/>}/>
     </Routes>
    </div>
  );
};

export default memo(App);