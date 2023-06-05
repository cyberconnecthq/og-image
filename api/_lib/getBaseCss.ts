import { readFileSync } from 'fs';
export default function getBaseCss() {
  const outfit = readFileSync(`${__dirname}/../_fonts/Outfit.woff2`).toString('base64');
  return `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  html,body {
    margin:0;padding:0;
    font-family:'Outfit', 'Noto Sans SC', 'Noto Sans JP', 'Open Sans', 'Noto Sans KR', 'Noto Color Emoji', Microsoft Yahei;
  }
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
.flex{
  display:flex;
}
`;
}
export function getPosterBaseCss() {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

  html,body {
    margin:0;padding:0;
    box-sizing:border-box;
    font-family:'Plus Jakarta Sans', 'Noto Sans SC', 'Noto Sans JP', 'Open Sans', 'Noto Sans KR', 'Noto Color Emoji', Microsoft Yahei, PingFang SC, PingFang TC, Hiragino Sans, Hiragino Kaku Gothic Pro, -apple-system,
    system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell,
    Droid Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Lucida Grande, Helvetica, Arial,
    sans-serif;
  }
  .flex{
    display:flex;
  }
  `;
}

export function getOfflineEventPosterBaseCss() {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

  html,body {
    width:100%;
    height:100%;
    margin:0;padding:0;
    box-sizing:border-box;
    font-family:'Lexend', 'Noto Sans SC', 'Noto Sans JP', 'Open Sans', 'Noto Sans KR', 'Noto Color Emoji', Microsoft Yahei, PingFang SC, PingFang TC, Hiragino Sans, Hiragino Kaku Gothic Pro, -apple-system,
    system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell,
    Droid Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Emoji, Segoe UI Symbol, Lucida Grande, Helvetica, Arial,
    sans-serif;
  }
  .flex{
    display:flex;
  }
  *{
    box-sizing:border-box;
  }
  `;
}
