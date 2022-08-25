import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme, ImgType, OgRequest } from "./types";

export function parseRequest(
  imgType: ImgType,
  req: IncomingMessage
): ParsedRequest {
  // // console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);

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
  if (imgType == "og") {
    const {
      displayName,
      displayNameType,
      title,
      organization,
      avatar,
      avatarType,
      handle,
      type,
      isVerified,
    } = query;
    parsedRequest = {
      displayName: Array.isArray(displayName)
        ? displayName[0]
        : displayName || "",
      displayNameType: Array.isArray(displayNameType)
        ? "GENERAL"
        : displayNameType === "GENERAL" || displayNameType === "ENS"
        ? (displayNameType as OgRequest["displayNameType"])
        : "GENERAL",
      title: Array.isArray(title) ? title[0] : title || "",
      organization: Array.isArray(organization)
        ? organization[0]
        : organization || "",
      avatar: Array.isArray(avatar) ? avatar[0] : avatar || "",
      avatarType: Array.isArray(avatarType)
        ? "GENERAL"
        : avatarType == "GENERAL" || avatarType == "NFT"
        ? (avatarType as OgRequest["avatarType"])
        : "GENERAL",
      handle: Array.isArray(handle) ? handle[0] : handle || "",
      type: Array.isArray(type)
        ? "PERSONAL"
        : type == "PERSONAL" || type == "ORG"
        ? (type as OgRequest["type"])
        : "PERSONAL",
      isVerified: Array.isArray(isVerified)
        ? false
        : isVerified == "true"
        ? true
        : false,
    };
  } else if (imgType == "poster") {
    parsedRequest = {
      posterType: Array.isArray(query.posterType)
        ? query.posterType[0]
        : query.posterType || "Standard",
      bgType: Array.isArray(query.bgType) ? query.bgType[0] : query.bgType || 0,
      bgNumber: Array.isArray(query.bgNumber)
        ? query.bgNumber[0]
        : query.bgNumber || 0,
      eventTitle: Array.isArray(query.eventTitle)
        ? query.eventTitle[0]
        : query.eventTitle || "",
      time: Array.isArray(query.time) ? query.time[0] : query.time || "",
      place: Array.isArray(query.place)
        ? query.place[0]
        : query.place || "twitter",
      raffleText: Array.isArray(query.raffleText)
        ? query.raffleText[0]
        : query.raffleText || "",
      orgLogo: Array.isArray(query.orgLogo)
        ? query.orgLogo[0]
        : query.orgLogo || "",
      orgName: Array.isArray(query.orgName)
        ? query.orgName[0]
        : query.orgName || "",
      speakers: JSON.parse(query.speakers as string),
    };
    console.log(parsedRequest);
  } else {
    throw new Error("Invalid imgType");
  }
  // @ts-ignore
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
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
