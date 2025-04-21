const { register } = require("../models/schema");
const { signin } = require("../models/loginschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Movie } = require("../models/movieschema");
const { shows } = require("../models/showtime");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await register.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new register({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });

  } catch (err) {
    console.error("Error during registration", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });

  } catch (err) {
    console.error("Error during login", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addMovie = async (req, res) => {
  try {
    console.log("FILE RECEIVED BY MULTER:", req.file);
    console.log("BODY:", req.body);

    const { title, description, language, genre, releaseDate } = req.body;
    const poster = req.file ? `/uploads/${req.file.filename}` : null;

    if (!poster) {
      return res.status(400).json({ message: "Poster image is required." });
    }

    const newMovie = new Movie({
      title,
      description,
      poster,
      language,
      genre,
      releaseDate,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added", movie: newMovie });
  } catch (err) {
    console.error("Error adding movie:", err);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); 
    res.status(200).json(movies); 
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};

const createShowtime = async (req, res) => {
  const { movieId, theatre, screen, date, time } = req.body;
  try {
    const newShowtime = new shows({ movieId, theatre, screen, date, time, bookedSeats: [] });
    await newShowtime.save();
    res.status(201).json(newShowtime);
  } catch (err) {
    console.error("Error creating showtime:", err);
    res.status(500).json({ message: "Error creating showtime" });
  }
};

const getShowtimesByMovie = async (req, res) => {
  try {
    const showtimes = await shows.find({ movieId: req.params.movieId });
    res.json(showtimes);
  } catch (err) {
    console.error("Error fetching showtimes:", err);
    res.status(500).json({ message: "Error fetching showtimes" });
  }
};

const bookSeats = async (req, res) => {
  const { showtimeId, seats, name, email } = req.body;

  try {
    const showtime = await shows.findById(showtimeId);
    const alreadyBooked = seats.some(seat => showtime.bookedSeats.includes(seat));
    if (alreadyBooked) return res.status(400).json({ message: "Some seats already booked" });

    showtime.bookedSeats.push(...seats);
    await showtime.save();

    res.json({ message: `Seats booked for ${name} (${email})`, bookedSeats: showtime.bookedSeats });
  } catch (err) {
    console.error("Error booking seats:", err);
    res.status(500).json({ message: "Error booking seats" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addMovie,
  getMovies,
  deleteMovie,
  createShowtime,
  getShowtimesByMovie,
  bookSeats
};
