import { useState } from "react";
import { Buses } from "../../data";
import SeaterIcon from "../../Assets/icons/icons";
import { Available, Selected, Booked } from "../../Assets/icons/icons";

const useLayout = (SelectedBus,notify) => {
  
  const BookedSeats = SelectedBus.bookings?.bookedSeats;

  const isSeetBooked = (seat) => BookedSeats.includes(seat);

  const isSleeper = SelectedBus.busType === "A/C Sleeper";

  const [selectedSeats, setSelectedSeats] = useState([]);

  const selectSeat = (seat) => {
    if(selectedSeats.length === 7 && !selectedSeats.includes(seat)){
      notify();
      return
    }
    if (BookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      const seats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(seats);
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const generateSeats = (array, key = "") =>
    array?.map((seats) =>
      Array.isArray(seats) ? (
        <div>
          {seats?.map((seat) => (
            <div
              className="TicketItem"
              style={{
                background: isSeetBooked(`${key}${seat}`)
                  ? "#AAAAB6"
                  : selectedSeats.includes(`${key}${seat}`)
                  ? "#312a91eb"
                  : "white",
                color: isSeetBooked(`${key}${seat}`)
                  ? "white"
                  : selectedSeats.includes(`${key}${seat}`)
                  ? "white"
                  : "black",
                cursor: isSeetBooked(`${key}${seat}`)
                  ? "not-allowed"
                  : "pointer",
              }}
              key={`${key}${seat}`}
              onClick={() => selectSeat(`${key}${seat}`)}
            >
              {/* {key}
              {} */}
              <span
                className="seat_design"
                style={{
                  background: isSeetBooked(`${key}${seat}`)
                    ? "white"
                    : selectedSeats.includes(`${key}${seat}`)
                    ? "white"
                    : "#AAAAB6",
                }}
              ></span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="TicketItem"
          style={{
            background: isSeetBooked(`${key}${seats}`)
              ? "#AAAAB6"
              : selectedSeats.includes(`${key}${seats}`)
              ? "#312a91eb"
              : "white",
            cursor: isSeetBooked(`${key}${seats}`) ? "not-allowed" : "pointer",
            color: isSeetBooked(`${key}${seats}`)
              ? "white"
              : selectedSeats.includes(`${key}${seats}`)
              ? "white"
              : "black",
          }}
          onClick={() => selectSeat(`${key}${seats}`)}
          key={`${key}${seats}`}
        >
          {/* {key} {seats} */}
          <span
            className="seat_design"
            style={{
              background: isSeetBooked(`${key}${seats}`)
                ? "white"
                : selectedSeats.includes(`${key}${seats}`)
                ? "white"
                : "#AAAAB6",
            }}
          ></span>
        </div>
      )
    );

  const generateSeaterSeats = (array, key = "") =>
    array?.map((seats) =>
      Array.isArray(seats) ? (
        <div>
          {seats?.map((seat) => (
            <div
              style={{
                cursor: isSeetBooked(`${key}${seat}`)
                  ? "not-allowed"
                  : "pointer",
              }}
              key={seat}
              onClick={() => selectSeat(`${key}${seat}`)}
            >
              {isSeetBooked(`${key}${seat}`) ? (
                <Booked />
              ) : selectedSeats.includes(`${key}${seat}`) ? (
                <Selected />
              ) : (
                <Available key={`${key}${seat}`} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            cursor: isSeetBooked(`${key}${seats}`) ? "not-allowed" : "pointer",
          }}
          onClick={() => selectSeat(`${key}${seats}`)}
        >
          {isSeetBooked(`${key}${seats}`) ? (
            <Booked />
          ) : selectedSeats.includes(`${key}${seats}`) ? (
            <Selected />
          ) : (
            <Available key={`${key}${seats}`} />
          )}
        </div>
      )
    );
  return {
    SelectedBus,
    isSleeper,
    selectedSeats,
    selectSeat,
    generateSeats,
    generateSeaterSeats,
  };
};

export default useLayout;
