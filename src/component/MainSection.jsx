import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/Productspage";
import CategoriesPage from "../pages/CategoriesPage";

function MainSection() {
  
  return (
    <main className="bg-slate-300  p-3">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </main>
  );
}

export default MainSection;
