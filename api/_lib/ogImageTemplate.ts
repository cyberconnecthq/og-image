import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
import getBaseCss from "./getBaseCss";

const outfit = readFileSync(`${__dirname}/../_fonts/Outfit.woff2`).toString(
  "base64"
);
const bgImage = readFileSync(`${__dirname}/og-card-bg.svg`).toString("base64");
const dotBgImage = readFileSync(`${__dirname}/dot-bg.png`).toString("base64");
function getCss(parsedReq: ParsedRequest) {
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
      background-image: url(data:image/svg+xml;base64,${bgImage});
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
    .title{
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
    }
    `
  );
}

export function getHtml(parsedReq: ParsedRequest) {
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

function getImage(parsedReq: ParsedRequest) {
  const {
    displayName,
    displayNameType,
    title,
    organization,
    avatar,
    avatarType,
  } = parsedReq;
  let displayNameEle;

  if (displayNameType == "ENS") {
    displayNameEle = `<div class="display-name">${displayName.slice(
      0,
      -4
    )}<span>.eth</span></div>`;
  } else {
    displayNameEle = `<div class="display-name">${displayName}</div>`;
  }
  const avatarEle =
    avatarType == "GENERAL"
      ? `<div class="avatar"><img src="${avatar}" alt=""/></div>`
      : `<div class="avatar hexagon"><div><img src="${avatar}" alt=""/></div></div>`;
  const titleELe = `<div class="title">${title} ${
    organization ? "at " + organization : ""
  }</div>`;
  return `<div class="wrapper">
  <div class="bg"></div>
  <div class="dot-bg"></div>
  <div class="card-wrapper">
    ${avatarEle}
    ${displayNameEle}
    ${titleELe}
  </div>
</div>`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
