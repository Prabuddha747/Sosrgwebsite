"use client";

import React, { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { Instagram, ArrowRight } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp(),
      });
      showSuccess("You're in. Watch for updates.");
      setEmail('');
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#090B10]/78 border-t border-[#B9914A]/10 pt-24 md:pt-32 pb-16 relative overflow-hidden">
      {/* The journey's closing beat — light gently settling before the end */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#B9914A]/[0.07] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#B9914A]/5 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-20 md:mb-32">
          {/* Brand Section */}
          <div className="space-y-8 md:space-y-10">
            <Link to="/" className="flex items-center group">
              <img src="/sosrg.webp" alt="SosrG Logo" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-[#F5F4F2]/40 leading-relaxed">
              Building Bihar's creative economy — one artist, one production, one recognition at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/sosrgstudios" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#11151B] rounded-full flex items-center justify-center text-[#F5F4F2]/40 hover:text-[#B9914A] hover:border-[#B9914A]/40 transition-all border border-[#B9914A]/15" title="Instagram - SosrG StudioS">
                <Instagram size={16} />
              </a>

              <a href="https://www.facebook.com/sosrgstudios" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#11151B] rounded-full flex items-center justify-center text-[#F5F4F2]/40 hover:text-[#B9914A] hover:border-[#B9914A]/40 transition-all border border-[#B9914A]/15" title="Facebook - SosrG StudioS">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/sosrgstudios/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#11151B] rounded-full flex items-center justify-center text-[#F5F4F2]/40 hover:text-[#B9914A] hover:border-[#B9914A]/40 transition-all border border-[#B9914A]/15" title="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://wa.me/message/A36K3OVFIWT2B1" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#11151B] rounded-full flex items-center justify-center text-[#F5F4F2]/40 hover:text-[#B9914A] hover:border-[#B9914A]/40 transition-all border border-[#B9914A]/15" title="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#B9914A] mb-8 md:mb-10">THE STUDIO</h4>
            <ul className="space-y-4">
              {[
                { name: 'Manifesto', path: '/about' },
                { name: 'Elite Services', path: '/services' },
                { name: 'Discover Artists', path: '/artists' },
                { name: 'Casting Calls', path: '/casting' },
                { name: 'Join the Movement', path: '/signup' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-sm text-[#F5F4F2]/40 hover:text-[#B9914A] transition-colors duration-500">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div className="hidden sm:block">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#B9914A] mb-10">DISCIPLINES</h4>
            <ul className="space-y-4">
              {['Cinema & Theatre', 'Visual Arts', 'Digital Mediums', 'Model Management', 'Production Houses'].map((item, i) => (
                <li key={i}>
                  <span className="text-sm text-[#F5F4F2]/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8 md:space-y-10">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#B9914A] mb-10">STAY CONNECTED</h4>
            <p className="text-sm text-[#F5F4F2]/40">Casting calls and platform news, sent occasionally.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-[#11151B] border border-[#B9914A]/15 rounded-lg px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#B9914A] transition-all text-[#F5F4F2] placeholder:text-[#F5F4F2]/20"
                  required
                />
                <button
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#F5F4F2]/30 hover:text-[#B9914A] transition-all"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-12 md:pt-16 border-t border-[#B9914A]/10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <p className="text-[9px] text-[#F5F4F2]/20 uppercase tracking-[0.3em] font-black">
            © {new Date().getFullYear()} Society Of Self Recognising Grace
          </p>
          <div className="flex gap-8 md:gap-12">
            {[
              { name: 'Privacy', path: '/privacy-policy' },
              { name: 'Engagement', path: '#' },
              { name: 'Protocols', path: '#' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="text-[9px] text-[#F5F4F2]/20 hover:text-[#B9914A] uppercase tracking-[0.4em] font-black transition-all">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
