import core from "puppeteer-core";
import { getOptions } from "./options";
import { FileType } from "./types";
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
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
  imageType: "og" | "download" = "og"
) {
  const page = await getPage(isDev);
  const width = imageType === "og" ? 540 : 345;
  const height = imageType === "og" ? 380 : 553;
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
}
