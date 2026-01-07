import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Container from '../Shared/Container';
import ScholarshipCard from './ScholarshipCard';
import { useState } from 'react';
import { Search, Filter, ChevronDown, Grid, List, Award, X, Globe, BookOpen, GraduationCap, MapPin } from 'lucide-react';

const AllScholarships = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    subject: 'all',
    country: 'all',
    degree: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch all scholarships
  const { data: allScholarships = [], isLoading } = useQuery({
    queryKey: ['all-scholarships'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships`);
      return res.data.data;
    },
  });

  // Fetch filter options
  const { data: filterOptions = { categories: [], subjects: [], countries: [], degrees: [] } } = useQuery({
    queryKey: ['filter-options'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/scholarships/filters`);
        return res.data.data;
      } catch (error) {
        console.log('Filter API not available, using client-side filtering only');
        return { categories: [], subjects: [], countries: [], degrees: [] };
      }
    },
  });

  // Client-side filtering (এটা কাজ করবে যদি backend কাজ না করে)
  const filteredScholarships = allScholarships.filter(scholarship => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        scholarship.scholarshipName?.toLowerCase().includes(searchLower) ||
        scholarship.universityName?.toLowerCase().includes(searchLower) ||
        scholarship.degree?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && scholarship.scholarshipCategory !== filters.category) {
      return false;
    }
    
    // Subject filter
    if (filters.subject !== 'all' && scholarship.subjectCategory !== filters.subject) {
      return false;
    }
    
    // Country filter
    if (filters.country !== 'all' && scholarship.universityCountry !== filters.country) {
      return false;
    }
    
    // Degree filter
    if (filters.degree !== 'all' && scholarship.degree !== filters.degree) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      subject: 'all',
      country: 'all',
      degree: 'all'
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Container>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            All <span className="bg-gradient-to-r from-emerald-500 to-lime-500 bg-clip-text text-transparent">Scholarships</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Browse all available scholarships — full fund, partial, international, and more.
          </p>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scholarships, universities, or degrees..."
              className="w-full pl-14 pr-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span className="font-semibold">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-emerald-600 dark:text-emerald-400">{filteredScholarships.length}</span> Scholarships Found
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Scholarship Category Filter */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Scholarship Type
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <button
                          onClick={() => handleFilterChange('category', 'all')}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${filters.category === 'all' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          All Categories
                        </button>
                        {filterOptions.categories?.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleFilterChange('category', category)}
                            className={`block w-full text-left px-3 py-2 rounded-lg truncate ${filters.category === category ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject Category Filter */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Subject
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <button
                          onClick={() => handleFilterChange('subject', 'all')}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${filters.subject === 'all' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          All Subjects
                        </button>
                        {filterOptions.subjects?.map((subject) => (
                          <button
                            key={subject}
                            onClick={() => handleFilterChange('subject', subject)}
                            className={`block w-full text-left px-3 py-2 rounded-lg truncate ${filters.subject === subject ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            {subject}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Country Filter */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <button
                          onClick={() => handleFilterChange('country', 'all')}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${filters.country === 'all' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          All Countries
                        </button>
                        {filterOptions.countries?.map((country) => (
                          <button
                            key={country}
                            onClick={() => handleFilterChange('country', country)}
                            className={`block w-full text-left px-3 py-2 rounded-lg truncate ${filters.country === country ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Degree Filter */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Degree Level
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <button
                          onClick={() => handleFilterChange('degree', 'all')}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${filters.degree === 'all' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                          All Degrees
                        </button>
                        {filterOptions.degrees?.map((degree) => (
                          <button
                            key={degree}
                            onClick={() => handleFilterChange('degree', degree)}
                            className={`block w-full text-left px-3 py-2 rounded-lg truncate ${filters.degree === degree ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            {degree}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scholarships Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + searchTerm + JSON.stringify(filters)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredScholarships.length === 0 ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <Award className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">No Scholarships Found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
              }>
                {filteredScholarships.map((scholarship, index) => (
                  <ScholarshipCard
                    key={scholarship._id}
                    scholarship={scholarship}
                    viewMode={viewMode}
                    isTop={false}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </motion.section>
  );
};

export default AllScholarships;