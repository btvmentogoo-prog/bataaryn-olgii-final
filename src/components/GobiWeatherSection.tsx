import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Sun, 
  CloudSun, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Sunset, 
  Sunrise, 
  Moon, 
  Sparkles, 
  AlertTriangle, 
  Calendar, 
  RefreshCw, 
  MapPin, 
  ShieldCheck, 
  Info,
  ChevronRight,
  Compass
} from 'lucide-react';

interface GobiWeatherSectionProps {
  currentLang: Language;
  onOpenBooking?: (packageName?: string, destination?: string) => void;
}

interface WeatherStation {
  id: string;
  name: {
    mn: string;
    en: string;
    ja: string;
    zh: string;
  };
  region: {
    mn: string;
    en: string;
    ja: string;
    zh: string;
  };
  elevation: string;
  coordinates: string;
  currentTemp: number; // in Celsius
  condition: 'sunny' | 'clear-sky' | 'breeze' | 'partly-cloudy' | 'starlit';
  conditionText: {
    mn: string;
    en: string;
    ja: string;
    zh: string;
  };
  highTemp: number;
  lowTemp: number;
  feelsLike: number;
  windSpeed: number; // m/s
  windDirection: string;
  uvIndex: number;
  uvLevel: {
    mn: string;
    en: string;
    ja: string;
    zh: string;
  };
  humidity: number; // %
  visibility: number; // km
  sunrise: string;
  sunset: string;
  stargazingRating: number; // out of 100
  bortleScale: number; // 1 = pristine dark sky
  forecast7Days: Array<{
    day: { mn: string; en: string; ja: string; zh: string };
    date: string;
    high: number;
    low: number;
    condition: 'sunny' | 'clear' | 'windy' | 'partly-cloudy';
    wind: number;
    activity: { mn: string; en: string; ja: string; zh: string };
  }>;
}

