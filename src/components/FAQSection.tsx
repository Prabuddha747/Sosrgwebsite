"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I apply for casting calls and crew positions?",
    answer: "Once you join SosrG and verify your profile, you can browse all active casting calls. Simply click 'Apply', submit your portfolio or showreel, and the production house will contact you directly through our secure platform if you fit the role."
  },
  {
    question: "Is there a fee to join the creator network?",
    answer: "Creating a standard profile and browsing opportunities is completely free. We do offer an 'Elite Services' tier for creators who want premium representation, priority casting access, and dedicated portfolio management."
  },
  {
    question: "How are production houses verified on SosrG?",
    answer: "We maintain a strict, manual vetting process for all industry professionals. Every production house must provide verified company credentials, past project links, and undergo an identity check by our administrative team before they can post any requirements."
  },
  {
    question: "What types of creative roles are available?",
    answer: "Our network spans the entire creative ecosystem. We regularly host calls for Lead/Supporting Actors, Directors, Cinematographers, Screenwriters, Editors, VFX Artists, Makeup Artists, and specialized theatrical performers."
  },
  {
    question: "Can I manage my entire creative portfolio here?",
    answer: "Absolutely. Your SosrG profile acts as your digital resume. You can upload high-resolution headshots, embed video showreels, list your physical attributes (for actors), and showcase your complete filmography in one elegant, shareable link."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#090B10] py-24 md:py-32 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Questions</p>
          <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight">
            Before you join the movement.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="border-b border-[#B9914A]/10 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="py-6 flex justify-between items-center gap-6">
                <h3 className="text-base md:text-lg text-[#F5F4F2] group-hover:text-[#B9914A] transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} className="text-[#B9914A]" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="text-[#F5F4F2]/50 leading-relaxed text-sm md:text-base pb-6 pr-10">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
