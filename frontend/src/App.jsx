/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from './components/Layout'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Services from './components/Services/Services'
import Pets from './components/Pets/Pets'
import Contact from './components/Contact/Contact'
import Auth from './components/Auth/Auth'
import { useAuthContext } from './hooks/useAuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile/Profile'
import FourOhFourPage from './components/FourZeroFour/FourOFour'



const App = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/services'
        element={
          <ProtectedRoute user={user}>
            <Layout>
              <Services />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pets'
        element={
          <ProtectedRoute user={user}>
            <Layout>
              <Pets />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <ProtectedRoute user={user}>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/contact'
        element={
          <ProtectedRoute user={user}>
            <Layout>
              <Contact />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate to="/" />}
      />

      <Route
        path="/*"
        element={<FourOhFourPage/>}
      />
    </Routes>
  )
}

export default App
