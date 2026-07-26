"use client";

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useParams, useNavigate } from '@/lib/router-compat';
import { 
  collection, query, onSnapshot, orderBy, 
  addDoc, serverTimestamp, doc, getDoc, updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getOrCreateChat } from '@/lib/db';
import { Send, ArrowLeft, Shield, Sparkles, Film, Clapperboard, CalendarClock, Mail, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Contextual attachment cards (docs/PLATFORM_EVOLUTION_PLAN.md §8) — one
// new field on the existing message schema, not a new messaging system.
// URL-based types (portfolio/showreel/audition_tape) need a link since
// there's no file-upload infra; the rest are structured text.
type AttachmentType = 'portfolio' | 'showreel' | 'audition_tape' | 'availability' | 'invitation' | 'meeting';

const ATTACHMENT_ACTIONS: { type: AttachmentType; label: string; icon: typeof Film; placeholder: string; needsUrl: boolean }[] = [
  { type: 'portfolio', label: 'Portfolio', icon: Sparkles, placeholder: 'Paste your portfolio link...', needsUrl: true },
  { type: 'showreel', label: 'Showreel', icon: Film, placeholder: 'Paste your showreel link...', needsUrl: true },
  { type: 'audition_tape', label: 'Audition Tape', icon: Clapperboard, placeholder: 'Paste your audition tape link...', needsUrl: true },
  { type: 'availability', label: 'Availability', icon: CalendarClock, placeholder: 'When are you available?', needsUrl: false },
  { type: 'invitation', label: 'Invite', icon: Mail, placeholder: 'What are you inviting them to?', needsUrl: false },
  { type: 'meeting', label: 'Meeting', icon: CalendarCheck, placeholder: 'Propose a date/time...', needsUrl: false },
];

const attachmentIcon = (type?: AttachmentType) => ATTACHMENT_ACTIONS.find(a => a.type === type)?.icon || Sparkles;

const ChatPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [text, setText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState<typeof ATTACHMENT_ACTIONS[number] | null>(null);
  const [attachmentValue, setAttachmentValue] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    const initChat = async () => {
      if (!user || !id) return;
      
      try {
        setLoading(true);
        let currentChatId = id;

        try {
          const chatSnap = await getDoc(doc(db, 'chats', id));
          if (!chatSnap.exists()) {
            currentChatId = await getOrCreateChat(user.uid, id);
          } else {
            currentChatId = id;
          }
        } catch (err: any) {
          currentChatId = await getOrCreateChat(user.uid, id);
        }
        
        setChatId(currentChatId);

        const finalChatSnap = await getDoc(doc(db, 'chats', currentChatId));
        if (finalChatSnap.exists()) {
          const chatData = finalChatSnap.data();
          const otherId = chatData?.participants.find((p: string) => p !== user.uid);
          
          if (otherId) {
            const profileSnap = await getDoc(doc(db, 'profiles', otherId));
            if (profileSnap.exists()) {
              setOtherUser(profileSnap.data());
            } else {
              setOtherUser({ displayName: 'Creator', photoURL: null });
            }
          }
        }
      } catch (error: any) {
        console.error("Chat Init Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [id, user]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsub();
  }, [chatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user || !chatId) return;

    const messageText = text;
    setText('');

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        senderId: user.uid,
        text: messageText,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: messageText,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  const handleConfirmAttachment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !chatId || !pendingAttachment || !attachmentValue.trim()) return;

    const action = pendingAttachment;
    const value = attachmentValue.trim();
    const attachment = action.needsUrl
      ? { type: action.type, label: action.label, url: value }
      : { type: action.type, label: action.label, note: value };

    setPendingAttachment(null);
    setAttachmentValue('');

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        senderId: user.uid,
        text: '',
        attachment,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: `${action.label}: ${value}`,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Send Attachment Error:', error);
    }
  };

  if (loading) {
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
      <section className="h-screen bg-transparent relative overflow-hidden flex flex-col pt-[80px]">
        {/* Header - Scaled for mobile */}
        <div className="pb-4 md:pb-8 border-b border-white/10 liquid-glass relative z-20">
          <div className="layout-container flex items-center justify-between px-4 mt-6">
            <div className="flex items-center gap-4 md:gap-8">
              <button onClick={() => navigate(-1)} className="p-2 text-white/40 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 overflow-hidden shadow-lg grayscale">
                  <img src={otherUser?.photoURL || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=100&fit=crop"} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-white leading-none mb-1 md:mb-2 font-serif italic tracking-wide truncate max-w-[150px] md:max-w-none">
                    {otherUser?.displayName || 'Creator'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#B9914A] rounded-full animate-pulse" />
                    <span className="text-[8px] md:text-[9px] text-white/40 uppercase font-black tracking-widest italic">DIRECT CHANNEL</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-6 py-2 liquid-glass rounded-full border border-white/10">
              <Shield size={12} className="text-[#B9914A]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-widest italic">SECURED</span>
            </div>
          </div>
        </div>

        {/* Messages Area - Mobile Optimized */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-[5%] py-10 space-y-10 relative bg-transparent">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-6 md:gap-10">
            <div className="text-center py-16 border-b border-white/10 mb-8 md:mb-12">
              <Sparkles className="mx-auto text-[#B9914A] mb-4" size={24} />
              <p className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-white/40 italic">ESTABLISHING CONNECTION</p>
            </div>

            {messages.map((msg, i) => {
              const isMe = msg.senderId === user?.uid;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "flex flex-col max-w-[90%] sm:max-w-[80%] md:max-w-[70%]",
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-5 md:p-8 text-sm md:text-base font-light leading-relaxed italic border transition-all duration-700 shadow-sm rounded-3xl",
                    isMe
                      ? "bg-[#B9914A] text-white border-[#B9914A] rounded-br-sm"
                      : "liquid-glass border-white/10 text-white rounded-bl-sm"
                  )}>
                    {msg.attachment ? (
                      (() => {
                        const AttIcon = attachmentIcon(msg.attachment.type);
                        return (
                          <div className="not-italic flex items-start gap-3">
                            <AttIcon size={18} className="shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-black opacity-70 mb-1">{msg.attachment.label}</p>
                              {msg.attachment.url ? (
                                <a href={msg.attachment.url} target="_blank" rel="noopener noreferrer" className="underline break-all">
                                  {msg.attachment.url}
                                </a>
                              ) : (
                                <p>{msg.attachment.note}</p>
                              )}
                            </div>
                          </div>
                        );
                      })()
                    ) : msg.text}
                  </div>
                  <span className="text-[8px] md:text-[9px] text-white/40 uppercase font-black tracking-widest mt-2 px-2 italic">
                    {msg.timestamp?.toDate ? format(msg.timestamp.toDate(), 'HH:mm') : 'Recently'}
                  </span>
                </motion.div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input Area - Mobile Spacing Fix */}
        <div className="pb-8 md:pb-10 pt-4 md:pt-6 px-4 md:px-[5%] border-t border-white/10 liquid-glass relative z-20">
          <div className="max-w-[800px] mx-auto flex gap-2 mb-4 overflow-x-auto custom-scrollbar pb-1">
            {ATTACHMENT_ACTIONS.map((action) => (
              <button
                key={action.type}
                type="button"
                onClick={() => { setPendingAttachment(action); setAttachmentValue(''); }}
                title={action.label}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest",
                  pendingAttachment?.type === action.type
                    ? "border-[#B9914A] text-[#B9914A] bg-[#B9914A]/10"
                    : "border-white/10 text-white/50 hover:text-[#B9914A] hover:border-[#B9914A]/50"
                )}
              >
                <action.icon size={14} /> {action.label}
              </button>
            ))}
          </div>

          {pendingAttachment && (
            <form
              onSubmit={handleConfirmAttachment}
              className="max-w-[800px] mx-auto flex gap-3 items-center mb-4"
            >
              <input
                autoFocus
                type={pendingAttachment.needsUrl ? 'url' : 'text'}
                value={attachmentValue}
                onChange={(e) => setAttachmentValue(e.target.value)}
                placeholder={pendingAttachment.placeholder}
                className="flex-1 liquid-glass rounded-full px-6 py-4 focus:outline-none focus:border-[#B9914A] transition-all text-white font-light placeholder:text-white/40 border border-[#B9914A]/40 text-sm shadow-sm"
              />
              <button
                type="submit"
                disabled={!attachmentValue.trim()}
                className="bg-[#B9914A] rounded-full text-white px-6 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-white hover:text-black transition-all"
              >
                Send
              </button>
              <button
                type="button"
                onClick={() => setPendingAttachment(null)}
                className="text-white/40 hover:text-white text-xs uppercase tracking-widest font-bold px-2"
              >
                Cancel
              </button>
            </form>
          )}

          <form
            onSubmit={handleSendMessage}
            className="max-w-[800px] mx-auto flex gap-3 md:gap-4 items-center"
          >
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Manifest your message..."
              className="flex-1 liquid-glass rounded-full px-6 md:px-8 py-4 md:py-5 focus:outline-none focus:border-[#B9914A] transition-all text-white italic font-light placeholder:text-white/40 border border-white/10 text-sm md:text-base shadow-sm"
            />
            <button 
              type="submit" 
              disabled={!text.trim()}
              className="bg-[#B9914A] rounded-full text-white p-4 md:p-5 flex items-center justify-center aspect-square disabled:opacity-30 disabled:grayscale hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ChatPage;
