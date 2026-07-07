import React, { useState, useEffect } from 'react';
import { 
  Heart, Image as ImageIcon, Smile, Plus, ArrowLeft, 
  ArrowRight, X, Sparkles, Filter, Grid, Check, MessageSquareHeart
} from 'lucide-react';
import { GALLERY_IMAGES, WALL_NOTES_DEFAULT } from '../data';
import { WallNote } from '../types';

const PASTEL_COLORS = [
  'bg-amber-100 text-amber-950 border-amber-200', // Yellow/Gold
  'bg-emerald-100 text-emerald-950 border-emerald-200', // Teal
  'bg-violet-100 text-violet-950 border-violet-200', // Lavender
  'bg-rose-100 text-rose-950 border-rose-200' // Rose
];

const COLOR_LABELS = ['Gold', 'Teal', 'Lavender', 'Rose'];

export default function GalleryWall() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EDUCATION' | 'ENVIRONMENT' | 'HEALTHCARE' | 'EMPOWERMENT' | 'ANIMALS'>('ALL');
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  // Thank You Board state
  const [wallNotes, setWallNotes] = useState<WallNote[]>([]);
  const [noteName, setNoteName] = useState('');
  const [noteMsg, setNoteMsg] = useState('');
  const [noteColorIdx, setNoteColorIdx] = useState(0);
  const [noteSuccess, setNoteSuccess] = useState(false);

  // Load Wall Notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('inamigos_wall_notes');
    if (saved) {
      try {
        setWallNotes(JSON.parse(saved));
      } catch (e) {
        setWallNotes(WALL_NOTES_DEFAULT);
      }
    } else {
      setWallNotes(WALL_NOTES_DEFAULT);
      localStorage.setItem('inamigos_wall_notes', JSON.stringify(WALL_NOTES_DEFAULT));
    }
  }, []);

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteName || !noteMsg) return;

    const newNote: WallNote = {
      id: `note-${Date.now()}`,
      name: noteName,
      message: noteMsg,
      colorIndex: noteColorIdx,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newNote, ...wallNotes];
    setWallNotes(updated);
    localStorage.setItem('inamigos_wall_notes', JSON.stringify(updated));

    // Reset fields
    setNoteName('');
    setNoteMsg('');
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 2000);
  };

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    return activeFilter === 'ALL' || img.category === activeFilter;
  });

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx === null) return;
    const prevIdx = selectedImageIdx === 0 ? filteredImages.length - 1 : selectedImageIdx - 1;
    setSelectedImageIdx(prevIdx);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx === null) return;
    const nextIdx = selectedImageIdx === filteredImages.length - 1 ? 0 : selectedImageIdx + 1;
    setSelectedImageIdx(nextIdx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24 animate-fade-in text-sm" id="gallery-wall-container">
      
      {/* 1. Header Section */}
      <div className="space-y-4 max-w-3xl">
        <span className="font-display text-xs font-extrabold text-primary tracking-widest uppercase block">Our Visual Footprint</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Impact Gallery & Gratitude Board</h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          Behind every audit log, financial spreadsheet, and program milestone is a human face, a local ecosystem, or an rescued animal. Explore on-field coordinates and share your own words of gratitude.
        </p>
      </div>

      {/* 2. Photo Gallery Section */}
      <div className="space-y-8" id="photo-gallery-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container-high pb-4">
          <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" /> On-Field Photo Records
          </h3>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'HEALTHCARE', 'EDUCATION', 'ENVIRONMENT', 'EMPOWERMENT', 'ANIMALS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-display text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                {cat === 'ALL' ? 'All Pics' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry-grid">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container cursor-pointer border border-surface-container-high shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              id={`gallery-item-${idx}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 space-y-2">
                <span className="px-2 py-0.5 rounded bg-primary text-white text-[9px] font-bold uppercase tracking-wider self-start">
                  {img.category}
                </span>
                <p className="font-sans text-xs text-white/95 leading-relaxed font-medium">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Gratitude Board Section */}
      <div className="space-y-12" id="gratitude-board-section">
        <div className="border-b border-surface-container-high pb-4">
          <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-primary" /> Digital Gratitude Board
          </h3>
          <p className="font-sans text-xs text-on-surface-variant mt-1 leading-normal">
            A real-time community space where donors, volunteers, and beneficiaries share notes of appreciation. Your note persists in localStorage!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Note Spawner */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-surface-container-high shadow-lg shadow-deep-navy/5 space-y-6">
            <h4 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" /> Pin a Thank-You Note
            </h4>

            {noteSuccess ? (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-primary mx-auto" />
                <h5 className="font-display font-bold text-primary">Note Pinned!</h5>
                <p className="font-sans text-[11px] text-on-surface-variant">Your message has been safely spawned on our gratitude board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddNoteSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="note-author">Your Name / Organization</label>
                  <input
                    id="note-author"
                    type="text"
                    required
                    placeholder="e.g. Meera & Kabir"
                    value={noteName}
                    onChange={(e) => setNoteName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-on-surface-variant" htmlFor="note-message">Message / Words of Support</label>
                  <textarea
                    id="note-message"
                    required
                    rows={3}
                    placeholder="Say something warm to the volunteers, doctors, or children..."
                    value={noteMsg}
                    onChange={(e) => setNoteMsg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                {/* Color selects */}
                <div className="space-y-1.5">
                  <label className="font-display text-xs font-bold text-on-surface-variant">Choose Board Paper Color</label>
                  <div className="flex gap-2">
                    {PASTEL_COLORS.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNoteColorIdx(idx)}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${col.split(' ')[0]} ${
                          noteColorIdx === idx ? 'scale-110 border-primary' : 'border-transparent'
                        }`}
                        title={COLOR_LABELS[idx]}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2.5 rounded-xl font-display font-bold text-xs hover:scale-[1.02] transition-transform shadow-md shadow-primary/10 cursor-pointer"
                >
                  Pin Note to Board
                </button>
              </form>
            )}
          </div>

          {/* Notes Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2" id="notes-masonry-board">
            {wallNotes.map((note) => {
              const colorClass = PASTEL_COLORS[note.colorIndex] || PASTEL_COLORS[0];

              return (
                <div
                  key={note.id}
                  className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow animate-scale-up ${colorClass}`}
                >
                  <p className="font-sans text-xs font-medium leading-relaxed italic mb-4">
                    "{note.message}"
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-black/5 text-[10px] opacity-80 font-bold">
                    <span>— {note.name}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Lightbox modal */}
      {selectedImageIdx !== null && (
        <div
          onClick={() => setSelectedImageIdx(null)}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
        >
          {/* Close trigger */}
          <button
            onClick={() => setSelectedImageIdx(null)}
            className="absolute top-6 right-6 text-white bg-white/15 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-[70vh] flex items-center justify-center">
            <img
              src={filteredImages[selectedImageIdx].url}
              alt={filteredImages[selectedImageIdx].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border-2 border-white/10"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Previous Image"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Next Image"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption text */}
          <div className="max-w-xl text-center mt-6 space-y-1.5" onClick={(e) => e.stopPropagation()}>
            <span className="px-2.5 py-0.5 rounded bg-primary text-white text-[9px] font-bold uppercase tracking-wider">
              {filteredImages[selectedImageIdx].category}
            </span>
            <p className="font-sans text-xs text-white/90 leading-relaxed font-semibold">
              {filteredImages[selectedImageIdx].caption}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
