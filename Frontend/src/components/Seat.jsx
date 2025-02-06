import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Booking_API_END_POINT, Bus_API_END_POINT } from "../utlis/constant";
import { toast } from "sonner";

const Seat = () => {
  const { id } = useParams(); // Bus ID from the URL
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [available, setAvailable] = useState(0);
  const [formData, setFormData] = useState({
    user_id: "", // Assume it's set dynamically
    bus_id: id || "",
    seat_numbers: [],
    payment_status: "unpaid",
    transaction_id: "",
  });

  const fetchBusById = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}//getbyid/${id}`);
      console.log(res.data);
      if (res.data) {
        setBus(res.data);
        const totalSeats = res.data.total_seats || 40; // Default to 40 if not provided
        const seatArray = Array.from({ length: totalSeats }, (_, i) => ({
          id: i + 1,
          booked: false,
        }));
        console.log(seatArray);

        setSeats(seatArray);
        setAvailable(totalSeats);
        toast.success("Bus data loaded successfully");
      }
    } catch (error) {
      toast.error("Error fetching bus details", error);
    }
  };

  useEffect(() => {
    fetchBusById();
  }, [id]);

  const toggleBooking = (seatId) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, booked: !seat.booked } : seat
      );

      setAvailable(updatedSeats.filter((seat) => !seat.booked).length);

      setFormData((prevFormData) => ({
        ...prevFormData,
        seat_numbers: updatedSeats
          .filter((seat) => seat.booked)
          .map((seat) => seat.id),
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
      await axios.post(`${Booking_API_END_POINT}/create`, formData);
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Error creating booking");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Book a Bus Seat</h2>
      {bus ? (
        <div>
          <h3 className="mb-2 font-medium">
            {bus.bus_name} - {bus.route}
          </h3>
          <h3>Available seats: {available}</h3>
          <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
            {seats.map((seat) => (
              <button
                key={seat.id}
                type="button"
                onClick={() => toggleBooking(seat.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold transition-all duration-200
                  ${
                    seat.booked
                      ? "bg-red-500"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {seat.id}
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
            className={`w-full p-2 rounded ${
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
