import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import Pets from "./components/Pets/Pets";
import Contact from "./components/Contact/Contact";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import FourOhFourPage from "./components/FourZeroFour/FourOFour";

import AdminLogin from "./components/AdminPanel/AdminLogin";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/AdminPanel/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}





      {/* User Login / Signup */}
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />

      {/* Admin Login - ALWAYS accessible */}
      <Route path="/admin" element={<AdminLogin />} />

       <Route
        path="/admin/dashboard"
        element={
        <ProtectedRoute adminOnly={true}>
         <AdminPanel>
          <Dashboard />
         </AdminPanel>
       </ProtectedRoute>
       }
     />


      {/* ========== USER ROUTES ========== */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Layout>
              <Services />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pets"
        element={
          <ProtectedRoute>
            <Layout>
              <Pets />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Layout>
              <Contact />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ========== ADMIN ROUTE ========== */}
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* ========== 404 ========== */}
      <Route path="*" element={<FourOhFourPage />} />
    </Routes>
  );
};

export default App;
