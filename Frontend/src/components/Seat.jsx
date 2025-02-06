import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Booking_API_END_POINT, Bus_API_END_POINT } from "../utlis/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Seat = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams(); // Bus ID from the URL
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [available, setAvailable] = useState(0);
  const [formData, setFormData] = useState({
    user_id: user._id, // Fetch user_id dynamically
    bus_id: id || "",
    seat_numbers: [],
    payment_status: "unpaid",
    transaction_id: "",
  });

  const fetchBusById = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/getbyid/${id}`);
      if (res.data) {
        setBus(res.data);
        setSeats(res.data.seating_configuration);
        setAvailable(
          res.data.seating_configuration.filter((seat) => !seat.booked).length
        );
        toast.success("Bus data loaded successfully");
      }
    } catch (error) {
      toast.error("Error fetching bus details");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBusById();
  }, [id]);

  const toggleBooking = (seatId) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((seat) =>
        seat.seat_number === seatId ? { ...seat, booked: !seat.booked } : seat
      );

      setAvailable(updatedSeats.filter((seat) => !seat.booked).length);

      setFormData((prevFormData) => ({
        ...prevFormData,
        seat_numbers: updatedSeats
          .filter((seat) => seat.booked)
          .map((seat) => seat.seat_number),
      }));

      return updatedSeats;
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create the booking
      await axios.post(`${Booking_API_END_POINT}/create`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // Step 2: Update seat status in the Bus schema
      await axios.put(
        `${Bus_API_END_POINT}/booking/${id}`,
        {
          seating_configuration: seats,
          available_seats: available,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Booking successful!");
      fetchBusById(); // Refresh seats after booking
    } catch (error) {
      toast.error("Error creating booking");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Book a Bus Seat</h2>
      {bus ? (
        <div>
          <h3 className="mb-2 font-medium">
            {bus.bus_name} - {bus.route.from} to {bus.route.to}
          </h3>
          <h3>Available seats: {available}</h3>
          <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
            {seats.map((seat) => (
              <button
                key={seat.seat_number}
                type="button"
                onClick={() => toggleBooking(seat.seat_number)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold transition-all duration-200
                  ${
                    seat.booked
                      ? "bg-red-500"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                disabled={seat.booked}
              >
                {seat.seat_number}
              </button>
            ))}
          </div>

          <div>
            <h3>Selected Seats: {formData.seat_numbers.join(", ")}</h3>
          </div>

          <select
            name="payment_status"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>

          {formData.payment_status === "paid" && (
            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full p-2 mt-4 rounded ${
              formData.seat_numbers.length === 0
                ? "bg-gray-400"
                : "bg-blue-500 text-white"
            }`}
            disabled={formData.seat_numbers.length === 0}
          >
            Book Now
          </button>
        </div>
      ) : (
        <p>Loading bus details...</p>
      )}
    </div>
  );
};

export default Seat;
