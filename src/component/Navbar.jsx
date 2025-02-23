import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Navbar({ collapsed, setcollapsed }) {
  return (
    <div className="w-screen">
      <nav className="bg-slate-800 h-20 text-white   items-center">
        <div className="flex gap-2  pt-7 justify-between p-4  items-center">
          <div className="flex gap-5">
            <div>logo</div>
            <Button
              type="primary"
              onClick={() => {
                setcollapsed(!collapsed);
              }}
              style={{ marjinbuttom: 16, background: "none", color: "blue " }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          <div>Avatar</div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
