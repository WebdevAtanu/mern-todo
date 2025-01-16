import React,{useContext,useEffect,useState} from 'react';
import context from '../context';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Generative from './Generative'
import Cards from './Cards'
import { Flex, Button, Text, TextField, TextArea, Avatar, Spinner } from "@radix-ui/themes";

function Dashboard() {
	const {user,log}=useContext(context);
	const [tasks,setTasks]=useState([]);
	const [title,setTitle]=useState("");
	const [description,setDescription]=useState("");
	const [refresh,setRefresh]=useState(0);
	const [load,setLoad]=useState(false);
	const [loader,setLoader]=useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/task/mytask`, {
                withCredentials: true
            })
            .then(res => setTasks(res.data.tasks))
            .catch(error => console.log(error))
    }, [refresh])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND}/task/add`, {
                title,
                description
            }, {
                header: {
                    'content-type': 'application/json'
                },
                withCredentials: true
            });
            toast.success(result.data.message);
            setRefresh(refresh + 1);
            setLoad(false);
            setTitle("");
            setDescription("");
        } catch (error) {
            toast.error('Operation failed');
            setLoad(false);
        }
    }

	if(!log) return <Navigate to='/'/>

	return (
		<>
		<div className='dashboard'>
		<div id="sidebar">
			<Flex className='user' justify='between' align='center'>
				<Avatar src="avatar.jpg"mfallback="A"/>
				<p>{user.name}</p>
			</Flex>
		
			<div className='addtask'>
				<form action="" onSubmit={handleSubmit}>
					<Flex direction="column" gap="3">
					<label>
						<Text as="div" size="2" mb="1" weight="bold">Title</Text>
						<TextField.Root placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} required />
					</label>
					<label>
						<Text as="div" size="2" mb="1" weight="bold">Description</Text>
						<TextArea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Task description…" />
					</label>
					<Flex gap="3" mt="4" justify="center">
						<Button type='submit' disabled={load} aria-busy={load} aria-live="polite">{load ? "wait..." : "Add"}</Button>
					</Flex>
					</Flex>
				</form>
			</div>
		</div>

		<div id='taskbar'>
		{
		tasks.length==0?
		<Flex justify='center' align='center' direction='column' gap='3'>
			<Spinner size="3" />
			<h3>data is loading...</h3>
		</Flex>
			:
		<div className='showtasks'>
				{
					tasks?.map((item,i)=>{
						return(
							<Cards item={item} setRefresh={setRefresh} refresh={refresh} key={i}/>
						)
					})
				}
		</div>
		}
		</div>
		</div>
		<Generative setRefresh={setRefresh} refresh={refresh}/>
	</>
	)
}

export default Dashboard