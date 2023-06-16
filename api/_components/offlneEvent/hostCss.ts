import { PosterType } from './type';

export default function hostCss(posterType: PosterType, hostLength: number) {
  return `
    .hostTag{
      display:flex;
      font-size:12px;
      font-weight:500;
      border: 1.5px solid #FFFFFF;
      border-radius: 3px;
      margin-bottom:${posterType === PosterType.EVENT ? '32px;' : '0'};
      align-items:center;
      justify-content:center;
      width:fit-content;
      height:fit-content;
      padding:${posterType === PosterType.STANDARD ? '3px 8px' : '0 8px'};
    }
    .hostWrapper{
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      width:100%;
      gap:10px;
      row-gap: 18px;
    }
    .host{
      display: flex;
      width: ${posterType === PosterType.HOST ? 'calc(25% - 10px)' : 'auto'};
      flex-direction:${posterType === PosterType.HOST ? 'column' : 'row'};
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      ${
        posterType === PosterType.HOST
          ? `
              font-size: 16px;
              line-height: 20px;`
          : `font-size: 18px;
              line-height: 22px;`
      }
      font-weight: 500;
      
    }
    .host img{
      display:block;
      width:${posterType === PosterType.HOST ? '70px' : '25px'};
      height:${posterType === PosterType.HOST ? '70px' : '25px'};
      border:1px solid #fff;
      vertical-align:middle;
      border-radius: ${posterType === PosterType.HOST ? '5px' : '3px'};
    }
  `;
}
