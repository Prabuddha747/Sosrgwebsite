import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { addRegistration } from '@/lib/db';
import { translations, options, Language } from '@/utils/translations';
import { showSuccess, showError } from '@/utils/toast';
import { 
  User, Calendar, Users, Phone, IdCard, MapPin, 
  Palette, Briefcase, GraduationCap, Award, CheckCircle2,
  Send, Languages, Mail, Copy, Check, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  mobile: z.string().min(10, "Valid Mobile Number is required"),
  parentName: z.string().min(2, "Parent Name is required"),
  parentMobile: z.string().min(10, "Parent Mobile Number is required"),
  aadhaar: z.string().min(10, "Valid Aadhaar is required").max(16),
  district: z.string().min(1, "District is required"),
  artSkill: z.array(z.string()).min(1, "Please select at least one skill"),
  artSkillOther: z.string().optional(),
  yearsExperience: z.string().min(1, "Years of Experience is required"),
  formalTraining: z.string().min(1, "This field is required"),
  formalTrainingOther: z.string().optional(),
  livelihood: z.string().min(1, "This field is required"),
  certification: z.string().min(1, "This field is required"),
  awards: z.string().min(1, "This field is required"),
  workSamples: z.string().min(1, "Work samples status is required"),
  interestInVisual: z.string().min(1, "Interest field is required"),
  workModes: z.array(z.string()).min(1, "Please select at least one mode"),
  workModesOther: z.string().optional(),
  assistanceNeeded: z.array(z.string()).min(1, "Please select at least one assistance type"),
  assistanceNeededOther: z.string().optional(),
  activeParticipation: z.string().min(1, "This field is required"),
  suggestions: z.string().min(1, "Please provide some suggestions"),
  otherComments: z.string().min(1, "Please provide some comments"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const BiharCreatorsRegistration = () => {
  const [lang, setLang] = useState<Language>('hi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true, 1: false, 2: false, 3: false, 4: false });

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const t = (key: keyof typeof translations) => translations[key][lang];

  const { register, handleSubmit, formState: { errors, isSubmitted }, watch, setValue } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      artSkill: [],
      workModes: [],
      assistanceNeeded: [],
    }
  });

  const watchedFields = watch();
  const calculateProgress = () => {
    const requiredFields = [
      'email', 'fullName', 'dob', 'gender', 'mobile', 'parentName', 
      'parentMobile', 'aadhaar', 'district', 'artSkill', 'yearsExperience', 
      'formalTraining', 'livelihood', 'certification', 'awards', 'workSamples', 
      'interestInVisual', 'workModes', 'assistanceNeeded', 'activeParticipation', 
      'suggestions', 'otherComments'
    ];
    let filled = 0;
    requiredFields.forEach(field => {
      const value = watchedFields[field as keyof RegistrationData];
      if (Array.isArray(value)) {
        if (value.length > 0) filled++;
      } else if (value && value !== '') {
        filled++;
      }
    });
    return Math.round((filled / requiredFields.length) * 100);
  };

  const progress = calculateProgress();

  // Track validation errors and show a toast if any exist when trying to submit
  // Also scroll to the first error
  React.useEffect(() => {
    if (Object.keys(errors).length > 0 && isSubmitted) {
      showError(lang === 'hi' 
        ? "कृपया सभी अनिवार्य फ़ील्ड (*) सही ढंग से भरें। लाल रंग वाले हिस्से चेक करें।" 
        : "Please fill all mandatory fields (*) correctly. Check highlighted sections.");
      
      // Auto-expand sections that have errors
      const errKeys = Object.keys(errors);
      setOpenSections(prev => {
        const next = { ...prev };
        if (errKeys.some(k => ['email', 'fullName', 'dob', 'gender', 'mobile', 'parentName', 'parentMobile', 'aadhaar', 'district'].includes(k))) next[0] = true;
        if (errKeys.some(k => ['artSkill', 'artSkillOther'].includes(k))) next[1] = true;
        if (errKeys.some(k => ['yearsExperience', 'formalTraining', 'livelihood', 'certification', 'awards', 'workSamples'].includes(k))) next[2] = true;
        if (errKeys.some(k => ['workModes', 'assistanceNeeded', 'interestInVisual'].includes(k))) next[3] = true;
        if (errKeys.some(k => ['suggestions', 'otherComments', 'activeParticipation'].includes(k))) next[4] = true;
        return next;
      });

      setTimeout(() => {
        const firstError = errKeys[0];
        const element = document.getElementsByName(firstError)[0] || document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150); // small delay to allow Framer Motion to expand the section first
    }
  }, [errors, isSubmitted, lang]);

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    try {
      const id = await addRegistration({
        ...data,
        language: lang,
      } as any);
      setRegistrationId(id);
      showSuccess(lang === 'hi' ? "आपका पंजीकरण सफल रहा!" : "Registration successful!");
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error("Firestore Form Submission Error:", error);
      if (error.message === "ALREADY_REGISTERED") {
        showError(lang === 'hi' 
          ? "यह आधार नंबर पहले ही पंजीकृत है।" 
          : "This Aadhaar number is already registered.");
      } else if (error.message?.includes("insufficient permissions")) {
        showError(lang === 'hi' 
          ? "Firestore डेटाबेस एक्सेस एरर। कृपया अपने Firestore Rules चेक करें।" 
          : "Firestore Permission Error. Please check your Firestore Security Rules.");
      } else {
        showError(lang === 'hi' ? "कुछ गलत हो गया। कृपया फिर से प्रयास करें।" : "Something went wrong (Firestore). Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleLang = () => setLang(prev => prev === 'hi' ? 'en' : 'hi');

  const SectionTitle = ({ icon: Icon, title, hasError, isOpen, onToggle }: { icon: any, title: string, hasError?: boolean, isOpen?: boolean, onToggle?: () => void }) => (
    <div 
      onClick={onToggle}
      className={cn(
        "flex items-center gap-4 md:gap-6 pb-4 md:pb-6 transition-colors cursor-pointer group",
        isOpen ? "mb-6 md:mb-10 border-b border-studio-gold/20" : "mb-0 border-b border-transparent"
      )}
    >
      <div className={cn(
        "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors shadow-xl shrink-0 group-hover:scale-105",
        hasError ? "bg-red-500/10 text-red-500" : "bg-studio-gold/10 text-studio-gold"
      )}>
        <Icon size={22} className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <h2 className="text-2xl md:text-3xl font-serif flex-1">{title} {hasError && <span className="ml-2 text-xs md:text-sm font-normal font-sans text-red-500">(Required)</span>}</h2>
      {onToggle && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300",
          isOpen ? "rotate-180" : "rotate-0"
        )}>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );

  const getErrorClass = (fieldName: keyof RegistrationData) => 
    errors[fieldName] ? "border-red-500 bg-red-500/10 ring-2 ring-red-500/20" : "form-input-premium";

  if (registrationId) {
    return (
      <Layout>
        <section className="pt-40 pb-32 bg-transparent text-foreground relative flex items-center justify-center min-h-screen">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-studio-gold/5 rounded-full blur-[120px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full mx-auto px-6 relative z-10"
          >
            <div className="glass-card rounded-[4rem] p-12 text-center">
              <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/10">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-serif italic mb-6 text-foreground">
                {lang === 'hi' ? "पंजीकरण सफल!" : "Success"}
              </h2>
              <p className="text-muted-foreground/80 mb-10 font-light">
                {lang === 'hi' 
                  ? "बिहार क्रिएटर्स डॉक्यूमेंट्री इनिशिएटिव में शामिल होने के लिए धन्यवाद।" 
                  : "Thank you for joining the Bihar Creators Documentary Initiative."}
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 text-left">
                <p className="text-[10px] font-bold text-studio-gold uppercase tracking-[0.3em] mb-4">
                  {lang === 'hi' ? "आपका विशिष्ट पंजीकरण नंबर" : "Registration ID"}
                </p>
                <div className="flex items-center justify-between gap-6">
                  <code className="text-2xl font-serif italic text-foreground break-all">{registrationId}</code>
                  <button 
                    onClick={copyToClipboard}
                    className="w-12 h-12 flex items-center justify-center bg-studio-gold/10 text-studio-gold rounded-xl hover:bg-studio-gold hover:text-black transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={() => window.location.href = '/'} 
                  className="w-full btn-gold !py-6"
                >
                  {lang === 'hi' ? "वापस होम पर जाएँ" : "Back to Home"}
                </button>
                <p className="text-xs text-muted-foreground italic font-light">
                  {lang === 'hi' 
                    ? "कृपया इस आईडी को भविष्य के संदर्भ के लिए सुरक्षित रखें।" 
                    : "Please preserve this ID for future reference."}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Sticky Progress Bar */}
      <div className="fixed top-24 left-0 right-0 z-40 px-[5%] pointer-events-none hidden md:block">
        <div className="max-w-[1000px] mx-auto">
          <div className="glass-card !bg-white/80 !backdrop-blur-xl border-black/10 rounded-full h-10 px-8 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full border border-studio-gold/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-studio-gold rounded-full animate-pulse" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/60">
                {lang === 'hi' ? "पंजीकरण प्रगति" : "Protocol Progress"}
              </span>
            </div>
            <div className="flex items-center gap-6 flex-1 max-w-md mx-10">
              <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-studio-gold shadow-[0_0_10px_rgba(197,160,89,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-studio-gold tabular-nums">{progress}%</span>
            </div>
            <button onClick={toggleLang} className="text-[9px] uppercase tracking-widest font-bold text-black/60 hover:text-black transition-colors">
              {lang === 'hi' ? 'EN' : 'HI'}
            </button>
          </div>
        </div>
      </div>

      <section className="pt-48 pb-40 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-studio-gold/5 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="max-w-[1000px] mx-auto px-[5%] relative z-10">
          {/* Header */}
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              onClick={toggleLang}
            >
              <Languages size={14} />
              <button className="hover:tracking-[0.3em] transition-all">
                {lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
              </button>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-serif font-bold mb-6 md:mb-8 leading-tight text-foreground">
              {t('registrationTitle')}
            </h1>
            <p className="text-sm md:text-base lg:text-xl text-studio-gold font-bold uppercase tracking-[0.2em] mb-6 md:mb-10">
              {t('registrationSubTitle')}
            </p>
            <p className="text-sm md:text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              {t('mainDescription')}
            </p>
          </div>

          {/* Info Card */}
          <div className="liquid-glass rounded-3xl p-8 md:p-12 mb-20 md:mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <CheckCircle2 size={300} />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-10 text-studio-charcoal uppercase tracking-tighter">{t('whatWeDo')}</h3>
            <ul className="space-y-4 md:space-y-6 text-muted-foreground font-normal text-sm md:text-base lg:text-lg">
              <li className="flex gap-4 md:gap-6"><CheckCircle2 className="text-studio-gold shrink-0 mt-0.5 md:mt-1" size={20} /> {t('process1')}</li>
              <li className="flex gap-4 md:gap-6"><CheckCircle2 className="text-studio-gold shrink-0 mt-0.5 md:mt-1" size={20} /> {t('process2')}</li>
              <li className="flex gap-4 md:gap-6"><CheckCircle2 className="text-studio-gold shrink-0 mt-0.5 md:mt-1" size={20} /> {t('process3')}</li>
              <li className="flex gap-4 md:gap-6"><CheckCircle2 className="text-studio-gold shrink-0 mt-0.5 md:mt-1" size={20} /> {t('process4')}</li>
            </ul>
            <p className="mt-12 text-xs text-muted-foreground/50 italic">{t('termsText')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 md:space-y-16">
            {/* Personal Information */}
            <div className={cn(
              "p-6 md:p-12 rounded-3xl liquid-glass",
              (errors.fullName || errors.email || errors.mobile || errors.dob || errors.gender || errors.parentName || errors.parentMobile || errors.aadhaar || errors.district) 
                ? "border-red-500/30" : ""
            )}>
              <SectionTitle 
                icon={User} 
                title={lang === 'hi' ? "व्यक्तिगत विवरण" : "Personal Particulars"} 
                hasError={!!(errors.fullName || errors.email || errors.mobile || errors.dob || errors.gender || errors.parentName || errors.parentMobile || errors.aadhaar || errors.district)}
                isOpen={openSections[0]}
                onToggle={() => toggleSection(0)}
              />
              <AnimatePresence>
                {openSections[0] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('email')} *</label>
                  <div className="relative">
                    <Mail className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", errors.email ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <input {...register('email')} type="email" placeholder="Email" className={cn("pl-10 md:pl-16 text-xs md:text-sm", getErrorClass('email'))} />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.email.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('fullName')} *</label>
                  <div className="relative">
                    <User className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", errors.fullName ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <input {...register('fullName')} placeholder="Identity" className={cn("pl-10 md:pl-16 text-xs md:text-sm", getErrorClass('fullName'))} />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('dob')} *</label>
                  <div className="relative">
                    <Calendar className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", errors.dob ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <input {...register('dob')} type="date" className={cn("pl-10 md:pl-16 text-xs md:text-sm", getErrorClass('dob'))} />
                  </div>
                  {errors.dob && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.dob.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('gender')} *</label>
                  <select {...register('gender')} className={cn("text-xs md:text-sm", getErrorClass('gender'))}>
                    <option value="" className="bg-[#0B1014]">Select Gender</option>
                    <option value="male" className="bg-[#0B1014]">{t('genderMale')}</option>
                    <option value="female" className="bg-[#0B1014]">{t('genderFemale')}</option>
                    <option value="other" className="bg-[#0B1014]">{t('genderOther')}</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.gender.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('mobile')} *</label>
                  <div className="relative">
                    <Phone className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", errors.mobile ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <input {...register('mobile')} placeholder="+91" className={cn("pl-10 md:pl-16 text-xs md:text-sm", getErrorClass('mobile'))} />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.mobile.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('aadhaar')} *</label>
                  <div className="relative">
                    <IdCard className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", errors.aadhaar ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <input {...register('aadhaar')} placeholder="Verification ID" className={cn("pl-10 md:pl-16 text-xs md:text-sm", getErrorClass('aadhaar'))} />
                  </div>
                  {errors.aadhaar && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.aadhaar.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('parentName')} *</label>
                  <input {...register('parentName')} placeholder="Guardian" className={cn("text-xs md:text-sm", getErrorClass('parentName'))} />
                  {errors.parentName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.parentName.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('parentMobile')} *</label>
                  <input {...register('parentMobile')} placeholder="Contact" className={cn("text-xs md:text-sm", getErrorClass('parentMobile'))} />
                  {errors.parentMobile && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.parentMobile.message}</p>}
                </div>

                <div className="space-y-3 col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4">{t('district')} *</label>
                  <div className="relative">
                    <MapPin className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10", errors.district ? "text-red-500" : "text-muted-foreground/50")} size={16} />
                    <select {...register('district')} className={cn("pl-10 md:pl-16 appearance-none text-xs md:text-sm", getErrorClass('district'))}>
                      <option value="" className="bg-[#0B1014]">{lang === 'hi' ? "-- जिला चुनें --" : "-- Select District --"}</option>
                      {options.biharDistricts.map(district => (
                        <option key={district} value={district} className="bg-[#0B1014]">{district}</option>
                      ))}
                    </select>
                  </div>
                  {errors.district && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.district.message}</p>}
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Art Skills */}
            <div className={cn(
              "p-6 md:p-12 rounded-3xl liquid-glass",
              errors.artSkill ? "border-red-500/30" : ""
            )}>
              <SectionTitle 
                icon={Palette} 
                title={t('skillCategoryTitle')} 
                hasError={!!errors.artSkill} 
                isOpen={openSections[1]}
                onToggle={() => toggleSection(1)}
              />
              <AnimatePresence>
                {openSections[1] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.artSkills[lang].map((skill, idx) => (
                  <label key={idx} className={cn(
                    "flex items-start gap-4 p-4 md:p-6 rounded-2xl border transition-all cursor-pointer group",
                    errors.artSkill ? "bg-red-500/5 border-red-500/10" : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                  )}>
                    <input type="checkbox" value={options.artSkills.en[idx]} {...register('artSkill')} className="mt-1 accent-black w-5 h-5" />
                    <span className="text-sm md:text-base text-muted-foreground font-medium group-hover:text-foreground transition-colors">{skill}</span>
                  </label>
                ))}
                {errors.artSkill && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest md:col-span-2 mt-4">{errors.artSkill.message}</p>}
                <div className="md:col-span-2 mt-10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4 mb-4 block">{t('other')}</label>
                  <input {...register('artSkillOther')} className="form-input-premium" placeholder="Specify other artistic dimensions..." />
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Experience & Professional Details */}
            <div className={cn(
              "p-6 md:p-12 rounded-3xl liquid-glass",
              (errors.yearsExperience || errors.formalTraining || errors.livelihood || errors.certification || errors.awards || errors.workSamples) 
                ? "border-red-500/30" : ""
            )}>
              <SectionTitle 
                icon={Briefcase} 
                title={lang === 'hi' ? "अनुभव और व्यावसायिक विवरण" : "Artistic Experience"} 
                hasError={!!(errors.yearsExperience || errors.formalTraining || errors.livelihood || errors.certification || errors.awards || errors.workSamples)}
                isOpen={openSections[2]}
                onToggle={() => toggleSection(2)}
              />
              <AnimatePresence>
                {openSections[2] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
              <div className="space-y-10 md:space-y-16">
                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.yearsExperience && "text-red-500")}>{t('yearsExperience')} *</label>
                  <div className="flex flex-wrap gap-4">
                    {options.years[lang].map((y, idx) => (
                      <label key={idx} className={cn("relative cursor-pointer group")}>
                        <input type="radio" value={options.years.en[idx]} {...register('yearsExperience')} className="peer sr-only" />
                        <div className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest peer-checked:bg-[#B9914A] peer-checked:text-white peer-checked:border-[#B9914A] transition-all duration-500">
                          {y}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.yearsExperience && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.yearsExperience.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {[
                    { id: 'formalTraining', label: t('formalTraining') },
                    { id: 'livelihood', label: t('livelihood') },
                    { id: 'certification', label: t('certification') },
                    { id: 'awards', label: t('awards') },
                  ].map((field) => (
                    <div key={field.id} className="space-y-6">
                      <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors[field.id as keyof RegistrationData] && "text-red-500")}>{field.label} *</label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="relative cursor-pointer flex-1">
                            <input type="radio" value={opt} {...register(field.id as any)} className="peer sr-only" />
                            <div className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center peer-checked:bg-[#B9914A] peer-checked:text-white peer-checked:border-[#B9914A] transition-all duration-500">
                              {t(opt.toLowerCase() as any)}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors[field.id as keyof RegistrationData] && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{(errors[field.id as keyof RegistrationData] as any).message}</p>}
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.workSamples && "text-red-500")}>{t('workSamples')} *</label>
                  <div className="p-10 rounded-[2.5rem] glass border border-black/10 text-center mb-6 bg-black/[0.02]">
                    <p className="text-white/90 text-xs font-bold uppercase tracking-widest mb-2">Artistic Submission</p>
                    <p className="text-white/60 font-light text-sm italic">WhatsApp Portfolio: +91 70799 17079</p>
                  </div>
                  <div className="flex gap-4">
                    {['Sent on WhatsApp', "Don't have yet"].map((opt) => (
                      <label key={opt} className="relative cursor-pointer flex-1">
                        <input type="radio" value={opt} {...register('workSamples')} className="peer sr-only" />
                        <div className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center peer-checked:bg-[#B9914A] peer-checked:text-white peer-checked:border-[#B9914A] transition-all duration-500">
                          {opt === "Don't have yet" ? t('dontHaveYet') : opt}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.workSamples && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.workSamples.message}</p>}
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interest and Modes */}
            <div className={cn(
              "p-6 md:p-12 rounded-3xl liquid-glass",
              (errors.workModes || errors.assistanceNeeded || errors.interestInVisual) 
                ? "border-red-500/30" : ""
            )}>
              <SectionTitle 
                icon={GraduationCap} 
                title={lang === 'hi' ? "रुचि और काम करने के तरीके" : "Engagement Philosophy"} 
                hasError={!!(errors.workModes || errors.assistanceNeeded || errors.interestInVisual)}
                isOpen={openSections[3]}
                onToggle={() => toggleSection(3)}
              />
              <AnimatePresence>
                {openSections[3] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
              <div className="space-y-12 md:space-y-16">
                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.workModes && "text-red-500")}>{t('workModes')} *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {options.workModes[lang].map((mode, idx) => (
                      <label key={idx} className={cn(
                        "flex items-start gap-4 p-4 md:p-6 rounded-2xl border transition-all cursor-pointer group",
                        errors.workModes ? "bg-red-500/5 border-red-500/10" : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      )}>
                        <input type="checkbox" value={options.workModes.en[idx]} {...register('workModes')} className="mt-1 accent-black w-5 h-5" />
                        <span className="text-sm md:text-base text-white/80 font-medium group-hover:text-white transition-colors">{mode}</span>
                      </label>
                    ))}
                  </div>
                  {errors.workModes && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-4">{errors.workModes.message}</p>}
                </div>

                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.assistanceNeeded && "text-red-500")}>{t('assistanceNeeded')} *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {options.assistance[lang].map((item, idx) => (
                      <label key={idx} className={cn(
                        "flex items-start gap-4 p-4 md:p-6 rounded-2xl border transition-all cursor-pointer group",
                        errors.assistanceNeeded ? "bg-red-500/5 border-red-500/10" : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      )}>
                        <input type="checkbox" value={options.assistance.en[idx]} {...register('assistanceNeeded')} className="mt-1 accent-black w-5 h-5" />
                        <span className="text-sm md:text-base text-white/80 font-medium group-hover:text-white transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                  {errors.assistanceNeeded && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-4">{errors.assistanceNeeded.message}</p>}
                </div>

                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.interestInVisual && "text-red-500")}>{t('interestInVisual')} *</label>
                  <div className="flex flex-wrap gap-4">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <label key={opt} className="relative cursor-pointer flex-1 min-w-[120px]">
                        <input type="radio" value={opt} {...register('interestInVisual')} className="peer sr-only" />
                        <div className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center peer-checked:bg-[#B9914A] peer-checked:text-white peer-checked:border-[#B9914A] transition-all duration-500">
                          {t(opt.toLowerCase() as any)}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.interestInVisual && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.interestInVisual.message}</p>}
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feedback and Suggestions */}
            <div className={cn(
              "p-6 md:p-12 rounded-3xl liquid-glass",
              (errors.suggestions || errors.otherComments || errors.activeParticipation) 
                ? "border-red-500/30" : ""
            )}>
              <SectionTitle 
                icon={Award} 
                title={lang === 'hi' ? "सुझाव और प्रतिक्रिया" : "Visions & Insights"} 
                hasError={!!(errors.suggestions || errors.otherComments || errors.activeParticipation)}
                isOpen={openSections[4]}
                onToggle={() => toggleSection(4)}
              />
              <AnimatePresence>
                {openSections[4] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-3">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.suggestions && "text-red-500")}>{t('suggestions')} *</label>
                  <textarea {...register('suggestions')} className={getErrorClass('suggestions')} rows={4} placeholder="Your contribution to the artistic tapestry..." />
                  {errors.suggestions && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.suggestions.message}</p>}
                </div>
                <div className="space-y-3">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.otherComments && "text-red-500")}>{t('otherComments')} *</label>
                  <textarea {...register('otherComments')} className={getErrorClass('otherComments')} rows={4} placeholder="Final reflections..." />
                  {errors.otherComments && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.otherComments.message}</p>}
                </div>
                <div className="space-y-6">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-4", errors.activeParticipation && "text-red-500")}>{t('activeParticipation')} *</label>
                  <div className="flex flex-wrap gap-4">
                    {['Yes', 'No', 'Maybe'].map((opt) => (
                      <label key={opt} className="relative cursor-pointer flex-1 min-w-[120px]">
                        <input type="radio" value={opt} {...register('activeParticipation')} className="peer sr-only" />
                        <div className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center peer-checked:bg-[#B9914A] peer-checked:text-white peer-checked:border-[#B9914A] transition-all duration-500">
                          {t(opt.toLowerCase() as any)}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.activeParticipation && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4 mt-2">{errors.activeParticipation.message}</p>}
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-6 md:py-8 liquid-glass bg-white/5 border border-white/10 text-white hover:bg-[#B9914A] hover:border-[#B9914A] rounded-2xl text-[14px] md:text-lg font-black tracking-widest transition-all duration-700 disabled:opacity-30 flex items-center justify-center shadow-xl group"
            >
              {isSubmitting 
                ? (lang === 'hi' ? "प्रविष्ट किया जा रहा है..." : "Finalizing Entry...") 
                : (lang === 'hi' ? "फॉर्म जमा करें।" : "Submit the form")}
            </button>

            <div className="text-center glass p-10 rounded-[3rem] border border-black/10">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t('contactNotice')}
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BiharCreatorsRegistration;
