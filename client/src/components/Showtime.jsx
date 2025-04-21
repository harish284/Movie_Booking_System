import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Showtime = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showtimesData, setShowtimesData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const movie = location.state?.movie;

  useEffect(() => {
    if (movie?._id) {
      fetch(`http://localhost:3000/api/auth/showtimes/movie/${movie._id}`)
        .then((res) => res.json())
        .then((data) => setShowtimesData(data));
    }
  }, [movie]);

  const dates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 to-purple-900 px-6 py-8 text-white">
      <div className="flex items-start gap-8">
        <img
          src={`http://localhost:3000${movie.poster}`}
          alt={movie?.title}
          className="w-60 h-50 rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie?.title}</h1>
          <p className="mt-1">{movie?.genre}</p>
          <p>{movie?.language}</p>
          <div className="mt-4 font-semibold">
            ❤️ {movie.likes || Math.floor(Math.random() * 100) + 1}% liked this
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto">
        {dates.map((date) => {
          const day = date.toLocaleDateString("en-US", { weekday: "short" });
          const formatted = date.toISOString().split("T")[0];
          return (
            <button
              key={formatted}
              onClick={() => setSelectedDate(formatted)}
              className={`px-4 py-2 rounded-md ${
                selectedDate === formatted
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              <div>{day}</div>
              <div>{date.getDate()}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-6">
        {showtimesData
          .filter((show) => show.date === selectedDate)
          .map((show, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl p-4 shadow-md"
            >
              <div className="text-lg font-semibold text-black">
                {show.theatre}
              </div>
              <div className="flex">
                <div className="mr-1 text-lg font-medium text-black">Screen:</div>
                <div className="mt-0.5 font-normal text-md ">{show.screen}</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate("/Bookingpage", { state: { showtime: show } })
                  }
                  className="bg-green-100 hover:bg-green-200 text-green-800 text-md font-medium px-4 py-1 transition duration-200"
                >
                  {show.time}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Showtime;
