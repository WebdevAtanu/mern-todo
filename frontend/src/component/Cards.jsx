import React,{useState} from 'react'
import { Box, Card, Text, Flex, Button,Separator } from "@radix-ui/themes";
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

function Cards({item,refresh,setRefresh}) {
	const [loader,setLoader]=useState(false);
    const editHandler = async(id) => {
        toast.loading('wait...')
        setLoader(true);
        try {
            const result = await axios.put(`${import.meta.env.VITE_BACKEND}/task/${id}`, {}, {
                withCredentials: true
            });
            toast.dismiss();
            toast.success(result.data.message);
            setLoader(false);
            setRefresh(refresh + 1);
        } catch (error) {
            toast.error('Operation failed');
            setLoader(false);
        }
    }

    const deleteHandler = async(id) => {
        toast.loading('wait...')
        setLoader(true);
        try {
            const result = await axios.delete(`${import.meta.env.VITE_BACKEND}/task/${id}`, {
                withCredentials: true
            });
            toast.dismiss();
            toast.success(result.data.message);
            setLoader(false);
            setRefresh(refresh + 1);
        } catch (error) {
            toast.error('Operation failed');
            setLoader(false);
        }
    }
	return (
	<Card className='cards'>
		<Flex direction='column' gap="3" justify='between' height='100%'>
			<Box>
				<Text as="div" size="4" weight="bold">{item.title}</Text>
				<Text as="div" size="3">{item.description}</Text>
                <Separator my="2" size="4" />
                <Text as="div" size="1" color='gray'>{moment(item.createdAt).format('Do MMMM, h:mm:ss a')}</Text>
			</Box>
			<Flex gap="1">
				<Button id='edit' onClick={()=>editHandler(item._id)} disabled={loader} aria-busy={loader} aria-live="polite">{item.isComplete?<p><i className="bi bi-patch-check-fill"></i> checked</p>:<p><i className="bi bi-patch-check"></i> check</p>}</Button>
				<Button id='delete' color="red" onClick={()=>deleteHandler(item._id)} disabled={loader} aria-busy={loader} aria-live="polite"><p><i className="bi bi-trash"></i> delete</p></Button>
			</Flex>
		</Flex>
	</Card>
	)
}

export default Cards