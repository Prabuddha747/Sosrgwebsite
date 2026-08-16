import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Search,
  Users,
  Filter,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../design-system';

type Sector = 'Cinema' | 'Theatre' | 'Literature' | 'Music' | 'Dance' | 'Art & Design' | 'Crafts';

interface TalentPreview {
  id: string;
  name: string;
  role: string;
  sector: Sector;
  location: string;
  isAgency: boolean;
}

// Curated preview cards, not live accounts — the real directory lives in the
// app. Spread across each Core Creative Sector and across Haryanvi, Bihari,
// Mumbai, Hyderabadi, UP, Delhi and Punjabi talent so every sector/tab
// combination below has something to show.
const TALENT_PREVIEW: TalentPreview[] = [
  { id: '1', name: 'Aditya Chaudhary', role: 'Film Director', sector: 'Cinema', location: 'Rohtak, Haryana', isAgency: false },
  { id: '2', name: 'Neha Sinha', role: 'Lead Actor / Actress', sector: 'Cinema', location: 'Patna, Bihar', isAgency: false },
  { id: '3', name: 'Rohan Deshmukh', role: 'Stage Performer', sector: 'Theatre', location: 'Mumbai, Maharashtra', isAgency: false },
  { id: '4', name: 'Simran Kaur', role: 'Theatre Director', sector: 'Theatre', location: 'Amritsar, Punjab', isAgency: false },
  { id: '5', name: 'Ankit Tiwari', role: 'Screenwriter', sector: 'Literature', location: 'Lucknow, Uttar Pradesh', isAgency: false },
  { id: '6', name: 'Priya Reddy', role: 'Poet & Author', sector: 'Literature', location: 'Hyderabad, Telangana', isAgency: false },
  { id: '7', name: 'Gurpreet Singh', role: 'Vocalist & Composer', sector: 'Music', location: 'Ludhiana, Punjab', isAgency: false },
  { id: '8', name: 'Anjali Yadav', role: 'Music Producer', sector: 'Music', location: 'Varanasi, Uttar Pradesh', isAgency: false },
  { id: '9', name: 'Sandeep Kumar', role: 'Folk Dance Artist', sector: 'Dance', location: 'Gurugram, Haryana', isAgency: false },
  { id: '10', name: 'Kavya Nair', role: 'Choreographer', sector: 'Dance', location: 'Hyderabad, Telangana', isAgency: false },
  { id: '11', name: 'Meera Agarwal', role: 'Creative Director', sector: 'Art & Design', location: 'New Delhi, Delhi', isAgency: false },
  { id: '12', name: 'Farhan Ali', role: 'Set Designer', sector: 'Art & Design', location: 'Lucknow, Uttar Pradesh', isAgency: false },
  { id: '13', name: 'Suman Devi', role: 'Handloom Artisan', sector: 'Crafts', location: 'Muzaffarpur, Bihar', isAgency: false },
  { id: '14', name: 'Harpreet Bhatia', role: 'Costume Artisan', sector: 'Crafts', location: 'Chandigarh, Punjab', isAgency: false },
  { id: '15', name: 'Delhi Cinema Collective', role: 'Production House', sector: 'Cinema', location: 'New Delhi, Delhi', isAgency: true },
  { id: '16', name: 'Punjab Rangmanch Society', role: 'Theatre Group', sector: 'Theatre', location: 'Amritsar, Punjab', isAgency: true },
  { id: '17', name: 'Bihar Sahitya Circle', role: 'Writers Collective', sector: 'Literature', location: 'Patna, Bihar', isAgency: true },
  { id: '18', name: 'Hyderabad Sound Studio', role: 'Music Label', sector: 'Music', location: 'Hyderabad, Telangana', isAgency: true },
  { id: '19', name: 'Haryana Nritya Academy', role: 'Dance Academy', sector: 'Dance', location: 'Rohtak, Haryana', isAgency: true },
  { id: '20', name: 'UP Design House', role: 'Design Studio', sector: 'Art & Design', location: 'Lucknow, Uttar Pradesh', isAgency: true },
  { id: '21', name: 'Punjab Handicrafts Co-op', role: 'Artisan Collective', sector: 'Crafts', location: 'Ludhiana, Punjab', isAgency: true },
];

const SECTORS: ('All' | Sector)[] = ['All', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'];

export const SmartSearchAndDiscovery = () => {
  const { show } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSector, setActiveSector] = useState<'All' | Sector>('All');
  const [activeTab, setActiveTab] = useState<'Creators' | 'agencies'>('Creators');

  const [filters, setFilters] = useState({
    role: '',
    location: '',
  });

  const filteredTalent = TALENT_PREVIEW.filter((p) => {
    if (activeTab === 'Creators' && p.isAgency) return false;
    if (activeTab === 'agencies' && !p.isAgency) return false;

    if (activeSector !== 'All' && p.sector !== activeSector) return false;

    const q = searchQuery.trim().toLowerCase();
    if (q && !`${p.name} ${p.role}`.toLowerCase().includes(q)) return false;

    if (filters.role.trim() && !p.role.toLowerCase().includes(filters.role.trim().toLowerCase())) return false;
    if (filters.location.trim() && !p.location.toLowerCase().includes(filters.location.trim().toLowerCase())) return false;

    return true;
  });

  const openInApp = (name: string) =>
    show(`To connect with ${name} and explore more talent like them, visit our app.`, 'info');

  return (
    <div className="pt-32 pb-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Talent <span className="gold-text">Directory</span></h1>
          <p className="text-white/60">Find the right person for the job — top professionals across all 7 Core Creative Sectors, ready to discover, hire, and collaborate with.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar mb-8 w-fit">
        {[
          { id: 'creators', label: 'creators', icon: User },
          { id: 'agencies', label: 'Business', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
            )}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
        {SECTORS.map(sector => (
          <button
            key={sector}
            onClick={() => setActiveSector(sector)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
              activeSector === sector ? "bg-white text-black border-white" : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
            )}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={18} className="text-gold" />
              <h3 className="font-bold uppercase tracking-widest text-sm">Advanced Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Role</label>
                <input
                  type="text"
                  placeholder="e.g. Actor, Cinematographer"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold"
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Location</label>
                <input
                  type="text"
                  placeholder="City or state"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector + activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredTalent.map((person) => (
                <button
                  key={person.id}
                  onClick={() => openInApp(person.name)}
                  className="relative glass-panel p-4 flex flex-col h-full text-left hover:border-gold/50 border border-transparent transition-colors"
                >
                  <div className="aspect-[4/5] rounded-xl mb-4 shrink-0 overflow-hidden bg-white/5 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white/20">
                      {person.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="font-bold truncate">{person.name}</h3>
                    <p className="text-sm text-white/60 truncate">{person.role}</p>
                    <p className="text-xs text-white/40 truncate">{person.location}</p>
                    <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-widest text-gold">
                      View Profile
                    </span>
                  </div>
                </button>
              ))}
              {filteredTalent.length === 0 && (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-12 text-white/40">
                  No talent found matching your criteria.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {filteredTalent.length > 0 && (
            <div className="glass-panel mt-10 p-10 text-center flex flex-col items-center gap-3">
              <h2 className="text-2xl font-bold">Explore More Like Them — Visit Our App</h2>
              <p className="text-white/60 max-w-lg">
                Thousands more creative professionals are discoverable, bookable, and ready to
                collaborate in the SosrG app — this directory is just a preview.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
