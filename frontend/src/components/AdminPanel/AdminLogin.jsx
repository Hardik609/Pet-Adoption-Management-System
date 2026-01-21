import React, { useState } from "react";
import { useAdminLogin } from "./hooks/useAdminLogin";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ include setAdminError
  const { adminLogin, isLoading, adminError, setAdminError } = useAdminLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await adminLogin(email, password);

    if (result.success) {
      navigate("/admin-panel");
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4 col-lg-3">
          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">
                <i className="bi bi-shield-lock me-2"></i>
                Admin Login
              </h3>
              <small className="opacity-75">
                Pet Adoption System
              </small>
            </div>

            <div className="card-body p-4">

              {adminError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {adminError}

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAdminError(null)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-envelope-fill me-2"></i>
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
                  />

                  <small className="text-muted">
                    Use admin credentials
                  </small>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-key-fill me-2"></i>
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Access restricted to authorized personnel only
                  </small>
                </div>

              </form>
            </div>

            <div className="card-footer text-center py-3 bg-light">
              <button
                className="btn btn-link text-decoration-none"
                onClick={() => navigate("/auth")}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back to User Login
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
