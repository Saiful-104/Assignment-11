import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
//import useAxiosSecure from '../../../hooks/useAxiosSecure'
//import LoadingSpinner from '../../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Shared/LoadingSpinner'

const ApplicationDetailsModal = ({ setIsOpen, isOpen, application }) => {
  const axiosSecure = useAxiosSecure()

  const { data: details, isLoading } = useQuery({
    queryKey: ['application-details', application?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/application-details/${application._id}`)
      return data.data
    },
    enabled: !!application?._id && isOpen,
  })

  // Safe access to application data
  const appData = details?.application || application

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-2xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <div className='flex justify-between items-center mb-4'>
              <DialogTitle as='h3' className='text-lg font-medium text-gray-900'>
                Application Details
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer'
              >
                X
              </button>
            </div>
            
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>University Name</h4>
                    <p className='text-sm text-gray-900'>{appData?.universityName || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>University Address</h4>
                    <p className='text-sm text-gray-900'>{appData?.universityAddress || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Subject Category</h4>
                    <p className='text-sm text-gray-900'>{appData?.subjectCategory || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Application Fees</h4>
                    <p className='text-sm text-gray-900'>${appData?.applicationFees || 0}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Payment Status</h4>
                    <p className='text-sm text-gray-900'>{appData?.paymentStatus || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Application Status</h4>
                    <p className='text-sm text-gray-900'>{appData?.applicationStatus || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Application Date</h4>
                    <p className='text-sm text-gray-900'>
                      {appData?.applicationDate ? new Date(appData.applicationDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Degree</h4>
                    <p className='text-sm text-gray-900'>{appData?.degree || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className='text-sm font-medium text-gray-500'>Feedback from Moderator</h4>
                  <p className='text-sm text-gray-900 mt-1 p-2 bg-gray-50 rounded'>
                    {appData?.feedback || 'No feedback provided yet.'}
                  </p>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ApplicationDetailsModal