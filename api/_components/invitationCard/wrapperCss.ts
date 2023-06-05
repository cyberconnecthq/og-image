import {} from './type';

const getBg = (bgNumber: number) => {
  // 0-23
  return `https://link3-image.cyberconnect.dev/offlineeventposterbg/${bgNumber}.jpg`;
};

export default function wrapperCss(bgNumber: number) {
  return `
    .wrapper{
      position:relative;
      display:flex;
      flex-direction: column;
      width:900px;
      height:1200px;
      background-image: url(${getBg(bgNumber)});
      background-size: cover;
      color: #ffffff;
      padding: 100px 50px 50px; 
    }
  `;
}
