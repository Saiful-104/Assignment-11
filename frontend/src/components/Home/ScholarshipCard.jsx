import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { MapPin, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';

const ScholarshipCard = ({ scholarship, viewMode = 'grid', isTop = false, rank = null, index = 0 }) => {
  // Database fields exactly as they are
  const {
    _id,
    scholarshipName = 'Scholarship Name',
    scholarshipCategory = 'General',
    universityName = 'University',
    universityImage = 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    universityCountry = 'International',
    universityCity = '',
    applicationFees = 0
  } = scholarship;

  const location = `${universityCity ? `${universityCity}, ` : ''}${universityCountry}`;

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex gap-8 p-6 relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image Section */}
          <div className="relative flex-shrink-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <img
              src={universityImage}
              alt={universityName}
              className="w-52 h-36 object-cover rounded-xl ring-2 ring-gray-200/50 group-hover:ring-blue-400/50 transition-all duration-300"
            />
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {scholarshipCategory}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow flex flex-col justify-between z-10">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                {scholarshipName}
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-4">{universityName}</p>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4 group">
                <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">{location}</span>
              </div>

              {applicationFees > 0 && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-lg border border-amber-200/50">
                  <span className="text-sm text-amber-900 font-medium">Application Fee:</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ${applicationFees}
                  </span>
                </div>
              )}
            </div>

            <Link
              to={`/scholarship/${_id}`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 self-start mt-4 shadow-lg hover:shadow-xl group"
            >
              View Details
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View (Default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-gradient-to-br from-white via-white to-gray-50/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 backdrop-blur-sm group relative"
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ padding: '2px' }}>
        <div className="bg-white rounded-2xl h-full w-full" />
      </div>

      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs px-3 py-2 rounded-full font-bold shadow-xl backdrop-blur-sm z-20 flex items-center gap-1.5 ring-2 ring-white/20">
            <Sparkles className="w-3 h-3" />
            {scholarshipCategory}
          </div>
          
          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg z-20 ring-1 ring-gray-200/50 group-hover:bg-white transition-all duration-300">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">{universityCountry}</span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 line-clamp-2 min-h-[3.5rem] group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {scholarshipName}
          </h3>
          
          <p className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            {universityName}
          </p>

          <div className="flex items-center gap-2 text-gray-600 mb-5 pb-5 border-b border-gray-200/50">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            </div>
            <span className="text-sm font-medium truncate">{location}</span>
          </div>

          {applicationFees > 0 && (
            <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-xl mb-5 border border-amber-200/50">
              <span className="text-sm text-amber-900 font-medium">Application Fee</span>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ${applicationFees}
              </span>
            </div>
          )}

          <Link
            to={`/scholarship/${_id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/button"
          >
            View Details
            <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;