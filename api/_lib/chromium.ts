import core from 'puppeteer-core';
import { getOptions } from './options';
import { FileType, ImgType } from './types';
import { imgSize } from './constants';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  // if (_page) {
  //   console.log(_page.isClosed());
  //   return _page;
  // }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  // _page = await browser.defaultPage();
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  html: string,
  type: FileType,
  isDev: boolean,
  imageType: ImgType = 'og',
  isDiscord = false,
  isThumb = false,
) {
  const page = await getPage(isDev);
  let _imageType: ImgType;
  switch (imageType) {
    case 'poster':
      if (isDiscord) {
        _imageType = 'discord';
      } else if (isThumb) {
        _imageType = 'thumbnail';
      } else {
        _imageType = imageType;
      }
      break;
    default:
      _imageType = imageType;
  }

  await page.setViewport({
    width: imgSize[_imageType].width,
    height: imgSize[_imageType].height,
    deviceScaleFactor: imgSize[_imageType].ratio,
  });
  await page.setContent(html);
  const file = await page.screenshot({ type, omitBackground: true });
  return file;
}
