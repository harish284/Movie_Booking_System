const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatre: { type: String, required: true },
  screen: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true },
  bookedSeats: { type: [String], default: [] }
});

const shows = mongoose.model("Showtime", showtimeSchema);

module.exports = { shows };
