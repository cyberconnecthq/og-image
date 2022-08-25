import { BG_TYPES } from './constants';
export function getColor(bgType: number, bgNumber: number) {
  return BG_TYPES[bgType][bgNumber].textColor;
}
export function getContrastColor(color: string) {
  return color === 'white' ? 'black' : 'white';
}
