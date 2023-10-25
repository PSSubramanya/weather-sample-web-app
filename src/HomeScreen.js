import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFavouriteCities,
  setRecentCities,
} from "./redux/actions/user-actions.js";
import "./HomeScreen.css";

import app_icon from "./assets/Images/inspect/weather/Web/01_Home/logo_web.svg";
import search_icon from "./assets/Images/inspect/weather/Web/01_Home/Group 2/icon_search_white.png";
import highlighted_fav_icon from "./assets/Images/inspect/weather/Web/02_Home_Favourite/Group 11/icon_favourite_Active.svg";
import empty_fav_icon from "./assets/Images/inspect/weather/Web/03_Favourite_blank/Group 38/Group 3/favourite-icon.png";
import sunny_weather_icon from "./assets/Images/inspect/weather/Web/01_Home/background/icon_mostly_sunny.svg";
import temperature_icon from "./assets/Images/inspect/weather/Web/01_Home/background/Group 6 Copy/icon_temperature_info.svg";
import perceipitation_icon from "./assets/Images/inspect/weather/Web/01_Home/background/Group 6/icon_precipitation_info.svg";
import humidity_icon from "./assets/Images/inspect/weather/Web/01_Home/background/Group 8/icon_humidity_info.svg";
import wind_icon from "./assets/Images/inspect/weather/Web/01_Home/background/Group 9/icon_wind_info.svg";
import visibility_icon from "./assets/Images/inspect/weather/Web/01_Home/background/Group 10/icon_visibility_info.svg";
import partially_cloudy_icon from "./assets/Images/inspect/weather/Web/01_Home/background/icon_partially_cloudy_big.svg";
import thunder_storm_icon from "./assets/Images/inspect/weather/Web/01_Home/background/icon_thunderstorm_big.svg";
import cloudy_icon from "./assets/Images/inspect/weather/Web/01_Home/background/icon_mostly_cloudy_big.svg";
import clear_night_icon from "./assets/Images/inspect/weather/Web/01_Home/background/icon_clear_night.svg";
import menu_icon from "./assets/Images/inspect/weather/Web/01_Home/Group 2/menu.png";
import snow_icon from "./assets/Images/inspect/weather/Web/01_Home/background/snow.png";
import mist_icon from "./assets/Images/inspect/weather/Web/01_Home/background/mist.png";

