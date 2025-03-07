import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import Login from "../pages/Login/login";
import DashboardLayout from "../components/Layout";
import Home from "../pages/Home/Home";

import CreateProduct from "../components/Create_form/CreateProduct";
import CreateAdmin from "../components/Create_form/CreateAdmin";

import ShowAdmins from "../components/List/ShowAdmins";
import ShowProducts from "../components/List/ShowProducts";

import ErrorPage from "../pages/errorPage";
import Details from "../pages/Product/details";
import AddWarranty from "../pages/Login/addWarranty";
import ProductPage from "../pages/Product/product";
const isAuthenticated = () => !!Cookies.get("token");

const PrivateRoute = ({ element }) => {
   return isAuthenticated() ? element : <Navigate to="/login" />;;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/"
          element={<PrivateRoute element={<DashboardLayout />} />}
        >
          <Route index element={<Home />} />
          <Route path="products/add-Product" element={<CreateProduct />} />
          <Route path="products/show-Product" element={<ShowProducts />} />
          <Route path="products" element={<ShowProducts />} />
          <Route path="admins" element={<ShowAdmins />} />
          <Route path="admins/add-admin" element={<CreateAdmin />} />
          <Route path="admins/show-admin" element={<ShowAdmins />} />
        </Route>

        <Route path="Product/:productId" element={<ProductPage />} />
        {/* <Route path="Product" element={<Details />} /> */}
        {/* <Route path="AddWarranty" element={<AddWarranty />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
