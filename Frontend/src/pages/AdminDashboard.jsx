import { BsSpeedometer2 } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { Link, Outlet, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utlis/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((Store) => Store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } h-screen p-5  pt-8 relative duration-300 bg-purple-700`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="Logo"
            onClick={() => setOpen(!open)}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            BusSewa
          </h1>
        </div>
        <div>
          <div className="mt-4">
            <Link
              to="/dashboard"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white  hover:bg-purple-500 text-gray-300 text-sm items-center gap-x-4"
            >
              <BsSpeedometer2 color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </Link>
            <Link
              to="/dashboard/addbus"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:bg-purple-500  text-gray-300 text-sm items-center gap-x-4"
            >
              <IoPeople color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Add bus
              </span>
            </Link>
            <Link
              to="/dashboard/getbus"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:bg-purple-500  text-gray-300 text-sm items-center gap-x-4"
            >
              <IoPeople color="white" size={25} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                get bus
              </span>
            </Link>

            <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white  hover:bg-purple-500 text-gray-300 text-sm items-center gap-x-4">
              <CiLogout color="white" size={25} />
              <span
                onClick={logoutHandler}
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                Logout
              </span>
            </li>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="p-2 w-[100%] flex justify-center shadow">
          <h4 className="text-xl font-bold">Bus Booking System</h4>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
