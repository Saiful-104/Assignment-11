import Container from '../Shared/Container';
import ScholarshipCard from './ScholarshipCard';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const TopScholarships = () => {
  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/top/scholarships`);
      return res.data.data; // Only array
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Top Scholarships 2026
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Currently open opportunities with generous awards and low/no application fees
          </p>
        </div>

        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {topScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopScholarships;
