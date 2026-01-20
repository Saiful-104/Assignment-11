import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Shared/LoadingSpinner'

const ApplicationDetailsModal = ({ setIsOpen, isOpen, application }) => {
  const axiosSecure = useAxiosSecure()

  const { data: details, isLoading } = useQuery({
    queryKey: ['application-details', application?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/application-details/${application._id}`)
      return data.data;
    },
    enabled: !!application?._id && isOpen,
  })

  const appData = details?.result || application;

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-50 focus:outline-none'
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 bg-black/30' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6'>
            <div className='flex justify-between items-center mb-6 border-b pb-4'>
              <DialogTitle as='h3' className='text-xl font-bold text-gray-900'>
                Application Details
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-gray-600 text-xl'
              >
                ✕
              </button>
            </div>
            
            {isLoading ? (
              <div className="py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className='space-y-6'>
                {/* Basic Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>University Name</h4>
                    <p className='text-lg font-semibold text-gray-900'>{appData?.universityName || 'N/A'}</p>
                  </div>
                  
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>University Address</h4>
                    <p className='text-gray-900'>{appData?.universityAddress || 'Not specified'}</p>
                  </div>
                  
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Subject Category</h4>
                    <p className='text-gray-900'>{appData?.subjectCategory || 'N/A'}</p>
                  </div>
                  
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Application Fees</h4>
                    <p className='text-lg font-semibold text-gray-900'>${appData?.applicationFees || 0}</p>
                  </div>
                </div>
                
                {/* Status Information */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='p-4 rounded-lg border'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Application Status</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${appData?.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                        appData?.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                        appData?.applicationStatus === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {appData?.applicationStatus?.charAt(0).toUpperCase() + appData?.applicationStatus?.slice(1) || 'Pending'}
                    </span>
                  </div>
                  
                  <div className='p-4 rounded-lg border'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Payment Status</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${appData?.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {appData?.paymentStatus?.charAt(0).toUpperCase() + appData?.paymentStatus?.slice(1) || 'Unpaid'}
                    </span>
                  </div>
                  
                  <div className='p-4 rounded-lg border'>
                    <h4 className='text-sm font-medium text-gray-500 mb-1'>Application Date</h4>
                    <p className='text-gray-900'>
                      {appData?.createdAt ? new Date(appData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className='border-t pt-4'>
                  <h4 className='text-lg font-medium text-gray-900 mb-3'>Personal Information</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h4 className='text-sm font-medium text-gray-500 mb-1'>Full Name</h4>
                      <p className='text-gray-900'>{appData?.userName || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-gray-500 mb-1'>Email</h4>
                      <p className='text-gray-900'>{appData?.userEmail || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-gray-500 mb-1'>Contact Number</h4>
                      <p className='text-gray-900'>{appData?.contactNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-gray-500 mb-1'>Address</h4>
                      <p className='text-gray-900'>{appData?.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Additional Information */}
                {appData?.additionalInfo && (
                  <div className='border-t pt-4'>
                    <h4 className='text-lg font-medium text-gray-900 mb-2'>Additional Information</h4>
                    <p className='text-gray-700 p-3 bg-gray-50 rounded-lg'>
                      {appData.additionalInfo}
                    </p>
                  </div>
                )}
                
                {/* Feedback Section */}
                <div className='border-t pt-4'>
                  <h4 className='text-lg font-medium text-gray-900 mb-3'>Feedback from Moderator</h4>
                  <div className='p-4 bg-blue-50 rounded-lg'>
                    <p className='text-gray-700'>
                      {appData?.feedback || 'No feedback has been provided by the moderator yet.'}
                    </p>
                    {appData?.feedback && (
                      <p className='text-sm text-gray-500 mt-2'>
                        Last updated: {appData?.updatedAt ? new Date(appData.updatedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className='mt-6 flex justify-end border-t pt-4'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ApplicationDetailsModal;