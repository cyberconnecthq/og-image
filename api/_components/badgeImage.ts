import { PosterRequest, PosterType } from './../_lib/types';
import { getColor } from '../_lib/utils';
export default function getBadgeImage(req: PosterRequest) {
  const { badgeUrl, bgType, bgNumber } = req;
  let dom = '';
  if (!badgeUrl) {
    return '';
  }
  const style = `
        <style>
          .badge-image.standard,.badge-image.highlight-guest{
            position:absolute;
            display:flex;
            gap:10px;
            align-items:center;
          }
          .badge-image.standard img, .badge-image.highlight-guest img{
            display:block;
            width:80px;
            height:80px; 
            object-fit:contain;
          }
          .badge-image div{
            font-weight: 700;
            font-size: 14px;
            color:${getColor(bgType, bgNumber)};
            text-decoration: underline;
          }
          .badge-image.standard div,.badge-image.highlight-guest div{
            width:100px;
          }
          .badge-image.standard{
            top:35px;
            right:35px;
          }
          .badge-image.highlight-guest{
            position:relative;
            margin-bottom:10px;
            margin-top:20px;
          }

          .badge-image.highlight-badge{
            position:absolute;
            top:60px;
            right:35px;
            width:320px;
            height:320px;
          }
          .badge-image.highlight-badge img{
            object-fit:contain;
            width:100%;
            height:100%;
          }
          .badge-image.highlight-badge div{
            width:320px;
            font-size:20px;
            margin-top:20px;
            text-align:center;
          }

          .badge-image.minimal {
            width:85px;
            height:85px;
            position:absolute;
            top:50px;
            right:50px;
          }
          .badge-image.minimal img{
            display:block;
            width:100%;
            height:100%;
            object-fit:contain;
          }
        </style>
  `;
  switch (req.posterType) {
    case PosterType.Standard:
      dom = `
      <div class="badge-image standard"><img src='${badgeUrl}' alt='badge'/><div>Web3 Status Token (WΞST)</div></div>
      `;
      break;
    case PosterType.HighlightBadge:
      dom = `
      <div class="badge-image highlight-badge"><img src='${badgeUrl}' alt='badge'/><div>Web3 Status Token (WΞST)</div></div>
      `;
      break;
    case PosterType.HighlightGuests:
      dom = `
      <div class="badge-image highlight-guest"><img src='${badgeUrl}' alt='badge'/><div>Web3 Status Token (WΞST)</div></div>
      `;
      break;
    case PosterType.Minimal:
      dom = `
      <div class="badge-image minimal"><img src='${badgeUrl}' alt='badge'/></div>
      `;
      break;
    default:
      dom = '';
  }
  return style + dom;
}
