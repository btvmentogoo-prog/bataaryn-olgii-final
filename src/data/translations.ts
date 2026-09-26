import { Language } from '../types';
import { koTranslation } from './translations/ko';
import { deTranslation } from './translations/de';
import { frTranslation } from './translations/fr';
import { ruTranslation } from './translations/ru';

export interface SiteTranslation {
  siteTitle: string;
  siteSubtitle: string;
  nav: {
    home: string;
    dinosaurs: string;
    gobiSites: string;
    expeditions: string;
    bataarStory: string;
    fossilLab: string;
    snowLeopard: string;
    landscapes: string;
    visitorGuide: string;
    weather: string;
    research: string;
    bookTour: string;
  };
  hero: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    exploreBtn: string;
    expeditionBtn: string;
    snowLeopardBtn: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    stat4Label: string;
    stat4Value: string;
  };
  dinosaurs: {
    sectionTitle: string;
    sectionSubtitle: string;
    allDiet: string;
    carnivore: string;
    herbivore: string;
    omnivore: string;
    searchPlaceholder: string;
    length: string;
    weight: string;
    height: string;
    discovered: string;
    site: string;
    formation: string;
    listenAudio: string;
    view3DBones: string;
    viewSpecimen: string;
    anatomicalFacts: string;
    keyHighlights: string;
  };
  gobiSites: {
    sectionTitle: string;
    sectionSubtitle: string;
    selectSite: string;
    geologicalAge: string;
    stratum: string;
    coordinates: string;
    keyDiscoveries: string;
    visitorTip: string;
    exploreSiteBtn: string;
    terrainView: string;
    satelliteView: string;
  };
  bataarStory: {
    sectionTitle: string;
    sectionSubtitle: string;
    repatriationBadge: string;
    storyQuote: string;
    authorQuote: string;
  };
  snowLeopard: {
    badge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    localName: string;
    latinName: string;
    statusLabel: string;
    statusValue: string;
    popLabel: string;
    popValue: string;
    habitatLabel: string;
    habitatValue: string;
    tostLabel: string;
    tostValue: string;
    storyTitle: string;
    storyDesc: string;
    cameraTrapTitle: string;
    cameraTrapSubtitle: string;
    cameraTrapNightMode: string;
    cameraTrapDayMode: string;
    videoTabLabel: string;
    photoTabLabel: string;
    thermalIR: string;
    thermalFLIR: string;
    thermalNVG: string;
    thermalWhiteHot: string;
    aiTrackingActive: string;
    aiTargetLocked: string;
    captureSnapshot: string;
    playVideo: string;
    pauseVideo: string;
    liveRecBadge: string;
    videoDesc: string;
    spotSuccess: string;
    resetTrap: string;
    listenVocalization: string;
    vocalizationActive: string;
    vocalizationDesc: string;
    adaptationTitle: string;
    adaptPawsTitle: string;
    adaptPawsDesc: string;
    adaptTailTitle: string;
    adaptTailDesc: string;
    adaptNoseTitle: string;
    adaptNoseDesc: string;
    adaptCamouflageTitle: string;
    adaptCamouflageDesc: string;
    rangerSupportTitle: string;
    rangerSupportDesc: string;
    rangerSupportBtn: string;
  };
  gobiLandscape: {
    badge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    clockTitle: string;
    clockSubtitle: string;
    gobiTimeNow: string;
    localSolarTime: string;
    sunriseLabel: string;
    sunsetLabel: string;
    timePhases: {
      dawn: string;
      noon: string;
      goldenHour: string;
      night: string;
    };
    timePhaseDesc: {
      dawn: string;
      noon: string;
      goldenHour: string;
      night: string;
    };
    tabKhermen: string;
    tabSaxaul: string;
    tabDunes: string;
    tabCamels: string;
    khermenTitle: string;
    khermenSub: string;
    khermenDesc: string;
    khermenStats: string[];
    saxaulTitle: string;
    saxaulSub: string;
    saxaulDesc: string;
    saxaulStats: string[];
    dunesTitle: string;
    dunesSub: string;
    dunesDesc: string;
    dunesStats: string[];
    camelsTitle: string;
    camelsSub: string;
    camelsDesc: string;
    camelsStats: string[];
    soundPlayDune: string;
    soundPlayCamel: string;
    soundStop: string;
    soundPlaying: string;
    exploreGallery: string;
    viewHighRes: string;
  };
  expeditions: {
    sectionTitle: string;
    sectionSubtitle: string;
    days: string;
    included: string;
    pricePerPerson: string;
    itinerary: string;
    bookNow: string;
    dayByDaySchedule: string;
    persons: string;
  };
  fossilLab: {
    sectionTitle: string;
    sectionSubtitle: string;
    brushTool: string;
    chiselTool: string;
    progress: string;
    congratsTitle: string;
    discoveryCert: string;
  };
  heritage: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  visitorGuide: {
    sectionTitle: string;
    sectionSubtitle: string;
    badge: string;
    campName: string;
    campTagline: string;
    campDesc: string;
    locationLabel: string;
    locationValue: string;
    capacityLabel: string;
    capacityValue: string;
    seasonLabel: string;
    seasonValue: string;
    energyLabel: string;
    energyValue: string;
    contactLabel: string;
    contactValue: string;
    gersTitle: string;
    gersSubtitle: string;
    deluxeGerTitle: string;
    deluxeGerDesc: string;
    deluxeGerPrice: string;
    standardGerTitle: string;
    standardGerDesc: string;
    standardGerPrice: string;
    familyGerTitle: string;
    familyGerDesc: string;
    familyGerPrice: string;
    amenitiesTitle: string;
    amenityDining: string;
    amenityDiningDesc: string;
    amenityStargazing: string;
    amenityStargazingDesc: string;
    amenitySafari: string;
    amenitySafariDesc: string;
    amenitySolar: string;
    amenitySolarDesc: string;
    amenityWifi: string;
    amenityWifiDesc: string;
    amenityFieldBase: string;
    amenityFieldBaseDesc: string;
    bookStayBtn: string;
    inquireBtn: string;
    coordinatesLabel: string;
    directionsLabel: string;
    directionsValue: string;
    photoGalleryTitle: string;
  };
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    packageLabel: string;
    fullNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    dateLabel: string;
    guestsLabel: string;
    notesLabel: string;
    submitBtn: string;
    successMsg: string;
  };
  appFeatures: {
    installApp: string;
    installDesc: string;
    installActionBtn: string;
    offlineModeTitle: string;
    offlineModeDesc: string;
    offlineReadyBadge: string;
    myJournalTitle: string;
    myJournalDesc: string;
    savedItems: string;
    noSavedItems: string;
    quickNavHome: string;
    quickNavDino: string;
    quickNavLeopard: string;
    quickNavLandscape: string;
    quickNavDig: string;
    quickNavApp: string;
    iosInstructions: string;
    androidInstructions: string;
    desktopInstructions: string;
    appVersion: string;
    clearStorage: string;
    noRegistrationBadge: string;
    instantOpenBtn: string;
  };
  footer: {
    missionTitle: string;
    missionDesc: string;
    quickLinks: string;
    heritageProtection: string;
    protectionText: string;
    rightsReserved: string;
  };
}

