export type Language = 'mn' | 'en' | 'ja' | 'zh' | 'ko' | 'de' | 'fr' | 'ru';

export type Currency = 'MNT' | 'USD' | 'EUR' | 'JPY';

export type PageId =
  | 'home'
  | 'about'
  | 'accommodations'
  | 'expeditions'
  | 'dinosaurs'
  | 'maps'
  | 'snow-leopard'
  | 'landscapes'
  | 'bataar-story'
  | 'virtual-lab'
  | 'weather'
  | 'collaborations';

export interface DinosaurSpecimen {
  id: string;
  name: string;
  scientificName: string;
  meaning: Record<string, string>;
  period: string; // e.g. "70-65 сая жилийн өмнө (Late Cretaceous)"
  periodEn: string;
  diet: 'Carnivore' | 'Herbivore' | 'Omnivore';
  dietLabel: Record<string, string>;
  lengthMeters: number;
  weightTons: number;
  heightMeters: number;
  location: Record<string, string>;
  formation: string;
  discoveredYear: number;
  image: string;
  skullImage?: string;
  description: Record<string, string>;
  highlights: Record<string, string[]>;
  anatomicalFeatures: Record<string, string[]>;
  audioDuration: string;
  rarity: 'Legendary' | 'Rare' | 'Iconic';
}

export interface ExcavationSite {
  id: string;
  name: Record<string, string>;
  mongolianName: string;
  province: Record<string, string>;
  coordinates: string;
  lat: number;
  lng: number;
  significance: Record<string, string>;
  description: Record<string, string>;
  keyDiscoveries: Record<string, string[]>;
  formation: string;
  age: string;
  image: string;
  visitorTips: Record<string, string>;
  googleMapsPlaceUrl?: string;
}

export interface ExpeditionPackage {
  id: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  durationDays: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  difficultyLabel: Record<string, string>;
  priceUSD: number;
  priceMNT: number;
  season: Record<string, string>;
  groupSize: string;
  image: string;
  included: Record<string, string[]>;
  itinerary: {
    day: number;
    title: Record<string, string>;
    desc: Record<string, string>;
  }[];
  badge?: Record<string, string>;
}

export interface TimelineEvent {
  year: string;
  title: Record<string, string>;
  description: Record<string, string>;
  location: Record<string, string>;
  icon: string;
  image?: string;
}

export interface VisitorReview {
  id: string;
  author: string;
  country: string;
  flag: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}
