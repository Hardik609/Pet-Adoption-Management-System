import { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

export const useAdminLogin = () => {
  const [adminError, setAdminError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const adminLogin = async (email, password) => {
    setIsLoading(true);
    setAdminError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api-auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      );

      // ✅ FIRST read text to avoid “Unexpected end of JSON”
      const text = await response.text();
      const json = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(json.message || 'Invalid admin credentials');
      }

      // ✅ ROLE CHECK FROM BACKEND
      if (json.admin?.role !== 'ADMIN') {
        throw new Error('Access denied. Admin privileges required.');
      }

      // ✅ SAVE TOKEN + ADMIN DATA
      const adminData = {
        ...json.admin,
        token: json.token,     // ← IMPORTANT
        isAdmin: true
      };

      localStorage.setItem('user', JSON.stringify(adminData));
      localStorage.setItem('adminToken', json.token);

      dispatch({ type: 'LOGIN', payload: adminData });

      setIsLoading(false);
      return { success: true };

    } catch (error) {
      setAdminError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  return { adminLogin, isLoading, adminError, setAdminError };
};
