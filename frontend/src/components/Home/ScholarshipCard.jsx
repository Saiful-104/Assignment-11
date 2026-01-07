import { motion } from 'framer-motion';
import { Link } from 'react-router';

const ScholarshipCard = ({ scholarship }) => {
  
  const imgSrc = scholarship.universityImage || 'https://via.placeholder.com/400x400';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="col-span-1"
    >
      <Link
        to={`/scholarship/${scholarship._id}`}
        className="block rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="aspect-square relative overflow-hidden">
          <img
            src={imgSrc}
            alt={scholarship.scholarshipName}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          {scholarship.applicationFees === 0 && (
            <span className="absolute top-4 left-4 px-4 py-2 bg-lime-500 text-white font-bold text-sm rounded-full">
              FREE
            </span>
          )}
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-lime-600 bg-lime-100 dark:bg-lime-900/30 rounded-full mb-3">
            {scholarship.scholarshipCategory}
          </span>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
            {scholarship.scholarshipName}
          </h3>
          <div className="mt-4 text-2xl font-extrabold text-lime-600">
            {scholarship.tuitionFees ? `$${scholarship.tuitionFees}` : 'Full Fund'}
          </div>
          <button className="mt-4 w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full">
            View Details
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
