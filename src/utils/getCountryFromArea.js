import { AREAS_AND_COUNTRIES } from "./constants";

export function getCountryFromArea(area) {
  return AREAS_AND_COUNTRIES[area];
}