import React from "react";
import "./TravelsCompany.css";
import { Available, Booked, Selected } from "../../Assets/icons/icons";
import { LuBus } from "react-icons/lu";
import { GoArrowSwitch } from "react-icons/go";

const TravelsCompany = ({ SelectedBus }) => {
  const isSleeper = SelectedBus?.busType === "A/C Sleeper";
  return (
    <div className="TravelsCompany_wrapper">
      <h4 className="SeatLegend_h4">SEAT LEGEND</h4>
      <div className="SeatLegend_icons">
        {!isSleeper ? (
          <>
            <Available />
            <Booked />
            <Selected />
          </>
        ) : (
          <>
            <div className="TicketItem_icon" ></div>
            <div className="TicketItem_icon" style={{backgroundColor:"#AAAAB6"}}></div>
            <div className="TicketItem_icon"  style={{backgroundColor:"#312a91eb"}}></div>
          </>
        )}
      </div>
      <div className="SeatLegend">
        <span className="Available">Available</span>
        <span className="Booked">Unavailable</span>
        <span className="Selected">Selected</span>
      </div>
      <span className="line"></span>

      <h4 className="Heading_h4" style={{ marginBottom: "0" }}>
        {SelectedBus?.name}
        <LuBus className="bus_icon" />
      </h4>
      <p style={{ margin: "0", padding: "0", marginBottom: "2vh" }}>
        {SelectedBus?.busType}
      </p>

      <p>From</p>
      <h4 className="Heading_h4" style={{ fontWeight: "500" }}>
        {SelectedBus?.source}
      </h4>

      <span
        className="line"
        style={{ marginTop: "0vh", marginBottom: "0vh", width: "80%" }}
      >
        <GoArrowSwitch className="upDownArrow_icon" />
      </span>

      <p style={{ marginTop: "1vh" }}>To</p>
      <h4 className="Heading_h4" style={{ fontWeight: "500" }}>
        {SelectedBus?.destination}
      </h4>

      <div style={{ marginTop: "2vh" }}>
        <p>Departure time</p>
        <h4 className="Heading_h4">{SelectedBus?.departureTime}</h4>
        <p>Arrival time</p>
        <h4 className="Heading_h4">{SelectedBus?.arrivalTime}</h4>
      </div>

      <p style={{ color: "#4A4A4A" }}>
        Price Per Ticket :{" "}
        <b style={{ color: "#5B36ED" }}>{SelectedBus?.price}</b>
      </p>
    </div>
  );
};

export default TravelsCompany;
