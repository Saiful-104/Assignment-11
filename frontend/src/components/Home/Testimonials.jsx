import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aisha Rahman',
    text: 'Found a full scholarship to study in Canada!',
    img: 'https://images.squarespace-cdn.com/content/v1/61771b1f446e7b7538117de2/edda4c4f-c332-4dd7-9880-e3c9aa60627e/diversity-students-graduation-success-celebration-concept.jpeg',
  },
  {
    name: 'Carlos Mendoza',
    text: 'ScholarHub made my dream of studying abroad possible.',
    img: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=837810935051172',
  },
  {
    name: 'Priya Singh',
    text: 'Got accepted into Harvard with their help!',
    img: 'https://www.devry.edu/content/dam/devry_edu/images/pic-testimonial-leo-gatlin.jpeg',
  },
];

const Testimonials = () => (
  <section className="py-20 bg-gradient-to-r from-emerald-50 to-lime-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-emerald-500"
            />
            <p className="text-lg text-white italic mb-6">"{t.text}"</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
