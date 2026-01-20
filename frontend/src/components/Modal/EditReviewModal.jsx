import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const EditReviewModal = ({ setIsOpen, isOpen, review }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (review) {
      setRating(review.ratingPoint || 5)
      setComment(review.reviewComment || '')
    }
  }, [review])

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.put(`/reviews/${review._id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews'])
      toast.success('Review updated successfully')
      setIsOpen(false)
    },
    onError: (error) => {
      console.error('Edit error:', error)
      toast.error(error.response?.data?.message || 'Failed to update review')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    const updateData = {
      ratingPoint: rating,
      reviewComment: comment
    }

    editMutation.mutate(updateData)
  }

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
                Edit Review
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className='bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer'
              >
                X
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Rating (1-5 stars)
                  </label>
                  <div className='flex space-x-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>Selected: {rating} stars</p>
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                    rows='4'
                    placeholder='Write your review here...'
                    required
                  />
                </div>
                
                <div className='flex justify-around'>
                  <button
                    type='submit'
                    disabled={editMutation.isPending}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
                  >
                    {editMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                  >
                    Cancel
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

export default EditReviewModal