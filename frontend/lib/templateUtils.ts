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
