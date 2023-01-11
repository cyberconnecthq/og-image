import { BG_TYPES } from './constants';
export function getColor(bgType: number, bgNumber: number) {
  return BG_TYPES[bgType][bgNumber].textColor;
}
export function getContrastColor(color: string) {
  return color === 'white' ? 'black' : 'white';
}

export const twOptions = { folder: 'svg', ext: '.svg', base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/' };
