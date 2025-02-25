import { useState } from "react";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";
import useAuthstore from "./store/my-store";
import MainSection from "./component/MainSection";

function App() {
  const [collapsed, setcollapsed] = useState(true);
  const authState = useAuthstore();

  return (
    <div className="h-screen">
      {authState.user ? (
        <>
          <Navbar collapsed={collapsed} setcollapsed={setcollapsed} />
          <div className="flex h-full" > 

          <SideBar collapsed={collapsed} />
          <MainSection />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
