import { PosterType, layoutColumnGap } from './type';

const getBg = (bgNumber: number) => {
  // 0-11
  return `https://link3-image.cyberconnect.dev/offlineeventposterbg/${bgNumber}.jpg`;
};

export default function wrapperCss(postType: PosterType, bgNumber: number) {
  return `
    .wrapper{
      display:flex;
      box-sizing: border-box;
      flex-direction: ${postType === PosterType.STANDARD ? 'column' : 'row'};
      align-items: ${postType === PosterType.EVENT ? 'center' : 'normal'};
      gap: ${layoutColumnGap[postType]};
      width:1000px;
      height:500px;
      background-image: url(${getBg(bgNumber)});
      background-size: cover;
      color: #ffffff;
      padding: 40px; 
    }
  `;
}
