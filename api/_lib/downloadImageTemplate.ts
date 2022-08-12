import { readFileSync } from "fs";
import { ParsedRequest } from "./types";
import getBaseCss from "./getBaseCss";
import QRCode from "qrcode";

const bgImage = readFileSync(`${__dirname}/nft-card-bg.svg`).toString("base64");
function getCss() {
  return (
    getBaseCss() +
    `
    *{
      box-sizing: border-box;
      border:none;
    }
    .wrapper {
      width: 345px;
      height: 553px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      background-image: url(data:image/svg+xml;base64,${bgImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .avatar{
      width:70px;
      height:70px;
      overflow:hidden;
      margin-bottom:20px;
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
      width:100%;
      height:100%;
      background-color:#fff;
      border:6px solid #fff;
      clip: padding-box;
    }
    .display-name{
      color:#fff;
      font-style: normal;
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 10px;
      word-break: break-word;
    }
    .display-name span{
      color: rgba(255, 255, 255, 0.3);
    }
    .title{
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
    .qrcode-area{
      width: 100px;
      height: 100px;
      margin-bottom: 30px;
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: flex-end;
    }
    .qrcode-area>img{
      display: block;
      width: 100%;
    }
    .handle-area{
      display: flex;
      margin-bottom:10px;
      color:#fff;
      align-items:flex-end;
      font-weight: 700;
      font-size: 18px;
      
    }
    .handle-area>div{
      padding: 0 6px 0 3px;
      border-radius:4px;
      transform: skew(-30deg);
      margin-left:5px;
      background-color:#fff;
    }
    .handle-area>div>span{
      display:block;
      max-width: 193px;
      color: #000;
      transform: skew(30deg);
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    `
  );
}

export async function getDownloadImage(parsedReq: ParsedRequest) {
  const imgStr = await getImage(parsedReq);
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <style>
        ${getCss()}
    </style>
    <body>
      ${imgStr}
    </body>
</html>`;
}

async function getImage(parsedReq: ParsedRequest) {
  const {
    displayName,
    displayNameType,
    title,
    organization,
    avatar,
    avatarType,
    handle,
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
  const qrcodeData = await QRCode.toDataURL("https://link3.to/" + handle, {
    margin: 0.5,
  });
  return `<div class="wrapper">
            ${avatarEle}
            ${displayNameEle}
            ${titleELe}
            <div class="qrcode-area"><img src="${qrcodeData}"/></div>
            <div class="handle-area">Link3.to/ <div><span>${handle}</span></div></div>
          </div>`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
