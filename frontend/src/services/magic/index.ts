import { Magic } from "magic-sdk";

export const magic = new Magic(process.env.MAGIC_API_KEY || "", {
  testMode: process.env.NODE_ENV == "development",
});
