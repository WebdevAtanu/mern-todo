import React,{useContext,useEffect,useState} from 'react';
import context from '../context';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Generative from './Generative'

function Dashboard() {
	const {user,log}=useContext(context);
	const [tasks,setTasks]=useState([]);
	const [title,setTitle]=useState("");
	const [description,setDescription]=useState("");
	const [refresh,setRefresh]=useState(0);
	const [load,setLoad]=useState(false);
	const [loader,setLoader]=useState(false);
	useEffect(()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/task/mytask`,{
			withCredentials:true
		})
		.then(res=>setTasks(res.data.tasks))
		.catch(error=>console.log(error))
	},[refresh])

	const handleSubmit=async (e)=>{
		e.preventDefault();
		setLoad(true);
		try{
		const result=await axios.post(`${import.meta.env.VITE_BACKEND}/task/add`,{title,description},{
			header:{
				'content-type':'application/json'
			},
			withCredentials:true
		});
		toast.success(result.data.message);
		setRefresh(refresh+1);
		setLoad(false);
		setTitle("");
		setDescription("");
		}catch(error){
			toast.error('Operation failed');
			setLoad(false);
		}
	}

	const editHandler=async(id)=>{
		console.log(id)
		try{
		const result=await axios.put(`${import.meta.env.VITE_BACKEND}/task/${id}`,{
			withCredentials:true
		});
		toast.success(result.data.message);
		setRefresh(refresh+1);
		}catch(error){
			toast.error('Operation failed');
		}
	}

	const deleteHandler=async(id)=>{
		setLoader(true);
		try{
		const result=await axios.delete(`${import.meta.env.VITE_BACKEND}/task/${id}`,{
			withCredentials:true
		});
		toast.success(result.data.message);
		setLoader(false);
		setRefresh(refresh+1);
		}catch(error){
			toast.error('Operation failed');
			setLoader(false);
		}
	}

	if(!log) return <Navigate to='/'/>
	return (
		<>
		<div className='dashboard'>
		<div className="inputs">
		<div className='addtask'>
		<div className="user">
			<h3>user: {user.name}</h3>
			<h3>email: {user.email}</h3>
		</div>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" name='name' placeholder='Task name' value={title} onChange={e=>setTitle(e.target.value)} required/>
				<textarea name="description"  placeholder='Task description' value={description} onChange={e=>setDescription(e.target.value)} required/>
				<button type='submit' disabled={load} aria-busy={load} aria-live="polite">{load ? "wait..." : "Add task"}</button>
			</form>
		</div>
		</div>
		<div className='showtasks'>
		<h2>My bucket list</h2>
		<table>
		<thead>
			<tr>
				<th>Serial</th>
				<th>Title</th>
				<th>Description</th>
				<th>Delete</th>
			</tr>
		</thead>
			<tbody>
				{
					tasks?.map((item,i)=>{
						return(
							<tr key={i}>
								<td><h4>{i+1}</h4></td>
								<td>{item.title}</td>
								<td>{item.description}</td>
								<td><button id='delete' onClick={()=>deleteHandler(item._id)} disabled={loader} aria-busy={loader} aria-live="polite"><i className="bi bi-trash"></i></button></td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
		</div>
		</div>
		<Generative setRefresh={setRefresh} refresh={refresh}/>
	</>
	)
}

export default Dashboard