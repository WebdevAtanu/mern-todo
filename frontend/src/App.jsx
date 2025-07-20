import { useState, useEffect } from "react";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import User from "./component/User";
import Dashboard from "./component/Dashboard";
import context from "./context";
import axiosInstance from "./service/axiosInterceptor.js";

function App() {
  const [log, setLog] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/user/details`, {
        withCredentials: true,
      })
      .then((res) => {
        setLog(true);
        setUser(res.data.details);
      })
      .catch(() => {
        setUser({});
      });
  }, [log]);

  return (
    <context.Provider value={{ log, setLog, user }}>
      <Theme>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </context.Provider>
  );
}

export default App;
