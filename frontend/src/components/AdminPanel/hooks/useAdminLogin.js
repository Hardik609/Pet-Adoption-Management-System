// // 1
// // import { useState } from 'react';
// // import { useAuthContext } from '../../../hooks/useAuthContext';

// // export const useAdminLogin = () => {
// //   const [error, setError] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { dispatch } = useAuthContext();

// //   const login = async (email, password) => {
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// //       const response = await fetch(`${API}/api/auth/admin/login`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password })
// //       });

// //       const json = await response.json();

// //       if (!response.ok || !json.success) {
// //         throw new Error(json.message || 'Admin login failed');
// //       }

// //       localStorage.setItem('user', JSON.stringify(json.user));
// //       localStorage.setItem('token', json.token);

// //       dispatch({ type: 'LOGIN', payload: json.user });

// //       setIsLoading(false);
// //       return true;
// //     } catch (err) {
// //       setError(err.message);
// //       setIsLoading(false);
// //       return false;
// //     }
// //   };

// //   return { login, isLoading, error };
// // };

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuthContext } from "../../../hooks/useAdminAuthContext";

// export const useAdminLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const { dispatch } = useAdminAuthContext();
//   const navigate = useNavigate();

//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/admin/login`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Admin login failed");
//       }

//       // ✅ CREATE ADMIN OBJECT
//       const adminData = {
//         ...data.admin,
//         role: "ADMIN",
//         token: data.token,
//       };

//       // ✅ STORE SEPARATELY
//       localStorage.setItem("admin", JSON.stringify(adminData));

//       // ✅ UPDATE ADMIN CONTEXT
//       dispatch({ type: "ADMIN_LOGIN", payload: adminData });

//       // ✅ REDIRECT TO ADMIN PANEL (NOT /admin)
//       navigate("/admin-panel", { replace: true });

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { login, error, isLoading };
// };


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuthContext } from "../../../hooks/useAdminAuthContext";

// export const useAdminLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const { dispatch } = useAdminAuthContext();
//   const navigate = useNavigate();

//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/admin/login`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Admin login failed");
//       }

//       // ✅ CREATE ADMIN OBJECT
//       const adminData = {
//         ...data.admin,
//         role: "ADMIN",
//         token: data.token,
//       };

//       // ✅ STORE SEPARATELY
//       localStorage.setItem("admin", JSON.stringify(adminData));

//       // ✅ UPDATE ADMIN CONTEXT
//       dispatch({ type: "ADMIN_LOGIN", payload: adminData });

//       // ✅ REDIRECT TO ADMIN PANEL (NOT /admin)
//       navigate("/admin-panel", { replace: true });

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { login, error, isLoading };
// };


import { useState } from 'react';
import { useAdminAuthContext } from '../../../hooks/useAdminAuthContext';

export const useAdminLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAdminAuthContext();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const adminLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || 'Invalid credentials');
        return false;
      }

      // Save admin to localStorage
      localStorage.setItem('admin', JSON.stringify(json));

      // Update auth context
      dispatch({ type: 'ADMIN_LOGIN', payload: json });

      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      setError('Network error. Please try again.');
      console.error('Admin login error:', err);
      return false;
    }
  };

  return { adminLogin, isLoading, error };
};