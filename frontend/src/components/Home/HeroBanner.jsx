import { motion } from 'framer-motion';
import { Link } from 'react-router';

const HeroBanner = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-600" />
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 text-center text-white px-6 max-w-5xl"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold mb-8"
      >
        Unlock Your Future
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
      >
        Discover thousands of scholarships tailored for you — merit, need-based, international, and more.
      </motion.p>
      <motion.div initial={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} transition={{ delay: 0.9 }}>
        <Link
          to="/scholarships"
          className="inline-block px-12 py-6 bg-white text-emerald-600 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition"
        >
          Search Scholarships
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default HeroBanner;
