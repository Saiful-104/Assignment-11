import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Calendar, MapPin, GraduationCap, Star, Zap, Crown, Award, ExternalLink, DollarSign, BookOpen } from 'lucide-react';

const ScholarshipCard = ({ 
  scholarship, 
  viewMode = 'grid', 
  isTop = false, 
  rank = null,
  index = 0 
}) => {
  // Database fields exactly as they are
  const {
    _id,
    scholarshipName = 'Scholarship Name',
    scholarshipCategory = 'General',
    universityName = 'University',
    universityImage = 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    universityCountry = 'International',
    universityCity = '',
    tuitionFees = 0,
    applicationFees = 0,
    applicationDeadline = null,
    degree = 'All Levels',
    subjectCategory = 'General',
    universityWorldRank = null
  } = scholarship;

  // Calculate days until deadline
  const getDaysUntilDeadline = () => {
    if (!applicationDeadline) return null;
    try {
      const deadlineDate = new Date(applicationDeadline);
      const today = new Date();
      const diffTime = deadlineDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch {
      return null;
    }
  };

  const daysLeft = getDaysUntilDeadline();
  const isUrgent = daysLeft !== null && daysLeft < 30;
  const isFullFunded = scholarshipCategory === 'Full fund' || tuitionFees === 0;
  const hasNoAppFee = applicationFees === 0;
  const location = `${universityCity ? `${universityCity}, ` : ''}${universityCountry}`;

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ x: 8 }}
        className="group"
      >
        <Link
          to={`/scholarship/${_id}`}
          className="block"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={universityImage}
                  alt={scholarshipName}
                  className="w-full h-64 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
                  <span className="inline-block px-4 py-2 bg-emerald-500 text-white font-bold text-sm rounded-full">
                    {scholarshipCategory}
                  </span>
                  {hasNoAppFee && (
                    <span className="inline-block px-3 py-1.5 bg-lime-500 text-white text-xs font-bold rounded-full">
                      No App Fee
                    </span>
                  )}
                </div>
                
                {isTop && rank && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                      <Star className="w-3 h-3 fill-white" />
                      TOP #{rank}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                      {scholarshipName}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{universityName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                      {isFullFunded ? 'Full Fund' : `$${tuitionFees.toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-500">Tuition Coverage</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Degree</div>
                    <div className="font-bold text-gray-800 dark:text-white">{degree}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Subject</div>
                    <div className="font-bold text-gray-800 dark:text-white truncate">{subjectCategory}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">App Fee</div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      {applicationFees > 0 ? `$${applicationFees}` : 'FREE'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Deadline</div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      {applicationDeadline ? new Date(applicationDeadline).toLocaleDateString() : 'Open'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {daysLeft !== null ? `${daysLeft} days left` : 'No deadline'}
                      </span>
                    </div>
                    {isFullFunded && (
                      <span className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-bold text-sm rounded-full">
                        FULLY FUNDED
                      </span>
                    )}
                  </div>
                  
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300">
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid View (Default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      {isTop && rank && (
        <div className="absolute -top-2 -right-2 z-30">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-black text-white">
              {rank}
            </div>
          </div>
        </div>
      )}

      <Link
        to={`/scholarship/${_id}`}
        className="block"
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            <img
              src={universityImage}
              alt={scholarshipName}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute top-4 left-4 z-20">
              <span className="inline-block px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white font-bold text-sm rounded-full">
                {scholarshipCategory}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <span className={`inline-flex items-center gap-1 px-4 py-2 ${hasNoAppFee ? 'bg-gradient-to-r from-lime-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white font-bold text-sm rounded-full shadow-lg`}>
                <DollarSign className="w-3 h-3" />
                {hasNoAppFee ? 'FREE' : `$${applicationFees}`}
              </span>
            </div>

            {isUrgent && daysLeft !== null && (
              <div className="absolute bottom-4 left-4 z-20">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
                  <Zap className="w-3 h-3" />
                  {daysLeft} DAYS LEFT
                </span>
              </div>
            )}

            <div className="absolute bottom-4 right-4 z-20">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                <MapPin className="w-3 h-3" />
                {universityCountry}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {scholarshipName}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {universityName}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                {degree}
              </span>
              <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full truncate">
                <BookOpen className="w-3 h-3 inline mr-1" />
                {subjectCategory}
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
                  {isFullFunded ? 'Full Fund' : `$${tuitionFees.toLocaleString()}`}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Tuition Coverage</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-black text-gray-900 dark:text-white mb-1">
                  {applicationFees > 0 ? `$${applicationFees}` : 'FREE'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Application Fee</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {applicationDeadline ? new Date(applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Open'}
                </span>
              </div>
              
              <div className={`text-xs px-3 py-1.5 rounded-full font-bold ${scholarshipCategory === 'Full fund' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : scholarshipCategory === 'Partial' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                {scholarshipCategory}
              </div>
            </div>

            <button className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform group-hover:-translate-y-1 transition-all duration-300">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;