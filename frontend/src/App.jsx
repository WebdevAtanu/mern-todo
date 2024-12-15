import { useState,useEffect } from 'react'
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Header from './comps/Header';
import Register from './comps/Register';
import Login from './comps/Login';
import Dashboard from './comps/Dashboard';
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
