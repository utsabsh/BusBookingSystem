import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Bus_API_END_POINT } from "../utlis/constant";
import SeatSelection from "./S";

const AddBus = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bus_name: "",
    bus_number: "",
    route: { from: "", to: "" },
    departure_time: "",
    arrival_time: "",
    total_seats: "",
    available_seats: "",
    price: "",
    bus_type: "Seater",
    amenities: [],
    seating_configuration: [],
    userId: user?._id || "",
  });

  const busTypes = [
    "Seater",
    "Sleeper",
    "Semi-Sleeper",
    "Luxury",
    "Ultra-Luxury",
  ];
  const amenityOptions = [
    "AC",
    "WiFi",
    "USB Charging",
    "Entertainment System",
    "Refreshments",
    "Blanket",
  ];

  useEffect(() => {
    if (formData.total_seats) {
      const seats = parseInt(formData.total_seats);
      const seatArray = Array.from({ length: seats }, (_, index) => ({
        seat_number: index + 1,
        booked: false,
        booking_reference: null,
        passenger_name: null,
        booking_time: null,
      }));

      setFormData((prev) => ({
        ...prev,
        seating_configuration: seatArray,
        available_seats: seats,
      }));
    }
  }, [formData.total_seats]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("route.")) {
      const routeField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        route: { ...prev.route, [routeField]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];

      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleSeatUpdate = (updatedSeats) => {
    setFormData((prev) => ({
      ...prev,
      seating_configuration: updatedSeats,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Bus_API_END_POINT}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/getbus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="grid grid-cols-2 p-4
    "
    >
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add New Bus</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bus Name</label>
              <input
                type="text"
                name="bus_name"
                value={formData.bus_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Bus Number
              </label>
              <input
                type="text"
                name="bus_number"
                value={formData.bus_number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <input
                type="text"
                name="route.from"
                value={formData.route.from}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="text"
                name="route.to"
                value={formData.route.to}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Total Seats
              </label>
              <input
                type="number"
                name="total_seats"
                value={formData.total_seats}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bus Type</label>
            <select
              name="bus_type"
              value={formData.bus_type}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              {busTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-3 gap-2">
              {amenityOptions.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Add Bus
          </button>
        </form>
      </div>

      {formData?.total_seats && (
        <div>
          <SeatSelection
            seats={formData.seating_configuration}
            onSeatUpdate={handleSeatUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default AddBus;
