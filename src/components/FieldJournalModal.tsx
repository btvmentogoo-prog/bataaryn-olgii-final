import React, { useState } from 'react';
import { Language, DinosaurSpecimen } from '../types';
import { translations } from '../data/translations';
import { dinosaurSpecimens } from '../data/paleoData';
import { 
  BookOpen, 
  Trash2, 
  Volume2, 
  Download, 
  Award, 
  ExternalLink, 
  X, 
  Star,
  FileText,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface FieldJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  savedSpecimenIds: string[];
  onRemoveSaved: (id: string) => void;
  onOpenAudioGuide: (id: string) => void;
  onNavigateToSpecimen: (id: string) => void;
}

export const FieldJournalModal: React.FC<FieldJournalModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  savedSpecimenIds,
  onRemoveSaved,
  onOpenAudioGuide,
  onNavigateToSpecimen,
}) => {
  const t = translations[currentLang];
  const af = t.appFeatures;

  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('bataar_field_notes') || '';
  });
  const [savedNoteMsg, setSavedNoteMsg] = useState(false);

  const savedSpecimens = dinosaurSpecimens.filter((d) => savedSpecimenIds.includes(d.id));

  const handleSaveNotes = () => {
    localStorage.setItem('bataar_field_notes', notes);
    setSavedNoteMsg(true);
    setTimeout(() => setSavedNoteMsg(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Cinzel',serif] text-xl font-bold text-stone-100">
                {af.myJournalTitle}
              </h3>
              <p className="text-xs text-stone-400">
                {af.myJournalDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Bookmarks Section */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{af.savedItems} ({savedSpecimens.length})</span>
          </h4>

          {savedSpecimens.length === 0 ? (
            <div className="bg-stone-950/80 border border-dashed border-stone-800 rounded-2xl p-6 text-center text-stone-400 text-xs sm:text-sm">
              <p>{af.noSavedItems}</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {savedSpecimens.map((specimen) => (
                <div
                  key={specimen.id}
                  className="bg-stone-950 border border-stone-800/80 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4 hover:border-amber-500/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={specimen.image}
                      alt={specimen.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-800 shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-stone-100 text-sm">
                        {specimen.name}
                      </h5>
                      <span className="text-xs text-amber-400/90 font-serif italic">
                        {specimen.scientificName} • {specimen.location[currentLang]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAudioGuide(specimen.id);
                      }}
                      className="p-2 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-stone-800 transition cursor-pointer"
                      title="Audio Guide"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveSaved(specimen.id)}
                      className="p-2 rounded-lg bg-stone-900 hover:bg-rose-950 hover:text-rose-400 text-stone-400 border border-stone-800 transition cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Field Notes Area */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Хээрийн судалгааны тэмдэглэл (Auto-saved)</span>
            </label>
            {savedNoteMsg && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Хадгалагдлаа!
              </span>
            )}
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Говьд хийх аяллын төлөвлөгөө, сонирхсон олдворын талаар тэмдэглэл хөтлөөрэй..."
            rows={4}
            className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSaveNotes}
              className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-300 text-xs font-bold transition cursor-pointer"
            >
              Тэмдэглэл хадгалах
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
