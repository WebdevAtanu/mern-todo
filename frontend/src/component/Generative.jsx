import { useState, useEffect } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import toast from "react-hot-toast";
import axiosInstance from "../service/axiosInterceptor";

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

  const handleSubmit = async (todo) => {
    try {
      const result = await axiosInstance.post(
        `/task/add`,
        { title: "Task from CopilotKit", description: todo },
        {
          header: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      props.setRefresh(props.refresh + 1);
    } catch {
      toast.error("Operation failed");
    }
  };

  useEffect(() => {
    todos.forEach((item) => handleSubmit(item));
  }, [todos]);

  return <></>;
}
