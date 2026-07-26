"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from '@/lib/router-compat';
import { 
  Users, TrendingUp, Bell, MessageSquare, 
  Send, Shield, BarChart3, Clock, ArrowUpRight 
} from 'lucide-react';
import { 
  collection, addDoc, serverTimestamp, 
  getDocs, query, orderBy, limit 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { showSuccess, showError } from '@/utils/toast';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    userCount: 0,
    registrationCount: 0,
    subscriberCount: 0,
  });
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'broadcast',
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      showError("Access Denied: Administrative Clearance Required");
      navigate('/');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [profilesSnap, regsSnap, subsSnap] = await Promise.all([
          getDocs(collection(db, 'profiles')),
          getDocs(collection(db, 'registrations')),
          getDocs(collection(db, 'subscribers'))
        ]);
        
        setStats({
          userCount: profilesSnap.size,
          registrationCount: regsSnap.size,
          subscriberCount: subsSnap.size,
        });

        const qRecent = query(
          collection(db, 'profiles'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentSnap = await getDocs(qRecent);
        setRecentUsers(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error: any) {
        console.error("Critical Admin Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchAdminData();
  }, [isAdmin]);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notification.title || !notification.message) return;

    try {
      await addDoc(collection(db, 'notifications'), {
        title: notification.title,
        message: notification.message,
        type: 'broadcast',
        userId: notification.type, 
        senderUid: user?.uid,
        createdAt: serverTimestamp(),
        read: false,
      });
      showSuccess("Divine broadcast transmitted successfully");
      setNotification({ title: '', message: '', type: 'broadcast' });
    } catch (error: any) {
      showError(error.message);
    }
  };

  if (authLoading || !isAdmin) return null;

  const cards = [
    { title: 'Total Creators', value: stats.userCount, icon: Users, trend: 'Verified Identities' },
    { title: 'Active Initiatives', value: stats.registrationCount, icon: Shield, trend: 'Operational Scale' },
    { title: 'Digital Footprint', value: stats.subscriberCount, icon: TrendingUp, trend: 'Network Engagement' },
    { title: 'System Heartbeat', value: '99.9%', icon: Clock, trend: 'Ultra-Low Latency' },
  ];

  return (
    <Layout>
      <section className="pt-40 md:pt-56 pb-40 min-h-screen">
        <div className="layout-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32 border-b border-white/10 pb-16">
              <div className="space-y-4">
                <span className="inline-block text-[#B9914A] text-[10px] font-black uppercase tracking-[0.6em] mb-4">
                  ADMINISTRATIVE COMMAND
                </span>
                <h1 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none font-serif italic">
                  Command <span className="text-[#B9914A] not-italic font-sans">Center.</span>
                </h1>
                <p className="text-xl text-white/40 font-light italic mt-6 leading-relaxed">Orchestrating the SosrG artistic ecosystem from the inner circle.</p>
              </div>
              <div className="flex gap-6">
                <div className="liquid-glass rounded-2xl px-10 py-6 border border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-30" />
                  <p className="text-[9px] text-white/40 uppercase font-black tracking-[0.3em] mb-2">Protocol Status</p>
                  <p className="text-[#B9914A] font-black flex items-center gap-3 text-[11px] uppercase tracking-widest">
                    <span className="w-2 h-2 bg-[#B9914A] rounded-full animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.5)]" /> Operational
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="liquid-glass rounded-3xl p-10 border border-white/10 relative overflow-hidden group hover:border-[#B9914A]/50 transition-all duration-700"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="w-12 h-12 rounded-full border border-white/10 liquid-glass flex items-center justify-center text-white/60 mb-10 group-hover:bg-[#B9914A] group-hover:border-[#B9914A] group-hover:text-white transition-all duration-700">
                    <card.icon size={18} />
                  </div>
                  <p className="text-[9px] text-white/40 uppercase font-black tracking-[0.4em] mb-4">{card.title}</p>
                  <h3 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter font-serif italic">{card.value}</h3>
                  <p className="text-[10px] text-[#B9914A] font-black flex items-center gap-3 uppercase tracking-widest">
                    <ArrowUpRight size={14} /> {card.trend}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notification Center */}
              <div className="lg:col-span-1 p-10 md:p-14 liquid-glass rounded-3xl border border-white/10">
                <div className="flex items-center gap-6 mb-16">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">
                    <Bell size={20} />
                  </div>
                  <h2 className="text-4xl font-bold text-white font-serif italic tracking-tight">Broadcasting.</h2>
                </div>
                
                <form onSubmit={handleSendNotification} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Target Guild</label>
                    <select 
                      value={notification.type}
                      onChange={(e) => setNotification(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full liquid-glass rounded-full py-5 px-8 border border-white/10 focus:border-[#B9914A] outline-none text-[11px] font-black uppercase tracking-widest text-white cursor-pointer appearance-none bg-transparent"
                    >
                      <option value="broadcast">All Creators</option>
                      <option value="broadcast_Artist">Artists Only</option>
                      <option value="broadcast_Videographer">Videographers Only</option>
                      <option value="broadcast_Photographer">Photographers Only</option>
                      <option value="broadcast_Musician">Musicians Only</option>
                      <option value="broadcast_Director">Directors Only</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Subject</label>
                    <input 
                      type="text" 
                      value={notification.title}
                      onChange={(e) => setNotification(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full liquid-glass rounded-full py-5 px-8 border border-white/10 focus:border-[#B9914A] outline-none text-white font-light placeholder:text-white/20"
                      placeholder="Urgent Artistic Decree..."
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Message Content</label>
                    <textarea 
                      value={notification.message}
                      onChange={(e) => setNotification(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full liquid-glass rounded-3xl py-5 px-8 border border-white/10 focus:border-[#B9914A] outline-none text-white font-light h-48 resize-none italic placeholder:text-white/20"
                      placeholder="Manifest your message here..."
                    />
                  </div>
                  <button type="submit" className="w-full liquid-glass rounded-full text-white py-6 flex items-center justify-center gap-4 text-[11px] border border-white/10 font-black uppercase tracking-[0.4em] hover:bg-[#B9914A] hover:border-[#B9914A] transition-all duration-500 shadow-xl mt-4">
                    Transmit Signal <Send size={16} />
                  </button>
                </form>
              </div>

              {/* Insights & Metrics */}
              <div className="lg:col-span-2 p-10 md:p-14 liquid-glass rounded-3xl border border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-16">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">
                      <BarChart3 size={20} />
                    </div>
                    <h2 className="text-4xl font-bold text-white font-serif italic tracking-tight">Operational Insights.</h2>
                  </div>
                  <button className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] hover:text-[#B9914A] transition-all">
                    Export Archive
                  </button>
                </div>

                <div className="space-y-4">
                  {recentUsers.map((creator) => (
                    <div key={creator.id} className="p-6 md:p-8 liquid-glass rounded-2xl border border-white/10 flex items-center justify-between group hover:border-[#B9914A] transition-all duration-700 shadow-sm">
                      <div className="flex items-center gap-6 md:gap-8">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#B9914A] transition-colors">
                          <Users size={18} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg md:text-xl font-bold text-white group-hover:text-[#B9914A] transition-colors duration-500 font-serif italic tracking-wide">
                            {creator.displayName || creator.email || "Unknown Creator"}
                          </p>
                          <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">
                            Authorized {creator.createdAt ? formatDistanceToNow(creator.createdAt.toDate()) : 'recently'} ago
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[#B9914A] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase group-hover:scale-105 transition-transform">
                          {creator.coins || 0} COINS
                        </p>
                        <p className="text-[8px] text-white/20 uppercase font-black">VAULT BALANCE</p>
                      </div>
                    </div>
                  ))}
                  
                  {recentUsers.length === 0 && !loading && (
                    <div className="py-20 border-2 border-dashed border-white/10 rounded-2xl text-center">
                      <p className="text-xl font-bold italic text-white/40 font-serif uppercase tracking-widest">
                        The registry is currently silent.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-12 p-10 liquid-glass rounded-2xl border border-white/10 text-center relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-30" />
                  <MessageSquare className="mx-auto text-white/10 mb-8" size={32} />
                  <p className="text-sm text-white/40 italic font-light leading-relaxed max-w-lg mx-auto">
                    Real-time traffic analytics are currently synchronized with the <br /> <span className="text-[#B9914A] font-black uppercase tracking-[0.2em] not-italic">Google Digital Command Center</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
