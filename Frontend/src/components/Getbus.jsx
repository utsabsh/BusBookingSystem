import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Bus_API_END_POINT } from "../utlis/constant";
import axios from "axios";

const Getbus = () => {
  const [buses, setBuses] = useState([]);

  const fetchBus = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/get`);
      if (res.data) {
        setBuses(res.data);
        toast.success("Buses fetched successfully");
      }
    } catch (error) {
      toast.error("Error fetching buses", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${Bus_API_END_POINT}/delete/${id}`);
      if (res.data) {
        setBuses(buses.filter((bus) => bus._id !== id));
        toast.success("Bus deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting bus", error);
    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div
          key={bus._id}
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {bus.bus_name} ({bus.bus_number})
            </h3>
            <p className="text-gray-600">
              Route: {bus.route.from} → {bus.route.to}
            </p>
            <p className="text-gray-600">
              Departure: {new Date(bus.departure_time).toLocaleString()}
            </p>
            <p className="text-gray-600">
              Arrival: {new Date(bus.arrival_time).toLocaleString()}
            </p>
            <p className="text-gray-600">Type: {bus.bus_type}</p>
            <p className="text-gray-600">
              Amenities: {bus.amenities.join(", ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-600 font-semibold">
              Seats available: {bus.available_seats}/{bus.total_seats}
            </p>
            <div className="flex space-x-2">
              <Link
                to={`/dashboard/editBus/${bus._id}`}
                className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit
              </Link>
              <Link
                to={`/dashboard/getbusbyid/${bus._id}`}
                className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                get
              </Link>
              <button
                onClick={() => handleDelete(bus._id)}
                className="mt-2 py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Getbus;
