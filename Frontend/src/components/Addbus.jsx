import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Bus_API_END_POINT } from "../utlis/constant";
import { useSelector } from "react-redux";

const AddBus = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    bus_name: "",
    route: "",
    departure_time: "",
    total_seats: "",
    available_seats: "",
    price: "",
    userId: "", // Assume this is set dynamically
  });
  //   console.log(user._id);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${Bus_API_END_POINT}/add`,
        { ...formData, userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error adding bus:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="route"
          placeholder="Route"
          value={formData.route}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
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
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
