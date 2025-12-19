/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [signupError, setSignupError] = useState(null);
  const [signupIsLoading, setSignupIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, otp) => {
    setSignupIsLoading(true);
    setSignupError(null);

    console.log(import.meta.env.VITE_API_URL);


    try {
      const otpResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/otp/verify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      }
    );

      const jsonOtp = await otpResponse.json();
      if (!otpResponse.ok) {
        setSignupIsLoading(false);
        setSignupError(jsonOtp.error || 'OTP verification failed. Please try again.');
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
          setSignupIsLoading(false);
          setSignupError(json.error || 'Something went wrong. Please try again.');
        } else {
          localStorage.setItem('user', JSON.stringify(json));

          dispatch({ type: 'LOGIN', payload: user });

          setSignupIsLoading(false);
          setSignupError(null);
        }
      }
    } catch (error) {
      setSignupIsLoading(false);
      setSignupError('Network error. Please try again.');
    }
  };

  return { signup, signupIsLoading, signupError, setSignupError };
};
