import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router";

function SideBar({ collapsed }) {
  return (
    <Menu
      className="text-left"
      style={{ padding: 4, maxWidth: 250, height: "100%" }}
      defaultSelectedKeys={["0"]}
      inlineCollapsed={collapsed}
      mode="inline"
      theme="dark"
      items={[
        {
          key: "0",
          label: <Link to="/">Home</Link>,
          icon: <HomeOutlined />,
        },
        {
          key: "1",
          label: <Link to="/products">Mahsulotlar</Link>,
          icon: <DesktopOutlined />,
        },
        {
          key: "2",
          label: <Link to="/categories">Kategoriya</Link>,
          icon: <ContainerOutlined />,
        },
      ]}
    />
  );
}

export default SideBar;
