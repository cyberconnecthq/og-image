import { OfflineEventQrcodeReq } from '../_lib/types';
import { twOptions } from '../_lib/utils';
import wrapperCss from '../_components/offlneEvent/wrapperCss';
import { getOfflineEventPosterBaseCss } from '../_lib/getBaseCss';
import titleCss from '../_components/offlneEvent/titleCss';
import { PosterType } from '../_components/offlneEvent/type';
import QRCode from 'qrcode';

export async function getTemplate(parsedReq: OfflineEventQrcodeReq) {
  const { qrcodeString } = parsedReq;
  const dataUrl = await QRCode.toDataURL(qrcodeString, { errorCorrectionLevel: 'L', width: 500, margin: 0.5 });

  return `<!DOCTYPE html>
    <html>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    </head>

    <style>
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
        .wrapper{width:500px;height:500px}
        .wrapper img{
          display:block;
          width:100%;
          height:100%;
          
        }
    </style>
    <body>
      <div class="wrapper">
      <img src="${dataUrl}" />
      </div>
    </body>
</html>`;
}
