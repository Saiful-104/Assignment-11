import Container from '../Shared/Container';
import ScholarshipCard from './ScholarshipCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Star,
  Award,
  Target,
  ChevronRight,
  Sparkles,
  Zap,
  Crown,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const TopScholarships = () => {
  const { data: topScholarships = [], isLoading, error } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/top/scholarships`
      );
      return res.data?.data || [];
    },
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredScholarships, setFilteredScholarships] = useState([]);

  useEffect(() => {
    if (!topScholarships.length) {
      setFilteredScholarships([]);
      return;
    }

    const filtered = topScholarships.filter((scholarship) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'no-fee')
        return scholarship.applicationFees === 0;
      return true;
    });

    setFilteredScholarships(filtered);
  }, [activeFilter, topScholarships]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">
          Error Loading Scholarships
        </h2>
      </div>
    );
  }

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 overflow-hidden">
      {/* Background blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm uppercase">
              Premium Selection
            </span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
              Top Scholarships
            </span>
            <br />
            <span className="text-4xl md:text-6xl text-gray-900">2026</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Currently open opportunities with generous awards and low/no
            application fees
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-4">
            {['all', 'no-fee'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                {filter === 'all' && <Target className="w-4 h-4" />}
                {filter === 'no-fee' && <Zap className="w-4 h-4" />}
                {filter === 'all' ? 'All Scholarships' : 'No Application Fee'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredScholarships.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-3xl font-bold mb-6">
                No scholarships found
              </h3>
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-full"
              >
                Show All
                <ChevronRight />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard
                  key={scholarship._id || index}
                  scholarship={scholarship}
                  isTop
                  rank={index + 1}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ CENTERED EXPLORE MORE BUTTON */}
        <div className="flex justify-center mt-16">
          <Link to='/scholarships' className="bg-amber-100 text-gray-500 flex items-center justify-center px-10 py-3 border border-amber-400 rounded-full hover:bg-amber-400/10 transition">
            Explore More
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default TopScholarships;
