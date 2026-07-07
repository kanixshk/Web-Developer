import React, { useState, useEffect } from 'react';
import { 
  Landmark, CreditCard, ShieldCheck, Check, Sparkles, 
  ChevronRight, RefreshCw, AlertCircle, Heart, User, Globe
} from 'lucide-react';
import { INITIATIVES_DATA } from '../data';
import { DonationRecord } from '../types';

interface DonationHubProps {
  initialInitiativeId?: string;
}

const IMPACT_TIERS = [
  { amount: 10, label: '$10', description: 'Provides specialized dry ration kits & fresh meals to 3 rural children for a week.' },
  { amount: 25, label: '$25', description: 'Supplies essential pediatric healthcare kits & checkups to 2 infants in emergency health-zones.' },
  { amount: 50, label: '$50', description: 'Funds a high-end educational digital tablet pre-loaded with smart coding & grammar lessons.' },
  { amount: 100, label: '$100', description: 'Plants and preserves 15 native forest saplings to reclaim local degraded waterbodies.' },
  { amount: 250, label: '$250', description: 'Unlocks micro-seed capital to fund 2 women-led micro-enterprises in organic textiles.' }
];

export default function DonationHub({ initialInitiativeId = '' }: DonationHubProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>(initialInitiativeId || 'general');
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'paypal'>('card');
  
  // Form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [upiId, setUpiId] = useState('');
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Donations history
  const [donationLedger, setDonationLedger] = useState<DonationRecord[]>([]);

  // Load ledger on mount
  useEffect(() => {
    const saved = localStorage.getItem('inamigos_donation_ledger');
    if (saved) {
      try {
        setDonationLedger(JSON.parse(saved));
      } catch (e) {
        // default mock ledger if empty
        setDonationLedger(getMockLedger());
      }
    } else {
      const initial = getMockLedger();
      setDonationLedger(initial);
      localStorage.setItem('inamigos_donation_ledger', JSON.stringify(initial));
    }
  }, []);

  // Update dropdown if props change
  useEffect(() => {
    if (initialInitiativeId) {
      setSelectedInitiativeId(initialInitiativeId);
    }
  }, [initialInitiativeId]);

  const getMockLedger = (): DonationRecord[] => [
    { id: 'd-1', name: 'Dr. Vikram Singh', email: 'v.singh@hosp.org', amount: 500, initiativeId: 'seva', initiativeTitle: 'Project SEVA', date: '2026-07-06', paymentType: 'card', isAnonymous: false },
    { id: 'd-2', name: 'Anonymous Donor', email: '', amount: 100, initiativeId: 'prakriti', initiativeTitle: 'Project PRAKRITI', date: '2026-07-06', paymentType: 'upi', isAnonymous: true },
    { id: 'd-3', name: 'Kavita Roy', email: 'kavita@techcorp.com', amount: 50, initiativeId: 'bachpanshala', initiativeTitle: 'Project BACHPANSHALA', date: '2026-07-05', paymentType: 'paypal', isAnonymous: false }
  ];

  const getImpactMessage = (amount: number) => {
    if (amount <= 10) return 'Provides specialized dry ration kits & fresh meals to 3 rural children for a week.';
    if (amount <= 25) return 'Supplies essential pediatric healthcare checkups & health kits to 2 infants in emergency rural zones.';
    if (amount <= 50) return 'Funds a high-end educational digital tablet preloaded with smart coding & grammar lessons.';
    if (amount <= 100) return 'Plants and preserves 15 native forest saplings to restore local degraded waterbodies.';
    if (amount <= 250) return 'Unlocks micro-seed capital to fund 2 women-led micro-enterprises in eco-friendly textiles.';
    return `Powers targeted on-ground physical operations, assisting over ${Math.floor(amount / 4)} families directly.`;
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    } else {
      setSelectedAmount(0);
    }
  };

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) return;

    setIsSubmitting(true);

    // Simulate Payment Gateway Network delay
    setTimeout(() => {
      const selectedInit = INITIATIVES_DATA.find(i => i.id === selectedInitiativeId);
      const initTitle = selectedInit ? selectedInit.title : 'General Allocation Pool';

      const newRecord: DonationRecord = {
        id: `d-${Date.now()}`,
        name: isAnonymous ? 'Anonymous Donor' : donorName || 'Kind Supporter',
        email: isAnonymous ? '' : donorEmail,
        amount: activeAmount,
        initiativeId: selectedInitiativeId,
        initiativeTitle: initTitle,
        date: new Date().toISOString().split('T')[0],
        paymentType,
        isAnonymous
      };

      const updatedLedger = [newRecord, ...donationLedger];
      setDonationLedger(updatedLedger);
      localStorage.setItem('inamigos_donation_ledger', JSON.stringify(updatedLedger));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form fields
      setDonorName('');
      setDonorEmail('');
      setCardNo('');
      setUpiId('');
    }, 1500);
  };

  // SVG Chart slice coordinates calculation
  // Slice 1: 92% (Program Expenses)
  // Slice 2: 5% (Administration)
  // Slice 3: 3% (Fundraising)
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 animate-fade-in" id="donation-hub-container">
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Financial Stewardship</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Transparency & Donation Hub</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Simulate the direct impact of your funding. Through rigorous auditing and complete traceability, we ensure that your capital achieves its maximal utility on-field.
        </p>
      </div>

      {isSuccess ? (
        /* Success Screen */
        <div className="max-w-2xl mx-auto bg-white border border-outline-variant/30 rounded-3xl p-12 text-center space-y-8 shadow-xl animate-scale-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 animate-spin-slow" />
          </div>
          
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold text-primary">Thank You for Your Support!</h2>
            <p className="font-sans text-base text-on-surface-variant">
              Your donation of <span className="font-bold text-on-surface">${activeAmount.toLocaleString()}</span> has been safely logged. A formal tax-exemption certificate and traceability code have been sent to your registered channel.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-outline-variant/20 text-left space-y-2">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-primary">Direct Stewardship Guarantee</span>
            <p className="font-sans text-xs text-on-surface-variant">
              You will receive automated quarterly field impact reports with photographs from the specific program coordinate you funded.
            </p>
          </div>

          <button
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 bg-primary text-white font-display font-bold text-sm rounded-full hover:scale-105 transition-transform shadow-md shadow-primary/20 cursor-pointer"
          >
            Fund Another Sector
          </button>
        </div>
      ) : (
        /* Main Donation Flow */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Donation Simulator & Checkout Form */}
          <div className="lg:col-span-8 space-y-8 bg-white p-8 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5">
            
            <form onSubmit={handleDonateSubmit} className="space-y-8">
              
              {/* Step 1: Sector selection */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                  Select Sector / Program
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="sector-select">Active Program Area</label>
                    <select
                      id="sector-select"
                      value={selectedInitiativeId}
                      onChange={(e) => setSelectedInitiativeId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-sans"
                    >
                      <option value="general">General Pool (Directly allocated to highest-need campaign)</option>
                      {INITIATIVES_DATA.map((init) => (
                        <option key={init.id} value={init.id}>
                          {init.title} ({init.tag})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose Amount with Live Impact */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                  Choose Amount & View Impact
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {IMPACT_TIERS.map((tier) => (
                    <button
                      type="button"
                      key={tier.amount}
                      onClick={() => handleAmountSelect(tier.amount)}
                      className={`py-3.5 rounded-xl font-display font-bold text-sm transition-all cursor-pointer border ${
                        selectedAmount === tier.amount && !customAmount
                          ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                          : 'bg-surface hover:bg-surface-container border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="custom-amount">Or Enter Custom Amount ($)</label>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    placeholder="e.g. 500"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                {/* Direct impact box */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4 animate-pulse-slow">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-extrabold text-primary uppercase tracking-wider block">Immediate Micro-Impact</span>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed mt-1">
                      {getImpactMessage(activeAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Billing Info */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
                  Billing & Communication Information
                </h3>

                <div className="flex items-center gap-2 bg-surface p-3 rounded-xl border border-outline-variant/20">
                  <input
                    type="checkbox"
                    id="anonymous-box"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-outline text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="anonymous-box" className="font-sans text-xs text-on-surface-variant font-semibold cursor-pointer select-none">
                    I wish to make this contribution completely anonymous (removes name from the ledger)
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="donor-fullname">Full Name</label>
                      <input
                        id="donor-fullname"
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="donor-emailaddr">Email Address</label>
                      <input
                        id="donor-emailaddr"
                        type="email"
                        required
                        placeholder="e.g. jane@domain.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Secure Checkout */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
                  Secure Checkout
                </h3>

                {/* Toggles */}
                <div className="grid grid-cols-3 gap-3 border-b border-surface-container-high pb-4">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / GPay', icon: Landmark },
                    { id: 'paypal', label: 'PayPal', icon: Globe }
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentType(method.id as any)}
                        className={`py-2 px-3 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentType === method.id
                            ? 'bg-primary/10 text-primary border border-primary'
                            : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Conditional Fields */}
                <div className="bg-surface p-6 rounded-2xl border border-outline-variant/20">
                  {paymentType === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="card-number-input">Card Number</label>
                        <input
                          id="card-number-input"
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="card-expiry-input">Expiry Date</label>
                          <input
                            id="card-expiry-input"
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="card-cvv-input">CVV / Security Code</label>
                          <input
                            id="card-cvv-input"
                            type="password"
                            required
                            maxLength={3}
                            placeholder="***"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentType === 'upi' && (
                    <div className="space-y-2">
                      <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="upi-id-input">UPI ID</label>
                      <input
                        id="upi-id-input"
                        type="text"
                        required
                        placeholder="username@okaxis"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-outline-variant/40 focus:outline-none focus:border-primary text-sm font-mono"
                      />
                    </div>
                  )}

                  {paymentType === 'paypal' && (
                    <div className="text-center py-4 space-y-2">
                      <Globe className="w-10 h-10 text-primary mx-auto opacity-70 animate-bounce" />
                      <p className="font-sans text-xs text-on-surface-variant leading-normal">
                        You will be securely routed to PayPal checkout interface to complete your trace-code contribution.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={isSubmitting || activeAmount <= 0}
                className="w-full bg-accent-orange hover:bg-accent-orange/95 disabled:bg-outline-variant text-white py-4 rounded-xl font-display font-bold text-sm shadow-lg shadow-accent-orange/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                id="submit-donation-btn"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Verifying Traceability...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Securely Donate ${activeAmount.toLocaleString()}
                  </>
                )}
              </button>

            </form>

          </div>

          {/* RIGHT: Transparency donut chart & Recent Donations Ledger */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Audited Fund Allocation Donut Chart */}
            <div className="bg-white p-6 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <div className="space-y-1">
                <span className="font-display text-[10px] font-extrabold text-primary uppercase tracking-wider block">Audited Ratios</span>
                <h3 className="font-display font-bold text-lg text-on-surface">Fund Allocation</h3>
              </div>

              {/* Dynamic Interactive SVG Donut */}
              <div className="relative flex items-center justify-center py-2">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Outer circle track */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eeedf7" strokeWidth="12" />

                  {/* Slice 1: Program Expenses (92%) */}
                  <circle 
                    cx="50" cy="50" r="40" fill="transparent" 
                    stroke="#006b1b" strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 * (1 - 0.92)} 
                    className="transition-all duration-300 hover:stroke-width-14 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(1)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />

                  {/* Slice 2: Administration (5%) */}
                  <circle 
                    cx="50" cy="50" r="40" fill="transparent" 
                    stroke="#00629d" strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 * (1 - 0.05)} 
                    transform="rotate(331.2, 50, 50)" // Rotate starting point
                    className="transition-all duration-300 hover:stroke-width-14 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(2)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />

                  {/* Slice 3: Fundraising (3%) */}
                  <circle 
                    cx="50" cy="50" r="40" fill="transparent" 
                    stroke="#FF9800" strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 * (1 - 0.03)} 
                    transform="rotate(349.2, 50, 50)" // Rotate starting point
                    className="transition-all duration-300 hover:stroke-width-14 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(3)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                </svg>

                {/* Center text overlay */}
                <div className="absolute text-center">
                  <span className="font-display font-black text-2xl text-on-surface block leading-none">
                    {hoveredSlice === 1 ? '92%' : hoveredSlice === 2 ? '5%' : hoveredSlice === 3 ? '3%' : '92%'}
                  </span>
                  <span className="font-sans text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider block mt-1">
                    {hoveredSlice === 1 ? 'Programs' : hoveredSlice === 2 ? 'Admin' : hoveredSlice === 3 ? 'Marketing' : 'Programs'}
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="space-y-3 pt-2">
                <div 
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors ${hoveredSlice === 1 ? 'bg-primary/10' : ''}`}
                  onMouseEnter={() => setHoveredSlice(1)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-primary shrink-0" />
                    <span className="font-sans text-xs font-semibold text-on-surface-variant">On-Field Program Expenses</span>
                  </div>
                  <span className="font-display font-black text-xs text-primary">92%</span>
                </div>

                <div 
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors ${hoveredSlice === 2 ? 'bg-secondary/10' : ''}`}
                  onMouseEnter={() => setHoveredSlice(2)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-secondary shrink-0" />
                    <span className="font-sans text-xs font-semibold text-on-surface-variant">General Administration</span>
                  </div>
                  <span className="font-display font-black text-xs text-secondary">5%</span>
                </div>

                <div 
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors ${hoveredSlice === 3 ? 'bg-accent-orange/10' : ''}`}
                  onMouseEnter={() => setHoveredSlice(3)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-accent-orange shrink-0" />
                    <span className="font-sans text-xs font-semibold text-on-surface-variant">Fundraising & Marketing</span>
                  </div>
                  <span className="font-display font-black text-xs text-accent-orange">3%</span>
                </div>
              </div>
            </div>

            {/* Recent Donations Ledger */}
            <div className="bg-white p-6 rounded-[32px] border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-display text-[10px] font-extrabold text-primary uppercase tracking-wider block">Live Board</span>
                  <h3 className="font-display font-bold text-lg text-on-surface">Recent Donations</h3>
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary font-display font-bold text-[9px] tracking-wider rounded-md animate-pulse">
                  SECURE LIVE
                </div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {donationLedger.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-start p-3 bg-surface rounded-2xl border border-outline-variant/20 animate-fade-in text-sm">
                    <div className="space-y-1">
                      <span className="font-display font-bold text-on-surface flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary shrink-0" />
                        {doc.isAnonymous ? 'Anonymous Donor' : doc.name}
                      </span>
                      <span className="font-sans text-[10px] text-on-surface-variant/80 block font-medium">
                        Allocated: {doc.initiativeTitle}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display font-black text-primary block leading-none">${doc.amount}</span>
                      <span className="font-sans text-[9px] text-on-surface-variant block mt-1">{doc.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
