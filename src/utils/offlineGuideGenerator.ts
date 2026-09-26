import { dinosaurSpecimens, excavationSites } from '../data/paleoData';
import { Language } from '../types';

export function generateOfflineFieldGuideHtml(currentLang: Language): string {
  const dinosHtml = dinosaurSpecimens.map(d => {
    const highlightsText = d.highlights[currentLang] ? d.highlights[currentLang].join(' • ') : '';
    return `
    <div style="background: #1c1917; border: 1px solid #44403c; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
      <h3 style="color: #f59e0b; margin: 0 0 4px 0; font-size: 20px;">${d.name} <span style="color: #a8a29e; font-style: italic; font-size: 14px;">(${d.scientificName})</span></h3>
      <p style="color: #d6d3d1; font-size: 13px; margin: 0 0 8px 0;"><strong>Бүс нутаг / Location:</strong> ${d.location[currentLang]} | <strong>Олдсон он:</strong> ${d.discoveredYear} он</p>
      <p style="color: #d6d3d1; font-size: 13px; margin: 0 0 8px 0;"><strong>Хэмжээ:</strong> Урт ${d.lengthMeters}м, Жин ${d.weightTons}тн | <strong>Хооллолт:</strong> ${d.diet}</p>
      <p style="color: #e7e5e4; font-size: 14px; line-height: 1.6; margin: 8px 0;">${d.description[currentLang]}</p>
      ${highlightsText ? `
      <div style="background: #0c0a09; padding: 10px; border-radius: 8px; font-size: 12px; color: #fbbf24; margin-top: 8px;">
        💡 <strong>Онцлог & Баримт:</strong> ${highlightsText}
      </div>` : ''}
    </div>
  `;
  }).join('');

  const locsHtml = excavationSites.map(l => `
    <div style="background: #1c1917; border: 1px solid #44403c; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
      <h3 style="color: #f59e0b; margin: 0 0 4px 0; font-size: 18px;">📍 ${l.name[currentLang]}</h3>
      <p style="color: #a8a29e; font-size: 12px; margin: 0 0 8px 0;">Аймаг/Сум: ${l.province[currentLang]} | Солбицол: ${l.coordinates} | Нас: ${l.age}</p>
      <p style="color: #e7e5e4; font-size: 13px; line-height: 1.5;">${l.description[currentLang]}</p>
      <p style="color: #fbbf24; font-size: 12px; margin-top: 6px;">Гол нээлтүүд: ${l.keyDiscoveries[currentLang].join(', ')}</p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Батаарын өлгий - Офлайн Хээрийн Гарын Авлага</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #0c0a09;
      color: #f5f5f4;
      margin: 0;
      padding: 20px;
      line-height: 1.5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      padding: 24px 0;
      border-bottom: 2px solid #d97706;
      margin-bottom: 24px;
    }
    h1 {
      color: #f59e0b;
      margin: 0;
      font-size: 28px;
    }
    .badge {
      display: inline-block;
      background: #78350f;
      color: #fde68a;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      margin-top: 8px;
      font-weight: bold;
    }
    .section-title {
      font-size: 22px;
      color: #fbbf24;
      border-bottom: 1px solid #292524;
      padding-bottom: 8px;
      margin-top: 32px;
      margin-bottom: 16px;
    }
    .emergency {
      background: #450a0a;
      border: 1px solid #991b1b;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .btn-print {
      background: #d97706;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🇲🇳 БАТААРЫН ӨЛГИЙ</h1>
      <p style="color: #a8a29e; margin-top: 4px;">Монголын Үлэг Гүрвэлийн Өв & Говийн Хээрийн Офлайн Гарын Авлага</p>
      <div class="badge">⚡ 100% OFFLINE READY / ИНТЕРНЕТГҮЙ АЖИЛЛАНА</div>
      <br>
      <button class="btn-print" onclick="window.print()">🖨️ Хэвлэх / PDF болгох</button>
    </header>

    <div class="emergency">
      <h3 style="color: #fca5a5; margin: 0 0 8px 0;">🚨 Говийн хээрийн холбоо & Онцгой байдал</h3>
      <p style="font-size: 13px; color: #fecaca; margin: 0; line-height: 1.6;">
        • Батаарын өлгий жуулчны бааз / Захиалга: <strong>+976 7201 0099, +976 8822 3584, +976 9953 0099, +976 9972 3336</strong> | <strong>bataartravel@gmail.com</strong><br>
        • Үлэг гүрвэлийн олдворыг дур мэдэн ухах, зөөвөрлөхийг хуулиар хатуу хориглоно.<br>
        • Онцгой байдлын дуудлага: <strong>105</strong> | Түргэн тусламж: <strong>103</strong> | Цагдаа: <strong>102</strong><br>
        • Өмнөговь аймгийн Байгаль орчин, аялал жуулчлалын газар: +976 7053-2244
      </p>
    </div>

    <h2 class="section-title">🦖 Үлэг гүрвэлийн олдворуудын сан</h2>
    ${dinosHtml}

    <h2 class="section-title">🏜️ Говийн палеонтологийн гол цэгүүд & Солбицол</h2>
    ${locsHtml}

    <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #292524; text-align: center; color: #78716c; font-size: 12px;">
      <p>© 2026 Батаарын өлгий Төсөл. Монгол улсын палеонтологийн өвийг хамгаалах нэгдсэн хээрийн гарын авлага.</p>
    </footer>
  </div>
</body>
</html>`;
}