function HomeScreen() {
  const dispatch = useDispatch();
  const today = new Date();
  const moment = require("moment");
  const myAPIKey = "aa3cfa6eefb1da106652caf207699731";

  const loadedFavouriteCities = useSelector(
    (state) => state?.userDataReducer?.favouriteLocations
  );

  const loadedRecentCities = useSelector(
    (state) => state?.userDataReducer?.recentLocations
  );

  const [favouriteOn, setFavouriteOn] = useState(false);
  const [temperatureType, setTemperatureType] = useState("celsius");
  const [weatherData, setWeatherData] = useState([]);
  const [searchPlace, setSearchPlace] = useState("Udupi");
  const [stateName, setStateName] = useState("Karnataka");
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [favouritePlaces, setFavouritePlaces] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  const favCities =
    JSON.stringify(loadedFavouriteCities?.data) === "{}"
      ? []
      : loadedFavouriteCities?.data;

  const recentCities =
    JSON.stringify(loadedRecentCities?.data) === "{}"
      ? []
      : loadedRecentCities?.data;

  useEffect(() => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&appid=${myAPIKey}`;
    fetchWeatherDataValue(weatherURL);

    setFavouritePlaces(favCities);
    setRecentPlaces(recentCities);
  }, []);

  useEffect(() => {
    const weatherDataURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchPlace}&limit=1&APPID=${myAPIKey}`;

    fetch(weatherDataURL)?.then((res) => {
      res?.json().then((resp) => {
        console.log("ALL DATA", weatherDataURL, resp);
        setStateName(resp?.[0]?.state);
      });
    });
  }, [weatherData]);

  useEffect(() => {
    if (weatherData?.name !== undefined) {
      let tempArray = recentCities;
      console.log("recent-places 1", tempArray);
      const favCityObject = {
        city: searchPlace,
        state: stateName,
        temp: Math.floor(weatherData?.main?.temp - 273),
        weather: weatherData?.weather?.[0]?.main,
        description: weatherData?.weather?.[0]?.description,
      };
      if (JSON.stringify(tempArray)?.includes(JSON.stringify(searchPlace))) {
        tempArray = [...tempArray];
      } else {
        tempArray = [...tempArray, favCityObject];
      }
      setRecentPlaces(tempArray);
      dispatch(setRecentCities(tempArray));
      console.log("recent-places 2", tempArray);
    }
  }, [weatherData?.name]);

  const fetchWeatherDataValue = (apiURL) => {
    fetch(apiURL).then((res) => {
      res.json().then((resp) => {
        console.log("WEATHER DATA", apiURL, resp);
        setWeatherData(resp);
      });
    });
  };

  const handleText = (e) => {
    setSearchPlace(e.target.value);
  };

  const renderInfoStatsSection = (title, icon, firstVal, secondVal) => {
    return (
      <div id="stat-view">
        <img className="category-icon" src={icon} alt="temperature" />
        <div className="stat-section">
          <p>{title}</p>
          <div className="value-range">
            <p className="stat-number">{firstVal}</p>
            {title === "Min - Max" ? <p className="degree-text">o</p> : null}
            {title === "Min - Max" ? <p className="dash">-</p> : null}
            {title === "Min - Max" ? (
              <p className="stat-number">{secondVal}</p>
            ) : null}
            {title === "Min - Max" ? <p className="degree-text">o</p> : null}

            {title === "Preceipitation" || title === "Humidity" ? (
              <p className="stat-number">%</p>
            ) : null}

            {title === "Wind" || title === "Visibility" ? (
              <p className="stat-number">mph</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const renderWeatherImages = (weatherType) => {
    let weatherIconToDisplay;
    switch (weatherType) {
      case "mostly sunny":
        weatherIconToDisplay = sunny_weather_icon;
        break;
      case "Rain":
        weatherIconToDisplay = perceipitation_icon;
        break;
      case "Drizzle":
        weatherIconToDisplay = perceipitation_icon;
        break;
      case "Clouds":
        weatherIconToDisplay = cloudy_icon;
        break;
      case "scattered clouds":
        weatherIconToDisplay = partially_cloudy_icon;
        break;
      case "few clouds":
        weatherIconToDisplay = partially_cloudy_icon;
        break;
      case "Thunderstorm":
        weatherIconToDisplay = thunder_storm_icon;
        break;
      case "Snow":
        weatherIconToDisplay = snow_icon;
        break;
      case "Mist":
        weatherIconToDisplay = mist_icon;
        break;
      case "Smoke":
        weatherIconToDisplay = mist_icon;
        break;
      case "Haze":
        weatherIconToDisplay = mist_icon;
        break;
      case "Dust":
        weatherIconToDisplay = mist_icon;
        break;
      case "Fog":
        weatherIconToDisplay = mist_icon;
        break;
      case "Sand":
        weatherIconToDisplay = mist_icon;
        break;
      case "Ash":
        weatherIconToDisplay = mist_icon;
        break;
      case "Squall":
        weatherIconToDisplay = mist_icon;
        break;
      case "Tornado":
        weatherIconToDisplay = mist_icon;
        break;
      case "Clear Night":
        weatherIconToDisplay = clear_night_icon;
        break;
      default:
        weatherIconToDisplay = sunny_weather_icon;
        break;
    }
    return (
      <img
        id="displayed-weather"
        src={weatherIconToDisplay}
        alt="Weather Icon"
      />
    );
  };

  const calculateTemperature = (temp) => {
    if (temperatureType === "celsius") {
      return Math.floor(weatherData?.main?.temp - 273);
    } else {
      const calculations = 32 + (temp - 273.15) * 1.8;
      return Math.floor(calculations);
    }
  };

  return (
    <div>
      <header></header>
      <body alt="background">
        <header>
          <div id="app-top-container">
            <div id="logo-section">
              <img
                src={menu_icon}
                id="menu-icon"
                alt="menu-icon"
                onClick={() => {
                  setOpenMenu(true);
                }}
              />
              <img src={app_icon} id="app-logo" alt="app-logo" />
            </div>
            <div id="search-bar">
              <input
                id="search-text"
                type="text"
                placeholder="Search city"
                name="search-value"
                onChange={handleText}
                value={searchPlace}
              />
              <img
                id="search_logo"
                src={search_icon}
                alt="search_logo"
                onClick={() => {
                  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&appid=${myAPIKey}`;
                  fetchWeatherDataValue(weatherURL);
                }}
              />
            </div>
          </div>

          {openMenu ? (
            <ul id="navdiv-drawer">
              <Link>
                <p class="navs-drawer current-drawer" href="">
                  Home
                </p>
              </Link>
              <Link to={"/favourite"}>
                <p class="navs-drawer" href="">
                  Favourite
                </p>
              </Link>
              <Link to={"/recent"}>
                <p class="navs-drawer recent-search" href="">
                  Recent Search
                </p>
              </Link>
            </ul>
          ) : null}

          <nav id="navbar">
            <div class="container">
              <ul id="navdiv">
                <Link>
                  <p class="navs current" href="">
                    Home
                  </p>
                </Link>
                <Link to={"/favourite"}>
                  <p class="navs" href="">
                    Favourite
                  </p>
                </Link>
                <Link to={"/recent"}>
                  <p class="navs recent-search" href="">
                    Recent Search
                  </p>
                </Link>
              </ul>
            </div>
            <p id="timestamp">
              {moment(today).format("ddd DD MMM YYYY HH:mm")}
            </p>
          </nav>
        </header>
        <div className="separator" />
        <div class="location">
          <h3>
            {searchPlace}, {stateName}
          </h3>
        </div>
        <div id="fav-section">
          {JSON.stringify(favouritePlaces)?.includes(
            JSON.stringify(searchPlace)
          ) ? (
            <img
              id="fav-icon"
              src={highlighted_fav_icon}
              alt="favourite-icon"
              onClick={() => {
                setFavouriteOn(!favouriteOn);
                let tempArray = [];
                const tempFavouriteCitiesArray = favouritePlaces;
                const favCityObject = {
                  city: searchPlace,
                  state: stateName,
                  temp: Math.floor(weatherData?.main?.temp - 273),
                  weather: weatherData?.weather?.[0]?.main,
                  description: weatherData?.weather?.[0]?.description,
                };

                if (
                  JSON.stringify(favouritePlaces).includes(
                    JSON.stringify(favCityObject)
                  )
                ) {
                  tempArray = favouritePlaces.filter(
                    (obj) =>
                      JSON.stringify(obj) !== JSON.stringify(favCityObject)
                  );
                  setFavouritePlaces(tempArray);
                }

                dispatch(setFavouriteCities(tempArray));

                console.log("fav places 1", favouritePlaces);
              }}
            />
          ) : (
            <img
              id="fav-icon"
              src={empty_fav_icon}
              alt="favourite-icon"
              onClick={() => {
                setFavouriteOn(!favouriteOn);
                let tempArray = [];
                const favCityObject = {
                  city: searchPlace,
                  state: stateName,
                  temp: Math.floor(weatherData?.main?.temp - 273),
                  weather: weatherData?.weather?.[0]?.main,
                  description: weatherData?.weather?.[0]?.description,
                };
                if (
                  JSON.stringify(favouritePlaces)?.includes(
                    JSON.stringify(searchPlace)
                  )
                ) {
                  tempArray = [...favouritePlaces];
                } else {
                  tempArray = [...favouritePlaces, favCityObject];
                }
                setFavouritePlaces(tempArray);
                dispatch(setFavouriteCities(tempArray));
                console.log("fav places 2", favouritePlaces);
              }}
            />
          )}

          <p id="fav-section-text">Added to favourites</p>
        </div>

        {renderWeatherImages(weatherData?.weather?.[0]?.main)}

        <div id="temperature-section">
          <p>{calculateTemperature(weatherData?.main?.temp)}</p>
          {temperatureType === "celsius" ? (
            <div
              id="selected-degree"
              onClick={() => {
                setTemperatureType("celsius");
              }}
            >
              <p className="degree">o</p>
              <p className="temp-type">C</p>
            </div>
          ) : (
            <div
              id="unselected-degree"
              onClick={() => {
                setTemperatureType("celsius");
              }}
            >
              <p className="degree">o</p>
              <p className="temp-type">C</p>
            </div>
          )}
          {temperatureType === "farenheit" ? (
            <div
              id="selected-degree"
              onClick={() => {
                setTemperatureType("farenheit");
              }}
            >
              <p className="degree">o</p>
              <p className="temp-type">F</p>
            </div>
          ) : (
            <div
              id="unselected-degree"
              onClick={() => {
                setTemperatureType("farenheit");
              }}
            >
              <p className="degree">o</p>
              <p className="temp-type">F</p>
            </div>
          )}
        </div>
        <p id="temp-description">
          {weatherData?.weather?.[0]?.description.charAt(0).toUpperCase() +
            weatherData?.weather?.[0]?.description.slice(1)}
        </p>
        <div id="extra-info-section">
          {renderInfoStatsSection(
            "Min - Max",
            temperature_icon,
            Math.floor(weatherData?.main?.temp_min - 273).toString(),
            Math.floor(weatherData?.main?.temp_max - 273).toString()
          )}
          {renderInfoStatsSection(
            "Preceipitation",
            perceipitation_icon,
            "75",
            "90"
          )}
          {renderInfoStatsSection(
            "Humidity",
            humidity_icon,
            weatherData?.main?.humidity
          )}
          {renderInfoStatsSection("Wind", wind_icon, weatherData?.wind?.speed)}
          {renderInfoStatsSection(
            "Visibility",
            visibility_icon,
            weatherData?.visibility / 1000
          )}
        </div>
        <footer></footer>
      </body>
    </div>
  );
}

export default HomeScreen;
