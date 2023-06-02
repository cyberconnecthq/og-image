import calendar from './calendar';
import location from './location';

export default function info(time: string, venue: string) {
  return `<div style="display:flex;flex-direction:column;gap:20px;">
  <div class="time info">${calendar} ${time}</div>
  <div class="venue info">${location} ${venue}</div>
</div>`;
}
