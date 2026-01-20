import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


const CancelModal = ({ setIsOpen, isOpen, confirmCancel, application, isLoading }) => {
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
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <div className='flex justify-between items-center mb-4'>
              <DialogTitle as='h3' className='text-lg font-medium text-gray-900'>
                Reject Application
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            </div>
            
            <div className='space-y-4'>
              <p className='text-gray-600'>
                Are you sure you want to reject this application?
              </p>
              
              <div className='bg-gray-50 p-4 rounded-md'>
                <p className='text-sm'>
                  <span className='font-medium'>Applicant:</span> {application?.userName}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>University:</span> {application?.universityName}
                </p>
                <p className='text-sm'>
                  <span className='font-medium'>Current Status:</span> {application?.applicationStatus}
                </p>
              </div>
              
              <div className='flex justify-end gap-3'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50'
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCancel}
                  className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50'
                  disabled={isLoading}
                >
                  {isLoading ? 'Rejecting...' : 'Reject Application'}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default CancelModal