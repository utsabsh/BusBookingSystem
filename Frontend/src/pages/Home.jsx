import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus_API_END_POINT } from "../utlis/constant";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/dashboard");
    }
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/search`, {
        params: { departure, destination, date },
      });
      if (res.data) {
        setBuses(res.data);
        toast.success("Buses found!");
      } else {
        toast.error("No buses available for the selected route.");
      }
    } catch (error) {
      toast.error("Error searching for buses", error);
    }
  };

  const fetchBus = async () => {
    try {
      const res = await axios.get(`${Bus_API_END_POINT}/get`);
      if (res.data) {
        setBuses(res.data);
        toast.success("Bus data loaded successfully");
      }
    } catch (error) {
      toast.error("Error fetching bus details");
    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-400 flex flex-row items-center justify-center py-10 gap-5">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-8">
            Bus Ticket Booking
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
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
                required
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
                required
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search Buses
            </button>
          </form>
        </div>

        <div className="p-10 w-full max-w-xl bg-gray-100 rounded-lg h-100 overflow-y-auto">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Available Buses
          </h2>
          <div className="space-y-4">
            {buses.length > 0 ? (
              buses.map((bus) => (
                <div
                  key={bus._id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {bus.bus_name}
                    </h3>
                    <p className="text-gray-600">{bus.route.fromS}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-semibold">
                      Seats available: {bus.available_seats}
                    </p>
                    <Link
                      to={`/seats/${bus?._id}`}
                      className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No buses available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
