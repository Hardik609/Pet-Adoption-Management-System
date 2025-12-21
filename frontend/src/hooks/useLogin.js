/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [loginError, setloginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setloginError(null);

    //console.log(import.meta.env.VITE_API_URL);


    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setloginError(json.error || 'Login failed. Please try again.');
      } else {
        localStorage.setItem('user', JSON.stringify(json));

        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      }
    } catch (loginError) {
      setIsLoading(false);
      setloginError('Network loginError. Please try again.');
    }
  };

  return { login, isLoading, loginError, setloginError };
};