import React,{useState,useEffect} from 'react'
import "./Navbar.css"
import { GiJourney } from "react-icons/gi";
import { useLocation, useNavigate ,useSearchParams} from 'react-router-dom';
import "../../Pages/Home/Home.css"
import { locations } from "../../data";
import useAuth from '../../hooks/useAuth';
import { CgProfile } from "react-icons/cg";
import { BusArrival, BusDeparture, Calender } from "../../Assets/icons/icons";
import { GoArrowSwitch } from "react-icons/go";
import dayjs, { Dayjs } from "dayjs";
import {  DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";


const Navbar = ({searchState,setSearchState,setShowLogin}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const pathname = location.pathname
  const [value, setValue] = useState(dayjs("DD - MM - YYYY"));
  const minDate = dayjs(today);
  
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchState.date === 'Invalid Date'){
      alert("Please Enter Date");
      return;
    }
    const searchParams = new URLSearchParams({
      source: searchState?.from || '',
      destination: searchState?.to || '',
      availableDate: searchState?.date || '',
    });
    
    navigate(`/search?${searchParams.toString()}`);
    setSearchState((prev) => ({
      ...prev,
      from:source,
      to:destination,
      date: date,
    }))
  };
  useEffect(() =>{
    const formattedValue = value?.format('YYYY-MM-DD');
     setSearchState((prev) => ({
       ...prev,
       date: formattedValue,
     }))
   },[value])

   

  return (
    <>
    <div className={pathname !== '/' ? 'colored_Navbar_wrapper' : 'Navbar_wrapper'} onClick={() => navigate("/")}>
      <div className='Logo_wrapper'>
        <GiJourney className='logo'/>
      </div>
      <ul className="NavLinks_wrapper">
        <li onClick={() => navigate("/")}>Home</li>
        {!isAuthenticated ?
        <li onClick={() => setShowLogin(true)}>Login</li>
        :
        <a href='/profile/find/passenger/details?passengerId='><CgProfile className='profile_icon'/></a>
        }
      </ul>
    </div>
    {
    pathname !== '/' &&
    <div className='Navbar_below_wrapper'>
    <div className='Navbar_below'>
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
    }
    </>
  )
}

export default Navbar