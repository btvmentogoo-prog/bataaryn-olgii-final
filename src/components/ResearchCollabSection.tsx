import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Award, Globe, BookOpen } from 'lucide-react';

interface ResearchCollabProps {
  currentLang: Language;
}

export const ResearchCollabSection: React.FC<ResearchCollabProps> = ({
  currentLang,
}) => {
  const t = translations[currentLang];

  const partners = [
    {
      name: {
        mn: 'Монгол Улсын Шинжлэх Ухааны Академи (MAS)',
        en: 'Mongolian Academy of Sciences (MAS)',
        ja: 'モンゴル科学アカデミー（MAS）',
        zh: '蒙古科学院古生物研究所（MAS）',
      },
      role: {
        mn: 'Үндэсний тэргүүлэх эрдэм шинжилгээний байгууллага',
        en: 'National Lead Paleontological Authority',
        ja: '国家古生物研究最高機関',
        zh: '蒙古国古生物与地质国家最高科研机构',
      },
      flag: '🇲🇳',
    },
    {
      name: {
        mn: 'Америкийн Байгалийн Түүхийн Музей (AMNH)',
        en: 'American Museum of Natural History (AMNH)',
        ja: 'アメリカ自然史博物館（AMNH）',
        zh: '美国自然历史博物馆（AMNH）',
      },
      role: {
        mn: '1920-иод оноос хойших түүхэн хамтын ажиллагаа',
        en: 'Centennial Central Asiatic Expedition Partner',
        ja: '1920年代からの歴史的学術パートナー',
        zh: '自1920年代中亚科学考察队以来的世纪合作伙伴',
      },
      flag: '🇺🇸',
    },
    {
      name: {
        mn: 'Польшийн Шинжлэх Ухааны Академи (PAS)',
        en: 'Polish Academy of Sciences (PAS)',
        ja: 'ポーランド科学アカデミー（PAS）',
        zh: '波兰科学院古生物研究所（PAS）',
      },
      role: {
        mn: '1960-70-аад оны Говийн их хамтарсан экспедиц',
        en: 'Historic 1960-70s Joint Gobi Expeditions',
        ja: '格闘恐竜を発見した歴史的学術調査隊',
        zh: '1960-1970年代联合发现格斗恐龙与恐手龙的功勋伙伴',
      },
      flag: '🇵🇱',
    },
    {
      name: {
        mn: 'Хаяшибара / Окаяма Шинжлэх Ухааны Их Сургууль',
        en: 'Hayashibara & Okayama University of Science',
        ja: '林原・岡山理科大学 古生物共同調査隊',
        zh: '日本冈山理科大学与林原古生物联合考察队',
      },
      role: {
        mn: '1990-ээд оноос хойших Япон-Монголын хамтарсан судалгаа',
        en: 'Japan-Mongolia Joint Cretaceous Project',
        ja: '日蒙共同ゴビ恐竜プロジェクト',
        zh: '30余年日蒙联合白垩纪戈壁科研合作项目',
      },
      flag: '🇯🇵',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF9F5] border-b border-stone-200 text-stone-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 mb-2">
            Global Paleontological Alliances
          </span>
          <h3 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight leading-[1.1]">
            {t.heritage.sectionTitle}
          </h3>
          <p className="font-['Cormorant_Garamond',serif] italic text-xl text-stone-700 font-light mt-3">
            {t.heritage.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all duration-300 group"
            >
              <div>
                <div className="text-3xl mb-4 group-hover:scale-105 transition duration-300">{partner.flag}</div>
                <h4 className="font-['Cormorant_Garamond',serif] text-xl font-normal text-stone-900 mb-2 leading-snug">
                  {partner.name[currentLang]}
                </h4>
              </div>
              <p className="text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100 font-light">
                {partner.role[currentLang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
