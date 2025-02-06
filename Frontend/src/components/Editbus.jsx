import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Bus_API_END_POINT } from "../utlis/constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const busTypes = ["AC", "Non-AC", "Sleeper", "Semi-Sleeper"];
const amenityOptions = [
  "WiFi",
  "Charging Ports",
  "Air Conditioning",
  "TV",
  "Blankets",
];

const EditBus = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    bus_name: "",
    bus_number: "",
    route: { from: "", to: "" },
    departure_time: "",
    arrival_time: "",
    total_seats: "",
    available_seats: "",
    price: "",
    bus_type: "",
    amenities: [],
    userId: user?._id || "", // Ensures user ID is set
  });

  useEffect(() => {
    fetchBus();
  }, [id]);

  const fetchBus = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/getbyid/${id}`);
      if (res.data) {
        setFormData(res.data);
        toast.success("Bus details fetched successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching bus details"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("route.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        route: { ...prevData.route, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: prevData.amenities.includes(amenity)
        ? prevData.amenities.filter((a) => a !== amenity)
        : [...prevData.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${Bus_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.success("Bus updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating bus");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bus Name and Number */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="bus_name"
            placeholder="Bus Name"
            value={formData.bus_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="bus_number"
            placeholder="Bus Number"
            value={formData.bus_number}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="route.from"
            placeholder="From"
            value={formData.route.from}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="route.to"
            placeholder="To"
            value={formData.route.to}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Departure & Arrival Time */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Seats & Price */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="total_seats"
            placeholder="Total Seats"
            value={formData.total_seats}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="available_seats"
            placeholder="Available Seats"
            value={formData.available_seats}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Bus Type Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Bus Type</label>
          <select
            name="bus_type"
            value={formData.bus_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {busTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
        >
          Update Bus
        </button>
      </form>
    </div>
  );
};

export default EditBus;
