import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const seatSections = [
  {
    label: "PLATINUM : ₹150",
    rows: ["A", "B", "C"],
    columns: 20,
    gaps: [10],
  },
  {
    label: "GOLD : ₹100",
    rows: ["D", "E", "F", "G"],
    columns: 20,
    gaps: [10],
  },
  {
    label: "SILVER : ₹70",
    rows: ["H", "I"],
    columns: 21,
    gaps: [11],
  },
];

const Bookingpage = () => {
  const location = useLocation();
  const { showtime } = location.state;
  const [booked, setBooked] = useState([]);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/showtimes/movie/${showtime.movieId}`)
      .then((res) => res.json())
      .then((data) => {
        const show = data.find((s) => s._id === showtime._id);
        if (show) setBooked(show.bookedSeats);
      });
  }, [showtime]);

  const toggleSeat = (seat) => {
    if (booked.includes(seat)) return;
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleConfirm = async () => {
    const res = await fetch("http://localhost:3000/api/auth/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        showtimeId: showtime._id,
        seats: selected,
        name,
        email,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setBooked(result.bookedSeats);
      setSelected([]);
      setShowModal(false);
      setName("");
      setEmail("");
      toast.success("Successfully booked!");
    } else {
      toast.error(result.message || "Booking failed");
    }
  };

  return (
    <div className="bg-gradient-to-b from-violet-900 to-purple-900 min-h-screen text-white relative pb-24">
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Select Seats</h1>
        {seatSections.map((section) => (
          <div key={section.label} className="mb-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-white">{section.label}</h2>
            {section.rows.map((row) => (
              <div key={row} className="flex gap-2 items-center mb-2 justify-center">
                <span className="w-6 text-sm font-medium text-white">{row}</span>
                {[...Array(section.columns)].map((_, i) => {
                  const col = i + 1;
                  const seat = `${row}${col}`;
                  const isBooked = booked.includes(seat);
                  const isSelected = selected.includes(seat);
                  const isGap = section.gaps.includes(col);
                  return (
                    <div key={seat} className={`relative ${isGap ? "ml-4" : ""}`}>
                      <div
                        onClick={() => toggleSeat(seat)}
                        className={`w-10 h-10 border text-sm font-medium border-blue-400 flex items-center justify-center cursor-pointer rounded ${
                          isBooked
                            ? "bg-red-500 text-white cursor-not-allowed"
                            : isSelected
                            ? "bg-green-500 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {col}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
        <div className="mt-10 flex justify-center">
          <div className="w-60 h-8 bg-blue-200 text-black text-center rounded-t-xl border-t-4 border-blue-400 flex items-center justify-center text-sm font-semibold">
            SCREEN THIS WAY
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-purple-800 p-4 flex justify-center shadow-lg z-50">
        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md hover:bg-green-600 transition"
          disabled={selected.length === 0}
        >
          Book {selected.length} seat(s)
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-black p-6 rounded-xl w-80 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold">Enter your details</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-purple-700 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Bookingpage;
