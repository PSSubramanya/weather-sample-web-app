import { FAVOURITE_CITIES, RECENT_CITIES } from "../../constants/types";

export function setFavouriteCities(data) {
  return {
    type: FAVOURITE_CITIES,
    payload: data,
  };
}

export function setRecentCities(data) {
  return {
    type: RECENT_CITIES,
    payload: data,
  };
}
