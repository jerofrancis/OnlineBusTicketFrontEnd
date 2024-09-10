import React from "react";
import "./Ticket.css";
import { RiRouteLine } from "react-icons/ri";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";

const Ticket = ({ ticket, username}) => {
 
  const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  };
  
  
  const baseUrl = getBaseUrl();
  const [searchParams] = useSearchParams();
  const passengerID = searchParams.get("passengerId");
  const Construct_URL = `${baseUrl}/view/ticket?passengerId=${passengerID}&bookingId=${ticket?.bookingId}`

  
  return (
    <div className="Ticket_Wrapper">
      <div className="source_and_destiny">
        <div className="routes">
          {ticket?.source} <RiRouteLine className="route_icon" />{" "}
          {ticket?.destination}
        </div>
        <p className="booking_date">
          Booking date: <strong className="date">{ticket?.date}</strong>{" "}
        </p>
      </div>
      <div className="actual_booking_details">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4 className="bus_name">{ticket?.name}</h4>
          <h3 className="totalPrice">Rs {ticket?.totalPrice}</h3>
        </div>
        <div className="seaparte_line"></div>

        <div className="deatils">
          <p className="key">
            Booking ID <br />{" "}
            <strong className="value">{ticket?.bookingId}</strong>{" "}
          </p>
          <p className="key">
            Time <br /> <strong className="value">{ticket?.arrivalTime}</strong>{" "}
          </p>
          <p className="key">
            Departure <br />{" "}
            <strong className="value">{ticket?.departureTime}</strong>{" "}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "2vh" }}>
          <p className="key">
            Passenger <br /> <strong className="value">{username}</strong>{" "}
          </p>
          <p className="key">
            Seat Number <br />{" "}
            {ticket?.reservedSeats?.map((seat) => (
              <strong className="value">{seat + ", "} </strong>
            ))}
          </p>
        </div>
      </div>
      <div className="dotted_line"></div>
      <div className="QR_code_wrapper">
        <QRCode
          style={{ height: "100%", width: "100%" }}
          value={Construct_URL}
        />
      </div>
    </div>
  );
};

export default Ticket;
