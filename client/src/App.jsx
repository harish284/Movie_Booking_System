import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Protectedroute';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Movieslist from './components/Movieslist';
import Admin from './components/Admin';
import Bookingpage from './components/Bookingpage';
import Showtime from './components/Showtime';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/Movieslist"
          element={
            <ProtectedRoute>
              <Movieslist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/showtime" element={<Showtime />} />
        <Route path="/bookingpage" element={<Bookingpage/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
