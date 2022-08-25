import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { BadgeRequest } from "./types";
import getBaseCss from "./getBaseCss";
const twemoji = require("twemoji");

const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const bgImage = readFileSync(
  `${__dirname}/../assets/og/og-card-bg.svg`
).toString("base64");
function getCss(parsedReq: BadgeRequest) {
  return (
    getBaseCss() +
    `
    
    `
  );
}

export function getBadge(parsedReq: BadgeRequest) {
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>

    <style>
        ${getCss(parsedReq)}
    </style>
    <body>
      ${getImage(parsedReq)}
    </body>
</html>`;
}

function getImage(parsedReq: BadgeRequest) {}
