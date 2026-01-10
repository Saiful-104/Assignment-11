import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Shared/Container';
import Heading from '../../../components/Shared/Heading';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import DeleteModal from '../../../components/Modal/DeleteModal';
import UpdateScholarshipModal from '../../../components/Modal/UpdateScholarshipModal';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [scholarshipToDelete, setScholarshipToDelete] = useState(null);

  // Fetch all scholarships
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['admin-scholarships'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/scholarships');
      return data.data;
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/scholarships/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-scholarships']);
      setDeleteModalOpen(false);
      setScholarshipToDelete(null);
    }
  });

  const handleDeleteClick = (scholarship) => {
    setScholarshipToDelete(scholarship);
    setDeleteModalOpen(true);
  };

  const handleUpdateClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    setUpdateModalOpen(true);
  };

  const confirmDelete = () => {
    if (scholarshipToDelete) {
      deleteMutation.mutate(scholarshipToDelete._id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading title="Manage Scholarships" />
      
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scholarship Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scholarships.map((scholarship) => (
                  <tr key={scholarship._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {scholarship.scholarshipName}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{scholarship.universityName}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{scholarship.universityCountry}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">${scholarship.applicationFees}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateClick(scholarship)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(scholarship)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
        
        {scholarships.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No scholarships found
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        confirmDelete={confirmDelete}
        itemName={scholarshipToDelete?.scholarshipName}
      />

      {/* Update Modal */}
      <UpdateScholarshipModal
        isOpen={updateModalOpen}
        setIsOpen={setUpdateModalOpen}
        scholarship={selectedScholarship}
      />
    </Container>
  );
};

export default ManageScholarships;