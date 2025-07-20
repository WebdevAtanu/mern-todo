import { useState, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import context from "../context";
import toast from "react-hot-toast";
import { Flex, Button, Text, TextField } from "@radix-ui/themes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const { log, setLog } = useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const message = result?.data?.message || "";

      if (message.toLowerCase().includes("already logged in")) {
        toast.error(message);
        setLog(false);
      } else {
        toast.success(message);
        setLog(true);
      }
    } catch {
      toast.error("Invalid username or password");
      setLog(false);
    } finally {
      setLoad(false);
    }
  };

  if (log) return <Navigate to="/dashboard" />;

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              placeholder="freja@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <Flex gap="3" mt="4" justify="end">
            <Button
              type="submit"
              disabled={load}
              aria-busy={load}
              aria-live="polite"
            >
              {load ? "wait..." : "Login"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}

export default Login;
