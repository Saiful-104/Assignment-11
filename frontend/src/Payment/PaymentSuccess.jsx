import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Container from "../components/Shared/Container";
import Heading from "../components/Shared/Heading";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setMessage("No session found");
      setLoading(false);
      return;
    }

    // Call backend to verify payment and save application
    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
      .then(res => {
        if (res.data.success) {
          setMessage("Payment successful! Your application has been saved.");
        } else {
          setMessage("Payment not completed.");
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Error verifying payment.");
      })
      .finally(() => setLoading(false));
  }, [location]);

  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <Heading title="Payment Status" subtitle="" />
        {loading ? <p>Verifying payment...</p> : <p>{message}</p>}
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate("/scholarships")}
        >
          Back to Scholarships
        </button>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
