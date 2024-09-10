import React from "react";
import "./BookingSummary.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Loader from "../../Assets/Loader";

const BookingSummary = ({ selectedSeats, handleBooking, loading,price }) => {

  
  const groupSeatsBySection = (seats) => {
    return seats.reduce((acc, seat) => {
      const section = seat.charAt(0);
      if (!acc[section]) {
        acc[section] = [[]];
      }
      const lastArray = acc[section][acc[section].length - 1];
      if (lastArray.length < 5) {
        lastArray.push(seat);
      } else {
        acc[section].push([seat]);
      }
      return acc;
    }, {});
  };
  const groupedSeats = groupSeatsBySection(selectedSeats);

  const tableRows = Object.keys(groupedSeats).map((section) =>
    groupedSeats[section].map((seatGroup, index) => (
      <tr key={`${section}-${index}`}>
        <td>{seatGroup.join(", ")}</td>
        <td>
          <LiaRupeeSignSolid style={{ marginBottom: "-0.3vh" }} />
          {/* Replace with actual price calculation */}
          {seatGroup.length * parseInt(price)}
        </td>
      </tr>
    ))
  );

  const totalPrice = Object.keys(groupedSeats).reduce((acc, section) => {
    return (
      acc +
      groupedSeats[section].reduce((sectionAcc, seatGroup) => {
        return sectionAcc + seatGroup.length * parseInt(price) ;
      }, 0)
    );
  }, 0);

  return (
    <div className="BookingSummary_wrapper">
      <h4 className="summary_heading_h4">Trip details</h4>
      <span className="separate_line"></span>

      <table className="summary_table">
        <thead>
          <tr>
            <th>Seats</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.flat()}
          <tr className="base_fare_row">
            <td className="base_fare">Base Fare</td>
            <td className="total_price">
              <LiaRupeeSignSolid style={{ marginBottom: "-0.3vh" }} />
              {totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="makePayment_btn"
        disabled={loading}
        onClick={handleBooking}
      >
        {loading ? <Loader /> : "Make Payment"}
      </button>
    </div>
  );
};

export default BookingSummary;
