// import { createContext, useReducer, useEffect } from "react";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         user: action.payload,
//         isAdmin: action.payload?.role === "ADMIN",
//       };

//     case "LOGOUT":
//       return { user: null, isAdmin: false };

//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//     isAdmin: false,
//   });

//   useEffect(() => {
//     // 🔥 AUTO ADMIN LOGIN
//     const adminUser = {
//       id: 1,
//       name: "Admin",
//       email: "admin@petadoption.com",
//       role: "ADMIN",
//     };

//     dispatch({ type: "LOGIN", payload: adminUser });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

// 🔐 Auth reducer
export const authReducer = (state, action) => {
  switch (action.type) {

    case "LOGIN":
      return {
        user: action.payload.user,     // user object
        token: action.payload.token,   // jwt token
        isAdmin: action.payload.user?.role === "ADMIN"
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAdmin: false
      };

    default:
      return state;
  }
};

// 🌍 Auth Provider
export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAdmin: false
  });

  // 🔁 Restore auth state from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: JSON.parse(storedUser),
          token: storedToken
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAdmin: state.isAdmin,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

