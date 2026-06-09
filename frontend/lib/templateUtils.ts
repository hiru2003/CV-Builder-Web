import { SpacingType, FontSizeAdjustType } from '@/types/cv';

export const fontSizeMap = {
  sm: {
    name: 'text-2xl md:text-3xl font-extrabold mb-1 uppercase tracking-tight',
    title: 'text-sm md:text-base font-semibold tracking-wide',
    sectionHeader: 'text-xs md:text-sm font-bold uppercase tracking-widest pb-1 border-b-2',
    body: 'text-[11px] md:text-xs leading-normal',
    list: 'space-y-0.5 text-[11px] md:text-xs list-disc list-inside ml-2',
    itemHeader: 'text-xs md:text-sm font-bold',
    meta: 'text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded',
    spacingBetweenSections: 'mb-4',
    spacingBetweenItems: 'space-y-3',
  },
  md: {
    name: 'text-3xl md:text-4xl font-extrabold mb-2 tracking-tight uppercase',
    title: 'text-lg md:text-xl font-medium tracking-wide',
    sectionHeader: 'text-sm font-bold tracking-widest uppercase border-b-2 pb-1',
    body: 'text-xs md:text-sm leading-relaxed',
    list: 'space-y-1 text-xs md:text-sm list-disc list-inside ml-2',
    itemHeader: 'text-sm md:text-base font-bold',
    meta: 'text-xs font-semibold px-2 py-0.5 rounded',
    spacingBetweenSections: 'mb-8',
    spacingBetweenItems: 'space-y-6',
  },
  lg: {
    name: 'text-4xl md:text-5xl font-black mb-3 tracking-tight uppercase',
    title: 'text-xl md:text-2xl font-bold tracking-wide',
    sectionHeader: 'text-base font-extrabold tracking-widest uppercase border-b-2 pb-1.5',
    body: 'text-sm md:text-base leading-loose',
    list: 'space-y-2 text-sm md:text-base list-disc list-inside ml-3',
    itemHeader: 'text-base md:text-lg font-extrabold',
    meta: 'text-sm font-bold px-2.5 py-1 rounded',
    spacingBetweenSections: 'mb-12',
    spacingBetweenItems: 'space-y-8',
  }
};

export const spacingMap = {
  compact: {
    padding: 'p-4 md:p-6',
    sectionMargin: 'mb-4',
    itemMargin: 'mb-2',
    lineHeight: 'leading-tight',
    gap: 'gap-1',
    space: 'space-y-1',
    sectionSpace: 'space-y-3',
  },
  normal: {
    padding: 'p-8 md:p-10',
    sectionMargin: 'mb-8',
    itemMargin: 'mb-4',
    lineHeight: 'leading-relaxed',
    gap: 'gap-3',
    space: 'space-y-2',
    sectionSpace: 'space-y-6',
  },
  loose: {
    padding: 'p-10 md:p-14',
    sectionMargin: 'mb-12',
    itemMargin: 'mb-6',
    lineHeight: 'leading-loose',
    gap: 'gap-4',
    space: 'space-y-3',
    sectionSpace: 'space-y-8',
  }
};

// Help generate lighter background colors for hex strings (e.g. #00A3FF -> rgba(#00A3FF, opacity))
export function hexToRGBA(hex: string, alpha: number): string {
  // Remove '#' if present
  let cleanHex = hex.replace('#', '');
  
  // Expand short hex (e.g. '03F' -> '0033FF')
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  if (cleanHex.length !== 6) {
    // Fallback to default blue transparency if invalid hex
    return `rgba(59, 130, 246, ${alpha})`;
  }
  
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Custom Date Parser for resume date strings (e.g. "Jan 2020", "2022", "Present")
interface ParsedDate {
  year: number;
  month: number;
}

export function parseResumeDate(dateStr: string, isCurrent: boolean = false): ParsedDate {
  if (isCurrent || !dateStr) {
    return { year: 9999, month: 12 }; // Future date for current positions
  }

  const cleaned = dateStr.trim().toLowerCase();
  
  if (cleaned.includes('present') || cleaned.includes('current') || cleaned === 'now') {
    return { year: 9999, month: 12 };
  }

  // Find 4 digit year
  const yearMatch = cleaned.match(/\b\d{4}\b/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : 1970;

  // Find month
  const monthMap: Record<string, number> = {
    jan: 1, january: 1,
    feb: 2, february: 2,
    mar: 3, march: 3,
    apr: 4, april: 4,
    may: 5,
    jun: 6, june: 6,
    jul: 7, july: 7,
    aug: 8, august: 8,
    sep: 9, september: 9, sept: 9,
    oct: 10, october: 10,
    nov: 11, november: 11,
    dec: 12, december: 12
  };

  let month = 1;
  for (const [key, val] of Object.entries(monthMap)) {
    if (cleaned.includes(key)) {
      month = val;
      break;
    }
  }

  return { year, month };
}

/**
 * Stable Insertion Sort algorithm.
 * Stable sorting preserves the original order of items when their sort keys are equal.
 * This is perfect for CVs where experiences starting at the same time should maintain user's relative order.
 * 
 * Time Complexity:
 * - Best Case: O(n) when array is already sorted
 * - Average/Worst Case: O(n^2)
 * Space Complexity: O(1) in-place sorting (we copy the array first for react immutability).
 */
export function insertionSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;
    
    // Shift elements of result[0..i-1] that are "greater" (according to comparator) than key
    while (j >= 0 && compare(result[j], key) > 0) {
      result[j + 1] = result[j];
      j = j - 1;
    }
    result[j + 1] = key;
  }
  return result;
}

// Comparator to sort experience/education in REVERSE chronological order (most recent first)
export function compareDatesReverse(
  aDate: { year: number; month: number }, 
  bDate: { year: number; month: number }
): number {
  if (aDate.year !== bDate.year) {
    // We want higher year first, so b.year - a.year
    // Note: insertionSort shifts when compare(j, key) > 0.
    // If we want reverse chronological order, we consider "older" to be "greater than" (needs to be shifted down)
    return aDate.year < bDate.year ? 1 : -1;
  }
  if (aDate.month !== bDate.month) {
    return aDate.month < bDate.month ? 1 : -1;
  }
  return 0;
}
