const express = require("express");
const { registerUser, loginUser } = require("../middleware.js/auth");
const { addMovie, getMovies } = require("../middleware.js/auth");
const { upload } = require("../middleware.js/uploads"); 
const { deleteMovie } = require("../middleware.js/auth");
const { createShowtime, getShowtimesByMovie, bookSeats } = require("../middleware.js/auth");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/signin", loginUser);

router.post("/addMovies", upload.single("poster"), addMovie);
router.get("/getMovies", getMovies);
router.delete("/deleteMovie/:id", deleteMovie);

router.post("/showtimes", createShowtime)
router.get("/showtimes/movie/:movieId", getShowtimesByMovie)
router.post("/book", bookSeats)

module.exports = router;
