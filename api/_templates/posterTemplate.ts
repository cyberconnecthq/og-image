import { ExtraPlaceInfo, Place } from './../_lib/types';
import { getBadgePlaceHolder } from './../_components/badgePlaceHolder';
// import { readFileSync } from 'fs';
// import { marked } from 'marked';
// import { sanitizeHtml } from '../_lib/sanitizer';
import { PosterRequest, PosterType, TextColors } from '../_lib/types';
import { getPosterBaseCss } from '../_lib/getBaseCss';
import placeIcon, { defaultPlaceIcon } from '../_assets/poster/icons/place';
import giftIcon from '../_assets/poster/icons/gift';
import calendarIcon from '../_assets/poster/icons/calendar';
import format from 'date-fns/format';
import { BG_TYPES } from '../_lib/constants';
import verifiedIcon from '../_assets/poster/icons/verified';
import { getColor, getContrastColor } from '../_lib/utils';
import {
  bigSpeakerPlaceholder,
  standardSpeakersPlaceHolder,
  moreSpeakerPlaceholder,
} from '../_assets/poster/speakerPlaceHolder';
import getBadgeImage from '../_components/badgeImage';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };

// TODO：emoji support
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getHostCss(bgType: number, bgNumber: number) {
  return `.host{
      margin-left:10px;
      margin-top:4px;
      color:${getColor(bgType, bgNumber)};
      text-align:center;
      width: 47px;
      height: 24px;
      line-height: 20px;
      border:2px solid ${getColor(bgType, bgNumber)};
      border-radius:3.5px;
      font-weight:700;
      font-size:13px;
      zoom:0.8;
  }`;
}
function getEventTitleCss(bgType: number, bgNumber: number, posterType: PosterType, eventTitle: string) {
  const titleLength = eventTitle.length;
  let sizeCss = '';
  switch (posterType) {
    case PosterType.Standard:
    case PosterType.HighlightBadge:
      sizeCss = `height:132px;
                  max-width:600px;`;
      break;
    case PosterType.MoreGuests:
      sizeCss = `
        height:186px;
        width:400px;
        -webkit-line-clamp: 3 !important;
      `;
      break;
    case PosterType.HighlightGuests:
      sizeCss = `
        height:132px;
        width:400px;
        -webkit-line-clamp: 3 !important;
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
      display:flex;
      margin-top: 34px;
      width:465px;
      height:280px;
      line-height: 63px;
      align-items: center;
      display:flex;
      font-weight: bold;
      ${titleLength > 40 ? 'font-size:45px;' : 'font-size:50px;'}
    }`;
  }
  return `.event-title{
    ${sizeCss}
    display:flex;
    align-items: center;
    font-weight: bold;
    ${titleLength > 40 ? 'font-size:45px;' : 'font-size:50px;'}
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
  .big-speaker.placeholder{
    background-color:rgba(0, 0, 0, 0.5);
    color:${getColor(bgType, bgNumber)};
    border:1px dashed ${getColor(bgType, bgNumber)};
  }
  .big-speaker.placeholder .avatar{
    box-sizing:border-box;
    padding:0 3px;
  }
  .big-speaker.placeholder svg{
    width:100%;
  }
  .big-speaker img{
    display:block;
    width:100%;
    border-radius:7.5px;
    object-fit:cover;
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
  .big-speaker .name img, .big-speaker .title img{
    display:inline;
    height:12px;
    width:12px;
  }
  `;
}

