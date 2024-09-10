import React, { useState } from "react";
import "./Login.css";
import LoginBg from "../../Assets/LoginBg.png";
import Register from "../Register/Register";
import useAuth from "../../hooks/useAuth";
import { setAuthState } from "../../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Assets/Loader";

const Login = ({ showLogin, setShowLogin, URLPATH }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser, getUser, registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  if (showLogin) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [showRegister, setShowRegister] = useState(false);
  const [Data, setData] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser(Data);
    if (!response.payload) {
      dispatch(setAuthState({ isAuth: false, role: null }));
      return;
    }
    if (response) {
      setLoading(false);
      setShowLogin(false);
    }

    const role = response.payload.role[0];
    dispatch(setAuthState({ isAuth: true, role }));
    navigate(URLPATH);
  };

  return (
    <>
      {showLogin && (
        <div className="modal">
          <div
            onClick={() => setShowLogin(false) || null}
            className="overlay"
          ></div>
          <div className="modal-content">
            {!showRegister ? (
              <>
                <img className="Login_bg_image" src={LoginBg} alt="login" />
                <h4 className="headtag">LOGIN</h4>
                <form action="" className="Login_form">
                  <input
                    className="input_field"
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="E-mail"
                    onChange={handleChange}
                  />
                  <input
                    className="input_field"
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <button className="Login_btn" onClick={handleSubmit}>
                    {loading ? <Loader /> : "Login"}
                  </button>
                </form>
                <p className="registerLink">
                  New Here?
                  <b
                    style={{
                      color: "#D84E56",
                      cursor: "pointer",
                      marginLeft: "1vh",
                    }}
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </b>
                </p>
              </>
            ) : (
              <Register
                setShowRegister={setShowRegister}
                registerUser={registerUser}
                dispatch={dispatch}
                navigate={navigate}
                URLPATH={URLPATH}
                setAuthState={setAuthState}
                setShowLogin={setShowLogin}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
