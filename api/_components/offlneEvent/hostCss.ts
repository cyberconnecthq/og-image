import { PosterType } from './type';

export default function hostCss(posterType: PosterType, hostLength: number) {
  return `
  .hostTag{
    display:flex;
    font-size:12px;
    font-weight:500;
    border: 1.5px solid #FFFFFF;
    border-radius: 3px;
    margin-bottom:32px;
    align-items:center;
    justify-content:center;
    width:fit-content;
    padding:0 8px;
  }
  .hostWrapper{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    width:100%;
    gap:10px;
    row-gap: 15px;
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
      width:${posterType === PosterType.EVENT ? '25px' : '70px'};
      height:${posterType === PosterType.EVENT ? '25px' : '70px'};
      border:1.5px solid #fff;
      border-radius: ${posterType === PosterType.EVENT ? '3px' : '5px'};
    }
  `;
}
