import React from 'react'

const BookingLayout = ({isSleeper,generateSeats,generateSeaterSeats,SelectedBus}) => {
  return (
    <div className="Booking_layout">
          {isSleeper ? (
            <>
              {/* <=== Upper berth ===> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h6 className="tagline">Upper</h6>
                <div className="Ticket_container_upper">
                  <div
                    className="Seats_firstRow"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    {generateSeats(SelectedBus?.seatLayout?.upper?.first, "U")}
                  </div>
                  <div className="Seats_secondRow">
                    {generateSeats(SelectedBus?.seatLayout?.upper?.second, "U")}
                  </div>
                </div>
              </div>

              <span className="separation_line"></span>

              {/* <=== Lower berth ===> */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h6 className="tagline">Lower</h6>
                <div className="Ticket_container_lower">
                  <div
                    className="Seats_firstRow"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    {generateSeats(SelectedBus?.seatLayout?.lower?.first, "L")}
                  </div>
                  <div className="Seats_secondRow">
                    {generateSeats(SelectedBus?.seatLayout?.lower?.second, "L")}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h6 className="tagline">Front</h6>
                <div className="Seater_Ticket_container">
                  <div className="Seater_Seats_firstRow">
                    {generateSeaterSeats(SelectedBus?.seatLayout?.first, "R")}
                  </div>
                  <div className="Seater_Seats_seconRow">
                    {generateSeaterSeats(SelectedBus?.seatLayout?.second, "L")}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
  )
}

export default BookingLayout