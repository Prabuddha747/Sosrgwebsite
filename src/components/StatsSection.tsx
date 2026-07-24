import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Founded', value: '2012' },
  { label: 'Theatre Groups', value: '100+' },
  { label: 'Productions', value: '380+' },
  { label: 'Recognition', value: 'Guinness World Record' },
];

const StatsSection = () => {
  return (
    <section className="py-20 md:py-28 border-y border-[#B9914A]/10 relative z-10 overflow-hidden bg-[#090B10]">
      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Proof</p>
          <h2 className="text-lg md:text-xl text-[#F5F4F2]/60 font-light tracking-[0.2em] uppercase">
            14 years, before the platform existed
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#F5F4F2] mb-4 group-hover:text-[#B9914A] transition-colors duration-500">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[#F5F4F2]/40 tracking-[0.15em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
