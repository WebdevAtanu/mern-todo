import {useState} from 'react'
import { useCopilotAction } from "@copilotkit/react-core"; 
import axios from 'axios';
import toast from 'react-hot-toast';
 
export default function Generative(props) {
  const [todos, setTodos] = useState([]);
  const [load,setLoad]=useState(false);
 
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
    setLoad(true);
    try{
    const result=await axios.post(`${import.meta.env.VITE_BACKEND}/task/add`,{title:'Task from AI',description:todo},{
      header:{
        'content-type':'application/json'
      },
      withCredentials:true
    });
    toast.success(result.data.message);
    props.setRefresh(props.refresh+1);
    setLoad(false);
    }catch(error){
      toast.error('Operation failed');
      setLoad(false);
    }
  }
 
  return (
    <div className='generative'>
    <h2>Generative todos</h2>
    <h4>You can ask the AI for any help, just click on the chat box.</h4>
    {
      todos.length!=0?
      <>
      <p>Here is your temporary todo list. from here you can add these todos to your bucket list.</p>
      <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Add this task</th>
      </tr>
    </thead>
      <tbody>
        {
          todos?.map((item,i)=>{
            return(
              <tr>
                <td>Task from AI</td>
                <td>{item}</td>
                <td><button onClick={()=>handleSubmit(item)} disabled={load} aria-busy={load} aria-live="polite">Add</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    <button id='clear' onClick={()=>setTodos([])}>Clear all</button>
    </>
    :
    null
    }
    </div>
  );
}