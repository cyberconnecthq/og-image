import { IncomingMessage, ServerResponse } from 'http';
import { parseInvitationQuery } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { parse } from 'url';
import { FileType, ImgType } from './_lib/types';
import { getInvitationCard } from './_templates/invitationCard';
// import { corsMiddleware } from './_lib/corsMiddleware';

const isDev = !process.env.IS_PROD;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // await corsMiddleware(req, res);
  const { pathname, query } = parse(req.url || '/', true);
  const { debug, isDownload, isDiscord, isThumb } = query;
  try {
    let html,
      imageType: ImgType,
      fileType: FileType = 'jpeg';
    imageType = 'invitationCard';
    const parsedReq = parseInvitationQuery(req);

    html = await getInvitationCard(parsedReq);
    // console.log(parsedReq);
    // if (isQueryDebug) {
    //   return res.end(JSON.stringify(query));
    // }

    if (debug && debug === 'true') {
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      return;
    }
    const file = await getScreenshot(html, fileType, isDev, imageType, Boolean(isDiscord), Boolean(isThumb));
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/jpeg`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    if (isDownload) {
      res.setHeader('Content-Disposition', ' attachment; filename="Link3_offline_event_poster.jpeg"');
    }
    res.end(file);
  } catch (e) {
    console.log(query);
    console.error(e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem ' + JSON.stringify(query) + '</p>');
  }
}
