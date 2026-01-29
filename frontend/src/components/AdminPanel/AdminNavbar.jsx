// //1
// import React, { useState, useEffect } from 'react';
// import { useAdminLogout } from './hooks/useAdminLogout';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom';

// function AdminNavbar() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const { adminLogout } = useAdminLogout();
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     if (window.confirm('Are you sure you want to logout?')) {
//       await adminLogout();
//       navigate('/admin');
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//       <div className="container-fluid">
//         <span className="navbar-brand d-flex align-items-center">
//           <i className="bi bi-shield-check fs-3 me-2"></i>
//           <div>
//             <span className="fw-bold">Admin Panel</span>
//             <small className="d-block text-white-50" style={{ fontSize: '0.75rem' }}>
//               Pet Adoption Management System
//             </small>
//           </div>
//         </span>
        
//         <div className="d-flex align-items-center">
//           <div className="me-3 d-none d-md-block">
//             <span className="text-white">
//               <i className="bi bi-clock me-1"></i>
//               {currentTime.toLocaleDateString('en-IN', { 
//                 weekday: 'short', 
//                 day: 'numeric', 
//                 month: 'short',
//                 year: 'numeric' 
//               })} | {currentTime.toLocaleTimeString()}
//             </span>
//           </div>
          
//           <div className="dropdown">
//             <button 
//               className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
//               type="button"
//               data-bs-toggle="dropdown"
//             >
//               <i className="bi bi-person-circle fs-5 me-2"></i>
//               <span className="me-2">{user?.username || 'Admin'}</span>
//             </button>
//             <ul className="dropdown-menu dropdown-menu-end">
//               <li>
//                 <button className="dropdown-item" onClick={() => navigate('/')}>
//                   <i className="bi bi-house me-2"></i>
//                   Go to Main Site
//                 </button>
//               </li>
//               <li><hr className="dropdown-divider" /></li>
//               <li>
//                 <button className="dropdown-item text-danger" onClick={handleLogout}>
//                   <i className="bi bi-box-arrow-right me-2"></i>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default AdminNavbar;

// import React, { useState, useEffect } from 'react';
// import { useAdminAuthContext } from '../../hooks/useAdminAuthContext';
// import { useNavigate } from 'react-router-dom';

// function AdminNavbar() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const { admin, dispatch } = useAdminAuthContext();
//   const navigate = useNavigate();

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('admin');
//       dispatch({ type: 'ADMIN_LOGOUT' });
//       navigate('/admin', { replace: true });
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//       <div className="container-fluid">
//         <span className="navbar-brand d-flex align-items-center">
//           <i className="bi bi-shield-check fs-3 me-2"></i>
//           <div>
//             <span className="fw-bold">Admin Panel</span>
//             <small
//               className="d-block text-white-50"
//               style={{ fontSize: '0.75rem' }}
//             >
//               Pet Adoption Management System
//             </small>
//           </div>
//         </span>

//         <div className="d-flex align-items-center">
//           <div className="me-3 d-none d-md-block">
//             <span className="text-white">
//               <i className="bi bi-clock me-1"></i>
//               {currentTime.toLocaleDateString('en-IN', {
//                 weekday: 'short',
//                 day: 'numeric',
//                 month: 'short',
//                 year: 'numeric',
//               })}{' '}
//               | {currentTime.toLocaleTimeString()}
//             </span>
//           </div>

//           <div className="dropdown">
//             <button
//               className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
//               type="button"
//               data-bs-toggle="dropdown"
//             >
//               <i className="bi bi-person-circle fs-5 me-2"></i>
//               <span className="me-2">{admin?.name || 'Admin'}</span>
//             </button>

//             <ul className="dropdown-menu dropdown-menu-end">
//               <li>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => navigate('/')}
//                 >
//                   <i className="bi bi-house me-2"></i>
//                   Go to Main Site
//                 </button>
//               </li>

//               <li>
//                 <hr className="dropdown-divider" />
//               </li>

//               <li>
//                 <button
//                   className="dropdown-item text-danger"
//                   onClick={handleLogout}
//                 >
//                   <i className="bi bi-box-arrow-right me-2"></i>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default AdminNavbar;

// import React, { useState, useEffect } from 'react';
// import { useAdminAuthContext } from '../../hooks/useAdminAuthContext';
// import { useNavigate } from 'react-router-dom';

// function AdminNavbar() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const { admin, dispatch } = useAdminAuthContext();
//   const navigate = useNavigate();

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('admin');
//       dispatch({ type: 'ADMIN_LOGOUT' });
//       navigate('/admin', { replace: true });
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//       <div className="container-fluid">
//         {/* BRAND */}
//         <span className="navbar-brand d-flex align-items-center">
//           <i className="bi bi-shield-check fs-3 me-2"></i>
//           <div>
//             <span className="fw-bold">Admin Panel</span>
//             <small
//               className="d-block text-white-50"
//               style={{ fontSize: '0.75rem' }}
//             >
//               Pet Adoption Management System
//             </small>
//           </div>
//         </span>

//         {/* RIGHT SIDE */}
//         <div className="d-flex align-items-center">
//           {/* CLOCK */}
//           <div className="me-3 d-none d-md-block">
//             <span className="text-white">
//               <i className="bi bi-clock me-1"></i>
//               {currentTime.toLocaleDateString('en-IN', {
//                 weekday: 'short',
//                 day: 'numeric',
//                 month: 'short',
//                 year: 'numeric',
//               })}{' '}
//               | {currentTime.toLocaleTimeString()}
//             </span>
//           </div>

//           {/* ADMIN DROPDOWN */}
//           <div className="dropdown">
//             <button
//               className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
//               type="button"
//               data-bs-toggle="dropdown"
//               disabled={!admin} // ✅ prevent crash before admin loads
//             >
//               <i className="bi bi-person-circle fs-5 me-2"></i>
//               <span className="me-2">{admin?.name || 'Admin'}</span>
//             </button>

//             <ul className="dropdown-menu dropdown-menu-end">
//               <li>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => navigate('/admin-panel')} // ✅ stay inside admin
//                 >
//                   <i className="bi bi-speedometer2 me-2"></i>
//                   Dashboard
//                 </button>
//               </li>

//               <li>
//                 <hr className="dropdown-divider" />
//               </li>

//               <li>
//                 <button
//                   className="dropdown-item text-danger"
//                   onClick={handleLogout}
//                 >
//                   <i className="bi bi-box-arrow-right me-2"></i>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default AdminNavbar;
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuthContext } from '../../hooks/useAdminAuthContext';

function AdminNavbar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { admin, dispatch } = useAdminAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('admin');
      dispatch({ type: 'ADMIN_LOGOUT' });
      navigate('/admin', { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          Admin Panel
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNav">
          {/* NAV LINKS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel">
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel/pending-pets">
                <i className="bi bi-hourglass-split me-1"></i>
                Pending Pets
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel/adoption-requests">
                <i className="bi bi-heart me-1"></i>
                Adoption Requests
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel/approved">
                <i className="bi bi-check-circle me-1"></i>
                Approved
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel/adopted-history">
                <i className="bi bi-clock-history me-1"></i>
                Adopted History
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin-panel/tracking">
                <i className="bi bi-geo-alt me-1"></i>
                Tracking
              </NavLink>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center text-white">
            <span className="me-3">
              {currentTime.toLocaleTimeString()}
            </span>

            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                data-bs-toggle="dropdown"
                disabled={!admin}
              >
                {admin?.name || 'Admin'}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;