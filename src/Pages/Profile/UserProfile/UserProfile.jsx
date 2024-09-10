import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import useAuth from "../../../hooks/useAuth";
import Login from "../../Login/Login";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../api/Axios";
import { CgProfile } from "react-icons/cg";
import Ticket from "../../../Components/Ticket/Ticket";

const UserProfile = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const { pathname, search } = useLocation();
  const URL = pathname + search;

  const navigate = useNavigate();

  const disableSetShowLogin = (value) => {
    if (isAuthenticated) setShowLogin(value);
    else {
      setShowLogin(true);
    }
  };

  const [userEmail, setUserEmail] = useState("");
  const[username,setUsername] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getPassengerDetails = async () => {
      try {
        const response = await Axios.get("/find/passenger/profile");
        const passengerId = response?.data.email;
        navigate(`/profile/find/passenger/details?passengerId=${passengerId}`);

        setUserEmail(passengerId);
        setTickets(response?.data.userBookingsList);
        const username = JSON.parse(response?.data.userName)
        setUsername(username?.name);
       
      } catch (error) {
        if (
          error.response.status === 403 ||
          error.message === "Request failed with status code 403"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setShowLogin(true);
        }
      }
    };

    getPassengerDetails();
  }, [isAuthenticated, navigate]);

 const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/")
 }

  return (
    <>
      {!isAuthenticated && (
        <Login
          showLogin={showLogin}
          setShowLogin={disableSetShowLogin}
          URLPATH={URL}
        />
      )}
      {isAuthenticated && (
        <div className="UserProfile_wrapper">
          <div className="User_details">
            <CgProfile className="profile_picture" />
            <p className="email">{userEmail}</p>
            <button className="logout_btn" onClick={handleLogout}>Logout</button>
          </div>
          <div className="Tickets_wrapper">
            {tickets?.map((ticket) => (
              <Ticket ticket={ticket} username={username}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
