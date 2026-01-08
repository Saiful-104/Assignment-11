import { useNavigate } from "react-router";
import Container from "../components/Shared/Container";
import Heading from "../components/Shared/Heading";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <Heading title="Payment Cancelled" subtitle="You did not complete the payment." />
        <button
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg"
          onClick={() => navigate("/scholarships")}
        >
          Back to Scholarships
        </button>
      </div>
    </Container>
  );
};

export default PaymentCancel;
