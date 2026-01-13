import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Shared/Container';
import Heading from '../../../components/Shared/Heading';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import DeleteModal from '../../../components/Modal/DeleteModal';
import ApplicationDetailsModal from '../../../components/Modal/ApplicationDetailsModal';
import EditApplicationModal from '../../../components/Modal/EditApplicationModal';
import AddReviewModal from '../../../components/Modal/AddReviewModal';

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch student's applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['my-applications', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-applications/${user?.email}`);
      return data.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/applications/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-applications', user?.email]);
      setDeleteModalOpen(false);
    }
  });

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setDetailsModalOpen(true);
  };

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (application) => {
    setSelectedApplication(application);
    setDeleteModalOpen(true);
  };

  const handleReviewClick = (application) => {
    setSelectedApplication(application);
    setReviewModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedApplication) {
      deleteMutation.mutate(selectedApplication._id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading title="My Applications" />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feedback</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.universityName}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.universityAddress || 'Not specified'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.subjectCategory}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        ${application.applicationFees}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${application.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                          application.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {application.applicationStatus}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.feedback || 'No feedback yet'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Details Button - Always visible */}
                        <button
                          onClick={() => handleDetailsClick(application)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                        >
                          Details
                        </button>
                        
                        {/* Edit Button - Only if pending */}
                        {application.applicationStatus === 'pending' && (
                          <button
                            onClick={() => handleEditClick(application)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                          >
                            Edit
                          </button>
                        )}
                        
                        {/* Pay Button - Only if pending AND unpaid */}
                        {application.applicationStatus === 'pending' && application.paymentStatus === 'unpaid' && (
                          <button
                            onClick={() => {
                              window.location.href = `/payment/checkout/${application.scholarshipId}`;
                            }}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                          >
                            Pay
                          </button>
                        )}
                        
                        {/* Delete Button - Only if pending */}
                        {application.applicationStatus === 'pending' && (
                          <button
                            onClick={() => handleDeleteClick(application)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        )}
                        
                        {/* Add Review Button - Only if completed */}
                        {application.applicationStatus === 'completed' && (
                          <button
                            onClick={() => handleReviewClick(application)}
                            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-xs"
                          >
                            Add Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {applications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            You haven't applied for any scholarships yet.
          </div>
        )}
      </div>

      {/* Modals */}
      <ApplicationDetailsModal
        isOpen={detailsModalOpen}
        setIsOpen={setDetailsModalOpen}
        application={selectedApplication}
      />

      <EditApplicationModal
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        application={selectedApplication}
      />

      <AddReviewModal
        isOpen={reviewModalOpen}
        setIsOpen={setReviewModalOpen}
        application={selectedApplication}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        confirmDelete={confirmDelete}
        itemName={`application for ${selectedApplication?.universityName}`}
        itemType="application"
      />
    </Container>
  );
};

export default MyApplications;