export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  displayName: string;
  displayNameType: "ENS" | "GENERAL";
  avatar: string;
  avatarType: "NFT" | "GENERAL";
  title: string;
  organization: string;
}
