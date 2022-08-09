import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const outfit = readFileSync(`${__dirname}/../_fonts/Outfit.woff2`).toString(
  "base64"
);
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);
const bgImage = readFileSync(`${__dirname}/card-bg.svg`).toString("base64");
function getCss() {
  return `
    @font-face {
        font-family: 'Outfit';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${outfit}) format('woff2');
    }

    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${outfit}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${outfit}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${outfit}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${outfit}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }


    body {
        margin:0;padding:0;
        font-family:'Outfit';
    }
    .wrapper {
      width: 510px;
      height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .bg {
      width: 100%;
      height: 100%;
      background-image: url("https://lh3.googleusercontent.com/AfF3qUt5x2m2eiOq0SSA1LeGgmYY-dFTOi7JVGpYrmDpN-oG-tCfMPKEMWaEzgq0HtGaBC2WubMRGOOeUJuh9nsi8DEtHHPHnc0C8A=w600");
      filter: blur(10px);
      -webkit-filter: blur(10px);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index:2;
    }
    .card-wrapper {
      z-index:5;
      width: 385px;
      height: 228px;
      display: flex;
      flex-direction: column;
      position: relative;
      background-image: url(data:image/svg+xml;base64,${bgImage});
      background-position: top center;
      background-repeat: no-repeat;
      background-size: cover;
      padding:30px;
    }
    .avatar{
      margin-bottom:30px;
      border:7px solid #fff;
      border-radius:1000px;
      width:60px;
      height:60px;
    }
    .avatar img{
      display:flex;
      border-radius:1000px;
      width:100%;
    }
    .display-name{
      color:#fff;
      font-style: normal;
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 10px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>

    <style>
        ${getCss()}
    </style>
    <body>
      ${getImage(images[0])}
    </body>
</html>`;
}

function getImage(src: string, width = "1200", height = "630") {
  return `<div class="wrapper">
  <div class="bg"></div>
  <div class="card-wrapper">
    <div class="avatar"><img src="https://lh3.googleusercontent.com/AfF3qUt5x2m2eiOq0SSA1LeGgmYY-dFTOi7JVGpYrmDpN-oG-tCfMPKEMWaEzgq0HtGaBC2WubMRGOOeUJuh9nsi8DEtHHPHnc0C8A=w600"/></div>
    <div class="display-name">Wanghanyang<span>.eth</span></div>
    <div class="title"></div>
  </div>
</div>`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