export const translations: Record<Language, SiteTranslation> = {
  mn: {
    siteTitle: 'БАТААРЫН ӨЛГИЙ',
    siteSubtitle: 'Монголын Үлэг Гүрвэлийн Өв & Говийн Байгаль Хамгаалал',
    nav: {
      home: 'Нүүр',
      dinosaurs: 'Үлэг гүрвэлүүд',
      gobiSites: 'Говийн олдворууд',
      snowLeopard: 'Цоохор Ирвэс',
      landscapes: 'Говийн байгаль & Тэмээ',
      expeditions: 'Хээрийн аялал',
      bataarStory: 'Батаарын түүх',
      fossilLab: 'Эрдэм шинжилгээ',
      visitorGuide: 'Жуулчны бааз',
      weather: 'Цаг агаар',
      research: 'Хамтын ажиллагаа',
      bookTour: 'Аялал захиалах',
    },
    hero: {
      badge: '🦖 70 сая жилийн үлэг гүрвэл & Өнөөгийн Говийн Цоохор Ирвэс',
      heading: 'Тарбозавр Батаарын өлгий,',
      headingHighlight: 'Цоохор Ирвэсийн нууцлаг Говь',
      subheading: 'Монголын говь бол 70 сая жилийн өмнөх эртний аварга үлэг гүрвэлүүдийн өлгий нутаг төдийгүй өнөөдөр Дэлхийн нэн ховор Цоохор Ирвэсийн (Panthera uncia) өлгий тусгай хамгаалалттай газар юм.',
      exploreBtn: 'Олдворуудтай танилцах',
      expeditionBtn: 'Олон улсын экспедиц',
      snowLeopardBtn: 'Цоохор ирвэс үзэх',
      stat1Label: 'Говиос олдсон үлэг гүрвэлийн төрөл',
      stat1Value: '80+ зүйл',
      stat2Label: 'Монгол дахь Цоохор Ирвэсийн тоо',
      stat2Value: '953 - 1,000 толгой',
      stat3Label: 'Дэлхийн үлэг гүрвэлийн олдворын хувь',
      stat3Value: '1/5 буюу 20%',
      stat4Label: 'Ирвэс хамгааллын дэлхийн зэрэглэл',
      stat4Value: 'Дэлхийд 2-р байр',
    },
    dinosaurs: {
      sectionTitle: 'Монголын алдартай үлэг гүрвэлүүд',
      sectionSubtitle: 'Дэлхийн шинжлэх ухаанд Монголын нэрээр мөнхөрсөн хосгүй олдворууд',
      allDiet: 'Бүгд',
      carnivore: 'Махан идэшт',
      herbivore: 'Өвсөн идэшт',
      omnivore: 'Холимог идэшт',
      searchPlaceholder: 'Үлэг гүрвэлийн нэр, олдсон газраар хайх...',
      length: 'Урт',
      weight: 'Жин',
      height: 'Өндөр',
      discovered: 'Нээсэн он',
      site: 'Олдсон нутаг',
      formation: 'Геологийн давхарга',
      listenAudio: 'Аудио тайлбар сонсох',
      view3DBones: 'Араг ясны бүтэц',
      viewSpecimen: 'Дэлгэрэнгүй үзэх',
      anatomicalFacts: 'Биеийн онцлог ба бүтэц:',
      keyHighlights: 'Шинжлэх ухааны онцлох баримтууд:',
    },
    gobiSites: {
      sectionTitle: 'Говийн эртний олдворт нутгууд',
      sectionSubtitle: 'Дэлхийн палеонтологийн түүхэнд бичигдсэн домогт 5 том байршил',
      selectSite: 'Олдворт цэгийг сонгоно уу',
      geologicalAge: 'Геологийн эрин үе',
      stratum: 'Чулуулгийн давхарга',
      coordinates: 'Газарзүйн координат',
      keyDiscoveries: 'Гол олдворууд',
      visitorTip: 'Зорчигчийн зөвлөмж',
      exploreSiteBtn: 'Экспедиц төлөвлөх',
      terrainView: 'Гадаргуу',
      satelliteView: 'Сансрын зураг',
    },
    snowLeopard: {
      badge: '🐾 Говийн болон цаст уулсын эзэн • Амьд өв',
      sectionTitle: 'Говийн Цоохор Ирвэс (Хадан хавцлын сүнс)',
      sectionSubtitle: 'Эртний Тарбозавраас эхлээд өнөөгийн говь, хадан хавцлын дээд махчин амьтан болох Цоохор ирвэсийг нээцгээе',
      localName: 'Цоохор Ирвэс (Ирвэс)',
      latinName: 'Panthera uncia (Schreber, 1775)',
      statusLabel: 'Хамгааллын зэрэг',
      statusValue: 'Нэн ховор / Монгол Улсын Улаан ном',
      popLabel: 'Монгол дахь тоо толгой',
      popValue: '953 - 1,000 (Дэлхийд 2-рт ордог)',
      habitatLabel: 'Гол нутагшил',
      habitatValue: 'Өмнөговь Тост, Гурвансайхан, Алтай, Хангай',
      tostLabel: 'Тост, Тосонбумбын нуруу',
      tostValue: 'Дэлхийн ирвэс судлалын хамгийн урт хугацааны суурин төв',
      storyTitle: '70 сая жилийн өмнөх эзнээс өнөөгийн амьд сахиус хүртэл',
      storyDesc: 'Өмнөговь аймаг бол үлэг гүрвэлийн чулуужмалын өлгий төдийгүй, дэлхийн хамгийн шилдэг цоохор ирвэс хамгаалагдсан нутаг юм. Тост, Тосонбумбын байгалийн нөөц газар нь нутгийн малчдын санаачилгаар анх үүссэн дэлхийн цорын ганц Ирвэс хамгааллын нөөц газар билээ.',
      cameraTrapTitle: 'Хээрийн Камерын Бичлэг & Симуляци',
      cameraTrapSubtitle: 'Тост Тосонбумбын нурууны шөнийн хэт улаан туяаны камер болон дулааны хэмжилтийн бодит бичлэг',
      cameraTrapNightMode: 'Инфра-улаан шөнийн горим',
      cameraTrapDayMode: 'Өдрийн гэрэлт горим',
      videoTabLabel: '🎥 Хээрийн бодит бичлэг (Video)',
      photoTabLabel: '📷 Камерын зургууд (Photos)',
      thermalIR: 'Хэт улаан (IR Mono)',
      thermalFLIR: 'Дулааны хэмжилт (FLIR)',
      thermalNVG: 'Ногоон дуран (NVG Green)',
      thermalWhiteHot: 'Цагаан халуун (White-Hot)',
      aiTrackingActive: 'AI Радар & Амьтан мөшгигч',
      aiTargetLocked: '🎯 Бай тодорхойлогдов: Ирвэс & Янгирын сүрэг (98.8%)',
      captureSnapshot: 'Зураг татах',
      playVideo: 'Тоглуулах',
      pauseVideo: 'Түр зогсоох',
      liveRecBadge: '● REC • Бодит хээрийн бичлэг',
      videoDesc: 'Өмнөговь аймаг, Гурвантэс сум, Тост Тосонбумбын нурууны өндөр хадан хяр дээр байрлуулсан шөнийн хэт улаан туяаны хээрийн камерын бодит бичлэг. Янгирын сүрэг болон араас нь мөрдөж буй цоохор ирвэсийн дулааны тусгал ба хөдөлгөөнийг үзүүлж байна.',
      spotSuccess: '🎯 Гайхалтай! Та говийн цоохор ирвэсийг олж илрүүллээ!',
      resetTrap: 'Өөр цэг шалгах',
      listenVocalization: 'Ирвэсийн дуу авиа сонсох',
      vocalizationActive: 'Ирвэс архирдаггүй — "Прустен" буюу найтаах дуу, янцгаах авиа гаргадаг',
      vocalizationDesc: 'Цоохор ирвэсийн төвөнхийн бүтэц нь арслан шиг архирах боломжгүй бөгөөд зөөлөн хүржигнэх, шүгэлдэх авиагаар харилцдаг.',
      adaptationTitle: 'Ирвэсийн байгалийн гайхамшигт зохилдлогоо',
      adaptPawsTitle: 'Өргөн савар & Зөөлөн ул',
      adaptPawsDesc: 'Хадан цохио, элс, цасанд гулгахгүй байх өргөн үстэй савар нь чимээгүй мяраах боломжийг олгодог.',
      adaptTailTitle: '1 метр урт сүүл',
      adaptTailDesc: '80 градусын эгц хаданд тэнцвэрээ барих бөгөөд өвлийн -40°C хүйтэнд хамраа хучин дулаацуулдаг.',
      adaptNoseTitle: 'Өргөн хамрын хөндий',
      adaptNoseDesc: 'Өндөр уул, говийн хүйтэн шингэн агаарыг уушгинд хүрэхээс өмнө бүлээцүүлж чийгшүүлдэг.',
      adaptCamouflageTitle: 'Төгс зүсэм далдалгаа',
      adaptCamouflageDesc: 'Говийн бор саарал боржин чулуутай төгс ууссан цоохор толбо бүхий үс ноос.',
      rangerSupportTitle: 'Нутгийн малчид ба Ирвэс хамгаалагчид',
      rangerSupportDesc: 'Өмнөговийн малчид малаа ирвэсээс даатгуулах, хээрийн камер байршуулах замаар дэлхийн үнэт өвийг хадгалж байна.',
      rangerSupportBtn: 'Ирвэс хамгаалалд нэгдэх',
    },
    gobiLandscape: {
      badge: '🏜️ Заг мод • Алтан манхан • Хэрмэн цав • Хоёр бөхт тэмээн сүрэг',
      sectionTitle: 'Говийн Байгалийн Үзэсгэлэн & Экосистем',
      sectionSubtitle: '70 сая жилийн эртний улаан хавцал, Дуут манхан элс, загийн төгөл ой болон хоёр бөхт тэмээн сүргийн сүрлэг ертөнц',
      clockTitle: 'Өмнөговийн Цаг & Нарны Мөчлөг',
      clockSubtitle: 'Говийн өнөөгийн бодит цаг, нарны тусгал ба өдрийн мөчлөг (UTC+8)',
      gobiTimeNow: 'Өмнөговийн Одоогийн Цаг',
      localSolarTime: 'Говийн нарны байрлал & Гэрэлтэлтийн горим',
      sunriseLabel: 'Нар мандах: 05:48',
      sunsetLabel: 'Нар жаргах: 20:14',
      timePhases: {
        dawn: 'Үүр цайх',
        noon: 'Хурц үд',
        goldenHour: 'Алтан жаргалт',
        night: 'Одот шөнө',
      },
      timePhaseDesc: {
        dawn: 'Цэнхэр туяа татаж, заг модны үзүүрт шүүдэр тогтон сэрүүн салхи үлээх агшин',
        noon: 'Элсэн манханд 40°C халуун илч туяарч, говийн зэрэглээ наадах цаг',
        goldenHour: 'Хэрмэн цавын улаан халилууд гал улаанаар шатаж, тэмээн сүрэг бэлчээрээс буцах агшин',
        night: 'Тэрбум оддын чуулган хар хилэн тэнгэрт гялалзаж, говийн хүйтэн сэвшээ салхи үлээх цаг',
      },
      tabKhermen: 'Хэрмэн цавын үзэмж',
      tabSaxaul: 'Заг модны ой (Saxaul)',
      tabDunes: 'Хонгорын дуут элс',
      tabCamels: 'Хоёр бөхт тэмээн сүрэг',
      khermenTitle: 'Хэрмэн Цав – Говийн Цайз Каньон',
      khermenSub: '70 сая жилийн улаан шаварлаг байгалийн уран баримал, задгай музей',
      khermenDesc: 'Хэрмэн цав бол 250 хавтгай дөрвөлжин км талбайг хамарсан, эртний сүйрсэн хотын цайз хэрэм мэт сүндэрлэх улаан шавар хадан хавцал юм. 70 сая жилийн өмнөх үлэг гүрвэлүүд, эртний яст мэлхий, шувуудын чулуужмал энд хамгийн олноороо хадгалагдан үлдсэн.',
      khermenStats: [
        'Талбай: 250+ км² аварга каньон',
        'Хавцлын гүн: 100 - 200 метр эгц хэрэм',
        'Насжилт: 70 сая жил (Хожуу Цэрдийн Баруун гоёот давхарга)',
        'Олдворууд: Анкилозавр, яст мэлхий, үлэг гүрвэлийн өндөгнүүд',
      ],
      saxaulTitle: 'Заг Мод – Говийн Амьд Төмөр Багана',
      saxaulSub: 'Усгүй элсэнд олон зуун жил ургах гайхамшигт сөөг ой (Haloxylon ammodendron)',
      saxaulDesc: 'Заг мод бол говийн экосистемийн амин сүнс, "Төмөр мод" юм. Үндэс нь газрын доор 10-15 метр гүн рүү тэмүүлж, сул элсийг тогтоон цөлжилтөөс хамгаалдаг. Загийн ойд говийн мал, ан амьтад салхи шорооноос хоргодож, ирвэс, мазаалай, хавтгай тэжээгддэг.',
      saxaulStats: [
        'Үндэсний гүн: 10-15 метр гүний усанд хүрдэг',
        'Модны онцлог: Маш хатуу, усанд живдэг хүнд нягттай',
        'Экологийн ач холбогдол: 1 заг мод 10-15 м² элсийг бэхжүүлж тогтоодог',
        'Говийн амьтдын хамгаалалт: Ирвэс, хулан, зээр, тэмээний гол хоргодох орчин',
      ],
      dunesTitle: 'Хонгорын Элс – Дуут Алтан Манхан',
      dunesSub: '180 км үргэлжлэх, салхины аясаар хөгжим мэт дуугардаг аварга манхан',
      dunesDesc: 'Хонгорын элс бол 180 км урт, 3-15 км өргөн үргэлжлэх, өндөр нь 180-300 метр хүрэх Монголын хамгийн том элсэн манхнуудын нэг юм. Салхины хүчээр элсний ширхэгүүд бие биетэйгээ үрэлцэхэд онгоцны хөдөлгүүр, хөгжмийн одон лимбэ шиг гүн хүнгэнэсэн дуу гардаг.',
      dunesStats: [
        'Манхны урт: 180 гаруй км үргэлжилнэ',
        'Оргил өндөр: 180 - 300 метр хүрдэг',
        'Байгалийн үзэгдэл: Салхи босоход "дуугардаг" ховор акустик элс',
        'Хажуугийн баянбүрд: Сэрүүн булаг, ногоон зүлэгтэй хослон оршдог',
      ],
      camelsTitle: 'Хоёр Бөхт Тэмээн Сүрэг – Говийн Хөлөг',
      camelsSub: 'Монгол нүүдэлчдийн бахархал, 1000 тэмээний өлгий нутаг (Camelus bactrianus)',
      camelsDesc: 'Монголын хоёр бөхт тэмээ бол говийн хатуу ширүүн уур амьсгал, 40°C халуунаас -40°C хүйтнийг тэсвэрлэдэг гайхамшигт амьтан юм. 30-40 хоног усгүйгээр амьдарч, өдөрт 40-50 км ачаа тээх хүчтэй бөгөөд өтгөн шимт ингэний хоормог, ноосоороо дэлхийд гайхагддаг.',
      camelsStats: [
        'Тэвчээр: 30-40 хоног ус уулгүй хол замыг туулдаг',
        'Өвөрмөц бүтэц: 2 бөхөндөө 100-120 кг хүртэл өөх тос хуримтлуулдаг',
        'Шим тэжээл: Ингэний сүү/хоормог нь эмчилгээний өндөр ач холбогдолтой',
        'Өв соёл: ЮНЕСКО-д бүртгэгдсэн Тэмээн жингийн зам & 1000 тэмээний баяр',
      ],
      soundPlayDune: 'Дуут элсний салхины дуу сонсох',
      soundPlayCamel: 'Тэмээн сүргийн аялгуу тоглуулах',
      soundStop: 'Дууг зогсоох',
      soundPlaying: 'Тоглож байна...',
      exploreGallery: 'Зургийн цуглуулга үзэх',
      viewHighRes: 'Өндөр нарийвчлалтай бүтэн харах',
    },
    bataarStory: {
      sectionTitle: 'Тарбозавр Батаарын түүхэн эргэн ирэлт',
      sectionSubtitle: 'Хууль бусаар хил давсан 70 сая жилийн настай үндэсний баялгийг эх нутагт нь эгүүлэн авчирсан түүх',
      repatriationBadge: '🏛️ 2013 он - Түүхэн ялалт ба эх нутагтаа буцсан нь',
      storyQuote: '“Тарбозавр Батаар бол зөвхөн чулуужсан яс биш, Монголын ард түмний бахархал, дэлхийн үнэлж баршгүй өв юм.”',
      authorQuote: 'Монгол улсын палеонтологийн хамгаалах нийгэмлэг',
    },
    expeditions: {
      sectionTitle: 'Говийн хээрийн аялал',
      sectionSubtitle: 'Говийн аялал алдарт Хэрмэн цав, Хүрэн ханын хэц, Тост Тосон бумбын нуруунд аялан байгалийн сайхныг үзэнгээ дэлхийд ховордсон ирвэсийн зургийг авч фото архиваа баяжуулахаас гадна эртний үлэг гүрвэлийн амьдарч байсан газар нутагтай танилцах гайхамшигт аяллыг бид санал болгож байна.',
      days: 'хоног',
      included: 'Аяллын багцад багтсан зүйлс:',
      pricePerPerson: 'Нэг хүний төлбөр (Бүх зардал багтсан)',
      itinerary: 'Хөтөлбөр харах',
      bookNow: 'Аялал захиалах',
      dayByDaySchedule: 'Өдөр бүрийн дэлгэрэнгүй хуваарь',
      persons: 'Аялагчийн тоо',
    },
    fossilLab: {
      sectionTitle: 'Виртуал малтлагын лаборатори',
      sectionSubtitle: 'Малтлагын тусгай багажаар чулуулгийг цэвэрлэж, үлэг гүрвэлийн чулуужмал илрүүлээрэй!',
      brushTool: 'Зөөлөн багс',
      chiselTool: 'Геологийн алх',
      progress: 'Малтлагын явц',
      congratsTitle: 'Баяр хүргэе! Та чулуужмал илрүүллээ!',
      discoveryCert: 'Говийн хээрийн шинжээчийн батламж',
    },
    heritage: {
      sectionTitle: 'Олон улсын эрдэм шинжилгээний төв',
      sectionSubtitle: 'Дэлхийн тэргүүлэх их сургуулиуд, ЮНЕСКО болон Шинжлэх Ухааны Академийн хамтын ажиллагаа',
    },
    visitorGuide: {
      sectionTitle: 'Батаарын Өлгий Жуулчны Бааз',
      sectionSubtitle: 'Өмнөговь аймгийн Гурвантэс сум Тост тосонбумбын нурууны тусгай хамгаалалттай газарт байрлах тав тухтай эко жуулчны бааз & хээрийн аяллын төв',
      badge: '⛺ Өмнөговь • Батаарын Өлгий Жуулчны Бааз & Эко Ресорт',
      campName: 'Батаарын Өлгий Жуулчны Бааз',
      campTagline: 'Монголын уламжлалт нүүдэлчин соёл, говийн тав тухтай амралт & палеонтологийн аяллын түшиц газар',
      campDesc: 'Өмнөговь аймгийн Гурвантэс сум, Тост тосонбумбын нурууны тусгай хамгаалалттай газарт байрлах тус бааз нь байгалийн эко эрчим хүчээр хангагдсан тав тухтай өрөөнүүд, одон орны дуран, органик ресторан бүхий говийн шилдэг амралтын газар бөгөөд Нэмэгтийн хотгор, Тосон бумбын нуруу, Хэрмэн цав, Ирвэс харах, Эртний үлэг гүрвэлийн амьдарч байсан нутгаар сонирхолтой аялал хийх гол түшиц төв юм.',
      locationLabel: 'Баазын байршил',
      locationValue: 'Өмнөговь аймаг, Гурвантэс сум, Тост тосонбумбын нурууны ТХГ',
      capacityLabel: 'Хүлээн авах хүчин чадал',
      capacityValue: 'Нэг ээлжиндээ 45-50 амрагч',
      seasonLabel: 'Ажиллах улирал',
      seasonValue: 'Аяллын үндсэн улирал: 10-р сарын 20-ноос 4-р сарын 20',
      energyLabel: 'Эрчим хүчний систем',
      energyValue: '100% Нарны эко цахилгаан станц + Гүний цэвэр ус',
      contactLabel: 'Холбоо барих & Захиалга',
      contactValue: '+976 7201 0099 / +976 8822 3584 / +976 9953 0099 / +976 9972 3336',
      gersTitle: 'Буудлуудын сонголт',
      gersSubtitle: 'Модон доторлогоотой тохилог өрөөнүүд, тав тухтай ор дэр, говийн үзэсгэлэнт орчин',
      deluxeGerTitle: 'Люкс Өрөө (Deluxe Room)',
      deluxeGerDesc: 'Модон доторлогоотой тохилог өрөө, давхар ор, амралтын ширээ сандал, байгалийн гэрэл тусах цонх, агааржуулагч, цэвэр ариун цэврийн өрөө, үнэгүй Starlink Wi-Fi.',
      deluxeGerPrice: '280,000₮ / хоног (өглөөний цай багтсан)',
      standardGerTitle: 'Тав тухтай Стандарт Өрөө',
      standardGerDesc: '2 тухлаг ор, цэлгэр байгалийн цонх, дулаахан модон интерьер, агааржуулалт, өглөөний цай, цэвэр ариун цэврийн өрөө.',
      standardGerPrice: '160,000₮ / хоног',
      familyGerTitle: 'Гэр бүлийн Свифт Өрөө (Family Suite)',
      familyGerDesc: '2 тусдаа унтлагын өрөө (том давхар ортой мастер өрөө + 2 тусдаа ортой өрөө), хувийн халуун хүйтэн шүршүүр бүхий ариун цэврийн өрөө, цэлгэр цонх, 4-6 хүний багтаамжтай модон эко байшин.',
      familyGerPrice: '380,000₮ / хоног (видео тоймтой)',
      amenitiesTitle: 'Баазын давуу тал & Үйлчилгээ',
      amenityDining: 'Говь Ресторан & Лаунж',
      amenityDiningDesc: 'Нутгийн органик мах, цагаан идээ, европ болон веган зоог, шинэхэн чанасан кофе, сүүтэй цай.',
      amenityStargazing: 'Одон орны дуран & Од харах тавцан',
      amenityStargazingDesc: 'Гэрлийн бохирдолгүй говийн тунгалаг шөнийн тэнгэрт Тэнгэрийн заадас, гараг эрхсийг дурандах боломж.',
      amenitySafari: 'Жийп & Тэмээн аялал',
      amenitySafariDesc: 'Хоёр бөхт тэмээгээр манханд нар жаргахыг үзэх, тусгай 4x4 жийпээр олдворт газруудаар аялах хөтөлбөр.',
      amenitySolar: '100% Эко нарны станц',
      amenitySolarDesc: 'Байгаль орчинд ээлтэй, чимээгүй 24 цагийн нарны эрчим хүч ба гүний цэнгэг усны шүүлтүүр.',
      amenityWifi: 'Starlink Өндөр хурдны Wi-Fi',
      amenityWifiDesc: 'Цөлийн гүнд байсан ч хиймэл дагуулын найдвартай өндөр хурдны интернэт холболт.',
      amenityFieldBase: 'Палеонтологийн түшиц бааз',
      amenityFieldBaseDesc: 'Баянзаг, Хэрмэн цав, Бүгийн цавын хээрийн судалгаа, малтлагын чиглэлд мэргэжлийн хөтөч гаргана.',
      bookStayBtn: 'Баазад өрөө / гэр захиалах',
      inquireBtn: 'Асууж тодруулах',
      coordinatesLabel: 'GPS Солбицол',
      directionsLabel: 'Хүрэх замнал',
      directionsValue: 'Батаарын өлгий жуулчны баазад хүрэлцэн ирэх замнал Даланзадгад хотоос 390 км. Баазын 4x4 туулах чадвартай машинаар тосож авах, аяллын баг хүргэх найдвартай үйлчилгээтэй.',
      photoGalleryTitle: 'Баазын дүр төрх & Орчин',
    },
    booking: {
      modalTitle: 'Говийн экспедицид бүртгүүлэх',
      modalSubtitle: 'Монголын говийн палеонтологи болон байгалийн аялалд урьж байна',
      packageLabel: 'Экспедицийн багц',
      fullNameLabel: 'Таны нэр',
      emailLabel: 'Имэйл хаяг',
      phoneLabel: 'Утасны дугаар',
      dateLabel: 'Аялах сар',
      guestsLabel: 'Аялагчдын тоо',
      notesLabel: 'Тусгай хүсэлт / Санамж',
      submitBtn: 'Захиалга илгээх',
      successMsg: 'Таны аяллын захиалга амжилттай бүртгэгдлээ!',
    },
    appFeatures: {
      installApp: 'Батаарын өлгий Аппликейшн',
      installDesc: 'Утсан дээрээ Native Апп хэлбэрээр суулган, говьд сүлжээгүй үед ч олдворын зураг, аудио хөтөч, хээрийн газрын зургийг ашиглаарай.',
      installActionBtn: '📱 Апп татаж суулгах (PWA)',
      offlineModeTitle: 'Офлайн хээрийн горим',
      offlineModeDesc: 'Говийн алслагдсан бүсэд интернетгүй үед өгөгдөл найдвартай хадгалагдана.',
      offlineReadyBadge: '⚡ Офлайн ажиллах боломжтой',
      myJournalTitle: 'Миний хээрийн тэмдэглэл',
      myJournalDesc: 'Хадгалсан олдворууд, малтлагын үр дүн болон тэмдэглэлүүд',
      savedItems: 'Хадгалсан олдворууд',
      noSavedItems: 'Одоогоор хадгалсан олдвор алга байна. Үлэг гүрвэлийн хэсгээс од даран хадгалаарай!',
      quickNavHome: 'Нүүр',
      quickNavDino: 'Олдвор',
      quickNavLeopard: 'Ирвэс',
      quickNavLandscape: 'Говь',
      quickNavDig: 'Малтлага',
      quickNavApp: 'Апп',
      iosInstructions: 'Safari дээр "Хуваалцах (Share)" товч дараад "Нүүр дэлгэцэнд нэмэх (Add to Home Screen)" сонгоно уу.',
      androidInstructions: 'Chrome эсвэл хөтөч дээр "Суулгах (Install App)" товчийг дарж утсандаа бүрэн суулгаарай.',
      desktopInstructions: 'Хөтчийн хаягийн мөр дээрх "Суулгах" товчийг дарж компьютертоо апп болгон ашиглана уу.',
      appVersion: 'Хувилбар 2.4.0 (PWA & Offline Enabled)',
      clearStorage: 'Кэш цэвэрлэх',
      noRegistrationBadge: '🛡️ Бүртгэл шаардлагагүй (100% Үнэгүй & Шууд нээгдэнэ)',
      instantOpenBtn: '✨ Шууд нээх (Бүртгэлгүй)',
    },
    footer: {
      missionTitle: 'Батаарын өлгий төслийн эрхэм зорилго',
      missionDesc: 'Монголын олон сая жилийн байгаль, палеонтологийн үнэт өвийг хадгалан хамгаалах, цоохор ирвэсийн өлгий говь нутгийг дэлхий дахинд сурталчлах.',
      quickLinks: 'Холбоосууд',
      heritageProtection: 'Өв хамгаалал',
      protectionText: 'Үлэг гүрвэлийн олдвор болон Цоохор ирвэс нь Монгол Улсын хуулиар төрийн дээд хамгаалалтад байдаг үнэт эрдэнэ юм.',
      rightsReserved: '© 2026 Батаарын өлгий | Бүх эрх хуулиар хамгаалагдсан.',
    },
  },

  en: {
    siteTitle: 'CRADLE OF BATAAR',
    siteSubtitle: "Mongolia's Dinosaur Heritage & Gobi Snow Leopard Sanctuary",
    nav: {
      home: 'Home',
      dinosaurs: 'Dinosaurs',
      gobiSites: 'Gobi Sites',
      snowLeopard: 'Snow Leopard',
      landscapes: 'Gobi Landscapes & Camels',
      expeditions: 'Expeditions',
      bataarStory: 'Bataar Legacy',
      fossilLab: 'Research Lab',
      visitorGuide: 'Tourist Camp',
      weather: 'Weather & Climate',
      research: 'Partnerships',
      bookTour: 'Book Expedition',
    },
    hero: {
      badge: '🦖 70-Million-Year Dinosaurs & The Modern Living Snow Leopard',
      heading: 'Cradle of Tarbosaurus bataar,',
      headingHighlight: 'Sanctuary of the Gobi Snow Leopard',
      subheading: "Mongolia's South Gobi is humanity's greatest treasury of Cretaceous fossils and the world's most vital refuge for the elusive Snow Leopard (Panthera uncia) — Ghost of the Mountains.",
      exploreBtn: 'Discover Specimens',
      expeditionBtn: 'Join Field Expedition',
      snowLeopardBtn: 'Explore Snow Leopard',
      stat1Label: 'Dinosaur Species Discovered',
      stat1Value: '80+ Species',
      stat2Label: 'Snow Leopard Population in Mongolia',
      stat2Value: '953 - 1,000 Cats',
      stat3Label: 'Share of Global Cretaceous Fossils',
      stat3Value: 'Over 20%',
      stat4Label: 'Global Snow Leopard Rank',
      stat4Value: '#2 in the World',
    },
    dinosaurs: {
      sectionTitle: 'Iconic Dinosaurs of Mongolia',
      sectionSubtitle: 'Prehistoric legends whose names and skeletons captivated global science',
      allDiet: 'All Diets',
      carnivore: 'Carnivore',
      herbivore: 'Herbivore',
      omnivore: 'Omnivore',
      searchPlaceholder: 'Search dinosaur by name or discovery site...',
      length: 'Length',
      weight: 'Weight',
      height: 'Height',
      discovered: 'Discovered',
      site: 'Discovery Site',
      formation: 'Rock Formation',
      listenAudio: 'Listen to Audio Guide',
      view3DBones: 'Skeleton Structure',
      viewSpecimen: 'View Specimen Details',
      anatomicalFacts: 'Anatomical Architecture:',
      keyHighlights: 'Scientific Discoveries:',
    },
    gobiSites: {
      sectionTitle: 'Legendary Gobi Excavation Sites',
      sectionSubtitle: 'Five world-famous geological fossil treasures in Southern Mongolia',
      selectSite: 'Select excavation site',
      geologicalAge: 'Geological Epoch',
      stratum: 'Stratum Formation',
      coordinates: 'Coordinates',
      keyDiscoveries: 'Key Fossils Discovered',
      visitorTip: 'Traveler Tip',
      exploreSiteBtn: 'Plan Expedition',
      terrainView: 'Terrain',
      satelliteView: 'Satellite',
    },
    snowLeopard: {
      badge: '🐾 Apex Mountain Guardian • Living Heritage',
      sectionTitle: 'The Gobi Snow Leopard (Ghost of the Crags)',
      sectionSubtitle: 'From the prehistoric realm of Tarbosaurus to the modern mountain apex predator of the Gobi',
      localName: 'Tsookhor Irves (Snow Leopard)',
      latinName: 'Panthera uncia (Schreber, 1775)',
      statusLabel: 'Conservation Status',
      statusValue: 'Vulnerable / Strictly Protected (Mongolian Red Book)',
      popLabel: 'Mongolian Population',
      popValue: '953 - 1,000 (~20% of Global Total)',
      habitatLabel: 'Primary Ranges',
      habitatValue: 'South Gobi (Tost, Gurvansaikhan), Altai, Sayan',
      tostLabel: 'Tost Mountains Nature Reserve',
      tostValue: "World's longest continuous Snow Leopard field research hub",
      storyTitle: 'From 70-Million-Year Titan to Living Mountain Guardian',
      storyDesc: "Mongolia's South Gobi is unique in the world: the exact canyon plateaus that buried Tarbosaurus bataar skeletons 70 million years ago now form the sanctuary of the snow leopard. The Tost Mountains were declared a state reserve following historic campaigns by local nomadic herder communities.",
      cameraTrapTitle: 'Field Camera-Trap Live Footage & Simulation',
      cameraTrapSubtitle: 'Real infrared night vision & thermal telemetry from the high ridges of Tost Mountains Nature Reserve',
      cameraTrapNightMode: 'Infrared Night Vision',
      cameraTrapDayMode: 'Natural Day Light',
      videoTabLabel: '🎥 Live Field Video (Thermal / IR)',
      photoTabLabel: '📷 Camera Trap Sites (Photos)',
      thermalIR: 'Infrared (IR Mono)',
      thermalFLIR: 'Thermal (FLIR)',
      thermalNVG: 'Night Vision (NVG Green)',
      thermalWhiteHot: 'White-Hot Recon',
      aiTrackingActive: 'AI Wildlife Radar & Target Tracking',
      aiTargetLocked: '🎯 Target Locked: Snow Leopard & Ibex Herd (98.8%)',
      captureSnapshot: 'Take Snapshot',
      playVideo: 'Play Stream',
      pauseVideo: 'Pause Stream',
      liveRecBadge: '● REC • Authentic Night Ridge Stream',
      videoDesc: 'Actual field infrared trail camera telemetry installed on the alpine ridges of Tost Mountains, Gurvantes Soum, South Gobi. Displaying thermal heat signatures and movement of a wild Siberian ibex herd stalked by a snow leopard.',
      spotSuccess: '🎯 Spotting Confirmed! You detected a wild Gobi Snow Leopard!',
      resetTrap: 'Scan Next Camera Trap',
      listenVocalization: 'Listen to Vocalization',
      vocalizationActive: 'Snow leopards do NOT roar — they chuff, mew, and caterwaul',
      vocalizationDesc: 'Unlike lions and tigers, snow leopards have non-elastic vocal cords, communicating through friendly puffing chuffs (prusten) and high-frequency mountain calls.',
      adaptationTitle: 'Evolutionary Superpowers',
      adaptPawsTitle: 'Wide Furry Snowshoe Paws',
      adaptPawsDesc: 'Acts as natural snowshoes distributing weight over scree and loose sand with total silence.',
      adaptTailTitle: '1-Meter Counterbalance Tail',
      adaptTailDesc: 'Acts as an agile rudder on 80-degree cliff ledges and wraps as a thermal scarf in -40°C blizzard nights.',
      adaptNoseTitle: 'Enlarged Nasal Chamber',
      adaptNoseDesc: 'Heats and humidifies frigid, low-oxygen desert mountain air before reaching the lungs.',
      adaptCamouflageTitle: 'Smoky Rosette Camouflage',
      adaptCamouflageDesc: 'Indistinguishable from Gobi granite, schist, and sun-bleached desert rocks.',
      rangerSupportTitle: 'Nomadic Herders & Ranger Alliance',
      rangerSupportDesc: 'Local Gobi communities actively patrol fossil beds and leopard corridors, creating a harmonious ecosystem.',
      rangerSupportBtn: 'Support Ranger Conservation',
    },
    gobiLandscape: {
      badge: '🏜️ Saxaul Groves • Golden Dunes • Khermen Tsav • Bactrian Camel Herds',
      sectionTitle: 'Gobi Desert Landscapes & Ecosystem',
      sectionSubtitle: 'Explore the 70-million-year-old terracotta canyon of Khermen Tsav, the singing golden sands, ancient saxaul forests, and the iconic two-humped camel herds',
      clockTitle: 'South Gobi Local Solar & Desert Clock',
      clockSubtitle: 'Real-time Omnogovi clock, solar trajectory, and desert daylight cycles (UTC+8)',
      gobiTimeNow: 'South Gobi Current Time',
      localSolarTime: 'Solar Trajectory & Atmospheric Daylight',
      sunriseLabel: 'Sunrise: 05:48',
      sunsetLabel: 'Sunset: 20:14',
      timePhases: {
        dawn: 'Desert Dawn',
        noon: 'Blazing Midday',
        goldenHour: 'Golden Sunset',
        night: 'Starry Midnight',
      },
      timePhaseDesc: {
        dawn: 'Cool desert breeze whispers across dew-kissed saxaul branches under deep indigo skies',
        noon: 'Scorching 40°C solar heat radiates over the singing dunes, dancing with desert mirages',
        goldenHour: 'Khermen Tsav cliffs ignite in brilliant terracotta flame as camel caravans return to water springs',
        night: 'Billions of pristine stars shimmer across the pitch-black Gobi sky in celestial clarity',
      },
      tabKhermen: 'Khermen Tsav Canyon',
      tabSaxaul: 'Saxaul Forest (Iron Wood)',
      tabDunes: 'Khongor Singing Dunes',
      tabCamels: 'Bactrian Camel Herds',
      khermenTitle: 'Khermen Tsav – The Citadel Canyon',
      khermenSub: '70-million-year-old terracotta natural sculpture and vast open-air museum',
      khermenDesc: 'Khermen Tsav is a colossal 250 km² canyon of sheer red clay fortress cliffs rising dramatically from the desert floor. It is renowned worldwide as a prehistoric treasure trove containing thousands of fossils of hadrosaurs, raptors, ancient turtles, and Cretaceous birds.',
      khermenStats: [
        'Canyon Area: 250+ km² badlands fortress',
        'Wall Depth: 100 - 200 meter sheer red cliffs',
        'Geological Epoch: 70 Million Years (Barun Goyot Formation)',
        'Key Fossils: Armored Ankylosaurs, giant turtles, dinosaur nests',
      ],
      saxaulTitle: 'Saxaul Forest – The Living Iron Root',
      saxaulSub: 'Ancient desert shrubs thriving in waterless sands for centuries (Haloxylon ammodendron)',
      saxaulDesc: 'Saxaul is the lifeblood and ecological cornerstone of the Gobi Desert. Its subterranean root network plunges 10 to 15 meters into deep aquifers, anchoring loose sands against desertification. Saxaul groves shelter wild fauna, including snow leopards, Gobi bears, and camel herds.',
      saxaulStats: [
        'Root Depth: 10 to 15 meters reaching underground aquifers',
        'Wood Density: Extremely heavy and hard — sinks in water',
        'Ecological Impact: A single saxaul tree stabilizes 10-15 m² of sand dunes',
        'Wildlife Refuge: Critical shelter for snow leopards, khulan, and gazelles',
      ],
      dunesTitle: 'Khongor Dunes – The Singing Golden Sands',
      dunesSub: '180 km colossal sand wave that resonates like natural desert music',
      dunesDesc: 'Stretching over 180 km in length and soaring up to 300 meters high, Khongor is one of Mongolia’s most breathtaking natural monuments. When desert winds cascade loose sand granules across the ridges, the dunes produce an acoustic low-frequency drone known as the "Singing of the Dunes".',
      dunesStats: [
        'Dune Length: Over 180 km continuous ridge',
        'Peak Height: 180 - 300 meters above sea level',
        'Acoustic Phenomenon: Resonant harmonic drone caused by wind friction',
        'Desert Oasis: Bordered by lush natural freshwater springs and green meadows',
      ],
      camelsTitle: 'Bactrian Camel Herds – Ships of the Gobi',
      camelsSub: 'Living nomadic heritage and two-humped desert titans (Camelus bactrianus)',
      camelsDesc: 'The Mongolian Bactrian camel is a biological marvel built to endure temperature swings from +40°C in summer to -40°C in winter blizzards. Capable of trekking for weeks without water and carrying heavy caravan loads across sands, they provide nutrient-dense milk (khoormog) and ultra-fine wool.',
      camelsStats: [
        'Endurance: Sustains 30-40 days without drinking water',
        'Dual Humps: Stores up to 120 kg of energy-rich fat reserves',
        'Nutritional Value: Ingee camel milk is famed for restorative wellness',
        'Living Heritage: UNESCO-recognized nomadic camel caravan culture & 1,000 Camel Festival',
      ],
      soundPlayDune: 'Listen to Singing Dune Wind',
      soundPlayCamel: 'Play Camel Caravan Atmosphere',
      soundStop: 'Stop Sound',
      soundPlaying: 'Playing Audio...',
      exploreGallery: 'View Photo Gallery',
      viewHighRes: 'Full Screen High-Res',
    },
    bataarStory: {
      sectionTitle: 'The Epic Return of Tarbosaurus bataar',
      sectionSubtitle: 'The international legal battle that repatriated a smuggled 70-million-year-old apex dinosaur back to its Mongolian home',
      repatriationBadge: '🏛️ 2013 - Historic US Court Victory & Repatriation',
      storyQuote: '"Tarbosaurus bataar is not merely fossilized stone; it is the soul of Mongolian heritage and an irreplaceable marvel for human science."',
      authorQuote: 'Mongolian Paleontological Association',
    },
    expeditions: {
      sectionTitle: 'Gobi Field Expeditions & Tours',
      sectionSubtitle: 'We offer an extraordinary expedition journeying through the legendary Khermen Tsav, Khuren Khan Khets, and Tost Tosonbumba Mountain Range—capturing breathtaking natural landscapes, photographing the endangered wild Snow Leopard for your photographic archives, and exploring the ancient prehistoric domains where Cretaceous dinosaurs once roamed.',
      days: 'Days',
      included: 'Included in Expedition Package:',
      pricePerPerson: 'Price per person (All-inclusive)',
      itinerary: 'View Itinerary',
      bookNow: 'Reserve Expedition',
      dayByDaySchedule: 'Day-by-Day Expedition Schedule',
      persons: 'Travelers',
    },
    fossilLab: {
      sectionTitle: 'Virtual Fossil Excavation Lab',
      sectionSubtitle: 'Use genuine paleontological tools to uncover an authentic Cretaceous fossil hidden in sandstone!',
      brushTool: 'Field Brush',
      chiselTool: 'Rock Hammer',
      progress: 'Excavation Progress',
      congratsTitle: 'Fossil Unearthed!',
      discoveryCert: 'Gobi Paleontology Field Certificate',
    },
    heritage: {
      sectionTitle: 'International Paleontological Center',
      sectionSubtitle: 'Global collaboration with leading universities, UNESCO, and the Mongolian Academy of Sciences',
    },
    visitorGuide: {
      sectionTitle: 'Bataar’s Cradle Tourist Camp',
      sectionSubtitle: 'Eco Ger Resort & Paleontology Basecamp located in Tost Tosonbumba Nature Reserve, Gurvantes Soum, South Gobi',
      badge: '⛺ South Gobi • Bataar’s Cradle Tourist Camp & Eco Resort',
      campName: 'Bataar’s Cradle Tourist Camp',
      campTagline: 'Authentic nomadic hospitality, sustainable luxury eco gers & direct gateway to legendary Cretaceous dinosaur basins',
      campDesc: 'Located in the protected Tost Tosonbumba Nature Reserve of Gurvantes Soum, South Gobi, this premier retreat features eco-powered comfortable rooms, astronomical stargazing telescopes, and an organic restaurant. It serves as the primary expedition hub for exploring the Nemegt Basin, Tosonbumba Range, Khermen Tsav, Snow Leopard tracking, and ancient dinosaur fossil landscapes.',
      locationLabel: 'Camp Location',
      locationValue: 'Gurvantes Soum, Tost Tosonbumba Nature Reserve, South Gobi, Mongolia',
      capacityLabel: 'Guest Capacity',
      capacityValue: '45–50 Guests per night/shift',
      seasonLabel: 'Operating Season',
      seasonValue: 'Main travel season: October 20 through April 20',
      energyLabel: 'Eco Energy & Water',
      energyValue: '100% Off-grid Solar Powered + Deep Artesian Mineral Well',
      contactLabel: 'Camp Booking & Inquiries',
      contactValue: '+976 7201 0099 / +976 8822 3584 / +976 9953 0099 / +976 9972 3336',
      gersTitle: 'Resort Accommodation Options',
      gersSubtitle: 'Hand-crafted wooden lodge rooms, comfortable bedding, nomadic warmth & modern en-suite comforts',
      deluxeGerTitle: 'Deluxe Wooden Suite (Deluxe Room)',
      deluxeGerDesc: 'Cozy pine wood-paneled room, comfortable double bed, dining table & chairs, natural sunlight, climate cooling, en-suite bathroom & Starlink Wi-Fi.',
      deluxeGerPrice: '$110 USD / Night (Breakfast included)',
      standardGerTitle: 'Comfortable Standard Eco Room',
      standardGerDesc: '2 comfortable twin beds, panoramic desert window view, warm wooden interior, climate control & clean private bathhouse.',
      standardGerPrice: '$65 USD / Night',
      familyGerTitle: 'Family Eco Suite (Two Bedrooms & Private Bath)',
      familyGerDesc: 'Spacious wooden eco cabin with 2 separate bedrooms (master bedroom with double bed + second bedroom with 2 single beds), private ensuite bathroom with hot shower, scenic windows, accommodating 4-6 guests.',
      familyGerPrice: '$160 USD / Night (Video Tour Available)',
      amenitiesTitle: 'Resort Amenities & Field Services',
      amenityDining: 'Gobi Mirage Dining & Lounge',
      amenityDiningDesc: 'Farm-to-table local organic meats, traditional Mongolian dairy, vegetarian/vegan specialties, and freshly brewed espresso.',
      amenityStargazing: 'Stargazing Observatory Platform',
      amenityStargazingDesc: 'Crystal-clear zero light pollution skies with high-power telescopes to view the Milky Way, Saturn rings, and nebulae.',
      amenitySafari: '4x4 Desert Safari & Camel Treks',
      amenitySafariDesc: 'Sunset camel rides across singing sand dunes and custom off-road Land Cruiser transfers to fossil sites.',
      amenitySolar: '100% Eco Solar Power',
      amenitySolarDesc: 'Silent round-the-clock clean solar electricity, eco heating, and purified deep-well drinking water.',
      amenityWifi: 'Starlink High-Speed Satellite Wi-Fi',
      amenityWifiDesc: 'Fast and dependable satellite broadband across all gers and the restaurant lounge.',
      amenityFieldBase: 'Certified Expedition Basecamp',
      amenityFieldBaseDesc: 'On-site paleontology briefing room, specimen viewing area, and certified multilingual local guides.',
      bookStayBtn: 'Reserve Camp Accommodation',
      inquireBtn: 'Send Camp Inquiry',
      coordinatesLabel: 'GPS Coordinates',
      directionsLabel: 'How to Arrive',
      directionsValue: 'The overland expedition route to arrive at Bataar’s Cradle Tourist Camp is 390 km from Dalanzadgad city. Dedicated 4WD expedition shuttle transfers available upon reservation.',
      photoGalleryTitle: 'Camp Atmosphere & Gallery',
    },
    booking: {
      modalTitle: 'Reserve Gobi Field Expedition',
      modalSubtitle: 'Experience authentic Cretaceous discovery and desert wilderness',
      packageLabel: 'Selected Expedition',
      fullNameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      dateLabel: 'Preferred Month',
      guestsLabel: 'Number of Explorers',
      notesLabel: 'Special Requests / Dietary Needs',
      submitBtn: 'Submit Reservation Request',
      successMsg: 'Expedition Reservation Received Successfully!',
    },
    appFeatures: {
      installApp: 'Cradle of Bataar Web App',
      installDesc: 'Install the native-like Progressive Web App (PWA) on your phone or desktop to access fossil guides, field maps, and audio commentary offline in the desert.',
      installActionBtn: '📱 Install Mobile App (PWA)',
      offlineModeTitle: 'Offline Desert Field Mode',
      offlineModeDesc: 'Cached fossil data, audio tracks, and field maps remain accessible even without cellular signal in remote Gobi areas.',
      offlineReadyBadge: '⚡ Offline Capable PWA',
      myJournalTitle: 'My Field Explorer Journal',
      myJournalDesc: 'Bookmarked specimens, excavation certificates, and customized expedition notes.',
      savedItems: 'Saved Specimen Bookmarks',
      noSavedItems: 'No saved specimens yet. Click the star icon on any dinosaur to bookmark it for offline field study!',
      quickNavHome: 'Home',
      quickNavDino: 'Fossils',
      quickNavLeopard: 'Leopard',
      quickNavLandscape: 'Gobi',
      quickNavDig: 'Excavate',
      quickNavApp: 'App',
      iosInstructions: 'Tap "Share" in Safari, then select "Add to Home Screen" to install.',
      androidInstructions: 'Tap "Install App" or browser prompt to install natively onto your phone home screen.',
      desktopInstructions: 'Click the "Install" icon in your browser address bar to install as a desktop app.',
      appVersion: 'Version 2.4.0 (PWA & Offline Enabled)',
      clearStorage: 'Clear Offline Cache',
      noRegistrationBadge: '🛡️ No Registration Required (100% Instant & Free)',
      instantOpenBtn: '✨ Open Directly (No Account Needed)',
    },
    footer: {
      missionTitle: 'Mission of Cradle of Bataar',
      missionDesc: 'Preserving, studying, and celebrating the deep prehistoric dinosaur heritage and precious living wildlife of the Mongolian Gobi.',
      quickLinks: 'Quick Links',
      heritageProtection: 'Heritage Protection',
      protectionText: 'All dinosaur fossils and snow leopards are under supreme sovereign protection of Mongolian law.',
      rightsReserved: '© 2026 Cradle of Bataar | All Rights Reserved.',
    },
  },

  ja: {
    siteTitle: 'バタールの揺り籠',
    siteSubtitle: 'モンゴル恐竜遺産・ゴビユキヒョウ自然保護センター',
    nav: {
      home: 'ホーム',
      dinosaurs: '恐竜図鑑',
      gobiSites: 'ゴビの発掘地',
      snowLeopard: 'ユキヒョウ',
      landscapes: 'ゴビの自然美・ラクダ',
      expeditions: '探検ツアー',
      bataarStory: 'バタールの帰還',
      fossilLab: '発掘ラボ',
      visitorGuide: 'ツーリストキャンプ',
      weather: '気象・天気予報',
      research: '国際研究',
      bookTour: '探検を予約',
    },
    hero: {
      badge: '🦖 7000万年前の恐竜 & 現代ゴビの守護神ユキヒョウ',
      heading: 'タルボサウルス・バタールの故郷、',
      headingHighlight: 'ユキヒョウが息づく神秘のゴビ砂漠',
      subheading: 'モンゴルの南ゴビは白亜紀恐竜化石の世界的宝庫であると同時に、絶滅危惧種ユキヒョウ（Panthera uncia）の地球上最大の生息地です。',
      exploreBtn: '化石標本を見る',
      expeditionBtn: '発掘探検隊に参加',
      snowLeopardBtn: 'ユキヒョウを知る',
      stat1Label: '発見された恐竜種数',
      stat1Value: '80種以上',
      stat2Label: 'モンゴル国内のユキヒョウ生息数',
      stat2Value: '約953〜1,000頭',
      stat3Label: '世界の白亜紀化石に占める割合',
      stat3Value: '約20%以上',
      stat4Label: 'ユキヒョウ生息規模の世界順位',
      stat4Value: '世界第2位',
    },
    dinosaurs: {
      sectionTitle: 'モンゴルを代表する恐竜たち',
      sectionSubtitle: '世界の古生物学の歴史を塗り替えた貴重な化石標本',
      allDiet: 'すべて',
      carnivore: '肉食恐竜',
      herbivore: '草食恐竜',
      omnivore: '雑食恐竜',
      searchPlaceholder: '恐竜の名前や発見地で検索...',
      length: '全長',
      weight: '体重',
      height: '体高',
      discovered: '発見年',
      site: '発見場所',
      formation: '地層',
      listenAudio: '音声ガイドを聞く',
      view3DBones: '骨格構造を見る',
      viewSpecimen: '詳細を見る',
      anatomicalFacts: '解剖学的特徴:',
      keyHighlights: '学術的発見ポイント:',
    },
    gobiSites: {
      sectionTitle: '伝説のゴビ砂漠発掘拠点',
      sectionSubtitle: '世界の恐竜研究史に輝くモンゴル南部の5大化石産地',
      selectSite: '発掘地を選択',
      geologicalAge: '地質時代',
      stratum: '地層名',
      coordinates: '緯度・経度',
      keyDiscoveries: '主な発見化石',
      visitorTip: '探訪アドバイス',
      exploreSiteBtn: '探検を計画する',
      terrainView: '地形図',
      satelliteView: '衛星写真',
    },
    snowLeopard: {
      badge: '🐾 山岳の幻影・生態系の頂点',
      sectionTitle: 'ゴビのユキヒョウ（岩嶺の亡霊）',
      sectionSubtitle: '太古の王者タルボサウルスから、現代のゴビ岩山を守る孤高の頂点捕食者へ',
      localName: 'ツォーホル・イルヴェス（ユキヒョウ）',
      latinName: 'Panthera uncia (Schreber, 1775)',
      statusLabel: '保全状況',
      statusValue: '絶滅危急種（IUCN）/ モンゴル国最高保護野生動物',
      popLabel: 'モンゴルの生息数',
      popValue: '約953〜1,000頭（世界全体の約20%）',
      habitatLabel: '主要生息域',
      habitatValue: '南ゴビ（トスト山脈・グルバンサイハン）、アルタイ山脈',
      tostLabel: 'トスト山脈自然保護区',
      tostValue: '世界最長の長期ユキヒョウ生態調査拠点',
      storyTitle: '7000万年の太古から現代の生きた遺産へ',
      storyDesc: '恐竜化石を育んだ南ゴビの奇岩連峰は、現在「山の亡霊」と呼ばれるユキヒョウの最も安全な聖域となっています。現地遊牧民と研究者が一体となって守り続けています。',
      cameraTrapTitle: '野外自動撮影カメラ・実録映像＆シミュレータ',
      cameraTrapSubtitle: '南ゴビ・トスト山脈の断崖に設置された赤外線ナイトビジョン＆熱画像リアルタイム映像',
      cameraTrapNightMode: '赤外線ナイトビジョン',
      cameraTrapDayMode: '自然光デイモード',
      videoTabLabel: '🎥 実録ナイトビジョン映像 (Video)',
      photoTabLabel: '📷 定点カメラ写真 (Photos)',
      thermalIR: '赤外線 (IR Mono)',
      thermalFLIR: '熱画像解析 (FLIR)',
      thermalNVG: '夜間暗視 (NVG Green)',
      thermalWhiteHot: 'ホワイトホット探知',
      aiTrackingActive: 'AI 野生動物レーダー追跡',
      aiTargetLocked: '🎯 ターゲット捕捉: ユキヒョウ＆アイベックス群 (98.8%)',
      captureSnapshot: 'スナップショット保存',
      playVideo: '再生',
      pauseVideo: '一時停止',
      liveRecBadge: '● REC • 南ゴビ高地実録ストリーム',
      videoDesc: '南ゴビ県グルバンテス郡トスト山脈の険しい岩稜に設置された赤外線トレイルカメラの実録シミュレーション。夜間の岩尾根を移動するシベリアアイベックスの群れとそれを追尾するユキヒョウの熱源反応を捉えています。',
      spotSuccess: '🎯 発見成功！岩壁に潜む野生のユキヒョウを捉えました！',
      resetTrap: '次のカメラを確認',
      listenVocalization: '鳴き声を聞く',
      vocalizationActive: 'ユキヒョウは吼えない・鼻を鳴らす「プルステン」音で挨拶',
      vocalizationDesc: 'ライオンのような咆哮はできず、低く柔らかい喉鳴らしや高い山岳コールで仲間と交信します。',
      adaptationTitle: '進化がもたらしたスーパー能力',
      adaptPawsTitle: '幅広で毛に覆われた足裏',
      adaptPawsDesc: '天然のスノーシューとして機能し、断崖や砂地を音もなく走破。',
      adaptTailTitle: '長さ1メートルの極太尾',
      adaptTailDesc: '急峻な崖でのバランサーであり、厳冬期は鼻先を包むマフラーに。',
      adaptNoseTitle: '大きく広がった鼻腔',
      adaptNoseDesc: '標高が高く冷たい乾燥空気を肺に届く前に温め加湿。',
      adaptCamouflageTitle: '完璧なロゼット模様',
      adaptCamouflageDesc: 'ゴビの花崗岩や岩壁と完全に同化する美しい保護色。',
      rangerSupportTitle: '遊牧民レンジャーとの共生',
      rangerSupportDesc: '家畜保険やモニタリングを通じて野生動物と伝統的遊牧文化が共存しています。',
      rangerSupportBtn: '保全活動を支援する',
    },
    gobiLandscape: {
      badge: '🏜️ サックスアウル樹林 • 黄金砂丘 • ヘルメンツァフ • フタコブラクダ',
      sectionTitle: 'ゴビ砂漠の景観と自然生態系',
      sectionSubtitle: '7000万年の赤色要塞峡谷ヘルメン・ツァフ、鳴き砂のホンゴル砂丘、サックスアウルの古代樹林、そしてフタコブラクダの群れ',
      clockTitle: '南ゴビ現地太陽時・砂漠クロック',
      clockSubtitle: '南ゴビ県のリアルタイム時刻と太陽の軌道・昼夜サイクル（UTC+8）',
      gobiTimeNow: '南ゴビ現在時刻',
      localSolarTime: '太陽軌道と砂漠の光環境',
      sunriseLabel: '日の出：05:48',
      sunsetLabel: '日の入：20:14',
      timePhases: {
        dawn: '砂漠の夜明け',
        noon: '炎熱の正午',
        goldenHour: '黄金の夕暮れ',
        night: '満天の星空',
      },
      timePhaseDesc: {
        dawn: '紺碧の空の下、サックスアウルの枝に朝露が光り冷涼な風が吹き抜ける時間',
        noon: '気温40℃の熱波が黄金砂丘を包み、遠くに逃げ水（蜃気楼）が揺らめく時',
        goldenHour: 'ヘルメン・ツァフの赤い断崖が夕陽に燃え立ち、ラクダの隊商が泉へと帰還する時',
        night: '漆黒の夜空に無数の星々が瞬き、息をのむほど澄み切ったゴビの銀河が広がる時',
      },
      tabKhermen: 'ヘルメン・ツァフ峡谷',
      tabSaxaul: 'サックスアウル（ザグ樹林）',
      tabDunes: 'ホンゴル鳴き砂砂丘',
      tabCamels: 'フタコブラクダの群れ',
      khermenTitle: 'ヘルメン・ツァフ – 赤い城壁のグランドキャニオン',
      khermenSub: '7000万年の風蝕が刻んだ巨大粘土要塞と野外恐竜博物館',
      khermenDesc: '広さ250km²に及ぶヘルメン・ツァフは、古代の廃墟都市のような威容を誇る赤い粘土層の巨大峡谷です。7000万年前の白亜紀層からハドロサウルス類、鎧竜、太古のウミガメ・陸ガメ化石が多数発掘されています。',
      khermenStats: [
        '峡谷面積：250km²以上の広大なバッドランド',
        '崖の深さ：100〜200メートルの切り立った赤壁',
        '地質年代：7000万年前（バルンゴヨット層・白亜紀後期）',
        '主要化石：アンキロサウルス類、巨大カメ化石、恐竜巣卵群',
      ],
      saxaulTitle: 'サックスアウル（ザグ） – ゴビの生きた鉄柱',
      saxaulSub: '極乾の大地に数百年生き続ける奇跡の砂漠高木（Haloxylon ammodendron）',
      saxaulDesc: 'サックスアウル（モンゴル名：ザグ）はゴビ生態系の心臓部です。根は地下10〜15メートルの深層地下水まで達し、流動する砂を固定して砂漠化を防ぎます。ユキヒョウやゴビヒグマ、野生ラクダの重要な避難所となっています。',
      saxaulStats: [
        '根の深さ：地下10〜15メートルの水脈まで伸長',
        '木質特性：非常に硬く重く、水に沈む比重',
        '生態学的効果：1本のザグ樹が10〜15m²の砂丘を固定',
        '野生動物のシェルター：ユキヒョウ、クラン、ガゼル、ラクダのオアシス',
      ],
      dunesTitle: 'ホンゴル砂丘 – 歌う黄金の鳴き砂',
      dunesSub: '全長180kmにわたり連なる巨大砂丘と風が奏でる重低音の調べ',
      dunesDesc: '全長180km、高さ180〜300メートルに達するモンゴル最大級の砂丘。風が吹くと砂粒同士が摩擦を起こし、飛行機のエンジンのような唸り声や笛のような神秘的な音を響かせる「鳴き砂」として世界的に有名です。',
      dunesStats: [
        '砂丘全長：180km以上の連続した砂の稜線',
        '最高標高差：地表から180〜300メートル',
        '音響現象：風の摩擦による共鳴音（歌う砂丘）',
        '隣接オアシス：清冽な湧水と緑豊かな草原が砂丘と共存',
      ],
      camelsTitle: 'フタコブラクダの群れ – 砂漠の至宝',
      camelsSub: 'モンゴル遊牧民の誇り・1000頭ラクダ祭りの主役（Camelus bactrianus）',
      camelsDesc: 'モンゴルのフタコブラクダは夏+40℃から冬-40℃までの過酷な気候に適応した驚異の動物です。水なしで1ヶ月以上活動でき、豊かな栄養を誇るラクダ乳（ホールモグ）と高級ウールをもたらします。',
      camelsStats: [
        '持久力：30〜40日間水を飲まずに遠距離を踏破',
        'ふたつのコブ：最大120kgの脂肪エネルギーを貯蔵',
        '健康成分：ホールモグ（発酵ラクダ乳）は高い滋養強壮効果',
        '無形文化遺産：ユネスコ登録のラクダキャラバン隊商文化＆1000ラクダ祭り',
      ],
      soundPlayDune: '鳴き砂と風の音を聴く',
      soundPlayCamel: 'ラクダ隊商の環境音を再生',
      soundStop: '音声を停止',
      soundPlaying: '再生中...',
      exploreGallery: 'フォトギャラリーを見る',
      viewHighRes: 'フルスクリーン高解像度表示',
    },
    bataarStory: {
      sectionTitle: 'タルボサウルス・バタール 奇跡の祖国帰還',
      sectionSubtitle: '不法密輸された7000万年前の全身骨格を取り戻した国際裁判と歴史的勝利',
      repatriationBadge: '🏛️ 2013年 - 歴史的勝訴と祖国帰還',
      storyQuote: '「タルボサウルス・バタールは単なる化石ではなく、モンゴル国民の誇りであり人類共通の至宝である」',
      authorQuote: 'モンゴル古生物学協会',
    },
    expeditions: {
      sectionTitle: 'ゴビ砂漠フィールド探検ツアー',
      sectionSubtitle: '名勝ヘルメンツァフ、フレン・ハニー・ヘツ、トスト・トソンブムバ山脈を巡り、大自然の絶景を満喫しながら絶滅危惧種の野生ユキヒョウをカメラに収めて写真アーカイブを豊かにし、太古の恐竜が生息していた聖地を体感する感動の旅をご提案いたします。',
      days: '日間',
      included: 'ツアーに含まれるもの:',
      pricePerPerson: '1名様料金（全行程込み）',
      itinerary: '詳細旅程',
      bookNow: '予約する',
      dayByDaySchedule: '日程別スケジュール',
      persons: '参加人数',
    },
    fossilLab: {
      sectionTitle: 'バーチャル化石発掘ラボ',
      sectionSubtitle: '本格的な道具を使って砂岩から白亜紀の化石を発掘しよう！',
      brushTool: '発掘用ブラシ',
      chiselTool: '地質ハンマー',
      progress: '発掘進捗度',
      congratsTitle: '発掘成功！化石が出土しました',
      discoveryCert: 'ゴビ古生物探検認定証',
    },
    heritage: {
      sectionTitle: '国際研究センター & 学術提携',
      sectionSubtitle: 'ユネスコ、世界各国の大学・博物館との共同研究',
    },
    visitorGuide: {
      sectionTitle: 'バタールの揺り籠 ツーリストキャンプ',
      sectionSubtitle: '南ゴビ県グルバンテス郡・トスト・トソンブムバ自然保護区に位置する快適なエコゲルリゾート＆フィールド調査拠点',
      badge: '⛺ 南ゴビ • バタールの揺り籠 ツーリストキャンプ＆エコリゾート',
      campName: 'バタールの揺り籠 ツーリストキャンプ',
      campTagline: '伝統的な遊牧民の温かいおもてなしと現代的な快適さを兼ね備えた南ゴビ屈指の宿泊拠点',
      campDesc: '南ゴビ県グルバンテス郡トスト・トソンブムバ自然保護区に位置する当キャンプは、自然エネルギーを活用した快適な客室、天体望遠鏡、オーガニックレストランを完備したゴビ屈指のリゾートであり、ネメグト盆地、トソンブムバ山脈、ヘルメンツァフ、ユキヒョウ観察、恐竜の化石地層を巡る感動的な探検の重要拠点です。',
      locationLabel: 'キャンプ所在地',
      locationValue: 'モンゴル国 南ゴビ県 グルバンテス郡 トスト・トソンブムバ自然保護区',
      capacityLabel: '収容人数',
      capacityValue: '1回あたり45〜50名様',
      seasonLabel: '営業シーズン',
      seasonValue: '主な旅行シーズン：10月20日〜4月20日',
      energyLabel: 'エコエネルギー＆水',
      energyValue: '100%太陽光自家発電 ＋ 深井戸天然ミネラル水',
      contactLabel: '予約・お問い合わせ',
      contactValue: '+976 7201 0099 / +976 8822 3584 / +976 9953 0099 / +976 9972 3336',
      gersTitle: '宿泊ロッジ＆客室のご案内',
      gersSubtitle: '木の温もりあふれる快適ロッジ、清潔な寝具、ゴビ砂漠の絶景を一望する客室',
      deluxeGerTitle: 'デラックス・ウッドルーム (Deluxe Room)',
      deluxeGerDesc: '天然木板張りの快適ルーム、ダブルベッド、テーブル＆チェア、冷暖房、専用シャワー・トイレ、Starlink Wi-Fi完備。',
      deluxeGerPrice: '約 110 USD / 泊（朝食付き）',
      standardGerTitle: '快適スタンダードルーム',
      standardGerDesc: 'ツインベッド、砂漠パノラマビューの窓、温かみのある木製インテリア、暖房、シャワー設備完備。',
      standardGerPrice: '約 65 USD / 泊',
      familyGerTitle: 'ファミリー・木造エコスイート (2寝室＆専用バス)',
      familyGerDesc: '2つの独立した寝室（ダブルベッド主寝室＋シングル2台の寝室）、専用温水シャワートイレ、眺望窓付きの広々とした木造キャビン。4〜6名様宿泊可能（ルームウォークスルー動画付き）。',
      familyGerPrice: '約 160 USD / 泊',
      amenitiesTitle: 'キャンプ設備＆アクティビティ',
      amenityDining: 'ゴビ・レストラン＆ラウンジ',
      amenityDiningDesc: '地元のオーガニック肉料理、モンゴル伝統乳製品、欧風料理やベジタリアン対応、挽きたて珈琲。',
      amenityStargazing: '天体観測デッキ＆大型望遠鏡',
      amenityStargazingDesc: '光害ゼロの澄み切ったゴビの夜空に輝く天の川や惑星、星雲を高倍率望遠鏡で鑑賞。',
      amenitySafari: '4WDサファリ＆ラクダトレッキング',
      amenitySafariDesc: '夕暮れの砂丘ラクダ散歩や、化石発掘現場へのランドクルーザー送迎ツアーを実施。',
      amenitySolar: '100%クリーン太陽光発電',
      amenitySolarDesc: '静かで環境に優しい24時間給電と、深層地下水の高度フィルター浄水システム。',
      amenityWifi: 'Starlink 高速衛星Wi-Fi',
      amenityWifiDesc: '砂漠の真ん中でも安定して繋がる衛星ブロードバンドを各ゲルおよびラウンジで利用可能。',
      amenityFieldBase: '古生物探検ベースキャンプ',
      amenityFieldBaseDesc: '化石解説室、展示スペース、資格を持つ多言語対応の専属ガイドが常駐。',
      bookStayBtn: '宿泊・ゲルを予約する',
      inquireBtn: 'お問い合わせ',
      coordinatesLabel: 'GPS座標',
      directionsLabel: 'アクセス',
      directionsValue: 'バタール・エコーベース観光キャンプへの到達路程は全行程390km。専用4WD送迎サービスを提供しております。',
      photoGalleryTitle: 'キャンプ風景＆施設写真',
    },
    booking: {
      modalTitle: 'ゴビ古生物探検隊のお申込み',
      modalSubtitle: '専門学者と共に巡る白亜紀の大地への招待状',
      packageLabel: 'ご希望の探検プラン',
      fullNameLabel: 'お名前',
      emailLabel: 'メールアドレス',
      phoneLabel: '電話番号',
      dateLabel: '希望時期（年月）',
      guestsLabel: '参加人数',
      notesLabel: 'ご要望・備考',
      submitBtn: '申込みを送信する',
      successMsg: '探検ツアーのお申込みを受け付けました！',
    },
    appFeatures: {
      installApp: 'バタールの揺り籠 アプリ',
      installDesc: 'スマートフォンやPCにPWAアプリとしてインストールすることで、電波の届かないゴビ砂漠の現地でもオフラインで化石図鑑や音声ガイドをご利用いただけます。',
      installActionBtn: '📱 アプリを端末にインストール (PWA)',
      offlineModeTitle: 'ゴビ現地オフライン対応',
      offlineModeDesc: '砂漠の電波圏外でも化石データや音声、地図がスムーズに表示されます。',
      offlineReadyBadge: '⚡ オフライン対応 PWA',
      myJournalTitle: 'マイ・フィールド調査日誌',
      myJournalDesc: 'お気に入りに保存した恐竜標本、発掘修了認定証、探検メモ。',
      savedItems: '保存した標本リスト',
      noSavedItems: '保存された標本はまだありません。恐竜図鑑のスターを押して保存してください。',
      quickNavHome: 'ホーム',
      quickNavDino: '化石図鑑',
      quickNavLeopard: 'ユキヒョウ',
      quickNavLandscape: 'ゴビ自然',
      quickNavDig: '発掘体験',
      quickNavApp: 'アプリ',
      iosInstructions: 'Safariで「共有」をタップし、「ホーム画面に追加」を選択してください。',
      androidInstructions: '「アプリをインストール」をタップしてホーム画面にネイティブ追加してください。',
      desktopInstructions: 'ブラウザのアドレスバーにあるインストールボタンをクリックして利用可能です。',
      appVersion: 'バージョン 2.4.0 (PWA & Offline Enabled)',
      clearStorage: 'オフラインキャッシュの削除',
      noRegistrationBadge: '🛡️ 登録不要（完全無料・即座に起動）',
      instantOpenBtn: '✨ 登録なしですぐに開く',
    },
    footer: {
      missionTitle: 'バタールの揺り籠 プロジェクトの使命',
      missionDesc: 'モンゴルが誇る数千万年の太古の恐竜遺産と、現代のゴビを生きるユキヒョウの自然を守り伝えること。',
      quickLinks: 'クイックリンク',
      heritageProtection: '遺産保護について',
      protectionText: 'すべての恐竜化石およびユキヒョウはモンゴル国の最高法によって厳格に保護されています。',
      rightsReserved: '© 2026 バタールの揺り籠 | All Rights Reserved.',
    },
  },

  zh: {
    siteTitle: '巴特尔的摇篮',
    siteSubtitle: '蒙古恐龙遗产与戈壁雪豹自然生态中心',
    nav: {
      home: '首页',
      dinosaurs: '恐龙图鉴',
      gobiSites: '戈壁化石点',
      snowLeopard: '戈壁雪豹',
      landscapes: '戈壁奇观与骆驼',
      expeditions: '科考探险',
      bataarStory: '巴特尔归国',
      fossilLab: '发掘实验室',
      visitorGuide: '度假营地',
      weather: '气象预报',
      research: '学术合作',
      bookTour: '预约探险',
    },
    hero: {
      badge: '🦖 7000万年史前恐龙 & 戈壁生灵守护者雪豹',
      heading: '特暴龙·巴特尔的故乡，',
      headingHighlight: '雪豹栖息的神秘戈壁奇境',
      subheading: '蒙古国南戈壁不仅是全球白垩纪恐龙化石宝库，更是地球上极度珍稀的“雪山之王”雪豹（Panthera uncia）的核心庇护圣地。',
      exploreBtn: '探索恐龙标本',
      expeditionBtn: '加入国际科考队',
      snowLeopardBtn: '了解戈壁雪豹',
      stat1Label: '已发现恐龙种类',
      stat1Value: '80+ 种',
      stat2Label: '蒙古国雪豹种群数量',
      stat2Value: '约953-1,000只',
      stat3Label: '占全球白垩纪化石比例',
      stat3Value: '超 20%',
      stat4Label: '雪豹种群全球排名',
      stat4Value: '位居全球第2',
    },
    dinosaurs: {
      sectionTitle: '蒙古代表性恐龙标本',
      sectionSubtitle: '名扬世界古生物学史的珍稀化石巨匠',
      allDiet: '全部食性',
      carnivore: '肉食性',
      herbivore: '植食性',
      omnivore: '杂食性',
      searchPlaceholder: '搜索恐龙名称或发现地点...',
      length: '全长',
      weight: '体重',
      height: '体高',
      discovered: '发现年份',
      site: '出土遗址',
      formation: '地质层',
      listenAudio: '收听语音解说',
      view3DBones: '骨骼构造视图',
      viewSpecimen: '查看标本详情',
      anatomicalFacts: '解剖学解密:',
      keyHighlights: '核心科学亮点:',
    },
    gobiSites: {
      sectionTitle: '戈壁远古传奇化石遗址',
      sectionSubtitle: '蒙古南部五大闻名遐迩的世界级白垩纪地质化石宝库',
      selectSite: '选择化石遗址',
      geologicalAge: '地质时代',
      stratum: '地层名称',
      coordinates: '地理坐标',
      keyDiscoveries: '主要出土化石',
      visitorTip: '旅行贴士',
      exploreSiteBtn: '规划科考行程',
      terrainView: '地形视图',
      satelliteView: '卫星影像',
    },
    snowLeopard: {
      badge: '🐾 峭壁隐者・高山生灵顶级霸主',
      sectionTitle: '戈壁雪豹（岩山幽灵）',
      sectionSubtitle: '从史前霸主特暴龙的化石层，到当代戈壁悬崖峭壁上的生灵守护者',
      localName: '斑点雪豹（Irves）',
      latinName: 'Panthera uncia (Schreber, 1775)',
      statusLabel: '保护级别',
      statusValue: '易危 (IUCN) / 蒙古国红皮书最高保护级野生动物',
      popLabel: '蒙古国种群数量',
      popValue: '约953 - 1,000只 (占全球总数约20%)',
      habitatLabel: '主要分布山脉',
      habitatValue: '南戈壁（托斯特山脉、古尔班赛汗）、阿尔泰山',
      tostLabel: '托斯特山脉自然保护区',
      tostValue: '全球开展时间最长的雪豹野外生态科研基地',
      storyTitle: '从7000万年史前巨兽到当代活态自然瑰宝',
      storyDesc: '蒙古南戈壁的奇迹在于：曾掩埋特暴龙化石的红色峡谷断崖，如今正是雪豹捕食北山羊与盘羊的天堂。当地游牧牧民联合科研机构建立了世界首个社区主导型雪豹保护区。',
      cameraTrapTitle: '野外红外相机实录影像与监测模拟器',
      cameraTrapSubtitle: '南戈壁托斯特山脉高山峭壁夜视红外与热成像实况监测流',
      cameraTrapNightMode: '红外夜视模式',
      cameraTrapDayMode: '自然日光模式',
      videoTabLabel: '🎥 野外实录影像 (Video)',
      photoTabLabel: '📷 红外定点照片 (Photos)',
      thermalIR: '红外黑白 (IR Mono)',
      thermalFLIR: '热成像解析 (FLIR)',
      thermalNVG: '微光夜视 (NVG Green)',
      thermalWhiteHot: '白热探知 (White-Hot)',
      aiTrackingActive: 'AI 野生动物雷达目标锁定',
      aiTargetLocked: '🎯 目标锁定：雪豹追踪北山羊群 (98.8%)',
      captureSnapshot: '截取当前画面',
      playVideo: '播放实录',
      pauseVideo: '暂停实录',
      liveRecBadge: '● REC • 戈壁高山夜视实录',
      videoDesc: '位于南戈壁省古尔班特斯县托斯特山脉高山陡崖处的红外触发相机实况模拟。清晰呈现夜幕下北山羊群沿山脊行进以及紧随其后的雪豹热敏特征与动态轨迹。',
      spotSuccess: '🎯 侦测成功！您成功辨识出戈壁野生雪豹的身影！',
      resetTrap: '切换下一个红外点位',
      listenVocalization: '聆听雪豹叫声',
      vocalizationActive: '雪豹不会咆哮——通过轻柔的喷气声与高山鸣叫交流',
      vocalizationDesc: '与狮虎不同，雪豹不具备可拉伸的声带结构，不会大声咆哮，而是发出呼噜声和特有的高山共鸣。',
      adaptationTitle: '登峰造极的生存进化',
      adaptPawsTitle: '宽阔毛绒大掌',
      adaptPawsDesc: '如同天然雪鞋，在碎石坡与悬崖上静音潜行，抓地力极强。',
      adaptTailTitle: '1米长大粗尾',
      adaptTailDesc: '在80度悬崖上高速跳跃时的平衡舵，零下40度寒夜当保暖围巾。',
      adaptNoseTitle: '扩大的鼻腔结构',
      adaptNoseDesc: '在高海拔稀薄严寒空气进入肺部前进行预热与湿润。',
      adaptCamouflageTitle: '绝妙玫瑰花斑纹',
      adaptCamouflageDesc: '与戈壁花岗岩岩石纹理浑然一体，肉眼极难察觉。',
      rangerSupportTitle: '游牧巡护员守护联盟',
      rangerSupportDesc: '戈壁牧民通过草场轮牧与红外监测，共同守卫这片史前与现代共生的圣土。',
      rangerSupportBtn: '支持雪豹保护行动',
    },
    gobiLandscape: {
      badge: '🏜️ 梭梭古林 • 鸣沙绝壁 • 赫尔曼察夫 • 双峰驼群',
      sectionTitle: '戈壁自然壮景与沙漠生态系统',
      sectionSubtitle: '探秘7000万年红土巨城赫尔曼察夫大峡谷、洪戈林鸣沙金山、千年梭梭铁木林与戈壁之舟双峰驼群',
      clockTitle: '南戈壁天文太阳时与沙漠时钟',
      clockSubtitle: '南戈壁省实时时间、太阳运行轨迹与沙漠昼夜流转（UTC+8）',
      gobiTimeNow: '南戈壁当前时间',
      localSolarTime: '太阳轨迹与沙漠光照模式',
      sunriseLabel: '日出时间：05:48',
      sunsetLabel: '日落时间：20:14',
      timePhases: {
        dawn: '清冽黎明',
        noon: '烈日正午',
        goldenHour: '红土晚霞',
        night: '璀璨星空',
      },
      timePhaseDesc: {
        dawn: '湛蓝天光微露，晨露凝聚于梭梭树梢，清凉晨风抚过沙丘',
        noon: '气温直逼40℃热浪翻涌，洪戈林鸣沙山在海市蜃楼中起伏闪耀',
        goldenHour: '赫尔曼察夫峡谷悬崖如烈火燃烧，双峰驼队在夕阳中踏沙归途',
        night: '万亿繁星点亮深黑苍穹，戈壁银河清晰得仿佛触手可及',
      },
      tabKhermen: '赫尔曼察夫大峡谷',
      tabSaxaul: '梭梭古树林（沙漠铁木）',
      tabDunes: '洪戈林鸣沙山',
      tabCamels: '双峰骆驼群与游牧文化',
      khermenTitle: '赫尔曼察夫 – 戈壁红色古城堡峡谷',
      khermenSub: '7000万年红土风蚀奇观，天然露天恐龙化石博物馆',
      khermenDesc: '赫尔曼察夫大峡谷占地250多平方公里，高耸巍峨的红土悬崖宛如一座史前巨型要塞城堡。这里是世界古生物学的顶级宝库，出土过无数鸭嘴龙、甲龙、史前巨龟及反鸟类珍稀化石。',
      khermenStats: [
        '峡谷面积：250+ 平方公里天然恶地古堡',
        '绝壁垂直深：100 - 200 米险峻红土断崖',
        '地质年代：7000万年前（晚白垩世巴伦戈约特组）',
        '出土化石：绘龙铠甲、巨型陆龟背甲、恐龙群巢蛋化石',
      ],
      saxaulTitle: '梭梭林 – 戈壁坚韧生命的活铁柱',
      saxaulSub: '无水干旱沙海中繁衍数百年的沙漠古树（Haloxylon ammodendron）',
      saxaulDesc: '梭梭（蒙古语：Zag）是戈壁生态系统的核心命脉。其庞大根系深扎地下10至15米寻找深层水源，强力固沙遏制荒漠化。梭梭林还是雪豹、戈壁棕熊及双峰骆驼躲避风沙的关键天然庇护所。',
      saxaulStats: [
        '根系深度：直达地下10至15米深层水脉',
        '木质密度：坚硬如铁，入水即沉',
        '生态防线：一株成年梭梭树可固结10-15平方米流沙',
        '动物庇护所：雪豹、野驴（库兰）、黄羊及双峰驼生存走廊',
      ],
      dunesTitle: '洪戈林沙丘 – 鸣响金沙之海',
      dunesSub: '长达180公里连绵如海的巨型沙浪，风吹沙动自发低沉共鸣',
      dunesDesc: '洪戈林沙丘长达180公里，最高处达300米，是蒙古国最具震撼力的沙漠奇观。每当大风拂过沙脊，沙粒相互摩擦便会发出轰鸣之声，如同巨型风琴或飞机低鸣，被称为“会唱歌的鸣沙山”。',
      dunesStats: [
        '沙丘总长：180多公里连绵金色沙脊',
        '相对高差：高达180至300米巍峨金字塔',
        '声学奇迹：风沙摩擦产生的天然低频声学共振',
        '伴生绿洲：沙山脚下紧邻清澈泉水与繁茂湿地草甸',
      ],
      camelsTitle: '双峰骆驼群 – 戈壁无双之舟',
      camelsSub: '蒙古游牧民族的骄傲，千驼盛会与丝绸之路活化石（Camelus bactrianus）',
      camelsDesc: '蒙古双峰骆驼是抵御戈壁酷暑（+40℃）与极寒暴风雪（-40℃）的生存大师。它们能连续数周不饮水负重前行，并为牧民提供高营养的驼乳（霍尔木格）与顶级羊绒级驼毛。',
      camelsStats: [
        '超强耐渴：耐受30-40天不饮水横跨沙漠',
        '双峰驼峰：储存高达120公斤优质能量脂肪',
        '珍贵滋补：新鲜驼奶/发酵霍尔木格具备极高养生价值',
        '非遗文化：联合国教科文组织游牧骆驼文化与千驼狂欢节',
      ],
      soundPlayDune: '聆听鸣沙与沙漠风琴声',
      soundPlayCamel: '播放驼队踏沙环境音',
      soundStop: '停止播放',
      soundPlaying: '正在播放...',
      exploreGallery: '浏览全景图集',
      viewHighRes: '全屏高清视效',
    },
    bataarStory: {
      sectionTitle: '特暴龙·巴特尔的史诗级回归',
      sectionSubtitle: '跨越国际法庭、历时数年将7000万年前被走私的国家瑰宝迎回蒙古家园的传奇历程',
      repatriationBadge: '🏛️ 2013年 - 历史性法律胜利与国宝回归',
      storyQuote: '“特暴龙·巴特尔不仅是珍贵的恐龙化石，更是蒙古人民的骄傲与全人类无价的科学遗产。”',
      authorQuote: '蒙古古生物学会',
    },
    expeditions: {
      sectionTitle: '戈壁野外科考与探险之旅',
      sectionSubtitle: '诚邀您踏上穿越赫尔曼察夫、红岩长崖（Khuren Khan Khets）与托斯特·托松布姆巴山脉的壮美科考之旅——在领略壮丽大自然的同时，寻踪拍摄世界濒危雪豹以丰富您的摄影典藏，更亲身探访白垩纪恐龙生息繁衍的远古圣地。',
      days: '天',
      included: '科考探险包含项目:',
      pricePerPerson: '单人全包费用 (全程无自费)',
      itinerary: '查看行程',
      bookNow: '立即预订',
      dayByDaySchedule: '每日科考行程表',
      persons: '探险人数',
    },
    fossilLab: {
      sectionTitle: '虚拟化石发掘实验室',
      sectionSubtitle: '运用专业古生物田野工具，亲手从砂岩中发掘白垩纪化石宝藏！',
      brushTool: '精细毛刷',
      chiselTool: '地质手锤',
      progress: '发掘完成度',
      congratsTitle: '发掘成功！化石重见天日',
      discoveryCert: '戈壁古生物田野科考认证证书',
    },
    heritage: {
      sectionTitle: '国际古生物研究与学术中心',
      sectionSubtitle: '与全球顶尖大学、联合国教科文组织及蒙古科学院深度合作',
    },
    visitorGuide: {
      sectionTitle: '巴特尔的摇篮 特色度假营地',
      sectionSubtitle: '位于南戈壁省古尔班特斯县托斯特·托松布姆巴自然保护区的高品质生态蒙古包度假营地与田野科考中心',
      badge: '⛺ 南戈壁 • 巴特尔的摇篮 生态度假营地与科考大本营',
      campName: '巴特尔的摇篮 特色度假营地',
      campTagline: '纯正游牧文化体验、荒野绿洲舒适住宿与戈壁古生物探险的理想集结地',
      campDesc: '本营地坐落于南戈壁省古尔班特斯县托斯特·托松布姆巴自然保护区，配备环保新能源舒适客房、天文望远镜与有机餐厅，是戈壁顶级度假胜地，更是前往奈梅亨特盆地、托松布姆巴山脉、赫尔曼察夫、雪豹寻踪以及探索远古恐龙生息遗址的核心科考与旅游集结中心。',
      locationLabel: '营地位置',
      locationValue: '蒙古国 南戈壁省 古尔班特斯县 托斯特·托松布姆巴自然保护区',
      capacityLabel: '接待规模',
      capacityValue: '每期接待 45-50 位宾客',
      seasonLabel: '运营季节',
      seasonValue: '主要旅行季：10月20日至4月20日',
      energyLabel: '绿色能源与供水',
      energyValue: '100% 离网太阳能电站 + 深井高品质矿泉净化水',
      contactLabel: '预订与咨询电话',
      contactValue: '+976 7201 0099 / +976 8822 3584 / +976 9953 0099 / +976 9972 3336',
      gersTitle: '营地木屋与客房房型',
      gersSubtitle: '纯天然松木木屋、温馨舒适床品、自然采光大窗与现代独立卫浴体验',
      deluxeGerTitle: '豪华木屋客房 (Deluxe Room)',
      deluxeGerDesc: '温馨松木护墙板内饰、舒适大床、休闲桌椅、采光大窗、空调、独立卫浴与Starlink卫星无线网络。',
      deluxeGerPrice: '约 110 美元 / 晚 (含精美双早)',
      standardGerTitle: '舒适标准客房 (Standard Room)',
      standardGerDesc: '2张舒适单人床，戈壁全景景观窗，温馨木质内饰，配备暖气系统与独立卫浴设施。',
      standardGerPrice: '约 65 美元 / 晚',
      familyGerTitle: '家庭木屋双卧套房 (Family Suite)',
      familyGerDesc: '配设2间独立卧室（大床主卧＋双单人床次卧）、独立冷热水淋浴卫生间与观景大窗，可容纳4-6人家庭入住，含实景漫游视频展示。',
      familyGerPrice: '约 160 美元 / 晚',
      amenitiesTitle: '营地专属服务与体验',
      amenityDining: '戈壁绿洲餐厅与观景酒廊',
      amenityDiningDesc: '提供原生态高品质羊肉牛排、蒙古特色奶食、精选西餐及素食菜单，现磨香浓咖啡。',
      amenityStargazing: '星空观测平台与高倍天文望远镜',
      amenityStargazingDesc: '零光污染极净夜空，近距离观测壮丽银河星海、土星光环与深空星云。',
      amenitySafari: '硬派越野巡游与双峰驼骑行',
      amenitySafariDesc: '骑乘双峰骆驼漫步金色鸣沙山看日落，四驱巡洋舰车队直达世界级恐龙化石产区。',
      amenitySolar: '100% 环保太阳能系统',
      amenitySolarDesc: '静音无污染24小时全天候绿电供应，配合深井矿物质水源深度净化系统。',
      amenityWifi: 'Starlink 高速卫星Wi-Fi',
      amenityWifiDesc: '即使身处戈壁腹地，也能随时享受高速卫星宽带，畅享即时沟通。',
      amenityFieldBase: '古生物科考专业大本营',
      amenityFieldBaseDesc: '配备现场化石标本阅览室、安全讲座厅与资深多语种向导团队。',
      bookStayBtn: '预订营地客房 / 蒙古包',
      inquireBtn: '咨询营地详情',
      coordinatesLabel: 'GPS 坐标',
      directionsLabel: '抵达路线',
      directionsValue: '前往巴特尔故乡（Батаарын өлгий）旅游营地的抵达路线全程为390公里，配备专业硬派4x4越野车接送服务。',
      photoGalleryTitle: '营地风光与设施图集',
    },
    booking: {
      modalTitle: '预订戈壁古生物科考探险',
      modalSubtitle: '与顶尖学者同行，亲临白垩纪恐龙化石与戈壁野生动物圣地',
      packageLabel: '选择科考方案',
      fullNameLabel: '探险队员姓名',
      emailLabel: '电子邮箱',
      phoneLabel: '联系电话 / 微信',
      dateLabel: '意向出行月份',
      guestsLabel: '随行人数',
      notesLabel: '特殊需求与科研兴趣',
      submitBtn: '提交科考预订申请',
      successMsg: '科考探险申请已成功提交！',
    },
    appFeatures: {
      installApp: '巴特尔的摇篮 移动应用',
      installDesc: '支持作为PWA原生应用安装至手机或电脑桌面，即使在戈壁沙漠无网络信号环境下也能离线浏览化石标本、语音解说与科考地图。',
      installActionBtn: '📱 安装到手机/桌面 (PWA)',
      offlineModeTitle: '戈壁沙漠离线科考模式',
      offlineModeDesc: '化石标本、高清图片与语音数据均已本地缓存，断网也能无忧使用。',
      offlineReadyBadge: '⚡ 离线可用 PWA',
      myJournalTitle: '我的科考手记与收藏',
      myJournalDesc: '已收藏的恐龙标本、虚拟发掘认证证书及随行科研记录。',
      savedItems: '已收藏标本',
      noSavedItems: '暂无收藏标本。点击恐龙图鉴中的五角星即可离线收藏！',
      quickNavHome: '首页',
      quickNavDino: '图鉴',
      quickNavLeopard: '雪豹',
      quickNavLandscape: '戈壁',
      quickNavDig: '发掘',
      quickNavApp: '应用',
      iosInstructions: '在 Safari 中点击“分享”按钮，然后选择“添加到主屏幕”即可完成安装。',
      androidInstructions: '点击“安装应用”或浏览器弹窗，即可添加至手机主屏幕直接运行。',
      desktopInstructions: '点击浏览器地址栏右侧的“安装”图标，即可作为桌面独立应用运行。',
      appVersion: '版本 2.4.0 (PWA & Offline Enabled)',
      clearStorage: '清除离线缓存',
      noRegistrationBadge: '🛡️ 无需注册（完全免费·即开即用）',
      instantOpenBtn: '✨ 直接开启（无需任何账号）',
    },
    footer: {
      missionTitle: '巴特尔摇篮的崇高使命',
      missionDesc: '守护与弘扬蒙古戈壁数千万年的史前恐龙自然遗产与现存雪豹生灵，启迪人类与自然的和谐共生。',
      quickLinks: '快速链接',
      heritageProtection: '遗产保护声明',
      protectionText: '所有出土恐龙化石与野生雪豹均受蒙古国最高国家法律保护。',
      rightsReserved: '© 2026 巴特尔的摇篮 | 版权所有',
    },
  },
  ko: koTranslation,
  de: deTranslation,
  fr: frTranslation,
  ru: ruTranslation,
};
