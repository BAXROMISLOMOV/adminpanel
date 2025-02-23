import { useState } from "react";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";

function App() {
  const [collapsed, setcollapsed] = useState(true);
  
  return (
    <>
      <Navbar collapsed={collapsed} setcollapsed={setcollapsed} />
      <SideBar collapsed={collapsed} />


    </>
  );
}

export default App;
