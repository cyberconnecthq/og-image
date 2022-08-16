import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme } from "./types";

export function parseRequest(req: IncomingMessage) {
  // // console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const {
    displayName,
    displayNameType,
    title,
    organization,
    avatar,
    avatarType,
    handle,
    type,
  } = query;
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

  const parsedRequest: ParsedRequest = {
    displayName: Array.isArray(displayName)
      ? displayName[0]
      : displayName || "",
    displayNameType: Array.isArray(displayNameType)
      ? "GENERAL"
      : displayNameType == "GENERAL" || displayNameType == "ENS"
      ? displayNameType
      : "GENERAL",
    title: Array.isArray(title) ? title[0] : title || "",
    organization: Array.isArray(organization)
      ? organization[0]
      : organization || "",
    avatar: Array.isArray(avatar) ? avatar[0] : avatar || "",
    avatarType: Array.isArray(avatarType)
      ? "GENERAL"
      : avatarType == "GENERAL" || avatarType == "NFT"
      ? avatarType
      : "GENERAL",
    handle: Array.isArray(handle) ? handle[0] : handle || "",
    type: Array.isArray(type)
      ? "PERSONAL"
      : type == "PERSONAL" || type == "ORG"
      ? type
      : "PERSONAL",
  };
  // parsedRequest.images = getDefaultImages(
  //   parsedRequest.images,
  //   parsedRequest.theme
  // );
  // return parsedRequest;
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
