import React,{useContext,useEffect,useState} from 'react';
import context from '../context';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
	const {user,log}=useContext(context);
	const [tasks,setTasks]=useState([]);
	const [title,setTitle]=useState();
	const [description,setDescription]=useState();
	const [refresh,setRefresh]=useState(0);
	useEffect(()=>{
		axios.get('http://localhost:8080/task/mytask',{
			withCredentials:true
		})
		.then(res=>setTasks(res.data.tasks))
		.catch(error=>console.log(error))
	},[refresh])

	const handleSubmit=async (e)=>{
		e.preventDefault();
		try{
		const result=await axios.post('http://localhost:8080/task/add',{title,description},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		toast.success(result.data.message);
		setRefresh(refresh+1);
		}catch(error){
			toast.error('Operation failed');
		}
	}

	const editHandler=async(id)=>{
		try{
		const result=await axios.put(`http://localhost:8080/task/${id}`,{},{
			withCredentials:true
		});
		toast.success(result.data.message);
		setRefresh(refresh+1);
		}catch(error){
			toast.error('Operation failed');
		}
	}

	const deleteHandler=async(id)=>{
		try{
		const result=await axios.delete(`http://localhost:8080/task/${id}`,{
			withCredentials:true
		});
		toast.success(result.data.message);
		setRefresh(refresh+1);
		}catch(error){
			toast.error('Operation failed');
		}
	}

	if(!log) return <Navigate to='/'/>
	return (
		<div className='dashboard'>
		<div className="user">
			<h4>user: {user.name}</h4>
			<h4>email: {user.email}</h4>
		</div>
		<div className='addtask'>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" name='name' placeholder='Task name' value={title} onChange={e=>setTitle(e.target.value)} required/>
				<textarea name="description"  placeholder='Task description' value={description} onChange={e=>setDescription(e.target.value)} required/>
				<button type='submit'>ADD TASK</button>
			</form>
		</div>
		<div className='showtasks'>
			{
				tasks?.map((item,i)=>{
					return(
					<div className='mytask' key={i}>
					<div className="card">
					<div className="cardhead">
					<h5>serial no: {i+1}</h5>
					<p><button className='cardbtn' onClick={()=>editHandler(item._id)}><i className="bi bi-check2-square"></i></button><button className='cardbtn' onClick={()=>deleteHandler(item._id)}><i className="bi bi-trash"></i></button></p>
					</div>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<p>status: {item.isComplete?'done':'pending'}</p>
					</div>
					</div>
					)
				})
			}
		</div>
		</div>
	)
}

export default Dashboard