import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-950 to-purple-900 flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-10">

      <div className="w-1/2 flex flex-col justify-center text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3">Movie <span className="text-purple-300">Booking</span></h1>
        <p className="text-white text-lg mt-4 leading-relaxed">
          Book your favorite movie tickets anytime, anywhere with ease. CineBook brings you the latest blockbusters, showtimes, and theater details right at your fingertips.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-5 px-6 rounded-xl cursor-pointer" onClick={() => navigate('/register')}>
            Buy Ticket
          </button>
          <button className="bg-purple-400 hover:bg-purple-600 text-black font-semibold py-5 px-6 rounded-xl cursor-pointer" onClick={() => navigate('/Login')}>
            Add Movies
          </button>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <img
          src="./background.png"
          alt="Movie Booking Illustration"
          height={5000}
          width={5000}
        />
      </div>
    </div>
  );
};

export default Home;
