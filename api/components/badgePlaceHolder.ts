import { getColor } from '../_lib/utils';
export const badgeSmall = (color: 'white' | 'black' = 'white') => {
  const flex = `display:flex;
  justify-content:center;
  align-items:center;`;
  const css = `
    .badge-placeholder-bg{
      background-color:${color == 'black' ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'};
    }
    .badge-wrapper{
      display:flex;
    }
    .badge-wrapper.small .left, .badge-wrapper.small .right{
      border-radius:4px;
      border:1px solid #fff;
    }
    .badge-wrapper.small .left{
      width:90px;
      height:90px;
      padding:7px;
    }
    .badge-wrapper.small .left>div{
      ${flex}
      width:100%;height:100%;
      border:3px solid ${color};
      color:${color};
      line-height:16px;
      font-weight: 700;
      font-size: 13px;
      border-radius:50%;
      text-align:center;
    }
    .badge-wrapper.small .right{
      ${flex} 
      width:115px;
      height:90px;
      padding:10px 18px;
      margin-left:5px;
    }
  `;
  const html = `
    <div class="badge-wrapper small">
      <div class="left badge-placeholder-bg">
        <div>BADGE HOLDER</div>
      </div>
      <div class="right badge-placeholder-bg">Proof of Attendance Badge</div>
    </div>
  `;
  return { css, html };
};
