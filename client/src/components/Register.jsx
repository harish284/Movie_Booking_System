import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, email, password, role };
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 201) {
        toast.success("Registration successful", { position: "top-right", autoClose: 3000 });
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);

        // Redirect based on the role after successful registration
        if (result.role === "admin") {
          nav("/Admin");
        } else {
          nav("/Movieslist");
        }
      } else {
        toast.error("Registration failed", { position: "top-right" });
      }
    } catch {
      toast.error("Registration failed", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
