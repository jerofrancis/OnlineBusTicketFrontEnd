import React, { useState } from "react";
import "./BookingResponse.css";
import Success from "../../Assets/Success.gif";
import { useNavigate } from "react-router-dom";

const BookingResponse = ({ showResponse, setShowResponse ,reserveResponse }) => {
  console.log(reserveResponse)
  if (showResponse) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }


  const navigate = useNavigate();
 


  return (

        <div className="BookingResponse_Modal">
          <div className="overlay"></div>
          <div className="BookingResponse-modal-content">
            <div className="response_BG_wrapper">
              <img
                src={Success}
                alt="Booking successful"
                className="Login_bg_image"
              />
            </div>
            <h4 className="headtag">Your ticket reservation was successful!</h4>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>{reserveResponse?.date}</td>
                </tr>
                <tr>
                  <td>Booking ID:</td>
                  <td>{reserveResponse?.bookingID}</td>
                </tr>
                <tr>
                  <td>Subtotal:</td>
                  <td>{reserveResponse?.subtotal}</td>
                </tr>
                <span>--------------------------------------</span>
                <tr>
                  <td>Total:</td>
                  <td>{reserveResponse?.total}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                setShowResponse(false);
                navigate("/profile/find/passenger/details?passengerId=");
              }}
              className="view_ticket_btn"
            >
              View Ticket Details
            </button>
          </div>
        </div>
     
  );
};

export default BookingResponse;
