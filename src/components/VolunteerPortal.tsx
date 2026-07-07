import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, Award, Calendar, Clock, Plus, 
  ChevronRight, ArrowRight, UserCheck, ShieldCheck, Check, Smile, ClipboardList
} from 'lucide-react';
import { INITIATIVES_DATA } from '../data';
import { VolunteerApplication } from '../types';

interface VolunteerPortalProps {
  initialInitiativeId?: string;
  onInitiativeChange?: (initId: string) => void;
}

export default function VolunteerPortal({ initialInitiativeId = '' }: VolunteerPortalProps) {
  const [activeVolunteer, setActiveVolunteer] = useState<VolunteerApplication | null>(null);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [initiativeId, setInitiativeId] = useState(initialInitiativeId || 'seva');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState<'weekdays' | 'weekends' | 'flexible'>('flexible');
  const [codeOfConduct, setCodeOfConduct] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hour Logging State
  const [logHoursValue, setLogHoursValue] = useState<string>('');
  const [logActivity, setLogActivity] = useState<string>('');
  const [logSuccess, setLogSuccess] = useState(false);

  // Drive registration state
  const [registeredDrives, setRegisteredDrives] = useState<Record<string, boolean>>({});

  // Fetch local state
  useEffect(() => {
    const saved = localStorage.getItem('inamigos_active_volunteer');
    if (saved) {
      try {
        setActiveVolunteer(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync prop changes
  useEffect(() => {
    if (initialInitiativeId) {
      setInitiativeId(initialInitiativeId);
    }
  }, [initialInitiativeId]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !codeOfConduct) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedInit = INITIATIVES_DATA.find(i => i.id === initiativeId);
      const initTitle = selectedInit ? selectedInit.title : 'Project SEVA';

      const newVol: VolunteerApplication = {
        id: `vol-${Date.now()}`,
        name: fullName,
        email,
        phone,
        initiativeId,
        initiativeTitle: initTitle,
        skills: skills || 'General Support',
        availability,
        status: 'Pending Review',
        registeredAt: new Date().toISOString().split('T')[0],
        loggedHours: [
          { date: '2026-07-06', hours: 2, activity: 'Completed initial orientation video briefing.' }
        ]
      };

      setActiveVolunteer(newVol);
      localStorage.setItem('inamigos_active_volunteer', JSON.stringify(newVol));
      setIsSubmitting(false);
    }, 1200);
  };

  const handleLogHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVolunteer) return;

    const hoursNum = parseFloat(logHoursValue);
    if (isNaN(hoursNum) || hoursNum <= 0 || !logActivity) return;

    const newLog = {
      date: new Date().toISOString().split('T')[0],
      hours: hoursNum,
      activity: logActivity
    };

    const updatedVol: VolunteerApplication = {
      ...activeVolunteer,
      status: 'Active', // Auto-promote to Active when hours are logged
      loggedHours: [newLog, ...activeVolunteer.loggedHours]
    };

    setActiveVolunteer(updatedVol);
    localStorage.setItem('inamigos_active_volunteer', JSON.stringify(updatedVol));

    setLogHoursValue('');
    setLogActivity('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  };

  const toggleDriveRegistration = (driveId: string) => {
    setRegisteredDrives(prev => ({
      ...prev,
      [driveId]: !prev[driveId]
    }));
  };

  const totalLoggedHours = activeVolunteer 
    ? activeVolunteer.loggedHours.reduce((acc, curr) => acc + curr.hours, 0)
    : 0;

  const mockDrives = [
    { id: 'drv-1', title: 'Healthcare Diagnosis Camp', date: 'July 12, 2026', location: 'Govandi Slums, Mumbai', program: 'Project SEVA' },
    { id: 'drv-2', title: 'Smart-Classroom Training Drive', date: 'July 18, 2026', location: 'Primary School, Outer Pune', program: 'Project BACHPANSHALA' },
    { id: 'drv-3', title: 'World Forest Tree Planting Drive', date: 'July 26, 2026', location: 'Satpura foothills forest block', program: 'Project PRAKRITI' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('inamigos_active_volunteer');
    setActiveVolunteer(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setSkills('');
    setCodeOfConduct(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 animate-fade-in text-sm" id="volunteer-portal-container">
      
      {/* Title */}
      <div className="space-y-4 max-w-3xl">
        <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Grassroots Network</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Volunteer Portal</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Join the frontlines of sustainable social progress. Whether your skills lie in medical assistance, pedagogy, design, or engineering, we provide a collaborative framework to maximize your effort.
        </p>
      </div>

      {activeVolunteer ? (
        /* VOLUNTEER DASHBOARD (Once registered) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="active-volunteer-dashboard">
          
          {/* LEFT COLUMN: Profile and Checklists */}
          <div className="lg:col-span-4 space-y-8">
            {/* Profile Summary Card */}
            <div className="bg-white p-6 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-extrabold text-xl shadow-inner shrink-0">
                  {activeVolunteer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-on-surface leading-tight">{activeVolunteer.name}</h3>
                  <span className="font-sans text-xs text-on-surface-variant block mt-1 font-semibold">{activeVolunteer.initiativeTitle}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-surface-container-high">
                <div className="text-center">
                  <span className="font-display font-black text-2xl text-primary block leading-none">{totalLoggedHours}</span>
                  <span className="font-sans text-[10px] text-on-surface-variant block font-semibold mt-1">Hours Logged</span>
                </div>
                <div className="text-center">
                  <span className="font-display font-black text-secondary block leading-none">
                    {activeVolunteer.status === 'Pending Review' ? 'Review' : 'Active'}
                  </span>
                  <span className="font-sans text-[10px] text-on-surface-variant block font-semibold mt-1">Status</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans text-on-surface-variant">
                <p><span className="font-bold text-on-surface">Email:</span> {activeVolunteer.email}</p>
                <p><span className="font-bold text-on-surface">Expertise:</span> {activeVolunteer.skills}</p>
                <p><span className="font-bold text-on-surface">Registered:</span> {activeVolunteer.registeredAt}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-center py-2.5 bg-surface text-red-600 font-display font-bold text-xs rounded-xl hover:bg-red-50 transition-colors border border-red-200 cursor-pointer"
              >
                Exit Dashboard Session
              </button>
            </div>

            {/* Onboarding Checklist Card */}
            <div className="bg-white p-6 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" /> Onboarding Progress
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary bg-primary/10 rounded-full p-1 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-display font-bold text-xs text-on-surface block">Digital Credentials Verified</span>
                    <span className="font-sans text-[11px] text-on-surface-variant leading-relaxed">System successfully validated email and phone triggers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {totalLoggedHours > 2 ? (
                    <Check className="w-5 h-5 text-primary bg-primary/10 rounded-full p-1 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-outline-variant/60 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-display font-bold text-xs text-on-surface block">First Logistics Logging</span>
                    <span className="font-sans text-[11px] text-on-surface-variant leading-relaxed">Log more than 2 orientation hours in our dashboard to qualify.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {Object.keys(registeredDrives).length > 0 ? (
                    <Check className="w-5 h-5 text-primary bg-primary/10 rounded-full p-1 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-outline-variant/60 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-display font-bold text-xs text-on-surface block">Register for Field Drive</span>
                    <span className="font-sans text-[11px] text-on-surface-variant leading-relaxed">Join at least one native campaign on-field drive listed below.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Hours Logger and Field Drives */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hour Logger */}
            <div className="bg-white p-8 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <div className="space-y-1">
                <span className="font-display text-[10px] font-extrabold text-primary uppercase tracking-wider block">Traceable Tracking</span>
                <h3 className="font-display font-bold text-xl text-on-surface">Log Volunteer Logistics Hours</h3>
              </div>

              {logSuccess ? (
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center space-y-2">
                  <Smile className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-display font-bold text-primary">Hours Logged Successfully!</h4>
                  <p className="font-sans text-xs text-on-surface-variant">The hours have been appended to your core profile and the audit checklist.</p>
                </div>
              ) : (
                <form onSubmit={handleLogHoursSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="log-hours-input">Hours Spent</label>
                      <input
                        id="log-hours-input"
                        type="number"
                        step="0.5"
                        required
                        placeholder="e.g. 3.5"
                        value={logHoursValue}
                        onChange={(e) => setLogHoursValue(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="log-activity-input">Brief Activity Title</label>
                      <input
                        id="log-activity-input"
                        type="text"
                        required
                        placeholder="e.g. Organized smart school books"
                        value={logActivity}
                        onChange={(e) => setLogActivity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-display font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Append to Audit Journal
                  </button>
                </form>
              )}

              {/* Logger History */}
              <div className="space-y-3 pt-4 border-t border-surface-container-high">
                <span className="font-display font-bold text-xs text-on-surface block">Your Log Journal History</span>
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {activeVolunteer.loggedHours.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-surface rounded-2xl border border-outline-variant/20">
                      <div className="space-y-0.5">
                        <span className="font-sans text-xs text-on-surface font-semibold block">{log.activity}</span>
                        <span className="font-sans text-[10px] text-on-surface-variant">{log.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-display font-black text-xs">
                        <Clock className="w-3.5 h-3.5 shrink-0" /> {log.hours}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Field Drives List */}
            <div className="bg-white p-8 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <div className="space-y-1">
                <span className="font-display text-[10px] font-extrabold text-primary uppercase tracking-wider block">Upcoming Drives</span>
                <h3 className="font-display font-bold text-xl text-on-surface">Available On-Field Campaigns</h3>
              </div>

              <div className="space-y-4">
                {mockDrives.map((drv) => {
                  const isReg = registeredDrives[drv.id];

                  return (
                    <div key={drv.id} className="p-5 rounded-2xl bg-surface border border-outline-variant/20 hover:border-primary/25 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold tracking-wider">{drv.program}</span>
                          <span className="text-[11px] font-sans text-on-surface-variant font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {drv.date}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base text-on-surface">{drv.title}</h4>
                        <p className="font-sans text-xs text-on-surface-variant">Location: {drv.location}</p>
                      </div>

                      <button
                        onClick={() => toggleDriveRegistration(drv.id)}
                        className={`px-4 py-2 rounded-xl font-display font-bold text-xs transition-all cursor-pointer shrink-0 ${
                          isReg 
                            ? 'bg-primary text-white flex items-center gap-1'
                            : 'bg-white border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {isReg ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Registered
                          </>
                        ) : (
                          'Join Drive'
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* VOLUNTEER REGISTRATION FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="volunteer-form-container">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-3xl font-bold text-on-surface leading-tight">Join the InAmigos Catalyst Core</h3>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              We operate in structured cycles. As a registered volunteer, you will gain access to a localized dashboard, calendar coordinates of upcoming field drives, and certification logs.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { title: 'Traceable Micro-Journals', desc: 'Log exact hours, activities, and coordinates to qualify for audited program certificates.' },
                { title: 'Mentorship & Direct Guidance', desc: 'Work directly beside highly trained program coordinates and medical officers.' },
                { title: 'Global NGO Network', desc: 'Receive recognition and certificates valid across leading philanthropic systems.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-on-surface">{benefit.title}</h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5">
            <form onSubmit={handleApplySubmit} className="space-y-6">
              <h3 className="font-display font-bold text-lg text-on-surface border-b border-surface-container-high pb-4">
                Catalyst Enrollment Application
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-name">Your Full Name</label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-email">Email Address</label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    placeholder="e.g. john@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-phone">Contact Number</label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 99999 88888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-sector">Preferred Program Core</label>
                  <select
                    id="applicant-sector"
                    value={initiativeId}
                    onChange={(e) => setInitiativeId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  >
                    {INITIATIVES_DATA.map((init) => (
                      <option key={init.id} value={init.id}>{init.title} ({init.tag})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-skills">Your Primary Skills / Background</label>
                  <input
                    id="applicant-skills"
                    type="text"
                    placeholder="e.g. Medical Student, Web developer, Teacher"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="applicant-avail">Availability</label>
                  <select
                    id="applicant-avail"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
                  >
                    <option value="flexible">Flexible / Remote coordinates</option>
                    <option value="weekends">Saturdays & Sundays on-field</option>
                    <option value="weekdays">Weekdays core operations</option>
                  </select>
                </div>
              </div>

              {/* Code of conduct check */}
              <div className="flex items-start gap-2 bg-surface p-3.5 rounded-xl border border-outline-variant/20">
                <input
                  type="checkbox"
                  id="conduct-box"
                  checked={codeOfConduct}
                  onChange={(e) => setCodeOfConduct(e.target.checked)}
                  className="rounded border-outline text-primary focus:ring-primary w-4 h-4 cursor-pointer mt-0.5"
                />
                <label htmlFor="conduct-box" className="font-sans text-xs text-on-surface-variant font-semibold cursor-pointer select-none">
                  I pledge to abide by the InAmigos safety protocols, code of social transparency, and grassroots ethics parameters.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !codeOfConduct}
                className="w-full bg-primary disabled:bg-outline-variant text-white py-3.5 rounded-xl font-display font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                id="submit-volunteer-app-btn"
              >
                {isSubmitting ? (
                  'Verifying Credentials...'
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" /> Launch Volunteer Dashboard
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
