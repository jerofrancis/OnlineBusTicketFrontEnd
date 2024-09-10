import React,{useEffect,useState} from 'react'
import "./ViewTicket.css"
import Ticket from '../../Components/Ticket/Ticket'
import { useSearchParams } from 'react-router-dom'
import Axios from '../../api/Axios'

const ViewTicket = () => {

    const [searchParams] = useSearchParams();
    const passengerId = searchParams.get("passengerId");
    const bookingId = searchParams.get("bookingId");

    const[username,setUsername] = useState("");
    const [ticket, setTicket] = useState([]);
 
    const getTicket = async () =>{
        try {
            const response = await Axios.get(`/ticket/view?passengerId=${passengerId}&bookingId=${bookingId}`);
            setTicket(response?.data?.userBookings)

            const username = JSON.parse(response?.data?.userName)
            setUsername(username?.name);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        getTicket();   
    },[])

  
  return (
    <div className='ViewTicket_wrapper'>
        <Ticket ticket={ticket}  username={username}/>
    </div>
  )
}

export default ViewTicket