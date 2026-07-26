"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Mail, Shield, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { showNotificationToast } from '@/utils/toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, logout, isAdmin, setActiveWorkspace } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time "you've got a notification" pop-up (new applications, referral
  // rewards, etc.) — skips the initial snapshot dump (that's just existing
  // history, not new), only toasts for docs genuinely added while mounted.
  useEffect(() => {
    if (!user) return;
    let isInitial = true;
    const q = query(collection(db, 'notifications'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snap) => {
      if (isInitial) {
        isInitial = false;
        return;
      }
      snap.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data() as any;
          showNotificationToast(data.message || 'You have a new notification.', () => navigate('/inbox'));
        }
      });
    });
    return () => unsubscribe();
  }, [user, navigate]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Events', path: '/event' },
    { name: 'Services', path: '/services' },
    { name: 'Manifesto', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-6 pt-8">
      <div className="w-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between bg-[#0B0E13]/85 backdrop-blur-2xl rounded-full shadow-2xl border border-[#B9914A]/15 relative z-[100]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-[100]">
          <img src="/sosrg.webp" alt="SosrG Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-serif tracking-wide text-[#F5F4F2] group-hover:text-[#B9914A] transition-colors hidden sm:block">
            SosrG
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors relative py-2",
                location.pathname === link.path ? "text-[#B9914A]" : "text-[#F5F4F2]/70 hover:text-[#B9914A]"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium text-[#B9914A] flex items-center gap-2 hover:text-[#F5F4F2] transition-colors"
            >
              <Shield size={14} /> Admin
            </Link>
          )}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4 relative z-[60]">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {profile?.workspaces && profile.workspaces.length > 1 && (
                <div className="flex items-center bg-[#11151B] rounded-full border border-[#B9914A]/20 p-1">
                  {profile.workspaces.map((ws) => (
                    <button
                      key={ws}
                      onClick={() => setActiveWorkspace(ws)}
                      title={ws === 'talent' ? 'Talent workspace' : 'Studio workspace'}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                        profile.activeWorkspace === ws
                          ? "bg-[#B9914A] text-[#090B10]"
                          : "text-[#F5F4F2]/50 hover:text-[#F5F4F2]"
                      )}
                    >
                      {ws === 'talent' ? <Sparkles size={12} /> : <Building2 size={12} />}
                    </button>
                  ))}
                </div>
              )}
              <Link to="/inbox" className="text-[#F5F4F2]/70 hover:text-[#B9914A] transition-colors">
                <Mail size={18} />
              </Link>
              <button
                onClick={() => navigate(profile?.activeWorkspace === 'studio' ? '/studio/dashboard' : '/profile')}
                className="w-8 h-8 bg-[#11151B] rounded-full flex items-center justify-center overflow-hidden border border-[#B9914A]/20 hover:border-[#B9914A] transition-all"
              >
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={14} className="text-[#F5F4F2]/70" />
                )}
              </button>
              <button
                onClick={logout}
                className="text-[#F5F4F2]/50 text-xs uppercase tracking-widest hover:text-red-400 transition-colors ml-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/signup" className="text-[#F5F4F2] text-sm font-medium hover:text-[#B9914A] transition-colors">Join Now</Link>
              <Link to="/login" className="bg-[#B9914A] rounded-full px-6 py-2 text-[#090B10] text-sm font-medium hover:bg-[#F5F4F2] transition-colors">
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#F5F4F2] p-2 hover:bg-[#B9914A]/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#090B10]/95 backdrop-blur-xl z-[55] md:hidden flex flex-col p-8 pt-32 border-b border-[#B9914A]/15"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between group py-2"
                  >
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl italic text-[#F5F4F2] tracking-tight">
                      {link.name}
                    </span>
                    <ArrowRight size={20} className="text-[#F5F4F2]/20 group-hover:text-[#B9914A] group-hover:translate-x-2 transition-all" />
                  </Link>
                </motion.div>
              ))}

              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/admin"
                    className="flex items-center justify-between group py-4 border-t border-[#B9914A]/15 mt-4"
                  >
                    <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl italic text-[#B9914A] tracking-tight">Admin Command</span>
                    <Shield size={20} className="text-[#B9914A]" />
                  </Link>
                </motion.div>
              )}
            </div>

            <div className="mt-auto space-y-6">
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="block">
                    <button className="w-full bg-[#11151B] rounded-full py-4 text-[#F5F4F2] text-sm font-medium border border-[#B9914A]/20 hover:border-[#B9914A] transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" className="block">
                    <button className="w-full bg-[#B9914A] rounded-full py-4 text-[#090B10] text-sm font-medium hover:bg-[#F5F4F2] transition-colors">
                      Join Now
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to={profile?.activeWorkspace === 'studio' ? '/studio/dashboard' : '/profile'}
                    className="w-full bg-[#11151B] rounded-full py-4 flex justify-center items-center gap-2 text-[#F5F4F2] text-sm font-medium border border-[#B9914A]/20"
                  >
                    <User size={16} /> {profile?.activeWorkspace === 'studio' ? 'Studio Dashboard' : 'My Profile'}
                  </Link>
                  <button onClick={logout} className="w-full py-4 text-[#F5F4F2]/40 text-xs font-medium uppercase tracking-widest hover:text-red-400 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#F5F4F2]/20">
                <span>SosrG Studios</span>
                <span>MVP v1.0.4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
