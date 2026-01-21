import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setLoginError(null);            

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Invalid email or password");
      }

      const userWithToken = {
        ...data.user,
        token: data.token
      };

      dispatch({
        type: "LOGIN",
        payload: userWithToken
      });

      localStorage.setItem("user", JSON.stringify({
        email: data.email,
        name: data.name,
        token: data.token,
        role: data.role
      }));


      console.log("AUTH CONTEXT USER:", data.user);



      setIsLoading(false);
      return { success: true };

    } catch (error) {
      setLoginError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  return { login, isLoading, loginError, setLoginError };
};
