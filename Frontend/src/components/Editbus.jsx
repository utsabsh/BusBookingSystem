import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Bus_API_END_POINT } from "../utlis/constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditBus = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    bus_name: "",
    route: "",
    departure_time: "",
    total_seats: "",
    available_seats: "",
    price: "",
    userId: user._id || "", // Use logged-in user ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchBus = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/getbyid/${id}`);
      if (res.data) {
        setFormData(res.data); // Directly set the data from response
        toast.success("Bus details fetched successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching bus details"
      );
    }
  };

  useEffect(() => {
    fetchBus();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${Bus_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating bus:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Error updating bus");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Bus</h2>
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
          Update Bus
        </button>
      </form>
    </div>
  );
};

export default EditBus;
