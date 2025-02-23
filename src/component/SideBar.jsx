import { Menu } from "antd";
import { DesktopOutlined, ContainerOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import MainSection from "./MainSection";

function SideBar({ collapsed }) {

  
  
  return (
    <div className="h-screen w-screen bg-slate-300  " >
      
      
  
      <div className="w-[250px] flex h-full">
        <aside className="w-full">
          <Menu
            className="w-full h-full text-left"
            style={{ padding: 4, maxWidth: 250 }}
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
        </aside>
       
        <div className=" absolute  right-3  w-400 h-screen">
       <MainSection />

       </div>
      </div>
    </div>
  );
}

export default SideBar;
