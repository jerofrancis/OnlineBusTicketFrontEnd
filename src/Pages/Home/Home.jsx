import React, { useEffect, useState } from "react";
import "./Home.css";
import { locations } from "../../data";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { BusArrival, BusDeparture, Calender } from "../../Assets/icons/icons";
import { GoArrowSwitch } from "react-icons/go";
import dayjs, { Dayjs } from "dayjs";
import {  DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

const Home = ({ setSearchState, searchState, showLogin, setShowLogin }) => {
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchState.date === 'Invalid Date'){
      alert("Please Enter Date");
      return;
    }
    const searchParams = new URLSearchParams({
      source: searchState?.from || "",
      destination: searchState?.to || "",
      availableDate: searchState?.date || "",
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  const [value, setValue] = useState(dayjs("DD - MM - YYYY"));
  const minDate = dayjs(today);
  


  useEffect(() =>{
   const formattedValue = value?.format('YYYY-MM-DD');
    setSearchState((prev) => ({
      ...prev,
      date: formattedValue,
    }))
  },[value])

  return (
    <div className="Home_Container">
      <Login showLogin={showLogin} setShowLogin={setShowLogin} URLPATH={"/"} />
      <div className="Destination-choose_wrapper">
        <form action="" className="Destination-choose_form">
          <BusDeparture />
          <div className="form__input__wrapper">
            <label htmlFor="from" className="form_label">
              From
            </label>
            <select
              name="from"
              id="from"
              value={searchState.from}
              required
              onChange={(e) =>
                setSearchState((prev) => ({
                  ...prev,
                  from: e.target.value,
                }))
              }
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location} 
                </option>
              ))}
            </select>
          </div>

          <div className="separation_wrapper">
            <GoArrowSwitch className="ArrowSwitch_icon" />
            <div className="separation_line_route_icon"></div>
          </div>

          <BusArrival />
          <div className="form__input__wrapper">
            <label htmlFor="from" className="form_label">
              To
            </label>
            <select
              name="to"
              id="to"
              value={searchState.to}
              required
              onChange={(e) =>
                setSearchState((prev) => ({
                  ...prev,
                  to: e.target.value,
                }))
              }
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="separation_wrapper">
            <div className="separation_line_route_icon"></div>
          </div>

          <Calender />
          <div className="form__input__wrapper">
            <label htmlFor="from" className="form_label">
              Date
            </label>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
             
                <DemoItem>
                  <MobileDatePicker
                    value={value}
                    required
                    onChange={(newValue) => setValue(newValue)}
                    minDate={minDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={value.format("DD, MMMM, YYYY")}
                      />
                    )}
                  />
                </DemoItem>
              
            </LocalizationProvider>
          </div>

          <button type="submit" className="getBuses__submit_btn" onClick={handleSearch}>
            SEARCH BUSES
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
