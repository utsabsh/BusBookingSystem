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
      console.log(res);
      if (res.data) {
        setBuses(res.data);
        toast.success("success");
      }
    } catch (error) {
      toast.error("error", error);
    }
  };
  useEffect(() => {
    fetchBus();
  }, []);
  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div
          key={bus.id}
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {bus.bus_name}
            </h3>
            <p className="text-gray-600">{bus.route}</p>
            <p className="text-gray-600">{bus.departure_time}</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-600 font-semibold">
              Seats available: {bus.available_seats}/{bus.total_seats}
            </p>
            <div className="flex space-x-2">
              <button className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Edit
              </button>
              <button className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
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
