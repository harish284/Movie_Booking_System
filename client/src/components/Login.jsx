import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success("Login successful", { position: "top-right", autoClose: 3000 });
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("role", result.role);
        if (result.role === "admin") {
          nav("/Admin");
        } else {
          nav("/Movieslist");
        }
      } else {
        toast.error("Invalid credentials", { position: "top-right" });
      }
    } catch {
      toast.error("Login failed", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-700 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
