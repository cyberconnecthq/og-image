import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest, Theme, ImgType, OgRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);
export function parseRequest(imgType: ImgType, req: IncomingMessage): ParsedRequest {
  // // console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || '/', true);

  // const { fontSize, images, widths, heights, theme, md } = query || {};
  // // console.log(images);
  // if (Array.isArray(fontSize)) {
  //   throw new Error("Expected a single fontSize");
  // }
  // if (Array.isArray(theme)) {
  //   throw new Error("Expected a single theme");
  // }

  // const arr = (pathname || "/").slice(1).split(".");
  // let extension = "";
  // let text = "";
  // if (arr.length === 0) {
  //   text = "";
  // } else if (arr.length === 1) {
  //   text = arr[0];
  // } else {
  //   extension = arr.pop() as string;
  //   text = arr.join(".");
  // }
  let parsedRequest;
  if (imgType == 'og') {
    const { displayName, displayNameType, title, organization, avatar, avatarType, handle, type, isVerified } = query;
    parsedRequest = {
      displayName: Array.isArray(displayName) ? displayName[0] : displayName || '',
      displayNameType: Array.isArray(displayNameType)
        ? 'GENERAL'
        : displayNameType === 'GENERAL' || displayNameType === 'ENS' || displayNameType === 'SID'
        ? (displayNameType as OgRequest['displayNameType'])
        : 'GENERAL',
      title: Array.isArray(title) ? title[0] : title || '',
      organization: Array.isArray(organization) ? organization[0] : organization || '',
      avatar: Array.isArray(avatar) ? avatar[0] : avatar || '',
      avatarType: Array.isArray(avatarType)
        ? 'GENERAL'
        : avatarType == 'GENERAL' || avatarType == 'NFT'
        ? (avatarType as OgRequest['avatarType'])
        : 'GENERAL',
      handle: Array.isArray(handle) ? handle[0] : handle || '',
      type: Array.isArray(type)
        ? 'PERSONAL'
        : type == 'PERSONAL' || type == 'ORG'
        ? (type as OgRequest['type'])
        : 'PERSONAL',
      isVerified: Array.isArray(isVerified) ? false : isVerified == 'true' ? true : false,
    };
  } else if (imgType == 'poster') {
    parsedRequest = {
      posterType: getString(query.posterType, 'Standard'),
      bgType: getNumber(query.bgType),
      bgNumber: getNumber(query.bgNumber),
      eventTitle: emojify(decodeURIComponent(getString(query.eventTitle))),
      time: getString(query.time),
      place: getString(query.place, 'twitter'),
      raffleText: getString(query.raffleText),
      orgLogo: getString(query.orgLogo),
      orgName: getString(query.orgName),
      speakers: query.speakers ? JSON.parse(query.speakers as string).slice(0, 6) : [],
      isBadgePreview: getBoolean(query.isBadgePreview),
      badgeUrl: getString(query.badgeUrl),
      isDiscord: getBoolean(query.isDiscord),
      timezone: getString(query.timezone),
      extraPlaceInfo: getString(query.extraPlaceInfo),
    };
  }
  // else if (imgType == 'badge') {
  //   parsedRequest = {
  //     bg: getNumber(query.bg),
  //     shape: getNumber(query.shape),
  //     maskType: getNumber(query.maskType),
  //     textStyle: getNumber(query.textStyle),
  //     text: getString(query.text),
  //     logoUrl: getString(query.logoUrl),
  //     bgUrl: getString(query.bgUrl),
  //     textColor: getString(query.textColor),
  //   };
  //   // console.log(parsedRequest);
  // }
  // @ts-ignore
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === 'undefined') {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}
function getString(req: string | number | Array<any> | undefined, defaultValue: string = ''): string {
  if (typeof req === 'undefined') {
    return defaultValue;
  } else if (typeof req === 'number') {
    return req.toString();
  } else if (Array.isArray(req)) {
    return req[0].toString();
  } else {
    return req;
  }
}
function getNumber(req: string | number | Array<any> | undefined): number {
  if (typeof req === 'undefined') {
    return 0;
  } else if (typeof req === 'number') {
    return req;
  } else if (Array.isArray(req)) {
    return isNaN(parseInt(req[0], 10)) ? 0 : parseInt(req[0], 10);
  } else {
    return isNaN(parseInt(req, 10)) ? 0 : parseInt(req, 10);
  }
}
function getJSONFromString(req: string | number | Array<any> | undefined): any {
  if (typeof req === 'undefined') {
    return {};
  } else if (typeof req === 'number') {
    return {};
  } else if (Array.isArray(req)) {
    return JSON.parse(req[0]);
  } else {
    return JSON.parse(req);
  }
}
function getBoolean(req: string | number | Array<any> | undefined): boolean {
  if (typeof req === 'undefined') {
    return false;
  } else if (typeof req === 'number') {
    return req === 1;
  } else if (Array.isArray(req)) {
    return req[0] === 'true';
  } else {
    return req === 'true';
  }
}
function getDefaultImages(images: string[], theme: Theme): string[] {
  // console.log(theme);
  // console.log(images);
  // const defaultImage =
  //   theme === "light"
  //     ? "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg"
  //     : "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg";

  // if (!images || !images[0]) {
  //   return [defaultImage];
  // }
  // if (
  //   !images[0].startsWith("https://assets.vercel.com/") &&
  //   !images[0].startsWith("https://assets.zeit.co/")
  // ) {
  //   images[0] = defaultImage;
  // }
  return images;
}