function getMoreSpeakersCss(bgType: number, bgNumber: number) {
  return `.more-speaker-wrapper{
    flex-wrap: wrap;
    justify-content: center;
    gap:5px;
  }
  .more-speaker{
    display:flex;
    flex-direction:column;
    width:130px;
    height:130px;
    overflow:hidden;
    color:${getColor(bgType, bgNumber)};
    text-align:center;
    font-size:10px;
  }
  .more-speaker.placeholder{
    color:${getColor(bgType, bgNumber)};
    border:1px dashed ${getColor(bgType, bgNumber)};
    width:120px;
  }
  .more-speaker.placeholder .avatar{
    justify-content:center;
    box-sizing:border-box;
    padding:0 3px;
    border-radius:100px;
  }
  .more-speaker.placeholder svg{
    width:80px;
    height:80px;
    margin-top:12px;
    border-radius:100px;
  }
  .more-speaker .avatar{
    display:flex;
    justify-content:center;
  }
  .more-speaker img{
    display:block;
    width:82px;
    height:82px;
    border-radius:1000px;
    object-fit:contain;
  }
  .more-speaker .name{
    width:100%;
    margin-top:5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding:0 10px;
  }
  .more-speaker .title{
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
  .more-speaker .name img, .more-speaker .title img{
    display:inline;
    height:12px;
    width:12px;
  }
  `;
}
function getCss(req: PosterRequest) {
  const { bgType, bgNumber, posterType, eventTitle, isDiscord } = req;
  function getWrapperCss(bgType: number, bgNumber: number) {
    // const bgImage = readFileSync(`${__dirname}/../_assets/poster/${BG_TYPES[bgType][bgNumber].bg}`).toString('base64');
    const isDiscordStyle = isDiscord
      ? `.screen-wrapper{
      width:1250px;
      height:500px;
      display:flex;
      justify-content:center;
      align-items:center;
      background-image:url('https://image-stg.s3.us-west-2.amazonaws.com/link3/poster/${
        BG_TYPES[bgType][bgNumber].bg
      }');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .wrapper{
      width:1000px;
      height:500px;
      padding:${posterType == PosterType.MoreGuests ? '35px 0 35px 35px' : '35px'};
      color:${(BG_TYPES as any)[bgType][bgNumber].textColor};
      font-size: 15px;
      position:relative;
    }`
      : `.wrapper{
        width:1000px;
        height:500px;
        padding:${posterType == PosterType.MoreGuests ? '35px 0 35px 35px' : '35px'};
        color:${(BG_TYPES as any)[bgType][bgNumber].textColor};
        font-size: 15px;
        position:relative;
        background-image:url('https://image-stg.s3.us-west-2.amazonaws.com/link3/poster/${
          BG_TYPES[bgType][bgNumber].bg
        }');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }`;
    return `${isDiscordStyle}
            
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
    ${getEventTitleCss(bgType, bgNumber, posterType, eventTitle)}
    .event-title img{
      display:inline-block;
      height:30%;
    }
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
      margin:0 13px;
    }
    .org{
      margin-top:20px;
      align-items:center;
    }
    .org .org-name{
      margin-right:10px;
      line-height:20px;
      font-weight: 500;
    }
    .org .verify-icon{
      margin-top:2px;
    }
    .org .org-logo{
      width:25px;
      height:25px;
      border:2px solid ${getColor(bgType, bgNumber)};
      border-radius:50%;
      margin-right:15px;
      background-color:${getColor(bgType, bgNumber)};
    }
    .org .org-logo img{
      display:block;
      border-radius:50%;
      width:100%;
      height:100%;
    }
    .speakers{
      margin-top:33px;
    }
    .speaker{
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
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0.5;
      font-weight:400;
      margin-top:10px;
      text-align:center;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .speaker .name img, .speaker .title img{
      display:inline;
      height:12px;
      width:12px;
    }
    .speaker.small{
      zoom:0.6;
      margin-top:50px;  
    }
    .speakers.highlightBadge{
      max-width:563px;
    }
    .speakers.highlightBadge svg{
      width:100%;
    }
    ${getBigSpeakersCss(bgType, bgNumber)}
    .divider{
      width:1.5px;
      height:212px;
      background-color:${getColor(bgType, bgNumber)};
      margin:0 30px;
    }
    ${getMoreSpeakersCss(bgType, bgNumber)}
    `;
}

export function getPoster(parsedReq: PosterRequest) {
  // console.log(parsedReq);
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    </head>
    <title>Generated Image</title>

    <style>
        ${getCss(parsedReq)}
    </style>
    <body>
      <div class="screen-wrapper">
        ${getImage(parsedReq)}
      </div>
    </body>
</html>`;
}

function getImage(parsedReq: PosterRequest) {
  // console.log(parsedReq);
  const { posterType, ...rest } = parsedReq;
  if (!parsedReq.eventTitle) {
    parsedReq.eventTitle = 'Event Title';
  }
  // console.log(posterType);
  switch (posterType) {
    case PosterType.Standard:
      return getStandardImage(parsedReq);
    case PosterType.HighlightBadge:
      return getHighlightBadgeImage(parsedReq);
    case PosterType.HighlightGuests:
      return getHighlightGuestsImage(parsedReq);
    case PosterType.Minimal:
      return getMinimalImage(parsedReq);
    case PosterType.MoreGuests:
      return getMoreGuestsImage(parsedReq);
    default:
      throw new Error('Poster type not found');
  }
}
// type getImageType = Omit<PosterRequest, 'posterType'>;F

function getOrgLogo(orgLogo: string, orgName: string, color: string) {
  return `<div class="org flex">
  <div class="org-logo"><img src='${orgLogo}' alt='org-logo'/></div>
  <div class="org-name">${orgName}</div>
  ${verifiedIcon(color as TextColors)}
  <div class='host'>Host</div>
</div>`;
}
function getPlaceText(place: Place, extraPlaceInfo?: ExtraPlaceInfo) {
  let str = '';
  switch (place) {
    case 'twitter':
      str = 'Twitter';
      break;
    case 'discord':
      str = 'Discord';
      break;
    case 'others':
      switch (extraPlaceInfo) {
        case 'youtube':
          str = 'Youtube';
          break;
        case 'binance':
          str = 'Binance Live';
          break;
        default:
          str = 'Others';
      }
      break;
    default:
      str = 'Others';
  }
  return str;
}
function getTimeEle(req: PosterRequest) {
  const { posterType, bgType, bgNumber, time, place, raffleText: _raffleText, timezone, extraPlaceInfo } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const raffleText = _raffleText.split('-')[0];
  const _timezone = timezone || '0';
  const isValidRaffleText = raffleText && raffleText.indexOf('undefined') < 0;
  if (time && place) {
    const formattedData = format(
      new Date(time * 1000 + parseFloat(_timezone) * 1000 * 3600),
      'MMM dd E, p, O',
    ).toString();
    const offset = formattedData.split(',')[2].split('GMT')[1];

    const finalTime = formattedData.replace(offset, timezone || '+0').replace('GMT', 'UTC');

    if (posterType == PosterType.Standard) {
      return `<div class="time flex">
              ${calendarIcon(color as TextColors)} ${finalTime}
              <span>|</span>
              ${placeIcon(color as TextColors, place, extraPlaceInfo)} ${getPlaceText(place, extraPlaceInfo)}
              ${isValidRaffleText ? `<span>|</span>${giftIcon(color as TextColors)} ${raffleText}` : ''}
            </div>`;
    } else {
      return `<div class="time flex">
                  ${calendarIcon(color as TextColors)} ${finalTime}
                  <span>|</span>
                  ${placeIcon(color as TextColors, place, extraPlaceInfo)} ${getPlaceText(place, extraPlaceInfo)}
                </div>
                <div class="time flex">${
                  isValidRaffleText ? `${giftIcon(color as TextColors)} ${raffleText}` : ''
                }</div>
                `;
    }
  } else {
    // 默认time ele
    if (posterType == PosterType.Standard) {
      return `<div class="time flex">
                ${calendarIcon(color as TextColors)} Time
                <span>|</span>
                ${defaultPlaceIcon(color as TextColors)} Venue
                ${isValidRaffleText ? `<span>|</span>${giftIcon(color as TextColors)} ${raffleText}` : ''}
            </div>`;
    } else {
      return `<div class="time flex">
                ${calendarIcon(color as TextColors)} Time
                <span>|</span>
                ${defaultPlaceIcon(color as TextColors)} Venue
              </div>
              <div class="time flex">${isValidRaffleText ? `${giftIcon(color as TextColors)} ${raffleText}` : ''}</div>
              `;
    }
  }
}
function getStandardImage(req: PosterRequest) {
  const {
    bgType,
    bgNumber,
    eventTitle,
    time,
    place,
    raffleText,
    orgLogo,
    orgName,
    speakers,
    badgeUrl,
    isBadgePreview,
  } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;
  const badgePlaceholder = getBadgePlaceHolder(req);
  const badgeImage = getBadgeImage(req);
  const timeEle = getTimeEle(req);
  const orgEle = getOrgLogo(orgLogo, orgName, color);
  const speakersEle = `<div class="speakers flex">${
    speakers.length > 0
      ? speakers
          .map(
            (s) =>
              `<div class="speaker">
          <div class="avatar"><img src="${
            s.avatar
          }" alt="avatar" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/personal/0001.png'"/></div>
          <div class="name">${emojify(s.name)}</div>
          <div class="title">${emojify(s.title)}</div>
        </div>`,
          )
          .join('')
      : // @ts-ignore
        standardSpeakersPlaceHolder(color, isBadgePreview)
  }</div>`;
  return `
          <div class="wrapper">
            ${badgePlaceholder}
            ${badgeImage}
            ${eventTitleEle}
            ${timeEle}
            ${orgEle}
            ${speakersEle}
          </div>`;
}
function getHighlightBadgeImage(req: PosterRequest) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers, isBadgePreview } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const badgePlaceholder = getBadgePlaceHolder(req);
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;
  const badgeImage = getBadgeImage(req);
  const timeEle = getTimeEle(req);

  const orgEle = getOrgLogo(orgLogo, orgName, color);
  const speakersEle = `<div class="speakers flex highlightBadge">${
    speakers.length > 0
      ? speakers
          .map(
            (s) =>
              `<div class="speaker small">
          <div class="avatar"><img src="${
            s.avatar
          }" alt="avatar" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/personal/0001.png'"/></div>
          <div class="name">${emojify(s.name)}</div>
          <div class="title">${emojify(s.title)}</div>
        </div>`,
          )
          .join('')
      : // @ts-ignore
        standardSpeakersPlaceHolder(color, isBadgePreview)
  }</div>`;
  return `<div class="wrapper">
            ${badgePlaceholder}
            ${badgeImage}
            ${eventTitleEle}
            ${timeEle}
            ${orgEle}
            ${speakersEle}
          </div>`;
}

function getHighlightGuestsImage(req: PosterRequest) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers, isBadgePreview } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const badgePlaceholder = getBadgePlaceHolder(req);
  const eventTitleEle = `<div class="event-title" style="width:100%">${eventTitle}</div>`;
  const badgeImage = getBadgeImage(req);
  const timeEle = getTimeEle(req);

  const orgEle = getOrgLogo(orgLogo, orgName, color);
  const speakersLength = speakers.length;
  let adoptedStyle;
  switch (speakersLength) {
    case 4:
    case 2:
      adoptedStyle = `width:320px;justify-content:center`;
      break;
  }
  const speakersEle = `<div class="big-speaker-wrapper flex" style="${adoptedStyle}">${
    speakers.length > 0
      ? speakers
          .map(
            (s) =>
              `<div class="big-speaker">
                <div class="avatar"><img src="${
                  s.avatar
                }" alt="avatar" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/personal/0001.png'"/></div>
                <div class="name">${emojify(s.name)}</div>
                <div class="title">${emojify(s.title)}</div>
              </div>`,
          )
          .join('')
      : (() => {
          return isBadgePreview
            ? new Array(6)
                .fill(0)
                .map(
                  (_, i) => `<div class="big-speaker placeholder">
                            <div class="avatar">${
                              // @ts-ignore
                              bigSpeakerPlaceholder(color, isBadgePreview)
                            }</div>
                            <div class="name">Speaker</div>
                            <div class="title">Title</div>
                          </div>`,
                )
                .join('')
            : '';
        })()
  }</div>`;
  return `
          <div class="wrapper flex">
            <div class="left" style="${speakersLength < 5 ? 'width:500px;' : ''}">
              ${badgePlaceholder}
              ${badgeImage}
              ${eventTitleEle}
              ${timeEle}
              <style>.org{margin-top:50px;}</style>
              ${orgEle}
            </div>
            <div class="right" style="display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${speakersEle}
            </div>
          </div>`;
}
function getMinimalImage(req: PosterRequest) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const eventTitleEle = `<div class="event-title">${eventTitle}</div>`;
  const badgePlaceholder = getBadgePlaceHolder(req);
  const timeEle = getTimeEle(req);
  const badgeImage = getBadgeImage(req);

  const orgEle = getOrgLogo(orgLogo, orgName, color);
  return `<div class="wrapper flex minimal" style="align-items:center">
            ${badgePlaceholder}
            ${badgeImage}
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

function getMoreGuestsImage(req: PosterRequest) {
  const { bgType, bgNumber, eventTitle, time, place, raffleText, orgLogo, orgName, speakers, isBadgePreview } = req;
  const color = BG_TYPES[bgType][bgNumber].textColor;
  const badgePlaceholder = getBadgePlaceHolder(req);
  const eventTitleEle = `<div class="event-title" style="width:100%">${eventTitle}</div>`;
  const badgeImage = getBadgeImage(req);
  const timeEle = getTimeEle(req);

  const orgEle = getOrgLogo(orgLogo, orgName, color);
  const speakersLength = speakers.length;
  let adoptedStyle;
  // switch (speakersLength) {
  //   case 4:
  //   case 2:
  //     adoptedStyle = `width:320px;justify-content:center`;
  //     break;
  // }
  const speakersEle = `<div class="more-speaker-wrapper flex" style="${adoptedStyle}">${
    speakers.length > 0
      ? speakers
          .map(
            (s) =>
              `<div class="more-speaker">
                <div class="avatar"><img src="${
                  s.avatar
                }" alt="avatar" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/personal/0001.png'"/></div>
                <div class="name">${emojify(s.name)}</div>
                <div class="title">${emojify(s.title)}</div>
              </div>`,
          )
          .join('')
      : (() => {
          return isBadgePreview
            ? new Array(12)
                .fill(0)
                .map(
                  (_, i) => `<div class="more-speaker placeholder">
                            <div class="avatar">${
                              // @ts-ignore
                              moreSpeakerPlaceholder(color, isBadgePreview)
                            }</div>
                            <div class="name">Speaker</div>
                            <div class="title">Title</div>
                          </div>`,
                )
                .join('')
            : '';
        })()
  }</div>`;
  return `
          <div class="wrapper flex more-guests">
            <div class="left" style="width:400px;flex-shrink:0">
              ${badgePlaceholder}
              ${badgeImage}
              ${eventTitleEle}
              ${timeEle}
              <style>.org{margin-top:20px;}</style>
              ${orgEle}
            </div>
            <div class="right" style="display:flex;align-items:center;justify-content:center;flex-shrink:1;flex-grow:1;width:auto;max-width:600px">
              ${speakersEle}
            </div>
          </div>`;
}
