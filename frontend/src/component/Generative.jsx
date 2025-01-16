import {useState,useEffect} from 'react'
import { useCopilotAction } from "@copilotkit/react-core"; 
import axios from 'axios';
import toast from 'react-hot-toast';
 
export default function Generative(props) {
  const [todos, setTodos] = useState([]);
 
  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      setTodos([...todos, todoText]);
    },
  });

  const handleSubmit=async (todo)=>{
    try{
    const result=await axios.post(`${import.meta.env.VITE_BACKEND}/task/add`,{title:'Task from AI',description:todo},{
      header:{
        'content-type':'application/json'
      },
      withCredentials:true
    });
    toast.success(result.data.message);
    props.setRefresh(props.refresh+1);
    }catch(error){
      toast.error('Operation failed');
    }
  }

  useEffect(()=>{
    todos.forEach(item=>handleSubmit(item))
  },[todos])
 
  return (
    <>
    </>
  );
}