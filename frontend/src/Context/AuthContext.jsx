// // //1
// // // import { createContext, useReducer, useEffect } from 'react';

// // // export const AuthContext = createContext();

// // // export const authReducer = (state, action) => {
// // //   switch (action.type) {
// // //     case 'LOGIN':
// // //       return { user: action.payload };
// // //     case 'LOGOUT':
// // //       return { user: null };
// // //     default:
// // //       return state;
// // //   }
// // // };

// // // export const AuthContextProvider = ({ children }) => {
// // //   const [state, dispatch] = useReducer(authReducer, {
// // //     user: null
// // //   });

// // //   useEffect(() => {
// // //     const user = JSON.parse(localStorage.getItem('user'));
// // //     if (user) {
// // //       dispatch({ type: 'LOGIN', payload: user });
// // //     }
// // //   }, []);

// // //   console.log('AuthContext state:', state);

// // //   return (
// // //     <AuthContext.Provider value={{ ...state, dispatch }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };


// // import { createContext, useReducer, useEffect } from 'react';

// // export const AuthContext = createContext();

// // export const authReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'LOGIN':
// //       return { user: action.payload };

// //     case 'LOGOUT':
// //       return { user: null };

// //     default:
// //       return state;
// //   }
// // };

// // export const AuthContextProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(authReducer, {
// //     user: null
// //   });

// //   // ✅ Restore user from localStorage on app load
// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     const token = localStorage.getItem('token');

// //     if (user && token) {
// //       dispatch({ type: 'LOGIN', payload: user });
// //     }
// //   }, []);

// //   console.log('AuthContext state:', state);

// //   return (
// //     <AuthContext.Provider value={{ ...state, dispatch }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import { createContext, useReducer, useEffect } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user: action.payload };
//     case 'LOGOUT':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null
//   });

//   // ✅ Restore user from localStorage on app load
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');

//     if (user && token) {
//       dispatch({ type: 'LOGIN', payload: user });
//     }
//   }, []);

//   console.log('AuthContext state:', state);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useReducer, useEffect } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user: action.payload };
//     case 'LOGOUT':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null
//   });

//   // ✅ Restore user from localStorage on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
    
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
        
//         console.log('🔄 Restoring user from localStorage:', parsedUser);
        
//         // ✅ Check if it's admin or regular user
//         if (parsedUser.role === 'ADMIN' || parsedUser.role === 'USER') {
//           dispatch({ type: 'LOGIN', payload: parsedUser });
//         }
//       } catch (error) {
//         console.error('❌ Failed to parse user from localStorage:', error);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   console.log('AuthContext state:', state);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useReducer, useEffect } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user: action.payload };
//     case 'LOGOUT':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null
//   });

//   // ✅ Restore ONLY NORMAL USER on refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);

//         // ✅ USER ONLY
//         if (parsedUser.role === 'USER') {
//           dispatch({ type: 'LOGIN', payload: parsedUser });
//         }
//       } catch (error) {
//         console.error('❌ Failed to parse user from localStorage:', error);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(storedUser),
      });
    }

    // ✅ auth restored
    setIsAuthReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
