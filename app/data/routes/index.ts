// src/data/routes/index.ts
import { GTX_ROUTES } from "./gtx";
import { LIGHT_RAIL } from "./light_rail";

export const ROUTES = [
  ...GTX_ROUTES,
  ...LIGHT_RAIL,
  // ...ETC_ROUTES,
];
