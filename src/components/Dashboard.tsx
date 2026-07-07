import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, HeartPulse, GraduationCap, Leaf, Sparkles, Star, 
  Eye, Flag, ChevronLeft, ChevronRight, Award, ShieldCheck, 
  ArrowRight, Activity, Smile, Plus, Check, MessageSquare
} from 'lucide-react';
import { INITIATIVES_DATA, TESTIMONIALS_DATA } from '../data';
import { Initiative, Testimonial } from '../types';

// Map icons dynamically
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  GraduationCap,
  Leaf,
  Sparkles,
  Heart,
  Star
};

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  setSelectedInitiative: (initiative: Initiative | null) => void;
  openVolunteerModalWithInitiative: (initId: string) => void;
}

export default function Dashboard({ 
  setActiveTab, 
  setSelectedInitiative,
  openVolunteerModalWithInitiative
}: DashboardProps) {
  
  // Testimonial slider state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('inamigos_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return TESTIMONIALS_DATA; }
    }
    return TESTIMONIALS_DATA;
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Custom testimonial form state
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [newFeedbackName, setNewFeedbackName] = useState('');
  const [newFeedbackRole, setNewFeedbackRole] = useState('');
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [newFeedbackStars, setNewFeedbackStars] = useState(5);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Stats Counters
  const [livesCount, setLivesCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [statesCount, setStatesCount] = useState(0);

  // Animated numbers on viewport enter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setLivesCount(Math.min(Math.floor((50000 / steps) * step), 50000));
      setVolunteersCount(Math.min(Math.floor((220 / steps) * step), 220));
      setStatesCount(Math.min(Math.floor((28 / steps) * step), 28));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Slider controls
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Submit new feedback
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedbackName || !newFeedbackText) return;

    const newTestimonial: Testimonial = {
      id: `custom-t-${Date.now()}`,
      name: newFeedbackName,
      role: newFeedbackRole || 'Foundation Supporter',
      feedback: `"${newFeedbackText}"`,
      stars: newFeedbackStars,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB14A5mOnwwRK5wRszH768ykUJHOyWzvL8J7YXxq4dejFqMJwftExVXVgxNlW9P-i1x4T4lwhV8Amo0LmVyOFupgqS0GFzVmdTdw3Gbv40V_PEM5TezzLs4Z8HBKXz9BhsMF0x2lm8t6CgNm8UgHSRSma3FrVL92K1vVjJMrAAsnUzOQwYTmO5uSfdyCKTuiFVoktS2OPExeB9WLSnPBsc3TMCkFIedMQlGtZkSj0lFRnOxODaxPc1U0Q' // default placeholder
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('inamigos_testimonials', JSON.stringify(updated));

    // Reset Form
    setNewFeedbackName('');
    setNewFeedbackRole('');
    setNewFeedbackText('');
    setNewFeedbackStars(5);
    setFeedbackSuccess(true);
    setCurrentSlide(0);

    setTimeout(() => {
      setFeedbackSuccess(false);
      setShowTestimonialForm(false);
    }, 2500);
  };

  // Three.js replacement: Beautiful dynamic interactive heart & particle canvas!
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 107, 27, 0.15)' : 'rgba(255, 152, 0, 0.1)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    let heartScale = 1;
    let scalingDir = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Animate pulsing heartbeat shape
      heartScale += 0.003 * scalingDir;
      if (heartScale > 1.08) scalingDir = -1;
      if (heartScale < 0.96) scalingDir = 1;

      ctx.save();
      ctx.translate(width / 2, height / 2 - 20);
      ctx.scale(heartScale, heartScale);

      // Draw elegant glowing radial gradient behind the heart
      const radGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 150);
      radGrad.addColorStop(0, 'rgba(0, 107, 27, 0.12)');
      radGrad.addColorStop(0.5, 'rgba(255, 152, 0, 0.04)');
      radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.fill();

      // Draw Heart Shape using math formula
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 107, 27, 0.1)';
      ctx.strokeStyle = '#006b1b';
      ctx.lineWidth = 2;

      // Heart parametric path
      for (let t = 0; t < Math.PI * 2; t += 0.02) {
        // Parametric equations for a heart
        const xVal = 16 * Math.sin(t) ** 3;
        const yVal = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        // Scale and map to canvas center
        const posX = xVal * 8;
        const posY = yVal * 8;

        if (t === 0) {
          ctx.moveTo(posX, posY);
        } else {
          ctx.lineTo(posX, posY);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center glowing core
      ctx.fillStyle = '#FF9800';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Add orbiting rings
      ctx.strokeStyle = 'rgba(0, 107, 27, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 120, 40, Math.PI / 6 + Date.now() * 0.0002, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden animate-fade-in" id="dashboard-container">
      {/* 1. Hero Section */}
      <header className="relative pt-24 min-h-[90vh] flex items-center bg-gradient-to-b from-surface-low to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 z-10" id="hero-text-container">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-display font-bold text-xs border border-primary/20 tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              Transforming Lives Globally
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl font-bold text-on-surface tracking-tight leading-tight">
              Together We <span className="text-primary block md:inline">Create Change</span>
            </h1>
            
            <p className="font-sans text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Dedicated to bridging structural gaps in education, emergency healthcare, ecological balance, and social welfare. We empower communities through transparent systems and grassroots action.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setActiveTab('volunteer')}
                className="bg-primary text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20 cursor-pointer"
                id="hero-join-btn"
              >
                Join Us
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
                id="hero-projects-btn"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
            {/* Interactive Canvas replacement for Three.js */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" id="hero-interactive-canvas" />
            <div className="absolute glass-card px-6 py-4 rounded-2xl shadow-xl border border-white/50 -bottom-4 left-6 flex items-center gap-3 animate-bounce">
              <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-primary block leading-none">50K+</span>
                <span className="font-sans text-xs text-on-surface-variant font-medium">Stories of Hope</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Pioneering Social Transparency Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="about-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Linked High-End Photograph */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent z-10 transition-opacity group-hover:opacity-60 duration-300"></div>
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_pW3rq67zZ8okWPLUq5JH6yGyKA2wfIt9OeyAGC6HkCsbyhG-pOP5PcyzD2HKuYdN13Uckd09jmXl9ABZRRBvul3f0NT6CWnADx_2qTOHKiNmuBHPpORm8cVrgsJJJyjcOHw7-VKomG49yaCVDay4_BG2zNJS0n4HOojabgJXUNjHD_p8e0zU467DhoYdCCdMX1seGTFwoRUpazQKyHnSa_kM7ojA9_nKSh8CbkarkBZYzz468KuRoA"
              alt="Diverse volunteers of InAmigos Foundation discussing maps and social projects in a bright, modern, collaborative studio"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl max-w-xs shadow-lg">
              <span className="font-display text-xs font-extrabold text-primary uppercase block tracking-wider mb-1">On-Field Transparency</span>
              <p className="font-sans text-xs text-on-surface-variant leading-normal">
                Independent tracking of every project, ensuring optimal efficiency and grassroot accountability.
              </p>
            </div>
          </div>

          <div className="space-y-8" id="transparency-description">
            <div className="space-y-4">
              <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Our Philosophy</span>
              <h2 className="font-display text-4xl font-bold text-on-surface leading-tight">Pioneering Social Transparency</h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                InAmigos Foundation is more than an NGO; it’s a systematic movement towards a highly equitable and transparent world. We combine technological auditing precision with deep grassroots empathy to create self-sustaining community structures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-on-surface mb-2">Our Vision</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Empowering every individual to reach their highest potential through equal educational and emergency resources.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <Flag className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-on-surface mb-2">Our Mission</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Implementing highly scalable social projects that directly address the core healthcare, environmental, and developmental challenges.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/30">
              <span className="font-display font-bold text-xs text-on-surface-variant/70 uppercase tracking-wider block mb-4">Accreditations & Certifications</span>
              <div className="flex flex-wrap gap-3">
                {['80G CERTIFIED', '12A REGISTERED', 'CSR-1 COMPLIANT', 'ISO 9001:2015'].map((cert) => (
                  <div key={cert} className="px-4 py-2 rounded-xl bg-white border border-outline-variant/40 text-xs font-bold text-primary flex items-center gap-2 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Driving Sustainable Impact Section */}
      <section className="bg-surface-low py-20" id="initiatives-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Our Scope of Work</span>
            <h2 className="font-display text-4xl font-bold text-on-surface">Driving Sustainable Impact</h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Our targeted programs are structured to achieve systemic growth. Hover over or tap any initiative below to explore its milestones or join its local volunteer core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIATIVES_DATA.map((init) => {
              const IconComp = iconComponents[init.iconName] || HeartPulse;
              
              return (
                <div 
                  key={init.id}
                  className="glass-card p-8 rounded-3xl flex flex-col justify-between group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative border border-white/60 shadow-md shadow-deep-navy/5 cursor-pointer"
                  onClick={() => setSelectedInitiative(init)}
                  id={`initiative-card-${init.id}`}
                >
                  <div>
                    {/* Category pill */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wider">
                        {init.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {init.title}
                    </h3>
                    
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                      {init.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                    <button className="flex items-center gap-2 text-primary font-display font-bold text-xs cursor-pointer group">
                      Learn More 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openVolunteerModalWithInitiative(init.id);
                      }}
                      className="px-4 py-2 rounded-full bg-accent-orange/10 hover:bg-accent-orange hover:text-white text-accent-orange font-display font-semibold text-[11px] transition-all cursor-pointer"
                    >
                      Join Core
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Impact metrics with transparency section */}
      <section className="bg-deep-navy py-20 text-white relative overflow-hidden" id="counters-section">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-orange/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <div className="space-y-4">
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-fixed block tracking-tight">
                {livesCount.toLocaleString()}+
              </div>
              <h3 className="font-display font-bold text-xl opacity-90">Lives Impacted</h3>
              <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-fixed block tracking-tight">
                {volunteersCount.toLocaleString()}+
              </div>
              <h3 className="font-display font-bold text-xl opacity-90">Volunteers Network</h3>
              <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-fixed block tracking-tight">
                {statesCount}+
              </div>
              <h3 className="font-display font-bold text-xl opacity-90">States Reached</h3>
              <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
            </div>

          </div>

          <div className="p-10 md:p-12 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="font-display text-xs font-bold text-accent-orange uppercase tracking-wider block">Audited Transparency</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">Transparency is our core currency.</h2>
              </div>
              <p className="font-sans text-base opacity-70 leading-relaxed">
                We believe that trust is earned, not assumed. We guarantee that 100% of individual public donations go directly into funding on-ground program operations. Corporate contributions cover our minimal organizational administration costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="testimonials-section">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
          <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Our Supporters</span>
          <h2 className="font-display text-4xl font-bold text-on-surface">Voice of our Heroes</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="glass-card p-10 md:p-12 rounded-3xl shadow-xl relative border border-white/50 overflow-hidden">
            <div className="absolute right-6 top-6 text-primary/10">
              <MessageSquare className="w-24 h-24 stroke-[1.5]" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex gap-1 text-accent-orange">
                {Array.from({ length: testimonials[currentSlide]?.stars || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="font-sans text-lg md:text-xl italic text-on-surface-variant leading-relaxed">
                {testimonials[currentSlide]?.feedback}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/20 border-2 border-primary/25 shadow-md">
                  <img 
                    className="w-full h-full object-cover" 
                    src={testimonials[currentSlide]?.imageUrl} 
                    alt={testimonials[currentSlide]?.name} 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-on-surface">{testimonials[currentSlide]?.name}</h4>
                  <p className="font-sans text-xs text-on-surface-variant font-medium">{testimonials[currentSlide]?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setShowTestimonialForm(!showTestimonialForm)}
              className="px-6 rounded-full border-2 border-dashed border-primary/40 text-primary font-display font-bold text-xs flex items-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Share Your Story
            </button>

            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic add-testimonial form */}
        {showTestimonialForm && (
          <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-3xl border border-outline-variant/30 shadow-lg animate-fade-in">
            <h3 className="font-display font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
              <Smile className="w-5 h-5 text-primary" /> Tell us about your InAmigos experience
            </h3>
            
            {feedbackSuccess ? (
              <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl text-center space-y-2 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-primary">Story Submitted!</h4>
                <p className="font-sans text-xs text-on-surface-variant">Thank you for sharing. Your testimony has been added to our board.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="feedback-name">Your Name</label>
                    <input 
                      id="feedback-name"
                      type="text" 
                      required
                      placeholder="e.g. Meera S." 
                      value={newFeedbackName}
                      onChange={(e) => setNewFeedbackName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="feedback-role">Role/Location</label>
                    <input 
                      id="feedback-role"
                      type="text" 
                      placeholder="e.g. Supporter, Pune" 
                      value={newFeedbackRole}
                      onChange={(e) => setNewFeedbackRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setNewFeedbackStars(stars)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${stars <= newFeedbackStars ? 'text-accent-orange fill-current' : 'text-outline-variant'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="feedback-text">Your Story / Feedback</label>
                  <textarea 
                    id="feedback-text"
                    required
                    rows={3}
                    placeholder="Describe how InAmigos impacted you or why you support our initiatives..."
                    value={newFeedbackText}
                    onChange={(e) => setNewFeedbackText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-display font-bold text-sm hover:scale-[1.02] transition-transform shadow-md shadow-primary/10 cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}
      </section>

      {/* 6. Final CTA Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden" id="final-cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,152,0,0.15),transparent_60%)]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Ready to make an <span className="text-primary-fixed block md:inline">Impact?</span></h2>
          <p className="font-sans text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
            Whether it is your time, specialized expertise, or financial resources, every contribution moves us closer to building highly equitable and sustainable regional communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('volunteer')}
              className="bg-accent-orange text-white px-10 py-4 rounded-full font-display font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-xl shadow-black/20 cursor-pointer"
            >
              Become a Volunteer
            </button>
            <button 
              onClick={() => setActiveTab('donation')}
              className="bg-white text-primary px-10 py-4 rounded-full font-display font-bold text-sm hover:bg-surface-variant transition-colors duration-200 shadow-xl shadow-black/10 cursor-pointer"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
