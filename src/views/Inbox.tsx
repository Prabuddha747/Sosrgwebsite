"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from '@/lib/router-compat';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Bell, MessageSquare, ChevronRight, MailOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const Inbox = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>('notifications');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [loadingNotif, setLoadingNotif] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (authLoading || !user) return;

    // --- Notifications Sync ---
    setLoadingNotif(true);
    const keys = ['broadcast', user.uid];
    if (profile?.skills && Array.isArray(profile.skills)) {
      profile.skills.forEach((skill: string) => {
        keys.push(`broadcast_${skill}`);
      });
    }

    const finalKeys = Array.from(new Set(keys.filter(k => !!k))).slice(0, 10);

    // REMOVED orderBy TO PREVENT INDEX ERRORS - Sorting in memory below
    const qNotif = query(
      collection(db, 'notifications'),
      where('userId', 'in', finalKeys)
    );

    const unsubNotif = onSnapshot(qNotif, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // In-memory sort by createdAt
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
      setNotifications(data);
      setLoadingNotif(false);
    }, (err) => {
      console.error("Notifications Sync Error:", err);
      setLoadingNotif(false);
    });

    // --- Chats Sync ---
    setLoadingChats(true);
    // REMOVED orderBy TO PREVENT INDEX ERRORS - Sorting in memory below
    const qChats = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubChats = onSnapshot(qChats, async (snap) => {
      try {
        const rawChats = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const chatList = await Promise.all(rawChats.map(async (data: any) => {
          const otherUserId = data.participants.find((id: string) => id !== user.uid);
          
          let otherUser = { displayName: 'Guild Member', photoURL: null };
          if (otherUserId) {
            try {
              const profileSnap = await getDoc(doc(db, 'profiles', otherUserId));
              if (profileSnap.exists()) {
                otherUser = profileSnap.data() as any;
              }
            } catch (pErr) {
              console.error("Profile Fetch Error:", pErr);
            }
          }
          return { ...data, otherUser };
        }));

        // In-memory sort by updatedAt
        chatList.sort((a: any, b: any) => {
          const timeA = a.updatedAt?.toMillis?.() || 0;
          const timeB = b.updatedAt?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setChats(chatList);
      } catch (err) {
        console.error("Chat Process Error:", err);
      } finally {
        setLoadingChats(false);
      }
    }, (err) => {
      console.error("Chats Snapshot Error:", err);
      setLoadingChats(false);
    });

    return () => {
      unsubNotif();
      unsubChats();
    };
  }, [user?.uid, profile?.skills, authLoading]);

  if (authLoading && !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-16 h-16 border-2 border-studio-gold/10 border-t-studio-gold rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-40 md:pt-56 pb-40 min-h-screen">
        <div className="layout-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 border-b border-white/10 pb-10">
              <div className="space-y-4">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em] block italic">THE REPOSITORY</span>
                <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-bold text-white tracking-tighter leading-none font-serif italic">
                  Inbox<span className="text-[#B9914A] not-italic font-sans">.</span>
                </h1>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={cn(
                    "px-8 py-5 text-[9px] font-black uppercase tracking-[0.5em] transition-all duration-500 rounded-full border",
                    activeTab === 'notifications' ? "liquid-glass text-white border-[#B9914A] shadow-xl" : "border-white/10 text-white/40 hover:text-white"
                  )}
                >
                  DECREES <span className="ml-2 text-[#B9914A]">[{notifications.length}]</span>
                </button>
                <button 
                  onClick={() => setActiveTab('messages')}
                  className={cn(
                    "px-8 py-5 text-[9px] font-black uppercase tracking-[0.5em] transition-all duration-500 rounded-full border",
                    activeTab === 'messages' ? "liquid-glass text-white border-[#B9914A] shadow-xl" : "border-white/10 text-white/40 hover:text-white"
                  )}
                >
                  DIRECTS <span className="ml-2 text-[#B9914A]">[{chats.length}]</span>
                </button>
              </div>
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    {loadingNotif ? (
                      <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-32 liquid-glass rounded-2xl animate-pulse border border-white/10" />
                        ))}
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div key={notif.id} className="liquid-glass rounded-2xl p-8 border border-white/10 relative group hover:border-[#B9914A] transition-all duration-700 shadow-sm">
                          <div className="flex gap-8 items-start">
                            <div className="w-12 h-12 rounded-full border border-white/10 liquid-glass flex items-center justify-center text-white shrink-0 shadow-lg group-hover:bg-[#B9914A] group-hover:border-[#B9914A] transition-all duration-700">
                              <Bell size={18} />
                            </div>
                            <div className="flex-1 space-y-4">
                              <div className="flex justify-between items-start">
                                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#B9914A] transition-colors font-serif italic tracking-wide">{notif.title}</h3>
                                <span className="text-[9px] text-white/40 uppercase font-black tracking-widest italic pt-1">
                                  {notif.createdAt?.toDate ? formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true }) : 'Recently Transmitted'}
                                </span>
                              </div>
                              <p className="text-sm md:text-base text-white/60 font-light italic leading-relaxed max-w-4xl">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-40 border-2 border-dashed border-white/10 rounded-2xl">
                        <MailOpen size={40} className="mx-auto text-white/20 mb-8" />
                        <p className="text-xl font-bold italic text-white/40 font-serif uppercase tracking-widest">The sanctuary is currently silent.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'messages' && (
                  <motion.div
                    key="messages"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    {loadingChats ? (
                      <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-32 liquid-glass rounded-2xl animate-pulse border border-white/10" />
                        ))}
                      </div>
                    ) : chats.length > 0 ? (
                      chats.map((chat) => (
                        <Link 
                          key={chat.id} 
                          to={`/chat/${chat.id}`}
                          className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/10 block group hover:border-[#B9914A] transition-all duration-700 shadow-sm relative overflow-hidden"
                        >
                          <div className="flex gap-6 md:gap-8 items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-md">
                              {chat.otherUser?.photoURL ? (
                                <img src={chat.otherUser.photoURL} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center liquid-glass text-white/40 font-black text-2xl">
                                  {chat.otherUser?.displayName?.charAt(0) || 'C'}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex justify-between items-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#B9914A] transition-colors truncate font-serif italic tracking-wide">{chat.otherUser?.displayName || 'Unknown Creator'}</h3>
                                <span className="text-[9px] text-white/40 uppercase font-black tracking-widest italic shrink-0">
                                  {chat.updatedAt?.toDate ? formatDistanceToNow(chat.updatedAt.toDate(), { addSuffix: true }) : 'Just Now'}
                                </span>
                              </div>
                              <p className="text-sm md:text-base text-white/50 font-light italic truncate pr-10 md:pr-20">
                                {chat.lastMessage || 'Establishment of divine channel...'}
                              </p>
                            </div>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 group-hover:bg-[#B9914A] group-hover:border-[#B9914A] group-hover:text-white transition-all shrink-0">
                              <ChevronRight size={20} />
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-40 border-2 border-dashed border-white/10 rounded-2xl">
                        <MessageSquare size={40} className="mx-auto text-white/20 mb-8" />
                        <p className="text-xl font-bold italic text-white/40 font-serif uppercase tracking-widest">No active digital channels found.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Inbox;
