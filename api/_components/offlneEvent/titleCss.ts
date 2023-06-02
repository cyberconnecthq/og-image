import { PosterType, titleStyle } from './type';

export default function titleCss(postType: PosterType, title: string) {
  return `.title{
    ${titleStyle[postType]}
    flex-shrink:0;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .titleWrapper{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  `;
}
