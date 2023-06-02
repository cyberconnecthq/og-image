import { PosterType, layoutColumnGap } from './type';

const getBg = (bgNumber: number) => {
  return `https://image-stg.s3.us-west-2.amazonaws.com/link3/poster/bg2-3.jpeg`;
};

export default function wrapperCss(postType: PosterType, bgNumber: number) {
  return `
    .wrapper{
      display:flex;
      flex-direction: ${postType === PosterType.STANDARD ? 'column' : 'row'};
      align-items: ${postType === PosterType.EVENT ? 'center' : 'normal'};
      gap: ${layoutColumnGap[postType]};
      width: 100%;
      height: 100%;
      background-image: url(${getBg(bgNumber)});
      background-size: cover;
      color: #ffffff;
      padding: 40px; 
    }
  `;
}
