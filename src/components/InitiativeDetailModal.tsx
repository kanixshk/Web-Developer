import React from 'react';
import { 
  X, Check, AlertCircle, Landmark, TrendingUp, Users, Calendar, ArrowRight, HeartPulse, GraduationCap, Leaf, Sparkles, Heart, Star 
} from 'lucide-react';
import { Initiative } from '../types';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  GraduationCap,
  Leaf,
  Sparkles,
  Heart,
  Star
};

interface InitiativeDetailModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onDonateClick: (id: string) => void;
  onVolunteerClick: (id: string) => void;
}

export default function InitiativeDetailModal({ 
  initiative, 
  onClose, 
  onDonateClick, 
  onVolunteerClick 
}: InitiativeDetailModalProps) {
  if (!initiative) return null;

  const IconComp = iconComponents[initiative.iconName] || HeartPulse;
  const progressPercent = Math.min(Math.round((initiative.raisedFunds / initiative.targetGoal) * 100), 100);

  return (
    <div 
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[32px] border border-surface-container-high w-full max-w-3xl shadow-2xl overflow-hidden my-8 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        id={`initiative-detail-modal-${initiative.id}`}
      >
        {/* Header Hero banner */}
        <div className="bg-primary-container text-white p-8 relative flex justify-between items-start">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white font-display font-extrabold text-[10px] tracking-wider uppercase">
              {initiative.tag}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              {initiative.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
            aria-label="Close details"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          
          {/* Detailed description */}
          <div className="space-y-2">
            <h4 className="font-display font-extrabold text-xs text-primary uppercase tracking-wider">Campaign Overview</h4>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              {initiative.detailedDescription}
            </p>
          </div>

          {/* Goals & Campaign Progress */}
          <div className="p-6 bg-surface rounded-2xl border border-outline-variant/30 space-y-4">
            <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" /> Active Campaign Funding Progress
            </h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Traceable Target: ${initiative.targetGoal.toLocaleString()}</span>
                <span className="text-primary font-bold">{progressPercent}% Funded</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-on-surface-variant/80 font-semibold">
                <span>Raised: ${initiative.raisedFunds.toLocaleString()}</span>
                <span>Remaining: ${(initiative.targetGoal - initiative.raisedFunds).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Specific objectives Checklist */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-xs text-primary uppercase tracking-wider">Strategic On-Field Objectives</h4>
            <div className="space-y-2.5">
              {initiative.objectives.map((obj, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 bg-primary/10 rounded-full p-0.5" />
                  <span className="font-sans text-on-surface-variant leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Updates timeline log */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-xs text-primary uppercase tracking-wider">Live Activity & Verification Log</h4>
            <div className="space-y-4 border-l border-outline-variant/50 pl-4 py-2">
              {initiative.updates.map((update, idx) => (
                <div key={idx} className="space-y-1 relative">
                  {/* Circle locator */}
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-bold text-on-surface-variant/70 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {update.date}
                    </span>
                    <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <h5 className="font-display font-bold text-sm text-on-surface">{update.title}</h5>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{update.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-surface border-t border-surface-container-high flex flex-wrap gap-4 items-center justify-end">
          <button
            onClick={() => onVolunteerClick(initiative.id)}
            className="px-6 py-2.5 rounded-full bg-white border border-outline-variant hover:bg-surface-container text-on-surface font-display font-bold text-xs cursor-pointer"
          >
            Volunteer for Campaign
          </button>
          
          <button
            onClick={() => onDonateClick(initiative.id)}
            className="px-6 py-2.5 rounded-full bg-accent-orange text-white font-display font-bold text-xs shadow-md shadow-accent-orange/20 cursor-pointer hover:scale-105 transition-transform"
          >
            Donate Directly
          </button>
        </div>

      </div>
    </div>
  );
}
