import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom';
import context from '../context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DropdownMenu, Button } from "@radix-ui/themes";


function Header() {
	const {log,setLog}=useContext(context);

    const logoutHandler = async() => {
        const {
            data
        } = await axios.get(`${import.meta.env.VITE_BACKEND}/user/logout`, {
            withCredentials: true
        });
        console.log(data.message);
        toast.error('There is a problem in render hosting');
        setLog(false);
    }
	return (
		<div className='header'>
		<img src="logo.png" alt="" id='logo'/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Menu
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<NavLink to='/login' className='links'><DropdownMenu.Item shortcut="⌘ u">login</DropdownMenu.Item></NavLink>
				<NavLink to='/' className='links'><DropdownMenu.Item shortcut="⌘ n">new user</DropdownMenu.Item></NavLink>
				<DropdownMenu.Separator />
				<NavLink to='/' className='links'><DropdownMenu.Item shortcut="⌘ d">dashboard</DropdownMenu.Item></NavLink>
				<DropdownMenu.Separator />
				<DropdownMenu.Item color="red" onClick={logoutHandler}>logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		</div>
	)
}

export default Header

