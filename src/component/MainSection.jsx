import { Route, Routes } from "react-router";
import CategoriesPage from "../pages/CategoriesPage";
import HomePage from "../pages/HomePage";
import RentsPage from "../pages/RentsPage";
import UsersPage from "../pages/UsersPage";
import Stocks from "../pages/StocksPage";

function MainSection() {
  
  return (
    <main className="bg-slate-300 p-3 h-full w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rents" element={<RentsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </main>
  );
}

export default MainSection;
