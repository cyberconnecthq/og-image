import { InvitationCardReq, OfflineEventPosterReq } from '../_lib/types';
import { twOptions } from '../_lib/utils';
import wrapperCss from '../_components/invitationCard/wrapperCss';
import hostCss from '../_components/invitationCard/hostCss';
import { getOfflineEventPosterBaseCss } from '../_lib/getBaseCss';
import info from '../_components/offlneEvent/info';
import QRCode from 'qrcode';

const twemoji = require('twemoji');

// TODO：emoji support
const emojify = (text: string) => twemoji.parse(text, twOptions);

export async function getInvitationCard(parsedReq: InvitationCardReq) {
  const defaultOrgAvatar = 'https://image-stg.s3.us-west-2.amazonaws.com/link3/avatar/Enterprise-Logo.png';
  const { title, time, venue, host, bgNumber, invitee, qrcodeString } = parsedReq;
  const qrcode = await QRCode.toDataURL(qrcodeString, {
    margin: 2,
    color: { light: '#000', dark: '#fff' },
  });
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
      ${wrapperCss(bgNumber)}
      ${hostCss()}
      .title{
        width:100%;
        height:220px;
        margin-top:50px;
        font-style: normal;
        font-weight: 700;
        font-size: 60px;
        line-height: 76px;
        text-align: center;
        display: -webkit-box;
        overflow:hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .invitee{
        margin-top:50px;
        font-weight: 800;
        font-size: 80px;
        line-height: 101px;
        text-align: center;
      }
      .footer{
        display:flex;
        justify-content:space-between;
        width:100%;
        height:300px;
        position:absolute;
        padding:0 50px 50px 50px;
        bottom:0;
        left:0;
      }
      .qrcode{
        display:block;
        width:213px;
        height:213px;
      }
      .info{
        display:flex;
        gap:30px;
        align-items:center;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        
      }
    </style>
    <body>
      <div class="wrapper">
        <div class="hostWrapper">
          ${host
            .map((h) => {
              return `<div class="host"><img src="${h.avatar}" onerror="this.onerror=null; this.src="${defaultOrgAvatar}" />${h.displayName}</div>`;
            })
            .join('')}
        </div>
        <div class="title">${title}</div>
        <div style="
          font-weight: 400;
          font-size: 38px;
          line-height: 48px;
          text-align: center;
        ">Invitation</div>
        <div class="invitee">${invitee}</div>
        <div class="footer">
            <div class="info">${info(time, venue)}</div>
            <img src="${qrcode}" alt='qrcode'/>
        </div>
      </div>
    </body>
</html>`;
}
