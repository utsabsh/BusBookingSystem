import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus_API_END_POINT } from "../utlis/constant";
import { toast } from "sonner";

const Home = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);

  const handleSearch = () => {
    console.log("Search for buses...");
  };
  const fetchBus = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/get`);
      if (res.data) {
        console.log(res.data);
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
    <div className="min-h-screen bg-purple-400 flex flex-row items-center justify-center py-10 gap-5">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">
          Bus Ticket Booking
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="departure" className="text-gray-700">
              Departure
            </label>
            <input
              type="text"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="px-4 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter departure city"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="destination" className="text-gray-700">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-4 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter destination city"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-700">
              Travel Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search Buses
          </button>
        </div>
      </div>

      <div className="p-10 w-full max-w-xl bg-gray-100 rounded-lg h-100 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 ">
          Available Buses
        </h2>
        <div className="space-y-4">
          {buses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {bus.bus_name}
                </h3>
                <p className="text-gray-600">{bus.route}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-600 font-semibold">
                  Seats available: {bus.available_seats}
                </p>
                <button className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <Link to={`/seats/${bus?._id}`}> Book Now</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
