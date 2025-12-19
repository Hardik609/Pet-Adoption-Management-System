/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useSignup } from '../../hooks/useSignup'



const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [signinBtn, setSigninBtn] = useState('Sign in')
  const [signupBtn, setSignupBtn] = useState('Sign up')
  const [forgotBtn, setforgotBtn] = useState('Submit')
  const { login, loginError, isLoading } = useLogin();
  const { signup, signupError, signupIsLoading } = useSignup();
  const [success, setSuccess] = useState(null)
  const [isForgot, setIsForgot] = useState(false)
  const [isForgotLoading, setIsForgotLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [newConfirmPassword, setNewConfirmPassword] = useState("")

  useEffect(() => {
    if (loginError) {
      setErrors(prevErrors => [...prevErrors.slice(-3), loginError]);
      setTimeout(() => {
        setErrors(prevErrors => prevErrors.slice(1));
      }, 3000);
    }
  }, [loginError]);

  useEffect(() => {
    if (signupError) {
      setErrors(prevErrors => [...prevErrors.slice(-3), signupError]);
      setTimeout(() => {
        setErrors(prevErrors => prevErrors.slice(1));
      }, 3000);
    }
  }, [signupError]);

  const handleSwap = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false)
    setTimeout(() => {
      setIsForgot(false)
      setErrors([]);
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSigninBtn('Signing in');

    setTimeout(async () => {
      await login(email.toLowerCase(), password);
      setSigninBtn('Sign In');
    }, 300);
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupBtn('Signing up');

    setTimeout(async () => {
      await signup(name, email.toLowerCase(), password, otp);
      setSignupBtn('Sign Up');
    }, 300);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hanleGenOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });


      if (!response.ok) {
        const errorData = await response.json();
        setErrors(prevErrors => [...prevErrors.slice(-3), errorData.error || 'An error occurred']);
        setTimeout(() => {
          setErrors(prevErrors => prevErrors.slice(1));
        }, 3000);
      } else {
        setSuccess('OTP sent successfully')
        setTimeout(() => {
          setSuccess(null)
        }, 3000);
      }
    } catch (error) {
      setErrors(prevErrors => [...prevErrors.slice(-3), 'Network error']);
      setTimeout(() => {
        setErrors(prevErrors => prevErrors.slice(1));
      }, 3000);
    }
  }

  // const handleForget = async (e) => {
  //   e.preventDefault()
  //   setforgotBtn('Submitting')
  //   setIsForgotLoading(true)


  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/otp/verify`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, otp }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setErrors(prevErrors => [...prevErrors.slice(-3), errorData.error || 'An error occurred']);
  //       setTimeout(() => {
  //         setErrors(prevErrors => prevErrors.slice(1));
  //       }, 3000);
  //     } else {
  //       setSuccess('OTP verified. Change your password.')
  //       setShowNewPassword(true)
  //       setTimeout(() => {
  //         setSuccess(null)
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setErrors(prevErrors => [...prevErrors.slice(-3), 'Network error']);
  //     setTimeout(() => {
  //       setErrors(prevErrors => prevErrors.slice(1));
  //     }, 3000);
  //   } finally {
  //     setforgotBtn('Submit')
  //     setIsForgotLoading(false)
  //   }
  // }

  // const hanleForgotOtp = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgototp`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setErrors(prevErrors => [...prevErrors.slice(-3), errorData.error || 'An error occurred']);
  //       setTimeout(() => {
  //         setErrors(prevErrors => prevErrors.slice(1));
  //       }, 3000);
  //     } else {
  //       setSuccess('OTP sent successfully')
  //       setTimeout(() => {
  //         setSuccess(null)
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setErrors(prevErrors => [...prevErrors.slice(-3), 'Network error']);
  //     setTimeout(() => {
  //       setErrors(prevErrors => prevErrors.slice(1));
  //     }, 3000);
  //   }
  // }

  // const updatePassword = async (e) => {
  //   setforgotBtn('Submitting')
  //   setIsForgotLoading(true)
  //   e.preventDefault()
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/update-password`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, newPassword, newConfirmPassword }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setErrors(prevErrors => [...prevErrors.slice(-3), errorData.error || 'An error occurred']);
  //       setTimeout(() => {
  //         setErrors(prevErrors => prevErrors.slice(1));
  //       }, 3000);
  //     } else {
  //       setSuccess('Password Updated Successfully.')
  //       setNewPassword('')
  //       setNewConfirmPassword('')
  //       setEmail('')
  //       setPassword('')
  //       setOtp('')
  //       setShowNewPassword(false)
  //       setIsForgot(false)
  //       setTimeout(() => {
  //         setSuccess(null)
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setErrors(prevErrors => [...prevErrors.slice(-3), 'Network error']);
  //     setTimeout(() => {
  //       setErrors(prevErrors => prevErrors.slice(1));
  //     }, 3000);
  //   } finally {
  //     setforgotBtn('Submit')
  //     setIsForgotLoading(false)
  //   }
  // }
  
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center py-5">
      <div className="row w-100 justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">

              {/* SIGN UP FORM */}
              {isSignUp && (
                <form onSubmit={handleSignup}>
                  <h2 className="text-center mb-4 fw-bold">Create Account</h2>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="form-control mb-3"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-control mb-3"
                  />

                  <div className="input-group mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </button>
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="OTP"
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={hanleGenOtp}
                    >
                      Send
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 mt-2"
                    disabled={signupIsLoading}
                  >
                    {signupBtn}
                  </button>

                  <p className="text-center mt-3">
                    Already have an account?{" "}
                    <span className="text-primary fw-bold" style={{ cursor: "pointer" }}
                      onClick={handleSwap}>
                      Sign In
                    </span>
                  </p>
                </form>
              )}

              {/* SIGN IN FORM */}
              {!isSignUp && !isForgot && (
                <form onSubmit={handleLogin}>
                  <h2 className="text-center mb-4 fw-bold">Sign In</h2>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-control mb-3"
                  />

                  <div className="input-group mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </button>
                  </div>

                  {/* <p
                    className="text-primary text-end mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsForgot(true)}
                  >
                    Forgot Password?
                  </p> */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={isLoading}
                  >
                    {signinBtn}
                  </button>

                  <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <span className="text-success fw-bold" style={{ cursor: "pointer" }}
                      onClick={handleSwap}>
                      Sign Up
                    </span>
                  </p>
                </form>
              )}

              {/* FORGOT PASSWORD */}
              {isForgot && (
                <form onSubmit={!showNewPassword ? handleForget : updatePassword}>
                  <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>

                  {/* Email + OTP */}
                  {!showNewPassword && (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="form-control mb-3"
                      />

                      <div className="input-group mb-3">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="OTP"
                          className="form-control"
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={hanleForgotOtp}
                        >
                          Send
                        </button>
                      </div>
                    </>
                  )}

                  {/* New Password Fields */}
                  {showNewPassword && (
                    <>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="form-control mb-3"
                      />

                      <input
                        type="password"
                        value={newConfirmPassword}
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="form-control mb-3"
                      />
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn btn-warning w-100 py-2"
                    disabled={isForgotLoading}
                  >
                    {forgotBtn}
                  </button>

                  <p
                    className="text-primary text-center mt-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsForgot(false)}
                  >
                    Back to Sign In
                  </p>
                </form>
              )}

            </div>
          </div>

          {/* ERRORS / SUCCESS */}
          <div className="mt-4">
            {errors.map((error, index) => (
              <div key={index} className="alert alert-danger py-2">
                {error}
              </div>
            ))}

            {success && (
              <div className="alert alert-success py-2">{success}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Auth
