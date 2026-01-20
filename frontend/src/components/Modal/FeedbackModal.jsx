import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const FeedbackModal = ({ setIsOpen, isOpen, application }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  
  const [feedback, setFeedback] = useState(application?.feedback || '')

  const feedbackMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.put(`/moderator/applications/${application._id}/feedback`, {
        feedback: feedback
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['moderator-applications'])
      setIsOpen(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    feedbackMutation.mutate()
  }

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10'
      onClose={() => setIsOpen(false)}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 rounded-xl shadow-xl'>
            <div className='flex justify-between items-center mb-4'>
              <DialogTitle as='h3' className='text-lg font-medium'>
                Write Feedback
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400'
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-600 mb-4'>
                    Application from: {application?.userName}
                  </p>
                </div>
                
                <div>
                  <label className='block text-sm font-medium'>
                    Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className='mt-1 block w-full border border-gray-300 rounded p-2'
                    rows='4'
                    required
                  />
                </div>
                
                <div className='flex justify-end gap-3'>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='px-4 py-2 border border-gray-300 text-gray-700 rounded'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default FeedbackModal