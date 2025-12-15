import React from 'react'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Services from './components/Services/Services'
import Pets from './components/Pets/Pets'
import Contact from './components/Contact/Contact'
import Auth from './components/Auth/Auth'
import { useAuthContext } from './hooks/useAuthContext'
import ProtectedRoute from './components/ProtectedRoute'



const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={
            
              <Layout>
                <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
              </Layout>
            

          }
        />

        <Route
          path='/services'
          element={
            
              <Layout>
                <Services />
              </Layout>
            

          }
        />

        <Route
          path='/pets'
          element={
            
              <Layout>
                <Pets />
              </Layout>
            


          }
        />

        <Route
          path='/contact'
          element={
            
              <Layout>
                <Contact />
              </Layout>
            

          }
        />

        {/* <Route
          path='/auth'
          element={!user ? <Auth /> : <Navigate to='/' />} /> */}



      </Routes>


    </BrowserRouter>


  )
}

export default App
