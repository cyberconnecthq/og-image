import core from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
import { getOptions } from './options';
import { FileType, ImgType } from './types';
import { imgSize } from './constants';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await chromium.puppeteer.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean, imageType: ImgType = 'og') {
  const page = await getPage(isDev);
  await page.setViewport({
    width: imgSize[imageType].width,
    height: imgSize[imageType].height,
    deviceScaleFactor: imgSize[imageType].ratio,
  });
  await page.setContent(html);
  const file = await page.screenshot({ type, omitBackground: true });
  return file;
}
