import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
//import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const AddReviewModal = ({ setIsOpen, isOpen, application, user }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const { data } = await axiosSecure.post('/reviews', reviewData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-applications'])
      toast.success('Review added successfully')
      setIsOpen(false)
      setComment('')
      setRating(5)
    },
    onError: (error) => {
      console.error('Review error:', error)
      toast.error(error.response?.data?.message || 'Failed to add review')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    const reviewData = {
      scholarshipId: application.scholarshipId,
      universityName: application.universityName,
      universityId: application.universityId,
      userName: user?.displayName || application.userName,
      userEmail: user?.email || application.userEmail,
      userImage: user?.photoURL || '',
      ratingPoint: rating,
      reviewComment: comment,
      applicationId: application._id,
      createdAt: new Date().toISOString()
    }

    addReviewMutation.mutate(reviewData)
  }

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
          <DialogPanel className='w-full max-w-md bg-white rounded-xl shadow-2xl p-6'>
            <div className='flex justify-between items-center mb-6 border-b pb-4'>
              <DialogTitle as='h3' className='text-xl font-bold text-gray-900'>
                Add Review for {application?.universityName}
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-gray-600 text-xl'
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    How would you rate your experience?
                  </label>
                  <div className='flex justify-center space-x-2 mb-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-transform hover:scale-110 ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className='text-center text-sm text-gray-600'>
                    {rating === 5 ? 'Excellent' : 
                     rating === 4 ? 'Good' : 
                     rating === 3 ? 'Average' : 
                     rating === 2 ? 'Poor' : 'Very Poor'}
                  </p>
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    rows='4'
                    placeholder='Share your experience with this scholarship application process...'
                    required
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Your review will help other students
                  </p>
                </div>
                
                <div className='flex justify-end space-x-3 pt-4 border-t'>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={addReviewMutation.isPending}
                    className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors'
                  >
                    {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
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

export default AddReviewModal