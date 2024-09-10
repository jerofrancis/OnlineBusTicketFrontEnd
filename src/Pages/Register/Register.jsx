import React,{useState} from "react";
import "./Register.css";
import Loader from "../../Assets/Loader";

const Register = ({ setShowRegister ,registerUser,setAuthState,dispatch,navigate,setShowLogin,URLPATH}) => {
  const [loading, setLoading] = useState(false);
  const [pwdMisMatch,setPwdMismatch] = useState(false);

  const [Data, setData] = useState({
    username:'',
    email: '',
    password: '',
    Repassword:'',
    gender:'Male',
    role:'USER',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === "Repassword") {
      if (Data.password !== value) {
        setPwdMismatch(true);
      } else {
        setPwdMismatch(false);
      }
    }
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const {Repassword,...rest} = Data;
  const response = await registerUser(rest);
  if (!response.payload) {
    dispatch(setAuthState({ isAuth: false, role: null }));
    return;
  }
  if (response) {
    setLoading(false);
    // getUser();
    setShowLogin(false);
  }

  const role = response.payload.role[0];
  dispatch(setAuthState({ isAuth: true, role }));
  navigate(URLPATH);
};

  return (
    <>
      <h4 className="headtag">REGISTER</h4>
      <form action="" className="Register_form">
        <input
          className="input_field"
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
          onChange={handleChange}
        />
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
        <input
          className="input_field"
          type="password"
          name="Repassword"
          id="Repassword"
          required
          placeholder="Re-Enter Password"
          onChange={handleChange}
        />
        <p className="pwdNotMatch">{pwdMisMatch && "Passwords does not match"}</p>
        <select id="gender" className="Gender_selection" onChange={handleChange} value={Data.gender} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <button className="Login_btn" onClick={handleSubmit}>
          {loading ? <Loader/> : "REGISTER"}
          
        </button>
      </form>
      <p className="registerLink">
        Have an account?
        <b
          style={{ color: "#D84E56", cursor: "pointer", marginLeft: "1vh" }}
          onClick={() => setShowRegister(false)}
        >
          Login
        </b>
      </p>
    </>
  );
};

export default Register;
