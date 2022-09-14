import { BadgeRequest } from './../_lib/types';
import { readFileSync } from 'fs';
// import { marked } from 'marked';
// import { sanitizeHtml } from '../_lib/sanitizer';
import { PosterRequest, PosterType, TextColors } from '../_lib/types';
import { getPosterBaseCss } from '../_lib/getBaseCss';
import { getShapePath, getMaskType, getOrgLogo } from '../_components/badge/shape';
// const twemoji = require('twemoji');

// const twOptions = { folder: 'svg', ext: '.svg' };
// TODO：emoji support
// const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(req: BadgeRequest) {
  const {} = req;
  return `
    ${getPosterBaseCss()}
    *{
      box-sizing: border-box;
    }

    `;
}

function getBg(bg: number) {
  const bgImage = readFileSync(`${__dirname}/../_assets/badge/bg${bg}.jpg`).toString('base64');
  return `<defs>
          <pattern id="bg" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image href="url(data:image/jpeg;base64,${bgImage})" x="0" y="0" width="100%" height="100%" />
          </pattern>
        </defs>`;
}

function getImage(req: BadgeRequest) {
  const { bg, shape, maskType, textStyle, text, logoUrl, bgUrl, textColor } = req;
  return `<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${getBg(bg)}
          ${getShapePath(shape)} 
          ${getMaskType(shape, maskType)}
          ${getOrgLogo(logoUrl, textColor)}
  </svg>`;
}

export function getBadge(parsedReq: BadgeRequest) {
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
