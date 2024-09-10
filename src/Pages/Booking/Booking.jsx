//styles
import "./Booking.css";
// Components
import useLayout from "./useLayout";
import TravelsCompany from "../../Components/TravelsCompany/TravelsCompany";
import BookingSummary from "../../Components/BookingSummary/BookingSummary";
import BookingLayout from "./BookingLayout";
import BookingResponse from "../../Popups/BookingResponse/BookingResponse";
import Login from "../Login/Login";
// Hooks
import { useSearchParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
// api
import Axios from "../../api/Axios";
import fetchBus from "./fetchBus";
//Custom Hooks
import useAuth from "../../hooks/useAuth";
import usePayment from "../../hooks/usePayment";
//Libraries 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = ({ showLogin, setShowLogin }) => {
  // Checking if User is Authenticated
  const { isAuthenticated } = useAuth();

  // Notification - User can only book a maximum of 7 seats
  const notify = () => toast("Maximum 7 seats per booking");

  // fetched Bus Details will be Stored
  const [SelectedBus, setSelectedBus] = useState({});

  // Geting BusID, Date, Departure and Arrival Details from Parameters
  const [searchParams] = useSearchParams();
  const busId = searchParams.get("busId");
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  //Passing to Api to fetch the User Selected Bus
  useEffect(() => {
    fetchBus(busId, source, destination, date, setSelectedBus);
  }, [busId, source, destination, date]);

  // Custom Hook which Generates the Seats layout
  const {
    isSleeper,
    selectedSeats,
    selectSeat,
    generateSeats,
    generateSeaterSeats,
  } = useLayout(SelectedBus,notify);

  //Storing Current URL to redirect the USER Back to this Page when Login/Register
  let { pathname, search } = useLocation();
  const URL = pathname + search;

  //When Reservation is Completed, Success Response from API will be Stored here,
  // to Pass the Response Date to Component
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reserveResponse, setReserveResponse] = useState({});

  // Custom Hook, Which will Manage Payment and Sets the Response from API
  const { HandlePayment } = usePayment(
    setShowResponse,
    setLoading,
    setReserveResponse
  );

  // Main Function Which Handles the Entire Booking Process, When User Clicks the "Make Payment" Button
  const handleBooking = async () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    setLoading(true);

    try {
      const body = {
        busId,
        date,
        source,
        destination,
        bookedSeats: selectedSeats,
      };

      const response = await Axios.post("/reserve/get/total-price", body);
      if (response?.status === 200) {
        await HandlePayment(parseInt(response.data), body);
      }
    } catch (error) {
      if (error?.message === "Network Error") {
        alert("Server Down Please try Later");
      }
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="Booking_wrapper">
        {/* Rendering Travels Company Details */}
        <TravelsCompany SelectedBus={SelectedBus} />

        {/* Main Layout Which Passes the Seats Data of Fetched Bus results to,
         GenerateSeats/ GenerateSeaterSeats Functions*/}
        <BookingLayout
          isSleeper={isSleeper}
          generateSeats={generateSeats}
          generateSeaterSeats={generateSeaterSeats}
          SelectedBus={SelectedBus}
        />
        {selectedSeats.length > 0 && (
          <>
            {/* Summary Card, Render Selected Seats and Total Amout */}
            <BookingSummary
              selectedSeats={selectedSeats}
              handleBooking={handleBooking}
              setLoading={setLoading}
              loading={loading}
              price={SelectedBus.price}
            />
            {/* When User is not Authenticated, Login Component will Render */}
            <Login
              showLogin={showLogin}
              setShowLogin={setShowLogin}
              URLPATH={URL}
            />
          </>
        )}
      </div>
      {showResponse && (
        // Response Card renders Success Status coming from API,
        // Finally Redirects to Profile Page to View the Reserved Ticket
        <BookingResponse
          reserveResponse={reserveResponse}
          setShowResponse={setShowResponse}
          showResponse={showResponse}
        />
      )}
    </>
  );
};

export default Booking;
