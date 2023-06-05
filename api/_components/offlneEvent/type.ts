export type Host = {
  displayName: string;
  avatar: string;
};
export enum PosterType {
  EVENT,
  HOST,
  STANDARD,
}
export const layoutColumnGap: { [key: number]: string } = {
  [PosterType.EVENT]: '32px',
  [PosterType.HOST]: '44px',
  [PosterType.STANDARD]: '50px',
};
export const titleStyle: { [key: number]: string } = {
  [PosterType.EVENT]: `
    font-weight: 700;
    font-size: 50px;
    line-height: 62px;
    height: 300px;
    width: 400px;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  `,
  [PosterType.HOST]: `
    width:356px;
    height:260px;
    font-weight: 700;
    font-size: 42px;
    line-height: 52px;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  `,
  [PosterType.STANDARD]: `
    font-weight: 700;
    font-size: 50px;
    line-height: 62px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `,
};
