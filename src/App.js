import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import BusList from './Pages/BusList/BusList';
import { locations } from './data';
import Booking from './Pages/Booking/Booking';
import UserProfile from './Pages/Profile/UserProfile/UserProfile';
import ViewTicket from './Pages/ViewTicket/ViewTicket';


function App() {
  const [searchState, setSearchState] = useState({
    from: locations[0],
    to: locations[2],
    date: ''
  })

  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Navbar
        setSearchState={setSearchState}
        searchState={searchState}
        setShowLogin={setShowLogin}
      />
      <Routes>

        <Route path="/" element={
          <Home
            setSearchState={setSearchState}
            searchState={searchState}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />}
        />
        <Route path="/search" element={<BusList />} />

        <Route path='/booking' element={<Booking
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />} />
        <Route path='/profile/find/passenger/details' element={<UserProfile />} />

        <Route path='view/ticket' element={<ViewTicket />} />
        

      </Routes>
    </Router>
  );
}

export default App;
