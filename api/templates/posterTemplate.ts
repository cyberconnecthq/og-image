import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from '../_lib/sanitizer';
import { PosterRequest, PosterType, TextColors } from '../_lib/types';
import { getPosterBaseCss } from '../_lib/getBaseCss';
import placeIcon from '../assets/poster/icons/place';
import giftIcon from '../assets/poster/icons/gift';
import calendarIcon from '../assets/poster/icons/calendar';
import { format } from 'date-fns';
import { BG_TYPES } from '../_lib/constants';
import verifiedIcon from '../assets/poster/icons/verified';
import { getColor, getContrastColor } from '../_lib/utils';
import { badgeSmall } from '../components/badgePlaceHolder';
const twemoji = require('twemoji');

const twOptions = { folder: 'svg', ext: '.svg' };
// TODO：emoji support
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getHostCss(bgType: number, bgNumber: number) {
  return `.host{
      margin-left:10px;
      color:${getColor(bgType, bgNumber)};
      text-align:center;
      width:48px;
      height:24px;
      border:1px solid ${getColor(bgType, bgNumber)};
      border-radius:3.5px;
      background-color:${getColor(bgType, bgNumber) == 'white' ? 'rgba(255, 255, 255, 0.5);' : 'rgba(0, 0, 0, 0.5);'}
  }`;
}
function getEventTitleCss(bgType: number, bgNumber: number, posterType: PosterType) {
  let sizeCss = '';
  switch (posterType) {
    case PosterType.Standard:
    case PosterType.HighlightBadge:
      sizeCss = `height:132px;
                  max-width:600px;`;
      break;
    case PosterType.HighlightGuests:
      sizeCss = `
        height:132px;
        width:400px;
      `;
      break;
    case PosterType.Minimal:
      sizeCss = `
        width:465px;
      `;
      break;
    default:
      throw new Error('Poster type not found');
  }
  if (posterType == PosterType.Minimal) {
    return `.event-title{
      margin-top: 34px;
      width:465px;
      height:280px;
      line-height: 63px;
      align-items: center;
      display:flex;
      font-weight: bold;
      font-size: 50px;
    }`;
  }
  return `.event-title{
    ${sizeCss}
    align-items: center;
    font-weight: bold;
    font-size: 50px;
    line-height: 63px;
    color: ${getColor(bgType, bgNumber)};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }`;
}
function getBigSpeakersCss(bgType: number, bgNumber: number) {
  return `
  .big-speaker-wrapper{
    flex-wrap: wrap;
    justify-content: center;
    gap:10px;
  }
  .big-speaker{
    display:flex;
    flex-direction:column;
    width:150px;
    height:200px;
    border:2.5px solid ${getColor(bgType, bgNumber)};
    border-radius:7.5px;
    overflow:hidden;
    color:${getContrastColor(getColor(bgType, bgNumber))};
    background-color:${getColor(bgType, bgNumber)};
    text-align:center;
    font-size:10px;
  }
  .big-speaker img{
    display:block;
    width:100%;
    border-radius:7.5px;
  }
  .big-speaker .name{
    width:100%;
    margin-top:5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding:0 10px;
  }
  .big-speaker .title{
    opacity:0.5;
    width:100%;
    padding:0 10px;
    font-size:10px;
    line-height:13px;
    height:28px;
    display:flex;
    align-items:center;
    justify-content:center;
    
  }
  `;
}
function getCss(req: PosterRequest) {
  const { bgType, bgNumber, posterType } = req;
  function getWrapperCss(bgType: number, bgNumber: number) {
    const bgImage = readFileSync(`${__dirname}/../assets/poster/${BG_TYPES[bgType][bgNumber].bg}`).toString('base64');
    return `.wrapper{
              width:1000px;
              height:500px;
              padding:35px;
              background-image:url(data:image/jpeg;base64,${bgImage});
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              color:${(BG_TYPES as any)[bgType][bgNumber].textColor};
              font-size: 15px;
            }
            .column{
              flex-direction:column;
            }
            .wrapper .left{
              width: 450px;
            }
            .wrapper .right{
              width: 500px;
            }
            .wrapper.minimal .left{
              width: 465px;
            }
            .wrapper.minimal .right{
              width: 400px;
            }
            `;
  }
  return `
    ${getPosterBaseCss()}
    *{
      box-sizing: border-box;
    }
    ${getWrapperCss(bgType, bgNumber)}
    ${getHostCss(bgType, bgNumber)}
    ${getEventTitleCss(bgType, bgNumber, posterType)}
    .place{
      margin-top:20px;
      height:30px;
    }
    .time{
      align-items:center;
      font-weight: 500;
      margin-top:20px;
    }
    .time svg{
      margin-right:15px;
    }
    .time span{
      margin:0 15px;
    }
    .org{
      margin-top:20px;
    }
    .org img{
      border:1.5px solid ${getColor(bgType, bgNumber)};
      border-radius:50%;
      display:block;
      width:23px;
      height:23px;
      margin-right:15px;
      background-color:${getColor(bgType, bgNumber)};
    }
    .org .org-name{
      margin-right:10px;
    }
    .speaker{
      margin-top:33px;
      width:155px;
      display:flex;
      flex-direction:column;
    }
    .speaker .avatar{
      width:100%;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .speaker img{
      display:block;
      width:110px;
      height:110px;
      border-radius:50%;
    }
    .speaker .name{
      width:100%;
      text-align:center;
      font-weight: 700;
      margin-top:13px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      padding:0 5px;
    }
    .speaker .title{
      opacity:0.5;
      font-weight:400;
      margin-top:10px;
      text-align:center;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .speaker.small{
      zoom:0.6;
      margin-top:50px;  
    }
    ${getBigSpeakersCss(bgType, bgNumber)}
    .divider{
      width:1.5px;
      height:212px;
      background-color:${getColor(bgType, bgNumber)};
      margin:0 30px;
    }
    `;
}

