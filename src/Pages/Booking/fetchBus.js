import Axios from "../../api/Axios";


const fetchBus = async (busId,source,destination,date,setSelectedBus) => {
    try {
      const response = await Axios.get(
        `/booking?busId=${busId}&source=${source}&destination=${destination}&date=${date}`
      );
      if (response?.status === 200) {
        setSelectedBus(response.data);
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
      }
      if (error?.message === "Network Error") {
        alert("Server Down Please try Later");
      }
    }
  };

  export default fetchBus;