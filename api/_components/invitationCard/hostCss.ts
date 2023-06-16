export default function hostCss() {
  return `
    .hostTag{
      display:flex;
      font-size:12px;
      font-weight:500;
      border: 1.5px solid #FFFFFF;
      border-radius: 3px;
      align-items:center;
      justify-content:center;
      width:fit-content;
      height:fit-content;
      padding:0 8px;
    }
    .hostWrapper{
      display:flex;
      flex-wrap:wrap;
      align-items: flex-start;
      justify-content:center;
      width:100%;
      height:170px;
      gap:20px;
      row-gap: 33px;
    }
    .host{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      font-size: 22px;
      line-height: 28px;
      font-weight: 500;
    }
    .host img{
      display:block; 
      width:34px;
      height:34px;
      border:1px solid #fff;
      vertical-align:middle;
      border-radius:3px;
    }
  `;
}
