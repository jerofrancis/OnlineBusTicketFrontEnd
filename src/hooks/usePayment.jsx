import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../api/Axios";
import useRazorpay from "react-razorpay";
import useAuth from "./useAuth"; // Adjust the path to your auth hook

const usePayment = (setShowResponse,setLoading,setReserveResponse) => {
  const [Razorpay] = useRazorpay();

  const HandlePayment = async (TotalAmount, body) => {
    let orderID = null;

    try {
      const response = await Axios.post(
        "/api/payment/create-order",
        JSON.stringify({
          amount: TotalAmount * 100,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      orderID = response.data.OrderId;
      localStorage.setItem("ToUseThisOrderId", orderID);
    } catch (err) {
      console.log(err);
    }

    const options = {
      key: "rzp_test_zeLaBiS9rm3x9J",//"rzp_test_SYxQKFMJrZMFd7",
      amount: TotalAmount * 100,
      currency: "INR",
      name: "Journey Journals",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderID,
      handler: (response) => {
        localStorage.setItem("Razorpay_order_id", response.razorpay_order_id);
        localStorage.setItem("razorpay_payment_id", response.razorpay_payment_id);
        localStorage.setItem("razorpay_signature", response.razorpay_signature);
        ConfirmOrder(body);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9566188888",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  const ConfirmOrder = async (body) => {
    try {
      const PaymentResponse = await Axios.post(
        "/api/payment/Check-order",
        JSON.stringify({
          order_id: localStorage.getItem("ToUseThisOrderId"),
          payment_id: localStorage.getItem("razorpay_payment_id"),
          razorpay_signature: localStorage.getItem("razorpay_signature"),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (PaymentResponse?.data || PaymentResponse.status === 200) {
        localStorage.removeItem("ToUseThisOrderId");
        localStorage.removeItem("razorpay_payment_id");
        localStorage.removeItem("razorpay_signature");
        await bookReservation(body);
      }
    } catch (err) {
      alert("Error Checking Payment");
      console.log(err);
      return false;
    }
  };

  const bookReservation = async (body) => {
    console.log(body);
    try {
      const response = await Axios.put("/reserve/store", body);
        console.log("Booking reserve response",response)
      if (response?.status === 200) {
        setReserveResponse(response.data);
        setLoading(false);
        setShowResponse(true);
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return false;
      }
      if (error?.message === "Network Error") {
        alert("Server Down Please try Later");
      }
    }
  };

  return { HandlePayment };
};

export default usePayment;
