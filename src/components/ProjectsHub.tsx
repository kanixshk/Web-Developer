import React, { useState } from 'react';
import { 
  Heart, HeartPulse, GraduationCap, Leaf, Sparkles, Star, 
  Search, Users, Landmark, AlertCircle, TrendingUp, Calendar, ArrowUpRight
} from 'lucide-react';
import { INITIATIVES_DATA } from '../data';
import { Initiative } from '../types';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  GraduationCap,
  Leaf,
  Sparkles,
  Heart,
  Star
};

interface ProjectsHubProps {
  onDonateClick: (initiativeId: string) => void;
  onVolunteerClick: (initiativeId: string) => void;
  setSelectedInitiative: (init: Initiative) => void;
}

type FilterCategory = 'ALL' | 'HEALTHCARE' | 'EDUCATION' | 'ENVIRONMENT' | 'DEVELOPMENT' | 'ANIMALS' | 'EMPOWERMENT';

export default function ProjectsHub({ onDonateClick, onVolunteerClick, setSelectedInitiative }: ProjectsHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: FilterCategory[] = ['ALL', 'HEALTHCARE', 'EDUCATION', 'ENVIRONMENT', 'DEVELOPMENT', 'ANIMALS', 'EMPOWERMENT'];

  const filteredInitiatives = INITIATIVES_DATA.filter((init) => {
    const matchesCategory = selectedCategory === 'ALL' || init.category === selectedCategory;
    const matchesSearch = init.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          init.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 animate-fade-in" id="projects-hub-container">
      {/* Title & Introduction */}
      <div className="space-y-4 max-w-3xl">
        <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Initiative Dashboard</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Driving Sustainable Growth</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Explore our structured multi-sector initiatives. We deliver auditable and traceable on-field programs. Select a project to view metrics, active budgets, or make direct contributions.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-3xl border border-surface-container-high shadow-md shadow-deep-navy/5">
        {/* Category list */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'
              }`}
              id={`filter-pill-${cat}`}
            >
              {cat === 'ALL' ? 'All Sectors' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-sans"
            id="campaign-search-input"
          />
        </div>
      </div>

      {/* Campaigns Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
        {filteredInitiatives.length > 0 ? (
          filteredInitiatives.map((init) => {
            const IconComp = iconComponents[init.iconName] || HeartPulse;
            const progressPercent = Math.min(Math.round((init.raisedFunds / init.targetGoal) * 100), 100);

            return (
              <div
                key={init.id}
                className="bg-white rounded-3xl border border-surface-container-high overflow-hidden shadow-lg shadow-deep-navy/5 flex flex-col justify-between group hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                id={`project-hub-card-${init.id}`}
              >
                {/* Upper Section */}
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary font-display font-bold text-[10px] tracking-wider uppercase">
                      {init.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-on-surface group-hover:text-primary transition-colors">
                      {init.title}
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {init.description}
                    </p>
                  </div>

                  {/* Program Metrics Highlights */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-container-high">
                    {init.metrics.map((metric, i) => (
                      <div key={i} className="text-center bg-surface p-3 rounded-2xl">
                        <span className="font-display font-black text-base text-primary block leading-none">{metric.value}</span>
                        <span className="font-sans text-[10px] text-on-surface-variant font-medium tracking-tight block mt-1">{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Fund Tracking Meter */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-display font-bold">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <Landmark className="w-4 h-4 text-primary" /> Active Goal: ${init.targetGoal.toLocaleString()}
                      </span>
                      <span className="text-primary">{progressPercent}% Funded</span>
                    </div>

                    <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-[11px] font-sans font-semibold text-on-surface-variant/80">
                      <span>Raised: ${init.raisedFunds.toLocaleString()}</span>
                      <span>Remaining: ${(init.targetGoal - init.raisedFunds).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive buttons */}
                <div className="px-8 py-5 bg-surface border-t border-surface-container-high flex flex-wrap gap-4 items-center justify-between">
                  <button
                    onClick={() => setSelectedInitiative(init)}
                    className="flex items-center gap-1.5 text-primary font-display font-bold text-xs cursor-pointer hover:underline"
                  >
                    Deep Dive Objectives <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onVolunteerClick(init.id)}
                      className="px-4 py-2 rounded-xl bg-surface border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant font-display font-bold text-xs transition-colors cursor-pointer"
                    >
                      Volunteer
                    </button>
                    <button
                      onClick={() => onDonateClick(init.id)}
                      className="px-5 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange/95 text-white font-display font-bold text-xs shadow-md shadow-accent-orange/15 cursor-pointer"
                    >
                      Donate Directly
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl border border-surface-container-high">
            <AlertCircle className="w-12 h-12 text-outline mx-auto stroke-[1.5]" />
            <h3 className="font-display font-bold text-lg text-on-surface">No initiatives match your query</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto">
              Try modifying your search keywords or switching filters to browse our active social sectors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
