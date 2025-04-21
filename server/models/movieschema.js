const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String, 
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
        type: String,
        required: true,
      },      
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);


const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
