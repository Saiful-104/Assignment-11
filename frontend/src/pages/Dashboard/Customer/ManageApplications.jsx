import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Shared/Container';
import Heading from '../../../components/Shared/Heading';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ApplicationDetailsModal from '../../../components/Modal/ApplicationDetailsModal';
import FeedbackModal from '../../../components/Modal/FeedbackModal';

const ManageApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch all applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['moderator-applications'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/moderator/applications');
      return data.data;
    },
    enabled: !!user,
  });

  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.put(`/moderator/applications/${id}/status`, {
        applicationStatus: status
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['moderator-applications']);
    }
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.put(`/moderator/applications/${id}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['moderator-applications']);
    }
  });

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setDetailsModalOpen(true);
  };

  const handleFeedbackClick = (application) => {
    setSelectedApplication(application);
    setFeedbackModalOpen(true);
  };

  const handleStatusChange = (application, newStatus) => {
    statusMutation.mutate({
      id: application._id,
      status: newStatus
    });
  };

  const handleRejectClick = (application) => {
    if (window.confirm(`Reject application from ${application.userName}?`)) {
      rejectMutation.mutate(application._id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading title="Manage Applied Applications" />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applicant Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    University Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Application Feedback
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Application Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.userName || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.userEmail || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.universityName || 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {application.feedback || 'No feedback'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${application.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                          application.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                          application.applicationStatus === 'completed' ? 'bg-blue-100 text-blue-800' :
                          application.applicationStatus === 'processing' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                        {application.applicationStatus || 'pending'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${application.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {application.paymentStatus || 'unpaid'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Details Button */}
                        <button
                          onClick={() => handleDetailsClick(application)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                        >
                          Details
                        </button>
                        
                        {/* Feedback Button */}
                        <button
                          onClick={() => handleFeedbackClick(application)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-xs"
                        >
                          Feedback
                        </button>
                        
                        {/* Status Update Buttons */}
                        <button
                          onClick={() => handleStatusChange(application, 'processing')}
                          disabled={application.applicationStatus === 'processing'}
                          className={`px-2 py-1 text-xs rounded ${
                            application.applicationStatus === 'processing' 
                              ? 'bg-gray-300 cursor-not-allowed' 
                              : 'bg-purple-500 text-white'
                          }`}
                        >
                          Processing
                        </button>
                        
                        <button
                          onClick={() => handleStatusChange(application, 'completed')}
                          disabled={application.applicationStatus === 'completed'}
                          className={`px-2 py-1 text-xs rounded ${
                            application.applicationStatus === 'completed' 
                              ? 'bg-gray-300 cursor-not-allowed' 
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          Completed
                        </button>
                        
                        {/* Cancel/Reject Button */}
                        <button
                          onClick={() => handleRejectClick(application)}
                          disabled={application.applicationStatus === 'rejected'}
                          className={`px-3 py-1 text-xs rounded ${
                            application.applicationStatus === 'rejected' 
                              ? 'bg-gray-300 cursor-not-allowed' 
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {applications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No applications found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedApplication && (
        <>
          <ApplicationDetailsModal
            isOpen={detailsModalOpen}
            setIsOpen={setDetailsModalOpen}
            application={selectedApplication}
          />

          <FeedbackModal
            isOpen={feedbackModalOpen}
            setIsOpen={setFeedbackModalOpen}
            application={selectedApplication}
          />
        </>
      )}
    </Container>
  );
};

export default ManageApplications;