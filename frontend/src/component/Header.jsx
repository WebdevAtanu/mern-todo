import { useContext } from "react";
import { NavLink } from "react-router-dom";
import context from "../context";
import toast from "react-hot-toast";
import { DropdownMenu, Button } from "@radix-ui/themes";
import axiosInstance from "../service/axiosInterceptor";

function Header() {
  const { log, setLog } = useContext(context);

  const logoutHandler = async () => {
    const { data } = await axiosInstance.get(`/user/logout`);
    toast.success(data.message);
    setLog(false);
  };

  return (
    <div className="header">
      <img src="logo.png" alt="" id="logo" />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Menu <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {log ? (
            <NavLink to="/" className="links">
              <DropdownMenu.Item shortcut="⌘ u">user</DropdownMenu.Item>
            </NavLink>
          ) : (
            <NavLink to="/dashboard" className="links">
              <DropdownMenu.Item shortcut="⌘ d">dashboard</DropdownMenu.Item>
            </NavLink>
          )}
          <DropdownMenu.Separator />
          {log ? (
            <DropdownMenu.Item color="red" onClick={logoutHandler}>
              logout
            </DropdownMenu.Item>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Header;
