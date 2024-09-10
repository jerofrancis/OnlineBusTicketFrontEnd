// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { login, logout,register,setUser } from '../Redux/Slices/authSlice';
import Axios from '../api/Axios';


const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const loginUser = (credentials) => {
    return dispatch(login(credentials));
  };

  const registerUser = (credentials) =>{
    return dispatch(register(credentials))
  }

  const logoutUser = () => {
    return dispatch(logout());
  };
        
const getUser = async () =>{
  try {
    const response = await Axios.get("/get/profile", { headers: { 'Content-Type': 'application/json' }});
    if(response?.status === 200){
      const userData = response.data;
      dispatch(setUser(userData));
      localStorage.setItem('user', JSON.stringify(userData));
    }

  } catch (error) {
    return false;
  }
}

  return {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    isAuthenticated,
    role,
    loading,
    error,
  };
};

export default useAuth;
