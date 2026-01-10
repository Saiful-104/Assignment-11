import Container from "../components/Shared/Container";
import Heading from "../components/Shared/Heading";
import Button from "../components/Shared/Button/Button";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from '../hooks/useAuth'
import { useState } from "react";

const PaymentCheckout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [processing, setProcessing] = useState(false);

  // Fetch scholarship info
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["payment-scholarship", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { scholarshipName, universityName, applicationFees = 0, degree, universityImage } = scholarship || {};

  // const handlePayment = async () => {
  //   if (!user) {
  //     alert("You must be logged in to apply!");
  //     return;
  //   }

  //   setProcessing(true);

  //   try {
  //     // If fees are 0, no payment is required
  //     if (Number(applicationFees) === 0) {
  //       alert("This scholarship has no application fee. You can apply directly!");
  //       setProcessing(false);
  //       navigate(`/payment-success-free/${id}`);
  //       return;
  //     }

  //     const paymentInfo = {
  //       scholarshipId: scholarship._id,
  //       scholarshipName,
  //       universityName,
  //       degree,
  //       applicationFees: Number(applicationFees), // make sure it's a number
  //       serviceCharge: scholarship.serviceCharge || 0,
  //       customer: {
  //         name: user.displayName,
  //         email: user.email,
  //         id: user.uid,
  //         photoURL: user.photoURL
  //       }
  //     };

  //     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);

  //     // Redirect to Stripe checkout page
  //     window.location.href = data.url;
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     alert("Failed to initiate payment. Try again.");
  //     setProcessing(false);
  //   }
  // };
  
   // In PaymentCheckout.js, update handlePayment function:
const handlePayment = async () => {
  if (!user) {
    alert("You must be logged in to apply!");
    return;
  }

  setProcessing(true);

  try {
    // First save application with unpaid status
    const applicationData = {
      scholarshipId: scholarship._id,
      scholarshipName,
      universityName,
      degree,
      applicationFees: Number(applicationFees),
      serviceCharge: scholarship.serviceCharge || 0,
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      paymentStatus: "unpaid" // Initial status
    };

    // Save application to database
    await axios.post(`${import.meta.env.VITE_API_URL}/save-application`, applicationData);

    // If fees are 0, update to paid and redirect
    if (Number(applicationFees) === 0) {
      // Update application status to paid for free scholarships
      await axios.post(`${import.meta.env.VITE_API_URL}/update-free-application`, {
        scholarshipId: scholarship._id,
        userEmail: user.email,
      });
     navigate(`/payment-success?free=true&scholarshipId=${scholarship._id}`);
      return;
    }

    // For paid scholarships, proceed with Stripe
    const paymentInfo = {
      scholarshipId: scholarship._id,
      scholarshipName,
      universityName,
      degree,
      applicationFees: Number(applicationFees),
      serviceCharge: scholarship.serviceCharge || 0,
      customer: {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        photoURL: user.photoURL
      }
    };

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);
    window.location.href = data.url;
  } catch (err) {
    console.error("Payment error:", err);
    alert("Failed to initiate payment. Try again.");
    setProcessing(false);
  }
};
   
  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <Heading title="Complete Your Application" subtitle="Secure payment gateway" />

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          {/* Scholarship Summary */}
          <div className="flex items-center gap-6 mb-8">
            <img className="w-20 h-20 rounded-lg object-cover" src={universityImage} alt={universityName} />
            <div>
              <h3 className="text-xl font-bold">{scholarshipName}</h3>
              <p className="text-gray-600">{universityName}</p>
              <p className="text-gray-600">Degree: {degree}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Order Summary */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Application Fee</span>
                <span className="font-semibold">${applicationFees}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Total Amount</span>
                <span className="text-xl font-bold">${applicationFees}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              label={processing ? "Processing..." : (applicationFees === 0 ? "Apply Now" : `Pay $${applicationFees}`)}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 text-white font-semibold rounded-lg"
              onClick={handlePayment}
              disabled={processing}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentCheckout;