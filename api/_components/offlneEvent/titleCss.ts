import { PosterType, titleStyle } from './type';

export default function titleCss(postType: PosterType, title: string) {
  return `.title{
    ${titleStyle[postType]}
    flex-shrink:0;
    display: -webkit-box;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .titleWrapper{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .title img{
    display:inline-block;
    height:50px;
  }
  `;
}
