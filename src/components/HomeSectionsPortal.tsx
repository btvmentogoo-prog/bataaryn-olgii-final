import React from 'react';
import { Language, PageId } from '../types';
import { getLocalizedText } from '../utils/localization';
import { ArrowRight, Compass, Tent, Bone, Map, Sparkles, Mountain, ScrollText, Pickaxe, CloudSun, Building2 } from 'lucide-react';
import officialDinoImg from '../assets/images/tarbosaurus_bataar_live_1788078516313.jpg';
import officialCampImg from '../assets/images/bataar_camp_exact_official.jpg';
import officialLandscapeImg from '../assets/images/khermen_tsav_canyon_1788058798021.jpg';
import officialLeopardImg from '../assets/images/gobi_snow_leopard_ridge_1788084150553.jpg';
import officialSaxaulImg from '../assets/images/gobi_saxaul_dunes_1788058828050.jpg';

interface HomeSectionsPortalProps {
  currentLang: Language;
  onSelectPage: (page: PageId) => void;
}

export const HomeSectionsPortal: React.FC<HomeSectionsPortalProps> = ({
  currentLang,
  onSelectPage,
}) => {
  const [campImg, setCampImg] = React.useState<string>(officialCampImg);

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.indexedDB) {
        const req = indexedDB.open('bataar_media_db', 1);
        req.onsuccess = () => {
          const db = req.result;
          if (db.objectStoreNames.contains('videos')) {
            const tx = db.transaction('videos', 'readonly');
            const getReq = tx.objectStore('videos').get('camp_panorama');
            getReq.onsuccess = () => {
              if (getReq.result) {
                setCampImg(URL.createObjectURL(getReq.result));
              }
            };
          }
        };
      }
    } catch (_) {}
  }, []);

  const pages: {
    id: PageId;
    icon: React.ReactNode;
    tag: string;
    title: Record<string, string>;
    desc: Record<string, string>;
    image: string;
  }[] = [
    {
      id: 'accommodations',
      icon: <Tent className="w-4 h-4 text-stone-900" />,
      tag: 'Sanctuary Basecamp',
      title: {
        mn: 'Өрөө сууц & Батаарын өлгий жуулчны бааз',
        en: 'Accommodations & Basecamp',
        ja: '宿泊施設・ラグジュアリーゲル',
        zh: '巴特尔营地与豪华蒙古包',
      },
      desc: {
        mn: 'Тансаг зэрэглэлийн гэр буудал, угаалтуур, ресторан, хээрийн тав тух болон захиалгын мэдээлэл.',
        en: 'Luxury nomadic gers, private en-suite amenities, desert dining, and campsite reservations.',
        ja: 'プライベート水回り完備の特製ゲル、遊牧文化と現代の快適さを両立したベースキャンプ。',
        zh: '五星级定制蒙古包、沙漠星空晚宴与专业科考后勤服务。',
      },
      image: campImg,
    },
    {
      id: 'expeditions',
      icon: <Compass className="w-4 h-4 text-stone-900" />,
      tag: 'Guided Expeditions',
      title: {
        mn: 'Хээрийн аяллууд & Олон өдрийн экспедиц',
        en: 'Guided Paleontological Expeditions',
        ja: '古生物発掘・探検ツアー',
        zh: '古生物科考与沙漠探险',
      },
      desc: {
        mn: 'Шинжлэх ухааны хөтөчтэй 5-14 өдрийн малтлага, Хэрмэн цав, Немегт, Алтан уул аяллууд.',
        en: '5 to 14-day fully-supported field missions into Khermen Tsav, Nemegt, and Altan Uul.',
        ja: '白亜紀の地層を巡るヘルメン・ツァフ、ネメグト渓谷への本格的探検ルート。',
        zh: '专家领队深入白垩纪红崖与黑尔缅察夫腹地。',
      },
      image: officialSaxaulImg,
    },
    {
      id: 'dinosaurs',
      icon: <Bone className="w-4 h-4 text-stone-900" />,
      tag: 'Prehistoric Fauna',
      title: {
        mn: 'Говийн үлэг гүрвэлүүд & Олдворын галерей',
        en: 'Gobi Dinosaurs & Fossil Gallery',
        ja: 'ゴビ恐竜化石アーカイブ',
        zh: '戈壁白垩纪恐龙化石库',
      },
      desc: {
        mn: 'Тарбозавр, Дейнохейрус, Протоцератопс зэрэг ховор нандин олдворууд, 3D араг яс, аудио хөтөч.',
        en: 'Legendary apex predators, complete skeletons, anatomical models, and expert audio guides.',
        ja: 'タルボサウルス、デイノケイルスなど世界有数の白亜紀化石コレクション。',
        zh: '暴龙科肉食霸主、巨臂手盗龙与完整骨骼珍品。',
      },
      image: officialDinoImg,
    },
    {
      id: 'maps',
      icon: <Map className="w-4 h-4 text-stone-900" />,
      tag: 'Interactive Cartography',
      title: {
        mn: 'Говийн палеонтологийн интерактив газрын зураг',
        en: 'Interactive Cretaceous Map',
        ja: '白亜紀ゴビ砂漠地図',
        zh: '戈壁古生物交互地图',
      },
      desc: {
        mn: 'Хэрмэн цав, Баянзаг, Төгрөгийн ширээ, Бүгийн цав зэрэг малтлагын цэгүүд, Google Maps замууд.',
        en: 'Explore major fossil beds across South Gobi with precise GPS coordinates and routing.',
        ja: '南ゴビの主要発掘地、地層データ、ルート案内を統合したインタラクティブ地図。',
        zh: '高精度GPS标定著名发掘点与科考越野路线。',
      },
      image: officialLandscapeImg,
    },
    {
      id: 'snow-leopard',
      icon: <Sparkles className="w-4 h-4 text-stone-900" />,
      tag: 'Wildlife Sanctuary',
      title: {
        mn: 'Цоохор ирвэсийн өлгий нутаг & Амьд байгаль',
        en: 'Living Snow Leopard Sanctuary',
        ja: 'ユキヒョウの生息地と野生保護',
        zh: '雪豹家园与戈壁野生动物',
      },
      desc: {
        mn: 'Нөмрөг, Тост тосон бумбын нурууны ирвэс, зэрлэг ан амьтдын камерын бичлэг, судалгаа.',
        en: 'Camera-trap telemetry, habitat corridors, and ecological conservation in the Tost Mountains.',
        ja: 'トスト山脈のユキヒョウ調査、自動撮影カメラの観測記録と保護活動。',
        zh: '托斯特山脉自动红外相机监测与生境保护项目。',
      },
      image: officialLeopardImg,
    },
    {
      id: 'landscapes',
      icon: <Mountain className="w-4 h-4 text-stone-900" />,
      tag: 'Earth Monuments',
      title: {
        mn: 'Хэрмэн цав & Говийн байгалийн гайхамшиг',
        en: 'Khermen Tsav & Gobi Landscapes',
        ja: 'ヘルメン・ツァフと大峡谷の絶景',
        zh: '黑尔缅察夫大峡谷地质奇观',
      },
      desc: {
        mn: 'Улаан цав цанхаа, Загийн ой, Баянзагийн улаан хадан хясаа, алдарт элсэн манхан.',
        en: 'Red sandstone cathedrals, ancient Saxaul forests, and towering dunes carved by Cretaceous winds.',
        ja: '太古の風が刻んだ赤い断崖、サクサウールの原生林、広大な砂丘群。',
        zh: '红砂岩大峡谷、古老梭梭林与广袤鸣沙山。',
      },
      image: officialLandscapeImg,
    },
    {
      id: 'bataar-story',
      icon: <ScrollText className="w-4 h-4 text-stone-900" />,
      tag: 'Heritage Repatriation',
      title: {
        mn: 'Тарбозавр Батаарын эх орондоо буцаж ирсэн түүх',
        en: 'The Bataar Repatriation Epic',
        ja: 'バタール奪還の歴史的記録',
        zh: '特暴龙巴特尔重返祖国历程',
      },
      desc: {
        mn: 'Хулгайлагдсан үлэг гүрвэлийг Нью-Йоркийн дуудлага худалдаанаас эх оронд нь эгүүлэн авчирсан ялалт.',
        en: 'The landmark international legal battle that returned Mongolia’s national treasure home.',
        ja: 'ニューヨークの競売場から祖国モンゴルへと奇跡の帰還を果たした不朽の軌跡。',
        zh: '跨国司法追索，成功追缴被盗化石的里程碑事件。',
      },
      image: officialDinoImg,
    },
    {
      id: 'virtual-lab',
      icon: <Pickaxe className="w-4 h-4 text-stone-900" />,
      tag: 'Interactive Science',
      title: {
        mn: 'Хээрийн малтлагын лаборатори & Симулятор',
        en: 'Virtual Excavation & Science Lab',
        ja: 'バーチャル発掘シミュレーター',
        zh: '虚拟化石发掘模拟实验室',
      },
      desc: {
        mn: 'Интерактив 4х4 газрын хэвлийгээс чулуужсан яс малтах, тодорхойлох бодит симулятор.',
        en: 'Interactive excavation grid, specialized tools, brushing, and fossil identification.',
        ja: 'ブラシやハンマーを使い、砂岩から骨格を慎重に掘り起こす体験型ラボ。',
        zh: '互动式挖掘网格、除尘与骨骼标本鉴定模拟体验。',
      },
      image: officialCampImg,
    },
    {
      id: 'weather',
      icon: <CloudSun className="w-4 h-4 text-stone-900" />,
      tag: 'Expedition Weather',
      title: {
        mn: 'Говийн цаг агаар ба Аяллын төлөв',
        en: 'Real-Time Gobi Weather',
        ja: 'ゴビ砂漠リアルタイム気象',
        zh: '戈壁实时气象与出行预测',
      },
      desc: {
        mn: 'Хэрмэн цав, Гурвантэс сумын бодит цаг агаар, салхины хурд, 7 хоногийн экспедицийн төлөв.',
        en: 'Live telemetry from Gurvantes & Khermen Tsav, temperature, wind, and expedition advisories.',
        ja: 'グルバンテスおよび主要探検地のリアルタイム気温・風速と週間予報。',
        zh: '黑尔缅察夫与古尔班特斯实时温度风向与出行建议。',
      },
      image: officialLandscapeImg,
    },
    {
      id: 'collaborations',
      icon: <Building2 className="w-4 h-4 text-stone-900" />,
      tag: 'Academic Partnerships',
      title: {
        mn: 'Олон улсын эрдэм шинжилгээний түншлэл',
        en: 'Scientific Collaborations',
        ja: '国際学術研究パートナーシップ',
        zh: '国际学术科研与合作机构',
      },
      desc: {
        mn: 'Монгол Улсын Шинжлэх ухааны академи, AMNH, Польшийн ШУА, ОХУ, Японы хамтарсан судалгаа.',
        en: 'Key joint missions with MAS, American Museum of Natural History, and global academies.',
        ja: 'モンゴル科学アカデミー、アメリカ自然史博物館、ポーランド科学アカデミーとの共同研究。',
        zh: '蒙古国科学院、美国自然历史博物馆与全球古生物科研合作。',
      },
      image: officialCampImg,
    },
  ];

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500 mb-2">
            Sanctuary Sections & Portals
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.08] mb-4">
            {currentLang === 'mn' ? 'Цогцолборын бүх хэсгүүдийг тусад нь судлах' : 'Explore Dedicated Sanctuary Portals'}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            {currentLang === 'mn'
              ? 'Та доорх хэсгүүдээс хүссэн сэдвээ сонгон дарж, тусдаа бие даасан хуудсаар бүрэн дэлгэрэнгүйгээр нь үзэх боломжтой.'
              : 'Select any portal below to navigate to its dedicated, full-screen sanctuary section.'}
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className="group bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={page.image}
                  alt={getLocalizedText(page.title, currentLang)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#FAF9F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-stone-800 border border-stone-200 flex items-center gap-1.5">
                  {page.icon}
                  <span>{page.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-stone-900 group-hover:text-stone-700 transition leading-snug mb-3">
                    {getLocalizedText(page.title, currentLang)}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3 mb-6">
                    {getLocalizedText(page.desc, currentLang)}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900 uppercase tracking-wider group-hover:text-stone-700">
                  <span>{currentLang === 'mn' ? 'Тусдаа хуудас нээх' : 'Open Dedicated Page'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
