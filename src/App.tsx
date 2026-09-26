import React, { useState, useEffect } from 'react';
import { Language, Currency, ExpeditionPackage, PageId } from './types';
import { Header } from './components/Header';
import { PageBanner } from './components/PageBanner';
import { HomeSectionsPortal } from './components/HomeSectionsPortal';
import { Hero } from './components/Hero';
import { FossilExplorer } from './components/FossilExplorer';
import { GobiMapSection } from './components/GobiMapSection';
import { SnowLeopardSection } from './components/SnowLeopardSection';
import { GobiLandscapeSection } from './components/GobiLandscapeSection';
import { BataarRepatriationStory } from './components/BataarRepatriationStory';
import { ExpeditionSection } from './components/ExpeditionSection';
import { VirtualExcavationGame } from './components/VirtualExcavationGame';
import { ResearchCollabSection } from './components/ResearchCollabSection';
import { VisitorGuideSection } from './components/VisitorGuideSection';
import { GobiWeatherSection } from './components/GobiWeatherSection';
import { TravelSafetyAlert } from './components/TravelSafetyAlert';
import { BookingModal } from './components/BookingModal';
import { AudioGuideModal } from './components/AudioGuideModal';
import { AppInstallModal } from './components/AppInstallModal';
import { FieldJournalModal } from './components/FieldJournalModal';
import { MessengerShareModal } from './components/MessengerShareModal';
import { VisitorAnalyticsModal } from './components/VisitorAnalyticsModal';
import { MobileAppTabBar } from './components/MobileAppTabBar';
import { Footer } from './components/Footer';
import { QuickUtilityHub } from './components/QuickUtilityHub';
import { BottomBookingWidget } from './components/BottomBookingWidget';
import { MessageCircle, Activity, Users, BarChart2 } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('mn');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [extraBookingRowOpen, setExtraBookingRowOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<ExpeditionPackage | null>(null);
  const [bookingSite, setBookingSite] = useState<string | null>(null);
  const [audioGuideSpecimenId, setAudioGuideSpecimenId] = useState<string | null>(null);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  // Multi-Page Navigation State
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '');
    const validPages: PageId[] = [
      'home',
      'about',
      'accommodations',
      'expeditions',
      'dinosaurs',
      'maps',
      'snow-leopard',
      'landscapes',
      'bataar-story',
      'virtual-lab',
      'weather',
      'collaborations',
    ];
    return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Sync with browser Back/Forward buttons and hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages: PageId[] = [
        'home',
        'about',
        'accommodations',
        'expeditions',
        'dinosaurs',
        'maps',
        'snow-leopard',
        'landscapes',
        'bataar-story',
        'virtual-lab',
        'weather',
        'collaborations',
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Visitor Telemetry & Survey State
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [activeVisitorsCount, setActiveVisitorsCount] = useState(24);
  const [totalVisitsCount, setTotalVisitsCount] = useState(18450);

  // Messenger Share State
  const [messengerModalOpen, setMessengerModalOpen] = useState(false);
  const [messengerShareData, setMessengerShareData] = useState<{
    title?: string;
    url?: string;
    text?: string;
  }>({});

  // App & Field Journal State
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [savedSpecimens, setSavedSpecimens] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bataar_saved_specimens');
      return stored ? JSON.parse(stored) : ['tarbosaurus-bataar', 'deinocheirus'];
    } catch {
      return ['tarbosaurus-bataar', 'deinocheirus'];
    }
  });

  // Client Session Heartbeat Telemetry
  useEffect(() => {
    let sessionId = localStorage.getItem('bataar_session_id');
    if (!sessionId) {
      sessionId = `exp-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('bataar_session_id', sessionId);
    }

    const sendHeartbeat = async () => {
      try {
        const res = await fetch('/api/analytics/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            country: 'MN',
            device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
            currentSection: currentPage,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.activeNow) setActiveVisitorsCount(data.activeNow);
          if (data.totalVisits) setTotalVisitsCount(data.totalVisits);
        }
      } catch (e) {
        // Fallback smooth oscillation if offline
        setActiveVisitorsCount((prev) => Math.max(14, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 20000); // 20-second heartbeat
    return () => clearInterval(interval);
  }, [currentPage]);

  // Register PWA Service Worker with update check
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Bataar PWA Service Worker Registered:', reg.scope);
          // Check for worker updates
          reg.update().catch(() => {});
        })
        .catch((err) => console.log('SW registration notice:', err));
    }
  }, []);

  const handleOpenMessengerShare = (data?: { title?: string; url?: string; text?: string }) => {
    setMessengerShareData(data || {});
    setMessengerModalOpen(true);
  };

  const handleToggleSaveSpecimen = (id: string) => {
    setSavedSpecimens((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('bataar_saved_specimens', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleOpenBooking = (pkg?: ExpeditionPackage, siteName?: string) => {
    setBookingPackage(pkg || null);
    setBookingSite(siteName || null);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen min-w-[1280px] w-full bg-[#FAF9F5] text-stone-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-stone-900 selection:text-white pb-16 md:pb-0 flex flex-col justify-between">
      {/* Global Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={() => handleOpenBooking()}
        currentPage={currentPage}
        onNavigatePage={handleNavigate}
        onOpenAppModal={() => setAppModalOpen(true)}
        onOpenJournal={() => setJournalOpen(true)}
        onOpenMessengerShare={() => handleOpenMessengerShare()}
        onOpenAnalytics={() => setAnalyticsModalOpen(true)}
        activeVisitorsCount={activeVisitorsCount}
        savedCount={savedSpecimens.length}
        isExtraRowOpen={extraBookingRowOpen}
        onToggleExtraRow={() => setExtraBookingRowOpen((prev) => !prev)}
      />

      {/* Travel Safety Warning Marquee Ticker & Floating Advisory Window */}
      <TravelSafetyAlert
        currentLang={currentLang}
        onOpenBooking={() => handleOpenBooking()}
        externalModalOpen={safetyModalOpen}
        onCloseExternalModal={() => setSafetyModalOpen(false)}
        hideFloatingBtn={true}
      />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1 w-full">
        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Atmosphere - Annandale Luxury Layout */}
            <Hero
              currentLang={currentLang}
              onExploreClick={() => handleNavigate('dinosaurs')}
              onExpeditionClick={() => handleNavigate('expeditions')}
              onSnowLeopardClick={() => handleNavigate('snow-leopard')}
              onCampClick={() => handleNavigate('accommodations')}
              onOpenBooking={() => handleOpenBooking()}
              onOpenAudioGuide={(specimenId) => setAudioGuideSpecimenId(specimenId)}
              onOpenExtraRow={() => {
                setExtraBookingRowOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Баазын бүрэн танилцуулга (Complete Camp Guide & Accommodations Showcase) */}
            <VisitorGuideSection
              currentLang={currentLang}
              currentCurrency={currentCurrency}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* Хээрийн малтлага & Олон өдрийн аялал, экспедицийн хөтөлбөрүүд */}
            <ExpeditionSection
              currentLang={currentLang}
              currentCurrency={currentCurrency}
              onOpenBookingWithPackage={(pkg) => handleOpenBooking(pkg)}
            />

            {/* Цоохор ирвэсийн өлгий нутаг & Амьд байгаль - Бүрэн хэсэг */}
            <SnowLeopardSection
              currentLang={currentLang}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* Тарбозавр Батаарын түүх & Палеонтологийн бүрэн танилцуулга */}
            <BataarRepatriationStory currentLang={currentLang} />

            <FossilExplorer
              currentLang={currentLang}
              onOpenAudioGuide={(specimenId) => setAudioGuideSpecimenId(specimenId)}
              savedSpecimenIds={savedSpecimens}
              onToggleSave={handleToggleSaveSpecimen}
              onOpenMessengerShare={(specimen) => {
                if (specimen) {
                  handleOpenMessengerShare({
                    title: `${specimen.name} (${specimen.scientificName}) • Батаарын өлгий`,
                    text: `🦖 ${specimen.name} (${specimen.scientificName}) - ${specimen.highlights[currentLang][0] || ''}\nМонголын говиос олдсон үлэг гүрвэлийн дэлгэрэнгүй тайлбар, 3D араг яс, аудиог эндээс үзнэ үү:\nhttps://ais-pre-qbkxdsr2iqrwrvve6c4fmj-178600995587.asia-northeast1.run.app`,
                  });
                } else {
                  handleOpenMessengerShare();
                }
              }}
            />

            {/* Interactive Portal to All Dedicated Pages */}
            <HomeSectionsPortal
              currentLang={currentLang}
              onSelectPage={handleNavigate}
            />
          </div>
        )}

        {/* 2. ACCOMMODATIONS PAGE */}
        {currentPage === 'accommodations' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Өрөө сууц & Батаарын өлгий бааз' : 'Accommodations & Sanctuary Basecamp'}
              subtitle={
                currentLang === 'mn'
                  ? 'Монгол гэрийн уламжлалт хэв маяг, орчин үеийн тансаг зэрэглэлийн тав тух'
                  : 'Nomadic heritage married with discerning desert hospitality and private amenities'
              }
              categoryTag="SANCTUARY BASECAMP"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <VisitorGuideSection
              currentLang={currentLang}
              currentCurrency={currentCurrency}
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {/* 3. EXPEDITIONS PAGE */}
        {currentPage === 'expeditions' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Хээрийн аялал & Олон өдрийн экспедиц' : 'Guided Gobi Expeditions'}
              subtitle={
                currentLang === 'mn'
                  ? 'Орон нутгийн туршлагатай хөтөчтэй Хэрмэн цав, Нэмэгт, Тост Тосонбумбын гүнд хийх аялал'
                  : 'Locally guided journeys through the Gobi’s remarkable landscapes and heritage sites'
              }
              categoryTag="EXPEDITIONS & JOURNEYS"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <ExpeditionSection
              currentLang={currentLang}
              currentCurrency={currentCurrency}
              onOpenBookingWithPackage={(pkg) => handleOpenBooking(pkg)}
            />
          </div>
        )}

        {/* 4. DINOSAURS PAGE */}
        {currentPage === 'dinosaurs' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Говийн үлэг гүрвэлүүд & Олдворын сан' : 'Prehistoric Dinosaurs & Fossil Archives'}
              subtitle={
                currentLang === 'mn'
                  ? '70 сая жилийн тэртээх Цэрдийн галавын аймшигт махчин Тарбозавраас авахуулаад өвсөн тэжээлт аварга үлэг гүрвэлүүд'
                  : 'Encounter apex carnivores and legendary Cretaceous fauna preserved in sandstone'
              }
              categoryTag="PALEONTOLOGY ARCHIVE"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <FossilExplorer
              currentLang={currentLang}
              onOpenAudioGuide={(specimenId) => setAudioGuideSpecimenId(specimenId)}
              savedSpecimenIds={savedSpecimens}
              onToggleSave={handleToggleSaveSpecimen}
              onOpenMessengerShare={(specimen) => {
                if (specimen) {
                  handleOpenMessengerShare({
                    title: `${specimen.name} (${specimen.scientificName}) • Батаарын өлгий`,
                    text: `🦖 ${specimen.name} (${specimen.scientificName}) - ${specimen.highlights[currentLang][0] || ''}\nМонголын говиос олдсон үлэг гүрвэлийн дэлгэрэнгүй тайлбар, 3D араг яс, аудиог эндээс үзнэ үү:\nhttps://ais-pre-qbkxdsr2iqrwrvve6c4fmj-178600995587.asia-northeast1.run.app`,
                  });
                } else {
                  handleOpenMessengerShare();
                }
              }}
            />
          </div>
        )}

        {/* 5. MAPS PAGE */}
        {currentPage === 'maps' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Говийн палеонтологийн интерактив газрын зураг' : 'Interactive Cretaceous Paleontology Map'}
              subtitle={
                currentLang === 'mn'
                  ? 'Өмнөговь аймгийн Хэрмэн цав, Баянзаг, Төгрөгийн ширээ зэрэг алдарт малтлагын цэгүүд ба байршил'
                  : 'Cartographic exploration of Mongolia’s sacred paleontological landscapes'
              }
              categoryTag="EXPEDITION CARTOGRAPHY"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <GobiMapSection
              currentLang={currentLang}
              onBookSiteTour={(siteName) => handleOpenBooking(undefined, siteName)}
            />
          </div>
        )}

        {/* 6. SNOW LEOPARD PAGE */}
        {currentPage === 'snow-leopard' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Цоохор ирвэсийн өлгий нутаг & Амьд байгаль' : 'Living Snow Leopard Sanctuary'}
              subtitle={
                currentLang === 'mn'
                  ? 'Тост тосон бумбын нурууны экосистем, автомат камерын бодит бичлэг ба хамгаалал'
                  : 'Wildlife telemetry and community conservation in the crags of the South Gobi'
              }
              categoryTag="ECOLOGICAL CONSERVATION"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <SnowLeopardSection
              currentLang={currentLang}
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {/* 7. LANDSCAPES PAGE */}
        {currentPage === 'landscapes' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Хэрмэн цав & Говийн байгалийн гайхамшиг' : 'Khermen Tsav & Sacred Gobi Landscapes'}
              subtitle={
                currentLang === 'mn'
                  ? 'Эртний Цэрдийн галавын салхинд сийлэгдсэн улаан хадан цав, Загийн төгөл ба онгон манхан'
                  : 'Monuments of wind, petrified mudstone, and crimson canyon cathedrals'
              }
              categoryTag="DESERT GEOLOGY"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <GobiLandscapeSection
              currentLang={currentLang}
              onExploreExpeditions={() => handleNavigate('expeditions')}
            />
          </div>
        )}

        {/* 8. BATAAR REPATRIATION STORY PAGE */}
        {currentPage === 'bataar-story' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Тарбозавр Батаарын эх орондоо буцаж ирсэн түүх' : 'The Bataar Repatriation Epic'}
              subtitle={
                currentLang === 'mn'
                  ? 'Хууль бусаар хил давсан үндэсний үнэт эрдэнэсийг Нью-Йоркоос эх оронд нь эгүүлэн авчирсан түүхэн ялалт'
                  : 'The landmark international triumph returning Mongolia’s stolen tyrant king'
              }
              categoryTag="NATIONAL HERITAGE"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <BataarRepatriationStory currentLang={currentLang} />
          </div>
        )}

        {/* 9. VIRTUAL LAB PAGE */}
        {currentPage === 'virtual-lab' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Хээрийн малтлагын виртуал лаборатори' : 'Virtual Field Excavation & Science Lab'}
              subtitle={
                currentLang === 'mn'
                  ? 'Цэрдийн галавын чулуужсан ясыг багажаар малтах, цэвэрлэх ба төрөл зүйлийг танин мэдэх интерактив симулятор'
                  : 'Precision simulated brushwork, chiseling, and skeletal identification'
              }
              categoryTag="INTERACTIVE SCIENCE"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <VirtualExcavationGame currentLang={currentLang} />
          </div>
        )}

        {/* 10. WEATHER PAGE */}
        {currentPage === 'weather' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Говийн бодит цаг агаар ба Аяллын төлөв' : 'Live Gobi Weather & Field Telemetry'}
              subtitle={
                currentLang === 'mn'
                  ? 'Гурвантэс сум, Хэрмэн цавын цаг уурын шууд хэмжилт, салхины хурд, агаарын чийгшил ба 7 хоногийн төлөв'
                  : 'Direct atmospheric observations and expedition forecasting'
              }
              categoryTag="EXPEDITION FORECAST"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <GobiWeatherSection
              currentLang={currentLang}
              onOpenBooking={(pkg, site) => handleOpenBooking(undefined, site)}
            />
          </div>
        )}

        {/* 11. RESEARCH COLLABORATIONS PAGE */}
        {currentPage === 'collaborations' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Олон улсын эрдэм шинжилгээний түншлэл' : 'International Academic Collaborations'}
              subtitle={
                currentLang === 'mn'
                  ? 'Монгол Улсын Шинжлэх Ухааны Академи, AMNH ба дэлхийн нэр хүндтэй хүрээлэнгүүдийн хамтын ажиллагаа'
                  : 'Institutional alliances advancing Mongolian paleontology globally'
              }
              categoryTag="ACADEMIC PARTNERSHIPS"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <ResearchCollabSection currentLang={currentLang} />
          </div>
        )}

        {/* 12. ABOUT SANCTUARY PAGE */}
        {currentPage === 'about' && (
          <div>
            <PageBanner
              currentLang={currentLang}
              currentPage={currentPage}
              title={currentLang === 'mn' ? 'Батаарын өлгий цогцолборын тухай' : 'About Bataar Sanctuary'}
              subtitle={
                currentLang === 'mn'
                  ? 'Говийн байгаль, палеонтологийн хосгүй өв соёлыг түгээн дэлгэрүүлэх зорилготой эко бааз'
                  : 'A luxury desert sanctuary and paleontology basecamp in the South Gobi'
              }
              categoryTag="SANCTUARY PROFILE"
              onNavigateHome={() => handleNavigate('home')}
              onNavigatePage={handleNavigate}
            />
            <ResearchCollabSection currentLang={currentLang} />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        currentLang={currentLang} 
        onNavigate={handleNavigate} 
        onOpenMessengerShare={() => handleOpenMessengerShare()}
        onOpenAnalytics={() => setAnalyticsModalOpen(true)}
      />

      {/* Unified Quick Services Hub (Messenger + Travel Safety Advisory + Online Survey) - Hideable / Collapsible */}
      <QuickUtilityHub
        currentLang={currentLang}
        activeVisitorsCount={activeVisitorsCount}
        onOpenMessenger={() => handleOpenMessengerShare()}
        onOpenSafetyAdvisory={() => setSafetyModalOpen(true)}
        onOpenSurvey={() => setAnalyticsModalOpen(true)}
      />

      {/* Floating Bottom-Right Corner: Booking & Settings Widget ("бүр доод буланд") */}
      <BottomBookingWidget
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={() => handleOpenBooking()}
        isOpen={extraBookingRowOpen}
        onToggle={() => setExtraBookingRowOpen((prev) => !prev)}
      />

      {/* Mobile Bottom Application Bar */}
      <MobileAppTabBar
        currentLang={currentLang}
        currentPage={currentPage}
        onNavigatePage={handleNavigate}
        onOpenAppModal={() => setAppModalOpen(true)}
        onOpenJournal={() => setJournalOpen(true)}
        onOpenMessengerShare={() => handleOpenMessengerShare()}
        savedCount={savedSpecimens.length}
      />

      {/* Real-time Visitor Analytics & Expedition Research Modal */}
      <VisitorAnalyticsModal
        isOpen={analyticsModalOpen}
        onClose={() => setAnalyticsModalOpen(false)}
        currentLang={currentLang}
        onNavigateToSection={(sectionId) => {
          setAnalyticsModalOpen(false);
          const map: Record<string, PageId> = {
            'visitor-guide': 'accommodations',
            'dinosaurs': 'dinosaurs',
            'gobi-sites': 'maps',
            'snow-leopard': 'snow-leopard',
            'gobi-landscapes': 'landscapes',
            'bataar-story': 'bataar-story',
            'expeditions': 'expeditions',
            'gobi-weather': 'weather',
            'fossil-lab': 'virtual-lab',
          };
          handleNavigate(map[sectionId] || 'home');
        }}
      />

      {/* Messenger Share Modal */}
      <MessengerShareModal
        isOpen={messengerModalOpen}
        onClose={() => setMessengerModalOpen(false)}
        currentLang={currentLang}
        customTitle={messengerShareData.title}
        customUrl={messengerShareData.url}
        customText={messengerShareData.text}
      />

      {/* App Install & PWA Modal */}
      <AppInstallModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Field Journal & Bookmarks Modal */}
      <FieldJournalModal
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
        currentLang={currentLang}
        savedSpecimenIds={savedSpecimens}
        onRemoveSaved={handleToggleSaveSpecimen}
        onOpenAudioGuide={(id) => setAudioGuideSpecimenId(id)}
        onNavigateToSpecimen={(id) => {
          setJournalOpen(false);
          handleNavigate('dinosaurs');
        }}
      />

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          currentLang={currentLang}
          currentCurrency={currentCurrency}
          initialPackage={bookingPackage}
          initialSite={bookingSite}
          onClose={() => {
            setBookingModalOpen(false);
            setBookingPackage(null);
            setBookingSite(null);
          }}
        />
      )}

      {/* Audio Guide Modal */}
      {audioGuideSpecimenId && (
        <AudioGuideModal
          currentLang={currentLang}
          specimenId={audioGuideSpecimenId}
          onClose={() => setAudioGuideSpecimenId(null)}
        />
      )}
    </div>
  );
}

export default App;

