import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import context from '../context';
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {
	const {log,setLog}=useContext(context);
	const logoutHandler=async ()=>{
		const {data}=await axios.get('http://localhost:8080/user/logout',{
			withCredentials:true
		});
		toast(data.message);
		setLog(false);
	}
	return (
		<div className='header'>
		<div>
			LOGO
		</div>
		<div className='links'>
			<Link to={'/'}>Home</Link>
			{
				log?<Link to={'/dashboard'}>Dashboard</Link>:<Link to={'/register'}>Register</Link>
			}
			
			{
				log?<button id='logout' onClick={logoutHandler}>Logout</button>:<Link to={'/login'}>Login</Link>
			}
			
		</div>
		</div>
	)
}

export default Header

