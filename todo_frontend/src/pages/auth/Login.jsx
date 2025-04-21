import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email.trim(),
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Handle different error statuses
        if (error.response.status === 401) {
          setErrors((prev) => ({
            ...prev,
            general: "Invalid email or password",
          }));
        } else if (error.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            ...error.response.data.errors,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Login failed. Please try again later.",
          }));
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrors((prev) => ({
          ...prev,
          general: "Network error. Please check your connection.",
        }));
      } else {
        // Something happened in setting up the request
        setErrors((prev) => ({
          ...prev,
          general: "An unexpected error occurred.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col md:flex-row">
      {/* Left side - Image (matches onboarding) */}
      <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Person working on laptop"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h1 className="text-4xl font-bold mb-2">NoteVue</h1>
          <p className="text-lg opacity-90">Your productivity companion</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="text-4xl mb-6">🔐</div>
            <h2 className="text-3xl font-bold text-white mb-6">Welcome Back</h2>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-white/80 mb-2 text-sm font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full bg-white/10 border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-white/80 mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-white/10 border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-white text-indigo-900 hover:bg-white/90 transition-colors py-3 px-6 rounded-lg font-semibold text-lg shadow-md mb-4 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/70 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-white hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
