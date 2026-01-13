import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
//import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const EditApplicationModal = ({ setIsOpen, isOpen, application }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    additionalInfo: '',
    contactNumber: '',
    address: ''
  })

  useEffect(() => {
    if (application) {
      
      setFormData({
        additionalInfo: application.additionalInfo || '',
        contactNumber: application.contactNumber || '',
        address: application.address || ''
      })
    }
  }, [application])

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.put(`/applications/${application._id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-applications'])
      toast.success('Application updated successfully')
      setIsOpen(false)
    },
    onError: (error) => {
      console.error('Edit error:', error)
      toast.error('Failed to update application')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
   
    const updateData = {
      additionalInfo: formData.additionalInfo,
      contactNumber: formData.contactNumber,
      address: formData.address,
      updatedAt: new Date().toISOString()
    }

    editMutation.mutate(updateData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
                Edit Application
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
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Contact Number
                  </label>
                  <input
                    type='tel'
                    name='contactNumber'
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                    placeholder='Your phone number'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                    placeholder='Your current address'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Additional Information
                  </label>
                  <textarea
                    name='additionalInfo'
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded'
                    rows='3'
                    placeholder='Any additional information you want to provide...'
                  />
                </div>
                
                <div className='flex justify-around pt-4'>
                  <button
                    type='submit'
                    disabled={loading || editMutation.isPending}
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

export default EditApplicationModal