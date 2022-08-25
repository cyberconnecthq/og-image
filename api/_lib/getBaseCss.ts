import { readFileSync } from 'fs';
export default function getBaseCss() {
  const outfit = readFileSync(`${__dirname}/../_fonts/Outfit.woff2`).toString('base64');
  return `
  html,body {
    margin:0;padding:0;
    font-family:'Outfit';
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
  const regular = readFileSync(`${__dirname}/../_fonts/PlusJakartaSans-Regular.woff2`).toString('base64');
  const medium = readFileSync(`${__dirname}/../_fonts/PlusJakartaSans-Medium.woff2`).toString('base64');
  const semiBold = readFileSync(`${__dirname}/../_fonts/PlusJakartaSans-semiBold.woff2`).toString('base64');
  const Bold = readFileSync(`${__dirname}/../_fonts/PlusJakartaSans-Bold.woff2`).toString('base64');
  const extraBold = readFileSync(`${__dirname}/../_fonts/PlusJakartaSans-extraBold.woff2`).toString('base64');
  return `
  html,body {
    margin:0;padding:0;
    box-sizing:border-box;
    font-family:'Plus Jakarta Sans';
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url(data:font/woff2;charset=utf-8;base64,${medium}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url(data:font/woff2;charset=utf-8;base64,${semiBold}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url(data:font/woff2;charset=utf-8;base64,${Bold}) format('woff2');
    unicoderange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-display: swap;
    font-weight: 800;
    src: url(data:font/woff2;charset=utf-8;base64,${extraBold}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,
      U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  .flex{
    display:flex;
  }
  `;
}
