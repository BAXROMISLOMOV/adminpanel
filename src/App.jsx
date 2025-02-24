import { useState } from "react";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";
import useAuthstore from "./store/my-store";

function App() {
  const [collapsed, setcollapsed] = useState(true);
   const  authState = useAuthstore();

  return (
    <>
      {authState.user ? (
        <>
          <Navbar collapsed={collapsed} setcollapsed={setcollapsed} />
          <SideBar collapsed={collapsed} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
