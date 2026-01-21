import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user, isAdmin } = useAuthContext();

//   // If no user is logged in, redirect to auth page
//   if (!user) {
//     return <Navigate to="/auth" />;
//   }

//   // If route requires admin access and user is not admin
//   if (adminOnly && !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

