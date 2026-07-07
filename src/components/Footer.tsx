import React from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-white border-t border-surface-container-high py-16 text-on-surface" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Foundation Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold text-primary block tracking-tight leading-none">InAmigos</span>
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/70">Foundation</span>
            </div>
          </div>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Empowering communities through innovative social interventions, state-of-the-art digital classrooms, healthcare camps, and sustainable ecological development practices since 2018.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-all duration-300" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('projects')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                Our Projects
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('donation')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                Donation Calculator
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('volunteer')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                Volunteer Portal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('community')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                Impact Stories & Gallery
              </button>
            </li>
          </ul>
        </div>

        {/* Transparency info */}
        <div>
          <h4 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-6">Transparency</h4>
          <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
            <li>
              <button onClick={() => setActiveTab('donation')} className="hover:text-secondary hover:underline cursor-pointer transition-colors text-left">
                Donor Ledger
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-secondary hover:underline transition-colors block">Annual Report 2025</a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary hover:underline transition-colors block">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary hover:underline transition-colors block">Terms of Service</a>
            </li>
            <li className="pt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-xs font-semibold text-primary">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>CSR-1 COMPLIANT</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-6">Contact</h4>
          <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Suite 204, Creative Block, Tech Park, Mumbai, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span className="break-all">contact@inamigos.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-outline-variant/30 text-center font-sans text-xs text-on-surface-variant/70">
        © 2026 InAmigos Foundation. All rights reserved. Created with Lumina Benevolence.
      </div>
    </footer>
  );
}
