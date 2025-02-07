import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Booking_API_END_POINT } from "../utlis/constant";
import { Loader2 } from "lucide-react";
const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleGetBooking = async () => {
    try {
      const res = await axios.get(`${Booking_API_END_POINT}/getbooking`);
      console.log(res.data);
      if (res.data && res.data.bookings) {
        setBookings(res.data.bookings);
        toast.success("Bookings fetched successfully");
      } else {
        setError("No bookings found.");
      }
    } catch (error) {
      setError("Error fetching booking: " + error.message);
      toast.error("Error fetching booking: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBooking();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
  }

  if (!bookings.length) {
    return <p className="text-center text-gray-500">No bookings found.</p>;
  }

  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const paymentColors = {
    paid: "bg-blue-100 text-blue-800",
    unpaid: "bg-gray-100 text-gray-800",
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 ">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Booking Details
        </h2>
        <div className="space-y-4 overflow-y-auto h-150">
          {bookings.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h3 className="text-lg font-medium text-gray-900">
                {book.bus_id?.bus_name || "Unknown Bus"}
              </h3>
              <p className="text-gray-700">
                <strong>Bus Number:</strong> {book.bus_id?.bus_number || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Seats:</strong>{" "}
                {book.seat_numbers.length > 0
                  ? book.seat_numbers.join(", ")
                  : "No seats selected"}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-medium">Booking Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[book.status]
                  }`}
                >
                  {book.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-medium">Payment Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    paymentColors[book.payment_status]
                  }`}
                >
                  {book.payment_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBooking;
