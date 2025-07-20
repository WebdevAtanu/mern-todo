import { useContext, useEffect, useState } from "react";
import context from "../context";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Generative from "./Generative";
import Cards from "./Cards";
import {
  Flex,
  Button,
  Text,
  TextField,
  TextArea,
  Avatar,
  Spinner,
} from "@radix-ui/themes";
import axiosInstance from "../service/axiosInterceptor";

function Dashboard() {
  const { user, log } = useContext(context);
  const [tasks, setTasks] = useState([]);
  const [taskdetails, setTaskdetails] = useState({
    title: "",
    description: "",
  });
  const [refresh, setRefresh] = useState(0);
  const [load, setLoad] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/task/mytask");
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const result = await axiosInstance.post(`/task/add`, taskdetails, {
        header: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(result.data.message);
      setRefresh(refresh + 1);
      setLoad(false);
      setTaskdetails({ title: "", description: "" });
    } catch {
      toast.error("Operation failed");
      setLoad(false);
    }
  };

  if (!log) return <Navigate to="/" />;

  return (
    <>
      <div className="dashboard">
        <div id="sidebar">
          <Flex className="user" justify="between" align="center">
            <Avatar src="avatar.jpg" mfallback="A" />
            <p>{user.name}</p>
          </Flex>

          <div className="addtask">
            <form action="" onSubmit={handleSubmit}>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Title
                  </Text>
                  <TextField.Root
                    placeholder="title"
                    value={taskdetails.title}
                    onChange={(e) =>
                      setTaskdetails({ ...taskdetails, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Description
                  </Text>
                  <TextArea
                    value={taskdetails.description}
                    onChange={(e) =>
                      setTaskdetails({
                        ...taskdetails,
                        description: e.target.value,
                      })
                    }
                    placeholder="description…"
                  />
                </label>
                <Flex gap="3" mt="4" justify="center">
                  <Button
                    type="submit"
                    disabled={load}
                    aria-busy={load}
                    aria-live="polite"
                  >
                    {load ? "wait..." : "Add"}
                  </Button>
                </Flex>
              </Flex>
            </form>
          </div>
        </div>

        <div id="taskbar">
          {tasks.length === 0 && !loadingTimeout ? (
            <Flex justify="center" align="center" direction="column" gap="3">
              <Spinner size="3" />
              <h3>Previous tasks is loading...</h3>
            </Flex>
          ) : tasks.length === 0 && loadingTimeout ? (
            <Flex justify="center" align="center" direction="column" gap="3">
              <h3>No task found!</h3>
            </Flex>
          ) : (
            <div className="showtasks">
              {tasks?.map((item, i) => (
                <Cards
                  item={item}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  key={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Generative setRefresh={setRefresh} refresh={refresh} />
    </>
  );
}

export default Dashboard;
