import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ScholarshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch scholarship details
  const {
    data: scholarship = {},
    isLoading: scholarshipLoading,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/scholarships/${id}`
      );
       console.log(result.data.data);
      return result.data.data;
    },
  });

  // Fetch reviews for this scholarship
  const scholarshipId = scholarship._id;
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useQuery({
    queryKey: ["reviews", scholarshipId],
    enabled: !!scholarshipId,
    queryFn: async () => {
        console.log("Fetching reviews for:", scholarship._id)
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/reviews/${scholarshipId}`
      );
      console.log(result.data.data)
      return result.data.data;
    },
  });

  const handleApply = () => {
    // Redirect to payment checkout page
    navigate(`/payment/checkout/${id}`);
  };

  if (scholarshipLoading) {
    return <LoadingSpinner />;
  }

  const {
    universityImage,
    scholarshipName,
    universityWorldRank,
    applicationDeadline,
    universityCountry,
    applicationFees,
    scholarshipDescription,
    stipend,
    coverageDetails,
    universityName
  } = scholarship || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Left Section - University Image & Basic Info */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full h-64"
                src={universityImage}
                alt="University image"
              />
            </div>
          </div>
          
          {/* University Rank & Location */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                World Rank: #{universityWorldRank}
              </span>
              <span className="text-gray-600">📍 {universityCountry}</span>
            </div>
            
            {/* Application Deadline */}
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 font-semibold">
                ⏰ Application Deadline: {formatDate(applicationDeadline)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="md:gap-10 flex-1">
          {/* Scholarship Info */}
          <Heading 
            title={scholarshipName} 
            subtitle={`University: ${universityName}`} 
          />
          <hr className="my-6" />
          
          {/* Scholarship Description */}
          <div className="text-lg font-light text-neutral-500">
            {scholarshipDescription}
          </div>
          <hr className="my-6" />

          {/* Stipend & Coverage */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Stipend & Coverage Details</h3>
            <div className="text-lg font-semibold text-green-600 mb-2">
              Stipend: {stipend}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Coverage Includes:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(coverageDetails || []).map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="my-6" />

          {/* Application Fees */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Application Fees:</p>
              <p className="text-2xl font-bold text-gray-700">${applicationFees}</p>
            </div>
            <div>
              <Button 
                onClick={handleApply} 
                label="Apply for Scholarship" 
                className="bg-green-600 hover:bg-green-700"
              />
            </div>
          </div>
          <hr className="my-6" />

          {/* Reviews Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-6">
              Student Reviews ({reviews.length})
            </h3>
            
            {reviewsLoading ? (
              <LoadingSpinner />
            ) : reviews.length === 0 ? (
              <p className="text-gray-500 italic text-center py-8">
                No reviews yet. Be the first to review this scholarship!
              </p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        className="rounded-full w-12 h-12"
                        src={review.userImage}
                        alt={review.userName}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">{review.userName}</h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(review.reviewDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={`text-lg ${
                                index < review.ratingPoint
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-2 text-gray-600">
                            ({review.ratingPoint}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 pl-16">{review.reviewComment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ScholarshipDetails;