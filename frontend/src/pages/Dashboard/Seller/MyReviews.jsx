import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
 import Container from '../../../components/Shared/Container';
import Heading from '../../../components/Shared/Heading';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
 import DeleteModal from '../../../components/Modal/DeleteModal';
import EditReviewModal from '../../../components/Modal/EditReviewModal';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Fetch user's reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-reviews`);
      return data.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/reviews/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews']);
      setDeleteModalOpen(false);
    }
  });

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedReview) {
      deleteMutation.mutate(selectedReview._id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading title="My Reviews" />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scholarship Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {review.scholarshipName || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {review.universityName || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {review.reviewComment || 'No comment'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < review.ratingPoint ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          ({review.ratingPoint}/5)
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(review)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs transition-colors"
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDeleteClick(review)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {reviews.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <p className="text-lg font-medium">No reviews found</p>
            <p className="mt-2">You haven't written any reviews yet.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedReview && (
        <>
          <EditReviewModal
            isOpen={editModalOpen}
            setIsOpen={setEditModalOpen}
            review={selectedReview}
          />

          <DeleteModal
            isOpen={deleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
            confirmDelete={confirmDelete}
            itemName={`review for ${selectedReview?.scholarshipName}`}
            itemType="review"
            isLoading={deleteMutation.isPending}
          />
        </>
      )}
    </Container>
  );
};

export default MyReviews;