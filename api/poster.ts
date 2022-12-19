import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { parse } from 'url';
import { getPoster } from './_templates/posterTemplate';
import { FileType, ImgType, PosterRequest } from './_lib/types';
// import { corsMiddleware } from './_lib/corsMiddleware';

const isDev = !process.env.IS_PROD;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // await corsMiddleware(req, res);
  try {
    const { pathname, query } = parse(req.url || '/', true);

    const { isHtmlDebug, isDownload, isDiscord, isThumb, isQueryDebug } = query;
    let html,
      imageType: ImgType,
      fileType: FileType = 'png';
    imageType = 'poster';
    fileType = 'jpeg';
    const parsedReq = parseRequest('poster', req);
    html = await getPoster(parsedReq as PosterRequest);

    if (isQueryDebug) {
      return res.end(JSON.stringify(query));
    }

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      return;
    }
    const file = await getScreenshot(html, fileType, isDev, imageType, Boolean(isDiscord), Boolean(isThumb));
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/jpeg`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    if (isDownload) {
      res.setHeader('Content-Disposition', ' attachment; filename="Link3_event_poster.jpeg"');
    }
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    console.error(e);
  }
}
