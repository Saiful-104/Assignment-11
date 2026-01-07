import { motion } from 'framer-motion';

const faqs = [
  { q: 'How do I apply?', a: "Click 'View Details' and follow the official link." },
  { q: 'Is it free?', a: 'Yes! Using ScholarHub is 100% free.' },
  { q: 'Are scholarships verified?', a: 'We only list opportunities from trusted sources.' },
];

const FAQSection = () => (
  <section className="py-20 bg-white dark:bg-gray-600">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">FAQ</h2>
      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100  dark:bg-gray-800 rounded-xl p-8"
          >
            <h3 className="text-xl  text-white font-bold mb-3">{faq.q}</h3>
            <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
