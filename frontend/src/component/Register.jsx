import { useState, useContext } from "react";
import axios from "axios";
import context from "../context";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Flex, Button, Text, TextField } from "@radix-ui/themes";

function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [load, setLoad] = useState(false);
  const { log, setLog } = useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND}/user/new`,
        userDetails,
        {
          header: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast(result.data.message);
      setLog(true);
      setLoad(false);
    } catch (error) {
      toast(error.response.data.message);
      setLog(false);
      setLoad(false);
    }
  };

  if (log) return <Navigate to="/dashboard" />;

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="phunsukh wangdu"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              placeholder="mr.wangdu@example.com"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              placeholder="create password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
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
              {load ? "wait..." : "Save"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}

export default Register;
