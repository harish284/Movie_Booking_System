import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

const Admin = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    language: "",
    genre: "",
    releaseDate: ""
  })
  const [poster, setPoster] = useState(null)
  const [moviesList, setMoviesList] = useState([])
  const [activeSection, setActiveSection] = useState("add")
  const [showtimeData, setShowtimeData] = useState({
    movieId: "",
    theatre: "",
    screen: "",
    date: "",
    time: ""
  })

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/getMovies")
      const result = await response.json()
      const movies = Array.isArray(result) ? result : result.movies
      if (response.ok && Array.isArray(movies)) {
        setMoviesList(movies)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setMovieData({ ...movieData, [name]: value })
  }

  const handleFileChange = e => {
    setPoster(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(movieData).forEach(([key, value]) => formData.append(key, value))
    formData.append("poster", poster)
    try {
      const response = await fetch("http://localhost:3000/api/auth/addMovies", {
        method: "POST",
        body: formData
      })
      const result = await response.json()
      if (response.ok) {
        toast.success("Movie added successfully")
        setMovieData({ title: "", description: "", language: "", genre: "", releaseDate: "" })
        setPoster(null)
        fetchMovies()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleDelete = async movieId => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?")
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/deleteMovie/${movieId}`, {
          method: "DELETE"
        })
        if (response.ok) {
          toast.success("Movie deleted successfully")
          setMoviesList(moviesList.filter(movie => movie._id !== movieId))
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  const handleShowtimeChange = e => {
    const { name, value } = e.target
    setShowtimeData({ ...showtimeData, [name]: value })
  }

  const handleShowtimeSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/auth/Showtimes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(showtimeData)
      })
      const result = await response.json()
      if (response.ok) {
        toast.success("Showtime added successfully")
        setShowtimeData({ movieId: "", theatre: "", screen: "", date: "", time: "" })
      } else {
        toast.error(result.message || "Failed to add showtime")
      }
    } catch (err) {
      toast.error("Error occurred")
    }
  }

  return (
    <div className="flex bg-gradient-to-b from-violet-900 to-purple-900 min-h-screen">
      <nav className="w-[200px] bg-yellow-50 shadow-md flex flex-col gap-6 p-6">
        <h2 className="text-xl font-bold text-purple-700">Admin</h2>
        <button
          onClick={() => setActiveSection("add")}
          className={`text-start text-white py-2 px-4 rounded-lg ${activeSection === "add" ? "bg-purple-700" : "bg-purple-600"}`}
        >
          ➕ Add Movie
        </button>
        <button
          onClick={() => {
            fetchMovies()
            setActiveSection("fetch")
          }}
          className={`text-start text-white py-2 px-4 rounded-lg ${activeSection === "fetch" ? "bg-purple-700" : "bg-purple-600"}`}
        >
          ⬇️ Fetch Movies
        </button>
        <button
          onClick={() => setActiveSection("showtime")}
          className={`text-start text-white py-2 px-4 rounded-lg ${activeSection === "showtime" ? "bg-purple-700" : "bg-purple-600"}`}
        >
          🕒 Add Showtime
        </button>
      </nav>

      <div className="w-full p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>

        {activeSection === "add" && (
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">Add New Movie</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
              <input type="text" name="title" value={movieData.title} onChange={handleChange} required placeholder="Movie Title" className="w-full border border-gray-300 p-3 rounded-lg" />
              <textarea name="description" value={movieData.description} onChange={handleChange} required placeholder="Description" rows={3} className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="text" name="language" value={movieData.language} onChange={handleChange} placeholder="Language" className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="text" name="genre" value={movieData.genre} onChange={handleChange} required placeholder="Genre" className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="date" name="releaseDate" value={movieData.releaseDate} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-lg" />
              <input type="file" name="poster" accept="image/*" onChange={handleFileChange} required className="w-full border border-gray-300 p-3 rounded-lg" />
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg">Submit Movie</button>
            </form>
          </div>
        )}

        {activeSection === "fetch" && (
          <div className="bg-white shadow-xl rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">Movie List</h2>
            <div className="overflow-auto max-h-[600px]">
              <table className="min-w-full table-auto text-left">
                <thead className="bg-purple-100 text-purple-700">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Genre</th>
                    <th className="p-3">Release</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {moviesList.map(movie => (
                    <tr key={movie._id} className="border-b border-gray-200">
                      <td className="p-3">{movie.title}</td>
                      <td className="p-3">{movie.genre}</td>
                      <td className="p-3">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                      <td className="p-3">
                        <button onClick={() => handleDelete(movie._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {moviesList.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">No movies available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "showtime" && (
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">Add Showtime</h2>
            <form onSubmit={handleShowtimeSubmit} className="space-y-5">
              <select name="movieId" value={showtimeData.movieId} onChange={handleShowtimeChange} required className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Movie</option>
                {moviesList.map(movie => (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))}
              </select>
              <input type="text" name="theatre" value={showtimeData.theatre} onChange={handleShowtimeChange} placeholder="Theatre Name" required className="w-full border border-gray-300 p-3 rounded-lg" />
              <select name="screen" value={showtimeData.screen} onChange={handleShowtimeChange} required className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Screen</option>
                <option value="Screen 1">Screen 1</option>
                <option value="Screen 2">Screen 2</option>
                <option value="Screen 3">Screen 3</option>
              </select>
             <label htmlFor="Date">Date</label> <input type="date" name="date" value={showtimeData.date} onChange={handleShowtimeChange} required className="w-full border border-gray-300 p-3 rounded-lg" />
              <label htmlFor="Time">Time</label><input type="time" name="time" value={showtimeData.time} onChange={handleShowtimeChange} required className="w-full border border-gray-300 p-3 rounded-lg" />
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg">Submit Showtime</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
