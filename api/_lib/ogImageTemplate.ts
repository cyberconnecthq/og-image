import { readFileSync } from 'fs';
// import { marked } from 'marked';
// import { sanitizeHtml } from './sanitizer';
import { OgRequest } from './types';
import getBaseCss from './getBaseCss';
import { twOptions } from './utils';
const twemoji = require('twemoji');

const emojify = (text: string | undefined) => twemoji.parse(text, twOptions);

function getCss(parsedReq: OgRequest) {
  const bgImage = readFileSync(`${__dirname}/../_assets/og/og-card-bg.svg`).toString('base64');
  const orgBgImage = readFileSync(`${__dirname}/../_assets/og/og-card-org-bg.svg`).toString('base64');
  const dotBgImage = readFileSync(`${__dirname}/../_assets/og/dot-bg.png`).toString('base64');
  return (
    getBaseCss() +
    `
    .wrapper {
      width: 540px;
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .bg {
      width: 105%;
      height: 105%;
      background-image: url("${parsedReq.avatar}");
      filter: blur(10px);
      -webkit-filter: blur(10px);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: -2.5%;
      left: -2.5%;
      z-index:2;
    }
    .bg.org-bg {
      background-image: none;
      background-color: #1c1c1c;
      filter:none;
      -webkit-filter:none;
    }
    .bg.org-bg img {
      display:block;
      filter:blur(20px);
      width:140%;
      height:140%;
      position:absolute;
      top:-20%;
      left:-20%;
    }
    .dot-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background-image: url(data:image/png;base64,${dotBgImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index:3;
    }
    .card-wrapper {
      z-index:5;
      width: 385px;
      height: 228px;
      display: flex;
      flex-direction: column;
      position: relative;
      background-image: url(data:image/svg+xml;base64,${parsedReq.type == 'ORG' ? orgBgImage : bgImage});
      background-position:center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding:40px;
    }
    .avatar{
      position:relative;
      width:74px;
      height:74px;
      overflow:hidden;
      margin-bottom:40px;
      margin-top:12px;
    }
    .hexagon{
      width: 82px;
      height: 82px;
      background-color: #fff;
      overflow: hidden;
      box-sizing: content-box;
      clip-path:polygon(92.32051% 40%, 93.79385% 43.1596%, 94.69616% 46.52704%, 95% 50%, 94.69616% 53.47296%, 93.79385% 56.8404%, 92.32051% 60%, 79.82051% 81.65064%, 77.82089% 84.50639%, 75.35575% 86.97152%, 72.5% 88.97114%, 69.3404% 90.44449%, 65.97296% 91.34679%, 62.5% 91.65064%, 37.5% 91.65064%, 34.02704% 91.34679%, 30.6596% 90.44449%, 27.5% 88.97114%, 24.64425% 86.97152%, 22.17911% 84.50639%, 20.17949% 81.65064%, 7.67949% 60%, 6.20615% 56.8404%, 5.30384% 53.47296%, 5% 50%, 5.30384% 46.52704%, 6.20615% 43.1596%, 7.67949% 40%, 20.17949% 18.34936%, 22.17911% 15.49361%, 24.64425% 13.02848%, 27.5% 11.02886%, 30.6596% 9.55551%, 34.02704% 8.65321%, 37.5% 8.34936%, 62.5% 8.34936%, 65.97296% 8.65321%, 69.3404% 9.55551%, 72.5% 11.02886%, 75.35575% 13.02848%, 77.82089% 15.49361%, 79.82051% 18.34936%);
      display:flex;
      align-items:center;
      justify-content:center;
      margin-top:5px;
      margin-left:-4px;
    }
    .hexagon div{
      backgrounc-color:#fff;
      clip-path:polygon(92.32051% 40%, 93.79385% 43.1596%, 94.69616% 46.52704%, 95% 50%, 94.69616% 53.47296%, 93.79385% 56.8404%, 92.32051% 60%, 79.82051% 81.65064%, 77.82089% 84.50639%, 75.35575% 86.97152%, 72.5% 88.97114%, 69.3404% 90.44449%, 65.97296% 91.34679%, 62.5% 91.65064%, 37.5% 91.65064%, 34.02704% 91.34679%, 30.6596% 90.44449%, 27.5% 88.97114%, 24.64425% 86.97152%, 22.17911% 84.50639%, 20.17949% 81.65064%, 7.67949% 60%, 6.20615% 56.8404%, 5.30384% 53.47296%, 5% 50%, 5.30384% 46.52704%, 6.20615% 43.1596%, 7.67949% 40%, 20.17949% 18.34936%, 22.17911% 15.49361%, 24.64425% 13.02848%, 27.5% 11.02886%, 30.6596% 9.55551%, 34.02704% 8.65321%, 37.5% 8.34936%, 62.5% 8.34936%, 65.97296% 8.65321%, 69.3404% 9.55551%, 72.5% 11.02886%, 75.35575% 13.02848%, 77.82089% 15.49361%, 79.82051% 18.34936%);
      overflow:hidden;
    }
    .hexagon>div>img{
      width:70px;
      height:70px;
      object-fit:contain;
    }
    .avatar>img{
      display:flex;
      border-radius:10000px;
      width:calc(100% - 14px);
      height:calc(100% - 14px);
      background-color:#fff;
      border:6px solid #fff;
      clip: padding-box;
    }
    .avatar.org{
      width: 60px;
      height: 60px;
      border-radius:100px;
      display:flex;
      align-items:center;
    }
    .avatar.org>img{
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
    }
    .display-name{
      color:#fff;
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .display-name span{
      color: rgba(255, 255, 255, 0.3);
    }
    .display-name.org{
      margin-top: 45px;
      display: flex;
      align-items: center;
      gap: 10px;
      color:black;
      font-weight: 700;
      font-size: 26px;
    }
    .display-name.org img{
      display:block;
      width:18px;
      height:18px;
      margin-top:5px;
    }
    .title{
      display:flex;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
    }
    .at{
      margin:0 5px;
    }
    .emoji{
      width:20px;
    }
    `
  );
}

