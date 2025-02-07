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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/getbus" element={<Getbus />} />
          <Route path="/dashboard/addBus" element={<AddBus />} />
          <Route path="/dashboard/editBus/:id" element={<EditBus />} />
          <Route path="/dashboard/booking" element={<AdminBooking />} />
        </Route>
        <Route path="/create" element={<AddBus />} />
        <Route path="/seats/:id" element={<Seat />} />
        <Route path="/getBus" element={<Getbus />} />
        <Route path="/booking" element={<Booking />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
