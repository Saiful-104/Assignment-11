import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'
import ScholarshipCard from './ScholarshipCard'

const AllScholarships = () => {
  const { data: allScholarships = [], isLoading } = useQuery({
    queryKey: ['all-scholarships'],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/scholarships`
      )
      console.log(res.data.data)
      return res.data.data
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            All Scholarships
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Browse all available scholarships — full fund, partial, international, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {allScholarships.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No scholarships available at the moment.
            </p>
          ) : (
            allScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))
          )}
        </div>
      </Container>
    </motion.section>
  )
}

export default AllScholarships
