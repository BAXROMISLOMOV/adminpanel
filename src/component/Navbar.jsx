import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useAuthstore from "../store/my-store";

function Navbar({ collapsed, setcollapsed }) {
  const state = useAuthstore();
  return (
    <div className="w-full">
      <nav className="bg-slate-800 h-20 text-white   flex    justify-between p-5   items-center">
        <div className="flex gap-5">
          <div>logo</div>
          <Button
            type="primary"
            onClick={() => {
              setcollapsed(!collapsed);
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div>{state.user.username}</div>
      </nav>
    </div>
  );
}

export default Navbar;
