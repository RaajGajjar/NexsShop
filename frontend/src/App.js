import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ClientsPage from './pages/ClientsPage';
import ClientForm from './pages/ClientForm';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProductsPage from './pages/AdminProductsPage';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import ClientProductsPage from './pages/client/ClientProductsPage';
import ClientOrdersPage from './pages/client/ClientOrdersPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import AdminClientDetailsPage from './pages/AdminClientDetailsPage';
import ProductForm from './pages/ProductForm';
import OrderForm from './pages/OrderForm';
import ViewOrderPage from './pages/ViewOrderPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Home from './pages/Home';
import AdminLogin from './pages/Adminlogin';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminContactMessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <ProtectedRoute>
              <ClientForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/edit/:id"
          element={
            <ProtectedRoute>
              <ClientForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute>
              <AdminClientDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Client routes */}
        <Route
          path="/client/dashboard"
          element={
            <ClientProtectedRoute>
              <ClientDashboard />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/products"
          element={
            <ClientProtectedRoute>
              <ClientProductsPage />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/products/new"
          element={
            <ClientProtectedRoute>
              <ProductForm isEdit={false} />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/products/edit/:id"
          element={
            <ClientProtectedRoute>
              <ProductForm isEdit={true} />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/orders"
          element={
            <ClientProtectedRoute>
              <ClientOrdersPage />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/orders/new"
          element={
            <ClientProtectedRoute>
              <OrderForm />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/orders/:id"
          element={
            <ClientProtectedRoute>
              <ViewOrderPage />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/profile"
          element={
            <ClientProtectedRoute>
              <ClientProfilePage />
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/client/products/:id"
          element={
            <ClientProtectedRoute>
              <ProductDetailsPage />
            </ClientProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
