import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Shared/Container';
import Heading from '../../../components/Shared/Heading';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import DeleteModal from '../../../components/Modal/DeleteModal';

const AllReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['moderator-reviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/moderator/review');
      return data.data;
    },
    enabled: !!user,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/moderator/reviews/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['moderator-reviews']);
      setDeleteModalOpen(false);
    }
  });

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
      <Heading title="All Reviews" />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Scholarship Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    University Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Review Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Review Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {review.userName || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.userEmail || ''}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
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
                        <span className="text-sm font-medium">
                          {review.ratingPoint}/5
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(review)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {reviews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No reviews found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        confirmDelete={confirmDelete}
        itemName={`review by ${selectedReview?.userName}`}
        itemType="review"
        isLoading={deleteMutation.isPending}
      />
    </Container>
  );
};

export default AllReviews;