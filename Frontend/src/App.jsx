import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/AdminDashboard";
import AddBus from "./components/Addbus";
import Getbus from "./components/Getbus";
import EditBus from "./components/Editbus";
import Seat from "./components/Seat";
import Booking from "./pages/Booking";
import AdminBooking from "./components/AdminBooking";
import BookingByBusId from "./components/BookingByBusId";
import ProtectedRoute from "./utlis/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard/getbus"
            element={
              <ProtectedRoute>
                <Getbus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/addBus"
            element={
              <ProtectedRoute>
                <AddBus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/editBus/:id"
            element={
              <ProtectedRoute>
                <EditBus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/booking"
            element={
              <ProtectedRoute>
                <AdminBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/getbusbyid/:id"
            element={
              <ProtectedRoute>
                <BookingByBusId />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/create" element={<AddBus />} />
        <Route path="/seats/:id" element={<Seat />} />
        <Route path="/getBus" element={<Getbus />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
