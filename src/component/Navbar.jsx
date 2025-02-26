import {
  LeftSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileFilled,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import useAuthstore from "../store/my-store";

function Navbar({ collapsed, setcollapsed }) {
  const authState = useAuthstore();
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
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "sozlammalar",
                icon: <SettingOutlined />,
              },
              {
                key: 2,
                label: "profil",
                icon: <ProfileFilled />,
              },
              {
                key: 3,
                label: "Chiqish",
                icon: <LeftSquareOutlined />,
                onClick: () => {
                  useAuthstore.setState({
                    token: "",
                    user: null,
                  });
                },
              },
            ],
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar size="large" icon={<UserOutlined />} />
            <div className="text-sm">
              <div>
                {authState.user.firstname} {authState.user.lastName}
              </div>
              <div>@{authState.user.username}</div>
            </div>
          </div>
        </Dropdown>
      </nav>
    </div>
  );
}

export default Navbar;
