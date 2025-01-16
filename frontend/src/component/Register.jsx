import React,{useState,useContext} from 'react';
import axios from 'axios';
import context from '../context';
import {Navigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { Dialog, Flex, Button, Text, TextField } from "@radix-ui/themes";

function Register() {
	const [name,setName]=useState("");
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [load,setLoad]=useState(false);
	const {log,setLog}=useContext(context);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND}/user/new`, {
                name,
                email,
                password
            }, {
                header: {
                    'content-type': 'application/json'
                },
                withCredentials: true
            });
            toast(result.data.message);
            setLog(true);
            setLoad(false);
        } catch (error) {
            toast(error.response.data.message);
            setLog(false);
            setLoad(false);
        }
    }

	if(log) return <Navigate to='/dashboard'/>
	
	return (
		<div className='register'>
			<form action="" onSubmit={handleSubmit}>
			<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">Name</Text>
				<TextField.Root placeholder="Freja Johnsen" value={name} onChange={e=>setName(e.target.value)} required />
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">Email</Text>
				<TextField.Root placeholder="freja@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">Password</Text>
				<TextField.Root placeholder="create password" value={password} onChange={e=>setPassword(e.target.value)} required />
			</label>
			<Flex gap="3" mt="4" justify="end">
				<Button type='submit' disabled={load} aria-busy={load} aria-live="polite">{load ? "wait..." : "Save"}</Button>
			</Flex>
			</Flex>
			</form>
		</div>
	)
}

export default Register