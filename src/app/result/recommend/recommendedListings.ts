import { GYEONGGI_NORTH_LISTINGS } from "./lists/gyeonggi-north";
import { GYEONGGI_SOUTH_LISTINGS } from "./lists/gyeonggi-south";
import { Listing } from "./lists/houseType";
import { INCHEON_LISTINGS } from "./lists/incheon";
import { OTHERS_LISTINGS } from "./lists/others";
import { SEOUL_LISTINGS } from "./lists/seoul";

export const RECOMMENDED_LISTINGS: Listing[] = [
  ...SEOUL_LISTINGS,
  ...GYEONGGI_NORTH_LISTINGS,
  ...GYEONGGI_SOUTH_LISTINGS,
  ...INCHEON_LISTINGS,
  ...OTHERS_LISTINGS,
];
