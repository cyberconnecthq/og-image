import { IncomingMessage, ServerResponse } from "http";
import { parseRequest } from "./_lib/parser";
import { getScreenshot } from "./_lib/chromium";
import { getHtml } from "./_lib/ogImageTemplate";
import { parse } from "url";
import { getDownloadImage } from "./_lib/downloadImageTemplate";

const isDev = !process.env.IS_PROD;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReq = parseRequest(req);
    const { pathname, query } = parse(req.url || "/", true);
    const { isHtmlDebug, isDownload } = query;
    let html, imageType: "og" | "download";
    if (pathname == "/og.png") {
      imageType = "og";
      html = getHtml(parsedReq);
    } else {
      imageType = "download";
      html = await getDownloadImage(parsedReq);
    }

    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const file = await getScreenshot(html, "png", isDev, imageType);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    if (isDownload) {
      res.setHeader(
        "Content-Disposition",
        ' attachment; filename="Link3_Profile.png"'
      );
    }
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
