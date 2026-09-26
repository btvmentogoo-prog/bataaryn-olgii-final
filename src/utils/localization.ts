import { Language } from '../types';

/**
 * Safely retrieves localized string from a Record<string, string>
 * Falls back to English, then Mongolian, then the first available entry, or fallback string.
 */
export function getLocalizedText(
  map: Record<string, string> | undefined,
  lang: Language,
  fallback = ''
): string {
  if (!map) return fallback;
  return map[lang] || map['en'] || map['mn'] || Object.values(map)[0] || fallback;
}

/**
 * Safely retrieves localized array of strings from a Record<string, string[]>
 * Falls back to English, then Mongolian, then the first available entry, or fallback list.
 */
export function getLocalizedList(
  map: Record<string, string[]> | undefined,
  lang: Language,
  fallback: string[] = []
): string[] {
  if (!map) return fallback;
  return map[lang] || map['en'] || map['mn'] || Object.values(map)[0] || fallback;
}
