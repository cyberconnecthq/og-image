import core from 'puppeteer-core';
import { getOptions } from './options';
import { FileType, ImgType } from './types';
import { imgSize } from './constants';
let _page: core.Page | null;
let browser: any;
async function getPage(isDev: boolean) {
  if (_page) {
    let pageCrashed = false;
    try {
      const content = await _page.content();
      return _page;
    } catch (e) {
      _page = null;
      getPage(isDev);
    }
  }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
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
  try {
    const options = await getOptions(isDev);
    browser = await core.launch(options);
    const page = await browser.newPage();
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
    await page.waitForNetworkIdle();
    const file = await page.screenshot({ type, omitBackground: true });
    return file;
  } catch (e) {
    throw e;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