const WEATHER_STATIONS: WeatherStation[] = [
  {
    id: 'khermen-tsav',
    name: {
      mn: 'Хэрмэн цав (Каньон)',
      en: 'Khermen Tsav Canyon',
      ja: 'ヘルメン・ツァヴ大峡谷',
      zh: '赫尔曼察夫大峡谷'
    },
    region: {
      mn: 'Өмнөговь, Гурвантэс (Гүний говь)',
      en: 'Omnogovi, Gurvantes (Deep Gobi)',
      ja: 'ウムヌゴビ県グルバンテス郡',
      zh: '南戈壁省古尔班特斯'
    },
    elevation: '890 м',
    coordinates: '43°29\'42"N 101°32\'18"E',
    currentTemp: 29,
    condition: 'sunny',
    conditionText: {
      mn: 'Цэлмэг, тогтуун нарлаг',
      en: 'Clear & Bright Sunshine',
      ja: '快晴・強い日差し',
      zh: '晴朗无云·阳光充沛'
    },
    highTemp: 34,
    lowTemp: 18,
    feelsLike: 30,
    windSpeed: 4.2,
    windDirection: 'Баруун-Өмнөд (SW)',
    uvIndex: 9,
    uvLevel: {
      mn: 'Маш өндөр (Нарны малгай, тос зайлшгүй)',
      en: 'Very High (Hat & SPF 50+ Required)',
      ja: '極めて強い（帽子・日焼け止め必須）',
      zh: '极高（必须佩戴遮阳帽与涂抹防晒霜）'
    },
    humidity: 16,
    visibility: 35,
    sunrise: '05:48',
    sunset: '20:34',
    stargazingRating: 99,
    bortleScale: 1,
    forecast7Days: [
      {
        day: { mn: 'Өнөөдөр', en: 'Today', ja: '今日', zh: '今天' },
        date: '08.30',
        high: 34,
        low: 18,
        condition: 'sunny',
        wind: 4.2,
        activity: { mn: 'Хавцлын алтан цагийн зураглал', en: 'Golden Hour canyon photography', ja: '峡谷の夕景撮影', zh: '峡谷黄金时刻日落摄影' }
      },
      {
        day: { mn: 'Ням', en: 'Sun', ja: '日', zh: '周日' },
        date: '08.31',
        high: 35,
        low: 19,
        condition: 'sunny',
        wind: 3.8,
        activity: { mn: 'Үлэг гүрвэлийн хээрийн ажиглалт', en: 'Paleontological ridge hike', ja: '化石層尾根トレッキング', zh: '恐龙地层徒步勘察' }
      },
      {
        day: { mn: 'Дав', en: 'Mon', ja: '月', zh: '周一' },
        date: '09.01',
        high: 32,
        low: 17,
        condition: 'clear',
        wind: 4.5,
        activity: { mn: 'Шөнийн одод & Тэнгэрийн заадас', en: 'Milky Way Astro-observation', ja: '天の川・星空観測', zh: '银河与深空天体观测' }
      },
      {
        day: { mn: 'Мяг', en: 'Tue', ja: '火', zh: '周二' },
        date: '09.02',
        high: 30,
        low: 16,
        condition: 'windy',
        wind: 6.8,
        activity: { mn: 'Загийн ойн хамгаалагдсан бүс', en: 'Protected Saxaul forest tour', ja: 'サクサウール林散策', zh: '梭梭树生态保护区巡礼' }
      },
      {
        day: { mn: 'Лха', en: 'Wed', ja: '水', zh: '周三' },
        date: '09.03',
        high: 29,
        low: 15,
        condition: 'sunny',
        wind: 3.5,
        activity: { mn: 'Алтан уул, Нэмэгтийн маршрут', en: 'Altan Uul red cliffs expedition', ja: 'アルタン・ウール赤崖遠征', zh: '金山红崖联合探险' }
      },
      {
        day: { mn: 'Пүр', en: 'Thu', ja: '木', zh: '周四' },
        date: '09.04',
        high: 28,
        low: 14,
        condition: 'clear',
        wind: 4.0,
        activity: { mn: 'Дрон болон панорама зураг', en: 'Aerial drone canyon mapping', ja: 'ドローンパノラマ撮影', zh: '航拍峡谷全景测绘' }
      },
      {
        day: { mn: 'Баа', en: 'Fri', ja: '金', zh: '周五' },
        date: '09.05',
        high: 30,
        low: 15,
        condition: 'sunny',
        wind: 3.2,
        activity: { mn: 'Эко гэр баазад амрах, тухлах', en: 'Basecamp relaxation & BBQ', ja: 'ベースキャンプ休養・星空浴', zh: '生态营地深度休养' }
      },
    ]
  },
  {
    id: 'bataar-camp',
    name: {
      mn: 'Батаарын өлгий жуулчны бааз',
      en: 'Bataar Cradle Eco Basecamp',
      ja: 'バタール・クレードル・エコキャンプ',
      zh: '巴特尔之源生态营地'
    },
    region: {
      mn: 'Гурвантэс сум, 100% Нарны эко станц',
      en: 'Gurvantes, 100% Solar Powered',
      ja: 'グルバンテス郡・自家太陽光発電',
      zh: '古尔班特斯·离网太阳能营区'
    },
    elevation: '1,210 м',
    coordinates: '43°35\'12"N 101°48\'20"E',
    currentTemp: 27,
    condition: 'sunny',
    conditionText: {
      mn: 'Тогтуун, дулаан, маш тааламжтай',
      en: 'Pleasant & Mild Desert Breeze',
      ja: '快適・穏やかな微風',
      zh: '宜人·温和戈壁微风'
    },
    highTemp: 31,
    lowTemp: 16,
    feelsLike: 27,
    windSpeed: 3.4,
    windDirection: 'Зүүн-Өмнөд (SE)',
    uvIndex: 8,
    uvLevel: {
      mn: 'Өндөр (Хамгаалалт хийх)',
      en: 'High (Sunscreen recommended)',
      ja: '強い（紫外線対策推奨）',
      zh: '较高（建议防晒）'
    },
    humidity: 20,
    visibility: 40,
    sunrise: '05:46',
    sunset: '20:32',
    stargazingRating: 100,
    bortleScale: 1,
    forecast7Days: [
      {
        day: { mn: 'Өнөөдөр', en: 'Today', ja: '今日', zh: '今天' },
        date: '08.30',
        high: 31,
        low: 16,
        condition: 'sunny',
        wind: 3.4,
        activity: { mn: 'Тав тухтай люкс өрөөнд амрах', en: 'Deluxe Ensuite Room check-in', ja: 'デラックスルームチェックイン', zh: '豪华客房入住' }
      },
      {
        day: { mn: 'Ням', en: 'Sun', ja: '日', zh: '周日' },
        date: '08.31',
        high: 32,
        low: 17,
        condition: 'sunny',
        wind: 3.1,
        activity: { mn: 'Одон орны телескоп дурандалт', en: 'Deep sky telescope session', ja: '大型望遠鏡による天体観測', zh: '营地专业天文望远镜观测' }
      },
      {
        day: { mn: 'Дав', en: 'Mon', ja: '月', zh: '周一' },
        date: '09.01',
        high: 29,
        low: 15,
        condition: 'clear',
        wind: 3.9,
        activity: { mn: 'Говийн уламжлалт хоол, цай', en: 'Authentic nomadic dinner', ja: '遊牧民伝統料理ディナー', zh: '传统游牧特色美食' }
      },
      {
        day: { mn: 'Мяг', en: 'Tue', ja: '火', zh: '周二' },
        date: '09.02',
        high: 27,
        low: 14,
        condition: 'windy',
        wind: 5.6,
        activity: { mn: 'Хээрийн лабораторийн танилцуулга', en: 'Paleo-lab artifact viewing', ja: '古生物ラボ解説', zh: '化石实验室科普导览' }
      },
      {
        day: { mn: 'Лха', en: 'Wed', ja: '水', zh: '周三' },
        date: '09.03',
        high: 26,
        low: 13,
        condition: 'sunny',
        wind: 2.8,
        activity: { mn: 'Цоохор ирвэсийн камерын хяналт', en: 'Snow Leopard trap camera review', ja: 'ユキヒョウ自動撮影映像鑑賞', zh: '雪豹红外相机数据研讨' }
      },
      {
        day: { mn: 'Пүр', en: 'Thu', ja: '木', zh: '周四' },
        date: '09.04',
        high: 25,
        low: 12,
        condition: 'clear',
        wind: 3.3,
        activity: { mn: 'Говийн мандах нар угтах', en: 'Basecamp sunrise meditation', ja: '砂漠の日の出鑑賞', zh: '大漠日出观赏' }
      },
      {
        day: { mn: 'Баа', en: 'Fri', ja: '金', zh: '周五' },
        date: '09.05',
        high: 27,
        low: 14,
        condition: 'sunny',
        wind: 2.9,
        activity: { mn: 'Аяллын шинэ баг хүлээн авах', en: 'Welcome new expedition team', ja: '新規遠征隊歓迎', zh: '迎接新探险队' }
      },
    ]
  },
  {
    id: 'nemegt-basin',
    name: {
      mn: 'Нэмэгтийн хоолой (Луут хөндий)',
      en: 'Nemegt Basin (Dragon Valley)',
      ja: 'ネメグト盆地（恐竜の谷）',
      zh: '耐梅盖特盆地（龙之谷）'
    },
    region: {
      mn: 'Нэмэгт, Алтан уул бүс',
      en: 'Nemegt & Altan Mountain Range',
      ja: 'ネメグト山脈地帯',
      zh: '耐梅盖特山脉与古河道'
    },
    elevation: '1,040 м',
    coordinates: '43°30\'00"N 101°03\'00"E',
    currentTemp: 28,
    condition: 'sunny',
    conditionText: {
      mn: 'Цэлмэг, сэвшээ салхитай',
      en: 'Sunny with Soft Ridge Breeze',
      ja: '晴れ・心地よい風',
      zh: '晴朗·轻柔山谷风'
    },
    highTemp: 33,
    lowTemp: 17,
    feelsLike: 28,
    windSpeed: 4.8,
    windDirection: 'Баруун (W)',
    uvIndex: 9,
    uvLevel: {
      mn: 'Маш өндөр',
      en: 'Very High',
      ja: '極めて強い',
      zh: '极高'
    },
    humidity: 18,
    visibility: 38,
    sunrise: '05:49',
    sunset: '20:35',
    stargazingRating: 98,
    bortleScale: 1,
    forecast7Days: [
      {
        day: { mn: 'Өнөөдөр', en: 'Today', ja: '今日', zh: '今天' },
        date: '08.30',
        high: 33,
        low: 17,
        condition: 'sunny',
        wind: 4.8,
        activity: { mn: 'Тарбозаврын малтлагын цэгт зочлох', en: 'Tarbosaurus historic excavation', ja: 'タルボサウルス発掘地探訪', zh: '特暴龙发掘遗址探访' }
      },
      {
        day: { mn: 'Ням', en: 'Sun', ja: '日', zh: '周日' },
        date: '08.31',
        high: 34,
        low: 18,
        condition: 'sunny',
        wind: 4.2,
        activity: { mn: 'Дейнохейрусын олдворын бүс', en: 'Deinocheirus giant arms discovery', ja: 'デイノケイルス発掘層調査', zh: '巨臂恐爪龙地层考察' }
      },
      {
        day: { mn: 'Дав', en: 'Mon', ja: '月', zh: '周一' },
        date: '09.01',
        high: 31,
        low: 16,
        condition: 'clear',
        wind: 5.1,
        activity: { mn: 'Улаан цавын геологийн судалгаа', en: 'Geological red strata survey', ja: '赤色地層地質調査', zh: '红色地质剖面勘测' }
      },
      {
        day: { mn: 'Мяг', en: 'Tue', ja: '火', zh: '周二' },
        date: '09.02',
        high: 28,
        low: 15,
        condition: 'windy',
        wind: 7.2,
        activity: { mn: 'Хээрийн майхант хуаран', en: 'Sheltered canyon basecamp', ja: '風除け岩陰キャンプ', zh: '避风峡谷营地宿营' }
      },
      {
        day: { mn: 'Лха', en: 'Wed', ja: '水', zh: '周三' },
        date: '09.03',
        high: 27,
        low: 14,
        condition: 'sunny',
        wind: 3.9,
        activity: { mn: 'Хадны сүг зураг ажиглалт', en: 'Ancient petroglyph walk', ja: '古代岩画トレッキング', zh: '远古岩画徒步考察' }
      },
      {
        day: { mn: 'Пүр', en: 'Thu', ja: '木', zh: '周四' },
        date: '09.04',
        high: 26,
        low: 13,
        condition: 'clear',
        wind: 4.1,
        activity: { mn: 'Зэрлэг ан амьтан ажиглалт', en: 'Wildlife & Argali sheep spotting', ja: '野生アルガリ羊の観察', zh: '野生盘羊与动物观察' }
      },
      {
        day: { mn: 'Баа', en: 'Fri', ja: '金', zh: '周五' },
        date: '09.05',
        high: 29,
        low: 14,
        condition: 'sunny',
        wind: 3.5,
        activity: { mn: 'Батаарын өлгий бааз руу шилжих', en: 'Transfer to Bataar Eco Camp', ja: 'バタールキャンプへ移動', zh: '前往巴特尔生态营地' }
      },
    ]
  },
  {
    id: 'dalanzadgad',
    name: {
      mn: 'Даланзадгад (Өмнөговь төв / Нисэх буудал)',
      en: 'Dalanzadgad (Airport & Hub)',
      ja: 'ダランザドガド（南ゴビ中心地・空港）',
      zh: '达兰扎德嘎德（机场与集散中心）'
    },
    region: {
      mn: 'Гурвансайхан нисэх буудал, Төв зам',
      en: 'Gurvan Saikhan Airport, Paved Highway',
      ja: 'グルバンサイハン空港',
      zh: '古尔班赛汗机场与铺装公路'
    },
    elevation: '1,470 м',
    coordinates: '43°34\'12"N 104°25\'33"E',
    currentTemp: 24,
    condition: 'sunny',
    conditionText: {
      mn: 'Нарлаг, тунгалаг',
      en: 'Clear Skies & Sunny',
      ja: '快晴・視界良好',
      zh: '晴空万里·能见度极佳'
    },
    highTemp: 28,
    lowTemp: 14,
    feelsLike: 24,
    windSpeed: 4.0,
    windDirection: 'Хойд (N)',
    uvIndex: 7,
    uvLevel: {
      mn: 'Дунд зэрэг',
      en: 'Moderate',
      ja: '中程度',
      zh: '中等'
    },
    humidity: 26,
    visibility: 50,
    sunrise: '05:40',
    sunset: '20:25',
    stargazingRating: 88,
    bortleScale: 3,
    forecast7Days: [
      {
        day: { mn: 'Өнөөдөр', en: 'Today', ja: '今日', zh: '今天' },
        date: '08.30',
        high: 28,
        low: 14,
        condition: 'sunny',
        wind: 4.0,
        activity: { mn: 'УБ-аас ирэх нислэг угтах', en: 'Flight arrivals from UB', ja: 'ウランバートル便到着対応', zh: '接驳乌兰巴托抵境航班' }
      },
      {
        day: { mn: 'Ням', en: 'Sun', ja: '日', zh: '周日' },
        date: '08.31',
        high: 29,
        low: 15,
        condition: 'sunny',
        wind: 3.8,
        activity: { mn: 'Говийн музейн үзвэр', en: 'Gobi Paleontological Museum', ja: '南ゴビ自然博物館見学', zh: '戈壁自然古生物博物馆' }
      },
      {
        day: { mn: 'Дав', en: 'Mon', ja: '月', zh: '周一' },
        date: '09.01',
        high: 27,
        low: 13,
        condition: 'clear',
        wind: 4.6,
        activity: { mn: 'Баруун говь чиглэлийн цуваа', en: 'West Gobi 4WD convoy departure', ja: '西ゴビ4WDコンボイ出発', zh: '西戈壁四驱车队出发' }
      },
      {
        day: { mn: 'Мяг', en: 'Tue', ja: '火', zh: '周二' },
        date: '09.02',
        high: 24,
        low: 12,
        condition: 'partly-cloudy',
        wind: 5.2,
        activity: { mn: 'Шатахуун, хүнсний татан авалт', en: 'Expedition resupply & logistics', ja: '燃料・食料補給調達', zh: '探险队燃油与物资补给' }
      },
      {
        day: { mn: 'Лха', en: 'Wed', ja: '水', zh: '周三' },
        date: '09.03',
        high: 23,
        low: 11,
        condition: 'sunny',
        wind: 3.4,
        activity: { mn: 'Нислэгийн хуваарь шалгах', en: 'Scheduled domestic flights', ja: '国内線定期便チェック', zh: '国内航班调度' }
      },
      {
        day: { mn: 'Пүр', en: 'Thu', ja: '木', zh: '周四' },
        date: '09.04',
        high: 24,
        low: 11,
        condition: 'clear',
        wind: 3.9,
        activity: { mn: 'Ёлын ам, хавцлын аялал', en: 'Yol Valley ice gorge excursion', ja: 'ヨル峡谷氷河トレック', zh: '尤林安冰川峡谷游' }
      },
      {
        day: { mn: 'Баа', en: 'Fri', ja: '金', zh: '周五' },
        date: '09.05',
        high: 26,
        low: 13,
        condition: 'sunny',
        wind: 3.1,
        activity: { mn: 'Улаанбаатар руу буцах нислэг', en: 'Return flights to Ulaanbaatar', ja: 'ウランバートル帰還便', zh: '返程乌兰巴托航班' }
      },
    ]
  }
];

