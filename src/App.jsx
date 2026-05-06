import { useState, useEffect } from "react";
import Preloader from "./components/common/Preloader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ScrollToTop from "./components/common/ScrollToTop";
import MoveToTop from "./components/common/MoveToTop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./context/AuthProvider";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";

import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";

import Shop from "./pages/Shop";
import AdminProducts from "./pages/admin/AdminProducts";

import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Preloader message="Welcome to Pepal Barry. Where every jar feels homemade." />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MoveToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrderHistory />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route path="/checkout/*" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