export function getHtml(parsedReq: OgRequest) {
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

function getImage(parsedReq: OgRequest) {
  const verifiedIcon = readFileSync(`${__dirname}/../_assets/og/verified-icon.svg`).toString('base64');
  const { displayName, displayNameType, title, organization, avatar, avatarType, type, isVerified } = parsedReq;
  let displayNameEle;
  if (type == 'PERSONAL') {
    if (displayNameType == 'ENS') {
      displayNameEle = `<div class="display-name">${displayName.replace('.eth', '')}<span>.eth</span></div>`;
    } else if (displayNameType == 'SID') {
      displayNameEle = `<div class="display-name">${displayName.replace('.bnb', '')}<span>.bnb</span></div>`;
    } else {
      displayNameEle = `<div class="display-name">${displayName}</div>`;
    }
    const avatarEle =
      avatarType == 'GENERAL'
        ? `<div class="avatar"><img src="${avatar}" alt="" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/personal/0001.png'"/></div>`
        : `<div class="avatar hexagon"><div><img src="${avatar}" alt=""/></div></div>`;
    const titleELe = `<div class="title">${title}${
      organization ? "<span class='at'>at</span>" + organization : ''
    }</div>`;
    return `<div class="wrapper">
      <div class="bg"></div>
      <div class="dot-bg"></div>
      <div class="card-wrapper">
        ${avatarEle}
        ${emojify(displayNameEle)}
        ${emojify(titleELe)}
      </div>
    </div>`;
  } else {
    const avatarEle = `<div class="avatar org"><img src="${avatar}" alt="" onerror="this.onerror=null; this.src='https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/Enterprise-Logo.png'"/></div>`;
    displayNameEle = `<div class="display-name org">${displayName} ${
      isVerified ? `<img src="data:image/svg+xml;base64,${verifiedIcon}" alt="">` : ''
    }</div>`;

    return `<div class="wrapper">
    <div class="bg org-bg"><img src="${avatar}" alt=""/></div>
    <div class="dot-bg"></div>
    <div class="card-wrapper" style="filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));">
      ${avatarEle}
      ${emojify(displayNameEle)}
    </div>
  </div>`;
  }
}
