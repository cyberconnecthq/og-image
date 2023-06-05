import { OfflineEventPosterReq } from '../_lib/types';
import { twOptions } from '../_lib/utils';
import wrapperCss from '../_components/offlneEvent/wrapperCss';
import { getOfflineEventPosterBaseCss } from '../_lib/getBaseCss';
import titleCss from '../_components/offlneEvent/titleCss';
import { PosterType } from '../_components/offlneEvent/type';
import hostCss from '../_components/offlneEvent/hostCss';
import info from '../_components/offlneEvent/info';

const twemoji = require('twemoji');

// TODO：emoji support
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getOfflineEventTemplate(parsedReq: OfflineEventPosterReq) {
  const defaultOrgAvatar = 'https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/Enterprise-Logo.png';
  const { title, time, venue, host, posterType, bgNumber } = parsedReq;
  console.log('parsedReq', parsedReq);
  const hostLength = host?.length;
  return `<!DOCTYPE html>
    <html>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    </head>

    <style>
        ${getOfflineEventPosterBaseCss()}
        ${wrapperCss(posterType, bgNumber)}
        ${titleCss(posterType, title)}
        ${hostCss(posterType, hostLength)}
        .info{
          display:flex;
          gap:30px;
          align-items:center;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }
    </style>
    <body>
      <div class="wrapper">
        <div class="titleWrapper"> 
          <div class="title">${emojify(title)}</div>
            ${posterType === PosterType.HOST ? `${info(time, venue)}` : ''}
        </div>
        ${
          posterType === PosterType.EVENT
            ? '<div class="divider" style="height: 90%; width: 2px; background-color:#fff"></div>'
            : ''
        }
        <div class="rightWrapper" style="${
          posterType === PosterType.EVENT ? 'height:90%;' : 'height:100%;'
        } width:100%; margin-left:18px; display:flex; flex-direction:column; justify-content:space-between ">
          <div style="${
            posterType === PosterType.EVENT
              ? `height:210px`
              : posterType === PosterType.HOST
              ? `height: 100%;width:100%;
                 align-items: center;
                 display: flex;`
              : `display: flex;gap:28px;`
          }">
            ${posterType !== PosterType.HOST ? `<div class="hostTag">Host</div>` : ''}
            <div class="hostWrapper">
            ${host
              .map((h) => {
                return `<div class="host"><img src="${
                  h.avatar
                }" onerror="this.onerror=null; this.src="${defaultOrgAvatar}" />${h.displayName}${
                  posterType === PosterType.HOST ? `<div class="hostTag">Host</div>` : ''
                }</div>`;
              })
              .join('')}
            </div>
          </div>
          ${posterType !== PosterType.HOST ? `${info(time, venue)}` : ''}
        </div>
      </div>
    </body>
</html>`;
}
