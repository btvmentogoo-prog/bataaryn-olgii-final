import React, { useState } from 'react';
import { Language, Currency, ExpeditionPackage } from '../types';
import { expeditionPackages } from '../data/paleoData';
import { translations } from '../data/translations';
import { X, Compass, Calendar, Users, Mail, Phone, User, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  currentLang: Language;
  currentCurrency: Currency;
  initialPackage?: ExpeditionPackage | null;
  initialSite?: string | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  currentLang,
  currentCurrency,
  initialPackage,
  initialSite,
  onClose,
}) => {
  const t = translations[currentLang];
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackage ? initialPackage.id : expeditionPackages[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [preferredMonth, setPreferredMonth] = useState('2026-06');
  const [specialInterest, setSpecialInterest] = useState(initialSite ? `Interested in: ${initialSite}` : '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPkg = expeditionPackages.find((p) => p.id === selectedPkgId) || expeditionPackages[0];

  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    MNT: { symbol: '₮', rate: 3450 },
    EUR: { symbol: '€', rate: 0.92 },
    JPY: { symbol: '¥', rate: 155 },
  };

  const totalPrice = Math.round(selectedPkg.priceUSD * travelersCount * currencyRates[currentCurrency].rate);
  const formattedTotalPrice =
    currentCurrency === 'MNT'
      ? `${totalPrice.toLocaleString()} ₮`
      : `${currencyRates[currentCurrency].symbol}${totalPrice.toLocaleString()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F5] border border-stone-200 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-stone-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="block text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500 mb-1">
                Gobi Expedition Reservation
              </span>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-normal text-stone-900">
                {t.booking.modalTitle}
              </h2>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600 mt-1 font-light">
                {t.booking.modalSubtitle}
              </p>

              {/* Direct Hotline Banner */}
              <div className="mt-4 p-3 bg-white border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-700">
                <span className="font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-800" />
                  <span>Шуурхай холбогдох & Захиалга:</span>
                </span>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono font-bold text-stone-900">
                  <a href="tel:+97672010099" className="hover:text-amber-800 underline">
                    +976 7201 0099
                  </a>
                  <span className="text-stone-300">/</span>
                  <a href="tel:+97688223584" className="hover:text-amber-800 underline">
                    +976 8822 3584
                  </a>
                  <span className="text-stone-300">/</span>
                  <a href="tel:+97699530099" className="hover:text-amber-800 underline">
                    +976 9953 0099
                  </a>
                  <span className="text-stone-300">/</span>
                  <a href="tel:+97699723336" className="hover:text-amber-800 underline">
                    +976 9972 3336
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Selector */}
              <div>
                <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                  {t.booking.packageLabel}
                </label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-900 transition"
                >
                  {expeditionPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title[currentLang]} ({pkg.durationDays} Days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    {t.booking.fullNameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Arthur Conan"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    {t.booking.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.org"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Preferred Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    {t.booking.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+976 7201 0099, +976 8822 3584"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    {t.booking.dateLabel}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="month"
                      value={preferredMonth}
                      onChange={(e) => setPreferredMonth(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Travelers Count */}
              <div>
                <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                  {t.booking.guestsLabel}: <span className="text-stone-900 font-bold">{travelersCount} Person(s)</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(parseInt(e.target.value, 10))}
                  className="w-full accent-stone-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-light">
                  <span>1 Solo Explorer</span>
                  <span>4 Small Group</span>
                  <span>10 Research Delegation</span>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[10px] font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                  {t.booking.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={specialInterest}
                  onChange={(e) => setSpecialInterest(e.target.value)}
                  placeholder="e.g. Photography equipment, vegetarian meals, academic research focus..."
                  className="w-full p-2.5 bg-white border border-stone-300 text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:border-stone-900 resize-none"
                />
              </div>

              {/* Estimated Total Bar */}
              <div className="p-4 bg-white border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Estimated Expedition Total</div>
                  <div className="text-xs text-stone-600 font-light">
                    {travelersCount} traveler(s) • All Inclusive
                  </div>
                </div>
                <div className="text-2xl font-normal text-stone-900 font-['Cormorant_Garamond',serif]">
                  {formattedTotalPrice}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-[0.25em] shadow-sm transition cursor-pointer"
              >
                {t.booking.submitBtn}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-4 animate-fade-in text-stone-900">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center mx-auto text-stone-800">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-normal text-stone-900">
              {t.booking.successMsg}
            </h3>

            <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-700 max-w-md mx-auto leading-relaxed font-light">
              Thank you, <strong className="text-stone-900 font-semibold">{fullName}</strong>. Our chief paleontological expedition officer will contact you at <strong className="text-stone-900 font-semibold">{email}</strong> within 24 hours with your itinerary proposal, park permits, and flight logistics.
            </p>

            <div className="p-4 bg-white border border-stone-200 text-left max-w-sm mx-auto text-xs text-stone-700 space-y-1 font-light">
              <div><strong>Package:</strong> {selectedPkg.title[currentLang]}</div>
              <div><strong>Travelers:</strong> {travelersCount} Person(s)</div>
              <div><strong>Preferred Date:</strong> {preferredMonth}</div>
              <div><strong>Estimated Total:</strong> {formattedTotalPrice}</div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
