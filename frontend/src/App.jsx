import { useState,useEffect } from 'react'
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Header from './component/Header';
import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import context from './context';
import axios from 'axios'

function App() {
  const [log,setLog]=useState(false);
  const [user,setUser]=useState({});
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND}/user/details`,{
      withCredentials:true
    })
    .then(res=>{
      setLog(true);
      setUser(res.data.details);
    })
    .catch(error=>{
      setUser({});
    })
  },[log])
  return (
    <context.Provider value={{log,setLog,user}}>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={log?<Dashboard/>:<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </context.Provider>
  )
}

export default App
