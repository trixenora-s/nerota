import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Birthday', slug: 'birthday', color: 'from-pink-500 to-orange-500', icon: '🎂' },
  { name: 'Wedding', slug: 'wedding', color: 'from-purple-500 to-pink-500', icon: '💍' },
  { name: 'Anniversary', slug: 'anniversary', color: 'from-blue-500 to-indigo-500', icon: '💝' },
  // ... more categories
];

export default function CategoriesGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Popular Celebrations
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <Link href={`/events/${category.slug}`}>
                <div className={`h-48 rounded-3xl p-8 flex flex-col items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 backdrop-blur-sm border border-white/20`}>
                  <span className="text-4xl mb-4">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}