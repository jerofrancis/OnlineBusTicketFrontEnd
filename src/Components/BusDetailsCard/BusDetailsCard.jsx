import React from "react";
import "./BusDetailsCard.css";
import { useNavigate } from "react-router-dom";

const BusDetailsCard = ({item,date}) => {

  const navigate = useNavigate();



  const availableSeats = item?.numberOfSeats - item?.bookings?.bookedSeats?.length;


  const handleSearch = (busId,source,destination,date) => {
  
 
    const searchParams = new URLSearchParams({
      busId,
      source,
      destination,
      date,
    });
    navigate(`/booking?${searchParams.toString()}`);
  };

  return (
    <div className="BusDetailsCard_wrapper">
      <div className="Bus_info_wrapper">
        <div>
          <h3>{item?.name}</h3>
          <p>{item?.busType}</p>
        </div>

        <div className="arivarrival_and_destination_wrapper">
          <div>
            <p>{item?.source}</p>
            <h3>
              {item?.departureTime} <span className="A_D_Dates">{date}</span>
            </h3>
          </div>
          <p style={{fontSize:'1.8vh'}}> ――― 13h 10m ―――</p>
          <div>
            <p>{item?.destination}</p>
            <h3>
              {item?.arrivalTime} <span className="A_D_Dates">{date}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="price_and_book_button_wrapper">
        <div>
          <p>Starts from</p>
          <h3>{item?.price}</h3>
        </div>

        <div>
          <p>{availableSeats} seats left</p>
          <button className="select_seats_bth"
          onClick={() => handleSearch(item.id,item?.source,item?.destination,date)} 
          >
            Select seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusDetailsCard;
