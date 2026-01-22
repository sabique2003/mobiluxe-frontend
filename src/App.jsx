import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./assets/pages/auth/Login";
import Register from "./assets/pages/auth/Register";

import AdminDashboard from "./assets/pages/admin/Dashboard";
import StaffDashboard from "./assets/pages/staff/Dashboard";
import Products from "./assets/pages/admin/Products";
import MyProducts from "./assets/pages/staff/Products";
import AddProduct from "./assets/pages/staff/AddProduct";
import StaffApproval from "./assets/pages/admin/StaffApproval";
import ClientProducts from "./assets/pages/client/ProductList";
import StaffEditProduct from "./assets/pages/staff/StaffEditProduct";

import ProtectedRoute from "./assets/routes/ProtectedRoute";
import AdminRoute from "./assets/routes/AdminRoute";
import StaffRoute from "./assets/routes/StaffRoute";
import CartPage from "./assets/pages/client/CartPage";
import ProductList from "./assets/pages/client/ProductList";
import ProductDetails from "./assets/pages/client/ProductDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/staff/dashboard"
          element={
            <StaffRoute>
              <StaffDashboard />
            </StaffRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ClientProducts />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <Products />
    </AdminRoute>
  }
/>

<Route
  path="/staff/products"
  element={
    <StaffRoute>
      <MyProducts />
    </StaffRoute>
  }
/>

<Route
  path="/staff/add-product"
  element={
    <StaffRoute>
      <AddProduct />
    </StaffRoute>
  }
/>

<Route
  path="/admin/staff"
  element={
    <AdminRoute>
      <StaffApproval />
    </AdminRoute>
  }
/>

<Route
  path="/staff/products/:id/edit"
  element={
    <StaffRoute>
      <StaffEditProduct />
    </StaffRoute>
  }
/>

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <ProductList />
    </ProtectedRoute>
  }
/>

<Route
  path="/products/:id"
  element={
    <ProtectedRoute>
      <ProductDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  }
/>




        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