export function getPoster(parsedReq: PosterRequest) {
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>

    <style>
        ${getCss(parsedReq)}
    </style>
    <body>
      ${getImage(parsedReq)}
    </body>
</html>`;
}

function getImage(parsedReq: PosterRequest) {
  const { posterType, ...rest } = parsedReq;
  switch (posterType) {
    case PosterType.Standard:
      return getStandardImage(rest);
    case PosterType.HighlightBadge:
      return getHighlightBadgeImage(rest);
    case PosterType.HighlightGuests:
      return getHighlightGuestsImage(rest);
    case PosterType.Minimal:
      return getMinimalImage(rest);
    default:
      throw new Error('Poster type not found');
  }
}
type getImageType = Omit<PosterRequest, 'posterType'>;
function getStandardImage(req: getImageType) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;

  const timeEle = `<div class="time flex">
                    ${calendarIcon(color as TextColors)} ${format(new Date(time * 1000), 'MM.dd O - iii p')}
                    <span>|</span>
                    ${placeIcon(color as TextColors, place)} ${place}
                    ${raffleText ? `<span>|</span>${giftIcon(color as TextColors)} ${raffleText}` : ''}
                  </div>`;
  const orgEle = `<div class="org flex">
                    <img src='${orgLogo}' alt='org-logo'/>
                    <div class="org-name">${orgName}</div>
                  </div>`;
  const speakersEle = `<div class="speakers flex">${speakers
    .map(
      (s) =>
        `<div class="speaker">
          <div class="avatar"><img src="${s.avatar}" alt="avatar" /></div>
          <div class="name">${s.name}</div>
          <div class="title">${s.title}</div>
        </div>`,
    )
    .join('')}</div>`;
  return `<div class="wrapper">
            ${eventTitleEle}
            ${timeEle}
            ${orgEle}
            ${speakersEle}
          </div>`;
}
function getHighlightBadgeImage(req: getImageType) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;

  const timeEle = `<div class="time flex">
                    ${calendarIcon(color as TextColors)} ${format(new Date(time * 1000), 'MM.dd O - iii p')}
                    <span>|</span>
                    ${placeIcon(color as TextColors, place)} ${place}
                  </div>
                  <div class="time flex">${raffleText ? `${giftIcon(color as TextColors)} ${raffleText}` : ''}</div>
                  `;

  const orgEle = `<div class="org flex">
                    <img src='${orgLogo}' alt='org-logo'/>
                    <div class="org-name">${orgName}</div>
                    ${verifiedIcon(color as TextColors)}
                    <div class='host'>Host</div>
                  </div>`;
  const speakersEle = `<div class="speakers flex">${speakers
    .map(
      (s) =>
        `<div class="speaker small">
          <div class="avatar"><img src="${s.avatar}" alt="avatar" /></div>
          <div class="name">${s.name}</div>
          <div class="title">${s.title}</div>
        </div>`,
    )
    .join('')}</div>`;
  return `<div class="wrapper">
            ${eventTitleEle}
            ${timeEle}
            ${orgEle}
            ${speakersEle}
          </div>`;
}

function getHighlightGuestsImage(req: getImageType) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const { css: badgePlaceHolderCss, html: badgePlaceHolderHtml } = badgeSmall(color as TextColors);
  const eventTitleEle = `<div class="event-title" style="margin-top:30px;">${eventTitle}</div>`;

  const timeEle = `<div class="time flex">
                    ${calendarIcon(color as TextColors)} ${format(new Date(time * 1000), 'MM.dd O - iii p')}
                    <span></span>
                    ${placeIcon(color as TextColors, place)} ${place}
                  </div>
                  <div class="time flex">${raffleText ? `${giftIcon(color as TextColors)} ${raffleText}` : ''}</div>
                  `;

  const orgEle = `<div class="org flex" style="margin-top:50px;">
                    <img src='${orgLogo}' alt='org-logo'/>
                    <div class="org-name">${orgName}</div>
                    ${verifiedIcon(color as TextColors)}
                    <div class='host'>Host</div>
                  </div>`;
  const speakersLength = speakers.length;
  let adoptedStyle;
  switch (speakersLength) {
    case 4:
    case 2:
      adoptedStyle = `width:320px;justify-content:center`;
      break;
  }
  const speakersEle = `<div class="big-speaker-wrapper flex" style="${adoptedStyle}">${speakers
    .map(
      (s) =>
        `<div class="big-speaker">
          <div class="avatar"><img src="${s.avatar}" alt="avatar" /></div>
          <div class="name">${s.name}</div>
          <div class="title">${s.title}</div>
        </div>`,
    )
    .join('')}</div>`;
  return `<style>
            ${badgePlaceHolderCss}
          </style>
          <div class="wrapper flex">
            <div class="left">
              ${badgePlaceHolderHtml}
              ${eventTitleEle}
              ${timeEle}
              ${orgEle}
            </div>
            <div class="right" style="display:flex;align-items:center;justify-content:center;">
              ${speakersEle}
            </div>
          </div>`;
}
function getMinimalImage(req: getImageType) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;

  const timeEle = `<div class="time flex">
                    ${calendarIcon(color as TextColors)} ${format(new Date(time * 1000), 'MM.dd O - iii p')}
                    <span>|</span>
                    ${placeIcon(color as TextColors, place)} ${place}
                  </div>
                  <div class="time flex">${raffleText ? `${giftIcon(color as TextColors)} ${raffleText}` : ''}</div>
                  `;

  const orgEle = `<div class="org flex" style="zoom:1.2">
                    <img src='${orgLogo}' alt='org-logo'/>
                    <div class="org-name">${orgName}</div>
                    ${verifiedIcon(color as TextColors)}
                    <div class='host'>Host</div>
                  </div>`;
  return `<div class="wrapper flex minimal" style="align-items:center">
            <div class="left" style="height:100%;">
              ${orgEle}
              ${eventTitleEle}
            </div>
            <div class="divider"></div>
            <div class="right" style="
              justify-content: center;
              display: flex;
              flex-direction: column;">
              ${timeEle}
            </div>
          </div>`;
}
