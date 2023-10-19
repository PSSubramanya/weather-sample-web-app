import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFavouriteCities,
  setRecentCities,
} from "./redux/actions/user-actions.js";
import FavouriteScreen from "./FavouriteScreen.js";
import RecentSearchScreen from "./RecentSearchScreen.js";
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

function HomeScreen() {
  const dispatch = useDispatch();
  const myAPIKey = "aa3cfa6eefb1da106652caf207699731";

  const [favouriteOn, setFavouriteOn] = useState(false);
  const [temperatureType, setTemperatureType] = useState("celsius");
  const [weatherData, setWeatherData] = useState([]);

  const [searchPlace, setSearchPlace] = useState("Udupi");
  const [stateName, setStateName] = useState("Karnataka");
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [favouritePlaces, setFavouritePlaces] = useState([]);

  useEffect(() => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&appid=${myAPIKey}`;
    fetchWeatherDataValue(weatherURL);
  }, []);

  useEffect(() => {
    let tempArray = [];
    const weatherDataURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchPlace}&limit=1&APPID=${myAPIKey}`;
    tempArray = [...recentPlaces, searchPlace];
    setRecentPlaces(tempArray);
    dispatch(setRecentCities(tempArray));
    console.log("recent places", tempArray);

    fetch(weatherDataURL)?.then((res) => {
      res?.json().then((resp) => {
        console.log("ALL DATA", weatherDataURL, resp);
        setStateName(resp?.[0]?.state);
      });
    });
  }, [weatherData]);

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
      case "Clouds":
        weatherIconToDisplay = cloudy_icon;
        break;
      case "scattered clouds":
        weatherIconToDisplay = partially_cloudy_icon;
        break;
      case "few clouds":
        weatherIconToDisplay = partially_cloudy_icon;
        break;
      case "Thunder Storm":
        weatherIconToDisplay = thunder_storm_icon;
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
            <img src={app_icon} id="app-logo" alt="app-logo" />
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
          {/* <div id="search-bar">
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
          </div> */}
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
            <p id="timestamp">Wed 28 Nov 2018 11.35</p>
          </nav>
        </header>
        <div className="separator" />
        <div class="location">
          <h3>
            {searchPlace}, {stateName}
          </h3>
        </div>
        {favouritePlaces?.includes(searchPlace) ? (
          <img
            id="fav-icon"
            src={highlighted_fav_icon}
            alt="favourite-icon"
            onClick={() => {
              setFavouriteOn(!favouriteOn);
              let tempArray = [];
              const tempFavouriteCitiesArray = favouritePlaces;

              tempFavouriteCitiesArray.map((cities, cityId) => {
                if (cities.includes(searchPlace)) {
                  tempArray = tempFavouriteCitiesArray.filter(
                    (obj) => obj !== searchPlace
                  );
                  setFavouritePlaces(tempArray);
                }
              });

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
              tempArray = [...favouritePlaces, searchPlace];
              setFavouritePlaces(tempArray);
              dispatch(setFavouriteCities(tempArray));
              console.log("fav places 2", favouritePlaces);
            }}
          />
        )}

        <p id="fav-section-text">Added to favourites</p>

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