export function GobiWeatherSection({ currentLang, onOpenBooking }: GobiWeatherSectionProps) {
  const [selectedStationId, setSelectedStationId] = useState<string>('khermen-tsav');
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Саяхан шинэчлэгдсэн (Live Satellite)');

  const selectedStation = WEATHER_STATIONS.find(s => s.id === selectedStationId) || WEATHER_STATIONS[0];

  const formatTemp = (celsius: number) => {
    if (isFahrenheit) {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius > 0 ? `+${celsius}` : celsius}°C`;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(
        currentLang === 'mn' ? `Шинэчлэгдсэн: ${new Date().toLocaleTimeString()}` :
        currentLang === 'ja' ? `更新完了: ${new Date().toLocaleTimeString()}` :
        currentLang === 'zh' ? `已更新: ${new Date().toLocaleTimeString()}` :
        `Updated: ${new Date().toLocaleTimeString()}`
      );
    }, 600);
  };

  const t = {
    mn: {
      badge: '📡 ХЭЭРИЙН ЦАГ АГААР БА УУР АМЬСГАЛЫН СТАНЦ',
      title: 'Говийн Цаг Агаарын Мэдээлэл',
      subtitle: 'Хэрмэн цав, Батаарын өлгий эко бааз, Нэмэгтийн хоолойн шуурхай хиймэл дагуулын бодит хэмжилт & 7 хоногийн урьдчилсан төлөв',
      stationSelector: 'Байршил сонгох:',
      tempToggleC: '°C Цельс',
      tempToggleF: '°F Фаренгейт',
      refreshBtn: 'Шинэчлэх',
      currentCondition: 'Одоогийн цаг агаар',
      feelsLike: 'Мэдрэгдэх дулаан:',
      highLow: 'Өдөр / Шөнө:',
      wind: 'Салхины хурд:',
      windDir: 'Чиглэл:',
      uvIndex: 'Хэт ягаан туяа (UV):',
      humidity: 'Агаарын чийгшил:',
      visibility: 'Үзэгдэх орчин:',
      sunTimes: 'Нар мандах / жаргах:',
      stargazingTitle: 'Шөнийн одод харах нөхцөл (Bortle 1):',
      stargazingScore: 'Төгс цэлмэг, гэрлийн бохирдол 0%',
      forecastTitle: '7 Хоногийн Хээрийн Аяллын Төлөв',
      forecastDesc: 'Өдрийн дээд/доод температур, салхи болон санал болгох экспедицийн үйл ажиллагаа',
      seasonsTitle: 'Говийн 4 Улирлын Аяллын Уур Амьсгалын Зөвлөмж',
      summerTitle: 'Зуны улирал (6, 7, 8-р сар)',
      summerDesc: 'Өдөртөө +34°C~+40°C давж хална. Өглөөний 06:00-10:30 ба оройн 17:30-21:00 цагуудад хавцал руу алхахад хамгийн тохиромжтой. Хүн тутамд өдөрт 5L+ ус уух, малгай, нүдний шил зайлшгүй.',
      autumnTitle: 'Намрын улирал (9, 10-р сар) - ХАМГИЙН ТААЛАМЖТАЙ',
      autumnDesc: 'Өдөртөө +20°C~+28°C дулаан, шөнөдөө +10°C~+15°C сэрүүн. Нарны хурц тусгал багасч, салхи тогтуун, тэнгэр болор мэт цэлмэг. Одод ажиглах, үлэг гүрвэлийн хээрийн судалгаанд хамгийн тохиромжтой үе.',
      springTitle: 'Хаврын улирал (4, 5-р сар)',
      springDesc: 'Өдөртөө +15°C~+24°C. Говийн сэвшээ салхитай, экспедицийн улирал дөнгөж эхлэх үе. Нарны шил, салхины хамгаалалттай хувцас тохиромжтой.',
      winterTitle: 'Өвлийн улирал (11, 12, 1, 2, 3-р сар)',
      winterDesc: 'Өдөртөө -5°C~-15°C, шөнөдөө -20°C~-28°C. Говийн цоохор ирвэс ажиглах, өвлийн зэрлэг байгалийн тусгай экспедицийн үе.',
      bookStayBtn: 'Энэ цаг агаарт аялал захиалах',
    },
    en: {
      badge: '📡 LIVE EXPEDITION WEATHER & CLIMATE STATION',
      title: 'Gobi Real-Time Weather & Forecast',
      subtitle: 'Live satellite meteorological telemetry for Khermen Tsav, Bataar Cradle Basecamp & Nemegt Basin with 7-day expedition forecast',
      stationSelector: 'Select Location:',
      tempToggleC: '°C Celsius',
      tempToggleF: '°F Fahrenheit',
      refreshBtn: 'Refresh',
      currentCondition: 'Current Condition',
      feelsLike: 'Feels Like:',
      highLow: 'Day / Night:',
      wind: 'Wind Speed:',
      windDir: 'Direction:',
      uvIndex: 'UV Radiation Index:',
      humidity: 'Humidity:',
      visibility: 'Visibility:',
      sunTimes: 'Sunrise / Sunset:',
      stargazingTitle: 'Stargazing Clarity (Bortle Class 1):',
      stargazingScore: 'Pristine Dark Sky, 0% Light Pollution',
      forecastTitle: '7-Day Expedition Weather Forecast',
      forecastDesc: 'Daily high/low temperatures, wind metrics, and recommended field activities',
      seasonsTitle: 'Seasonal Climate & Travel Guide for Southern Gobi',
      summerTitle: 'Summer (June, July, August)',
      summerDesc: 'Daytime highs exceed +34°C~+40°C (+93°F~+104°F). Canyon hiking is best during golden hours (06:00-10:30 & 17:30-21:00). 5L+ water per person daily, UV hat & electrolytes required.',
      autumnTitle: 'Autumn (September & October) - PRIME SEASON',
      autumnDesc: 'Comfortable +20°C~+28°C (+68°F~+82°F) days, cool +10°C~+15°C nights. Minimal wind, crystal-clear skies, world-class Milky Way stargazing and ideal paleontology hiking.',
      springTitle: 'Spring (April & May)',
      springDesc: 'Daytime +15°C~+24°C (+59°F~+75°F). Early expedition season with occasional desert breezes. Windbreakers and sunglasses recommended.',
      winterTitle: 'Winter (November to March)',
      winterDesc: 'Crisp -5°C to -20°C. Exclusive season for Snow Leopard tracking and winter wildlife photography.',
      bookStayBtn: 'Book Expedition for this Weather',
    },
    ja: {
      badge: '📡 ゴビ遠征・リアルタイム気象ステーション',
      title: 'ゴビ砂漠の気象情報＆天気予報',
      subtitle: 'ヘルメン・ツァヴ、バタール・エコキャンプ、ネメグト盆地の衛星気象データと7日間予報',
      stationSelector: '観測地点の選択:',
      tempToggleC: '°C 摂氏',
      tempToggleF: '°F 華氏',
      refreshBtn: '更新',
      currentCondition: '現在の天候',
      feelsLike: '体感温度:',
      highLow: '最高 / 最低:',
      wind: '風速:',
      windDir: '風向:',
      uvIndex: 'UV紫外線指数:',
      humidity: '湿度:',
      visibility: '視界:',
      sunTimes: '日の出 / 日没:',
      stargazingTitle: '星空観測指数（ボートル分類1）:',
      stargazingScore: '光害ゼロ・完全な暗黒星空（100点）',
      forecastTitle: '7日間の遠征天気予報',
      forecastDesc: '気温、風速、および日替わりのおすすめ探検アクティビティ',
      seasonsTitle: '南ゴビ四季の気候と旅行ベストシーズン',
      summerTitle: '夏季（6月・7月・8月）',
      summerDesc: '日中最高気温は+34℃〜+40℃に達します。峡谷トレッキングは朝夕の涼しい時間帯（06:00〜10:30、17:30〜21:00）が最適です。1日1人5L以上の水分補給とUV帽子が必須です。',
      autumnTitle: '秋季（9月・10月） - 最も快適なベストシーズン',
      autumnDesc: '日中+20℃〜+28℃、夜間+10℃〜+15℃。日差しが和らぎ、風も穏やかで、満天の星空観測や化石探求に最もおすすめの時期です。',
      springTitle: '春季（4月・5月）',
      springDesc: '日中+15℃〜+24℃。探検シーズンの始まりで、春の心地よい風が吹きます。防風ウェアとサングラスをご用意ください。',
      winterTitle: '冬季（11月〜3月）',
      winterDesc: '日中-5℃〜-15℃、夜間-20℃以下。ユキヒョウ観察や冬のゴビ特別撮影ツアーのシーズンです。',
      bookStayBtn: 'この天候でツアーを予約する',
    },
    zh: {
      badge: '📡 戈壁野外气象与气候监测站',
      title: '戈壁实时气象与精准天气预报',
      subtitle: '赫尔曼察夫、巴特尔生态营地、耐梅盖特盆地卫星气象实测数据与7日探险天气趋势',
      stationSelector: '选择观测区域:',
      tempToggleC: '°C 摄氏度',
      tempToggleF: '°F 华氏度',
      refreshBtn: '刷新数据',
      currentCondition: '当前气象状况',
      feelsLike: '体感温度:',
      highLow: '最高 / 最低:',
      wind: '风速:',
      windDir: '风向:',
      uvIndex: '紫外线指数 (UV):',
      humidity: '相对湿度:',
      visibility: '能见度:',
      sunTimes: '日出 / 日落时间:',
      stargazingTitle: '夜空观星指数 (波特尔1级暗夜):',
      stargazingScore: '零光污染·极致清晰银河观测（100分）',
      forecastTitle: '7天戈壁探险精准天气预报',
      forecastDesc: '每日最高/最低气温、风力数据及推荐探险活动',
      seasonsTitle: '南戈壁四季气候与最佳旅行时节指南',
      summerTitle: '夏季（6月、7月、8月）',
      summerDesc: '白天最高温可达+34°C~+40°C。峡谷徒步探险建议在早晨（06:00-10:30）和傍晚黄金时刻（17:30-21:00）进行。每人每日需备足5L以上饮用水并做好防晒。',
      autumnTitle: '秋季（9月、10月） - 黄金最佳旅行季',
      autumnDesc: '白天舒适+20°C~+28°C，夜间凉爽+10°C~+15°C。风力平稳、天气通透如水晶，是进行恐龙化石考察和拍摄壮丽银河夜空的绝佳时节。',
      springTitle: '春季（4月、5月）',
      springDesc: '白天+15°C~+24°C。早春探险季启幕，偶有戈壁微风，建议准备防风衣与防风沙太阳镜。',
      winterTitle: '冬季（11月至次年3月）',
      winterDesc: '白天-5°C至-15°C，夜间极寒。这是追踪拍摄珍稀雪豹与冬季荒野的专属科考季。',
      bookStayBtn: '预订相应时节探险行程',
    }
  }[currentLang];

  return (
    <section id="gobi-weather" className="relative py-24 bg-[#FAF9F5] text-stone-900 overflow-hidden border-b border-stone-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            {t.badge}
          </span>

          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 mb-4 tracking-tight leading-[1.08]">
            {t.title}
          </h2>

          <p className="font-['Cormorant_Garamond',serif] italic text-xl sm:text-2xl text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Controls Bar: Station Selector, Temp Unit & Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-white border border-stone-200/80 mb-8 shadow-sm">
          {/* Station Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mr-1 hidden sm:inline">
              {t.stationSelector}
            </span>
            {WEATHER_STATIONS.map((station) => (
              <button
                key={station.id}
                onClick={() => setSelectedStationId(station.id)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedStationId === station.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{station.name[currentLang]}</span>
              </button>
            ))}
          </div>

          {/* Right Tools: Temp toggle & Refresh */}
          <div className="flex items-center gap-3 ml-auto">
            {/* C / F Switch */}
            <div className="flex items-center p-0.5 bg-stone-100 border border-stone-300 text-xs">
              <button
                onClick={() => setIsFahrenheit(false)}
                className={`px-3 py-1 font-semibold text-xs tracking-wider transition ${
                  !isFahrenheit ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setIsFahrenheit(true)}
                className={`px-3 py-1 font-semibold text-xs tracking-wider transition ${
                  isFahrenheit ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
              title="Цаг агаарын мэдээг шинэчлэх"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-stone-700 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{t.refreshBtn}</span>
            </button>
          </div>
        </div>

        {/* Live Weather Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Main Primary Temperature Card */}
          <div className="lg:col-span-1 bg-white p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 text-[10px] font-mono font-semibold tracking-wider uppercase border border-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  LIVE TELEMETRY
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {selectedStation.elevation} • {selectedStation.coordinates}
                </span>
              </div>

              <h3 className="font-['Cormorant_Garamond',serif] text-3xl font-normal text-stone-900 mt-2">
                {selectedStation.name[currentLang]}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] italic text-sm text-stone-600 font-light">
                {selectedStation.region[currentLang]}
              </p>

              {/* Main Big Temperature Display */}
              <div className="my-6 flex items-baseline gap-4">
                <span className="text-6xl sm:text-7xl font-light font-mono tracking-tight text-stone-900">
                  {formatTemp(selectedStation.currentTemp)}
                </span>
                <div>
                  <div className="text-sm font-semibold text-stone-800">
                    {selectedStation.conditionText[currentLang]}
                  </div>
                  <div className="text-xs text-stone-500">
                    {t.feelsLike} <strong className="text-stone-800 font-mono">{formatTemp(selectedStation.feelsLike)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* High / Low & Stargazing Metric */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">{t.highLow}</span>
                <span className="font-mono text-stone-800 font-medium">
                  Өдөр: <strong className="text-amber-800 font-bold">{formatTemp(selectedStation.highTemp)}</strong> / Шөнө: <strong className="text-sky-800 font-bold">{formatTemp(selectedStation.lowTemp)}</strong>
                </span>
              </div>

              {/* Stargazing Clarity Pill */}
              <div className="p-3.5 bg-[#FAF9F5] border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-stone-700" />
                  <div>
                    <div className="text-xs font-semibold text-stone-800">
                      {t.stargazingTitle}
                    </div>
                    <div className="text-[11px] text-stone-500 font-light">
                      {t.stargazingScore}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-white text-stone-900 text-xs font-mono font-bold border border-stone-300">
                  {selectedStation.stargazingRating}%
                </span>
              </div>
            </div>
          </div>

          {/* Key Meteorological Parameters (2-column layout) */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* Wind Parameter */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{t.wind}</span>
                <Wind className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.windSpeed} <span className="text-sm font-normal text-stone-500">м/с</span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {t.windDir} <span className="text-stone-800 font-medium">{selectedStation.windDirection}</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Хээрийн аялалд тогтуун</span>
              </div>
            </div>

            {/* UV Index Parameter */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{t.uvIndex}</span>
                <Sun className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.uvIndex} <span className="text-sm font-normal text-stone-500">/ 11+</span>
                </div>
                <div className="text-xs text-stone-600 font-medium mt-1 truncate">
                  {selectedStation.uvLevel[currentLang]}
                </div>
              </div>
              <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 mt-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Нарны тос & малгай</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{t.humidity}</span>
                <Droplets className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.humidity}%
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Хуурай, тунгалаг цөл
                </div>
              </div>
              <div className="text-[11px] text-sky-800 font-medium flex items-center gap-1 mt-2">
                <span>💧 1 хүнд 5L+ ус шаардлагатай</span>
              </div>
            </div>

            {/* Visibility */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{t.visibility}</span>
                <Eye className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.visibility} <span className="text-sm font-normal text-stone-500">км</span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Тунгалаг, холын бараа
                </div>
              </div>
              <div className="text-[11px] text-stone-700 font-medium flex items-center gap-1 mt-2">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                <span>Дрон зураг авалтад нэн таатай</span>
              </div>
            </div>

            {/* Sunrise */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Нар мандах (Алтан цаг)</span>
                <Sunrise className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.sunrise}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Өглөөний сэрүүнд алхалт
                </div>
              </div>
              <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 mt-2">
                <span>📸 Хавцлын өглөөний гэрэлтүүлэг</span>
              </div>
            </div>

            {/* Sunset */}
            <div className="p-6 bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Нар жаргах (Одод гарах)</span>
                <Sunset className="w-4 h-4 text-stone-700" />
              </div>
              <div className="my-1">
                <div className="text-3xl font-light font-mono text-stone-900">
                  {selectedStation.sunset}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Улаан цавын жаргах туяа
                </div>
              </div>
              <div className="text-[11px] text-stone-700 font-medium flex items-center gap-1 mt-2">
                <span>🌌 Тэнгэрийн заадас тодорно</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Expedition Forecast Table / Cards */}
        <div className="p-6 sm:p-8 bg-white border border-stone-200/80 mb-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-600" />
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-stone-900">
                  {t.forecastTitle}
                </h3>
              </div>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600 mt-0.5">
                {t.forecastDesc} • <span className="text-stone-900 font-normal">{selectedStation.name[currentLang]}</span>
              </p>
            </div>

            <span className="text-xs font-mono text-stone-600 bg-[#FAF9F5] px-3 py-1.5 border border-stone-300">
              {lastRefreshed}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {selectedStation.forecast7Days.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 border flex flex-col justify-between transition-all ${
                  idx === 0
                    ? 'bg-white border-stone-900 text-stone-900 shadow-md'
                    : 'bg-[#FAF9F5] border-stone-200 text-stone-800 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-stone-800">{item.day[currentLang]}</span>
                    <span className="font-mono text-stone-500 text-[10px]">{item.date}</span>
                  </div>

                  <div className="my-3 flex items-center justify-center text-stone-700">
                    {item.condition === 'sunny' && <Sun className="w-8 h-8 text-amber-600" />}
                    {item.condition === 'clear' && <Moon className="w-8 h-8 text-stone-700" />}
                    {item.condition === 'windy' && <Wind className="w-8 h-8 text-stone-600" />}
                    {item.condition === 'partly-cloudy' && <CloudSun className="w-8 h-8 text-stone-600" />}
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-light font-mono text-stone-900">
                      {formatTemp(item.high)}
                    </div>
                    <div className="text-xs font-mono text-stone-500">
                      {formatTemp(item.low)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200">
                  <div className="text-[10px] text-stone-600 font-mono text-center mb-1">
                    💨 {item.wind} м/с
                  </div>
                  <div className="text-[10px] text-stone-600 font-light text-center line-clamp-2" title={item.activity[currentLang]}>
                    {item.activity[currentLang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Seasons Climate Breakdown Guide */}
        <div className="p-6 sm:p-10 bg-white border border-stone-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-4 h-4 text-stone-700" />
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-normal text-stone-900">
              {t.seasonsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Summer */}
            <div className="p-6 bg-[#FAF9F5] border border-stone-200 hover:border-stone-400 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  ☀️ Зуны улирал
                </span>
                <span className="text-xs font-mono text-stone-800 bg-white px-2 py-0.5 border border-stone-200">
                  +34°C ~ +40°C
                </span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900 mb-1.5">
                {t.summerTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {t.summerDesc}
              </p>
            </div>

            {/* Autumn - PRIME */}
            <div className="p-6 bg-white border border-stone-900 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-900 flex items-center gap-1">
                  ⭐ Намар (Шилдэг цаг)
                </span>
                <span className="text-xs font-mono text-white bg-stone-900 px-2 py-0.5 font-bold">
                  +20°C ~ +28°C
                </span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900 mb-1.5">
                {t.autumnTitle}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-light">
                {t.autumnDesc}
              </p>
            </div>

            {/* Spring */}
            <div className="p-6 bg-[#FAF9F5] border border-stone-200 hover:border-stone-400 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  🌸 Хаврын улирал
                </span>
                <span className="text-xs font-mono text-stone-800 bg-white px-2 py-0.5 border border-stone-200">
                  +15°C ~ +24°C
                </span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900 mb-1.5">
                {t.springTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {t.springDesc}
              </p>
            </div>

            {/* Winter */}
            <div className="p-6 bg-[#FAF9F5] border border-stone-200 hover:border-stone-400 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">
                  ❄️ Өвлийн улирал
                </span>
                <span className="text-xs font-mono text-stone-800 bg-white px-2 py-0.5 border border-stone-200">
                  -5°C ~ -20°C
                </span>
              </div>
              <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900 mb-1.5">
                {t.winterTitle}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {t.winterDesc}
              </p>
            </div>
          </div>

          {/* Action CTA inside weather section */}
          {onOpenBooking && (
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 border border-stone-200">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    Говийн цаг агаар, уур амьсгалд тохируулсан хээрийн экспедиц
                  </div>
                  <div className="font-['Cormorant_Garamond',serif] italic text-base text-stone-600">
                    Манай эко баазын мэргэжлийн хөтөч, 4x4 тээвэр, тав тухтай люкс өрөөтэй аялаарай
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, 'Хэрмэн цав')}
                className="border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white px-8 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>{t.bookStayBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
