import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const Casting = () => {
  return (
    <Layout>
      <div className="layout-container pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-3xl md:text-7xl font-serif italic text-white tracking-tight mb-6">
            Casting <span className="text-[#5490B4]">&</span> Crew Calls
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Discover premium production opportunities across the Indian creative landscape. Apply for roles that match your unique talent and vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Placeholder Casting Cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="liquid-glass p-6 rounded-2xl border border-white/10 hover:border-[#5490B4]/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase tracking-widest text-[#5490B4]">Feature Film</span>
                <span className="text-xs text-white/40">2 days ago</span>
              </div>
              <h3 className="text-xl text-white font-medium mb-2 group-hover:text-[#5490B4] transition-colors">Lead Actor Required</h3>
              <p className="text-sm text-white/50 mb-6 line-clamp-2">
                Major production house seeking a dynamic lead actor for an upcoming neo-noir thriller set in Mumbai.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm text-white/60">Male</span>
                <span className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm text-white/60">25-35 Yrs</span>
                <span className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-sm text-white/60">Mumbai</span>
              </div>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all text-white">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Casting;
