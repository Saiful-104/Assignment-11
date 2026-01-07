import Container from '../Shared/Container';
import ScholarshipCard from './ScholarshipCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Star, Award, Target, ChevronRight, Sparkles, Zap, Crown } from 'lucide-react';
import { useState } from 'react';

const TopScholarships = () => {
  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/top/scholarships`);
      return res.data.data;
    },
  });

  const [activeFilter, setActiveFilter] = useState('all');

  // Filter logic for top scholarships
  const filteredScholarships = topScholarships.filter(scholarship => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'full') return scholarship.tuitionFees === 0 || scholarship.fundingType === 'full';
    if (activeFilter === 'no-fee') return scholarship.applicationFees === 0;
    if (activeFilter === 'urgent') {
      if (!scholarship.deadline) return false;
      const deadline = new Date(scholarship.deadline);
      const monthFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return deadline < monthFromNow;
    }
    return true;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300/10 dark:bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full shadow-lg">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-white font-bold tracking-wider text-sm uppercase">Premium Selection</span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Top Scholarships
              </span>
              <span className="absolute -top-6 -right-6 text-3xl">🔥</span>
            </span>
            <br />
            <span className="text-4xl md:text-6xl">2026</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Currently open opportunities with generous awards and low/no application fees
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">{topScholarships.length}+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Top Scholarships</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Verified</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/30">
                <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">4.8</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['all', 'full', 'no-fee', 'urgent'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter === 'all' && <Target className="w-4 h-4" />}
                {filter === 'full' && <Crown className="w-4 h-4" />}
                {filter === 'no-fee' && <Zap className="w-4 h-4" />}
                {filter === 'urgent' && <Sparkles className="w-4 h-4" />}
                {filter === 'all' && 'All Scholarships'}
                {filter === 'full' && 'Full Funding'}
                {filter === 'no-fee' && 'No Application Fee'}
                {filter === 'urgent' && 'Urgent Deadline'}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Scholarships Grid */}
        <AnimatePresence mode="wait">
          {filteredScholarships.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Target className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No scholarships match your filter
              </h3>
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300"
              >
                Show All Scholarships
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard
                  key={scholarship._id}
                  scholarship={scholarship}
                  isTop={true}
                  rank={index + 1}
                  viewMode="grid"
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default TopScholarships;