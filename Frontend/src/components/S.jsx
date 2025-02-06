import React from "react";

const SeatSelection = ({ seats, onSeatUpdate }) => {
  const toggleBooking = (seatNumber) => {
    const updatedSeats = seats.map((seat) =>
      seat.seat_number === seatNumber ? { ...seat, booked: !seat.booked } : seat
    );
    onSeatUpdate(updatedSeats);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Seat Selection</h3>
      <div className="grid grid-cols-4  gap-2">
        {seats?.map((seat) => (
          <button
            key={seat.seat_number}
            onClick={() => toggleBooking(seat.seat_number)}
            className={`p-2 rounded ${
              seat.booked ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
