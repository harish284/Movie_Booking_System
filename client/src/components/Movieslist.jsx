import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Movieslist = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/getMovies");
        const result = await response.json();
        setMovies(result);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-violet-900 to-purple-900 min-h-screen px-6 py-8">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <img src="/background.png" alt="Logo" className="h-12 w-12 rounded-full" />
          <h1 className="text-white text-3xl font-bold">CinyTix</h1>
        </div>

        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="🔍 Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white  placeholder-gray-400"
          />
        </div>
      </nav>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">Now Showing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105"
              >
                <img
                  src={`http://localhost:3000${movie.poster}`}
                  alt={movie.title}
                  className="h-80 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                  <p className="text-sm text-gray-600">
                    {movie.genre} || {movie.language}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    ⭐ {movie.likes || Math.floor(Math.random() * 100) + 1} liked this
                  </p>
                  <button
                    to={`/book/${movie._id}`}
                    className="mt-3 w-full inline-block text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition" onClick={() => navigate("/showtime", { state: { movie } })}
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No movies found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Movieslist;
