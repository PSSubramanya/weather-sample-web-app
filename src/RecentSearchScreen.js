import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeScreen from "./HomeScreen.js";
import FavouriteScreen from "./FavouriteScreen.js";
// import RecentSearchScreen from "./RecentSearchScreen.js";
import CustomAlert from "./Components/CustomAlert.js";

// import "./App.css";
import "./RecentSearchScreen.css";
import logo from "./logo.svg";
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
import nothing_icon from "./assets/Images/inspect/weather/Web/03_Favourite_blank/Group 38/Group 3/icon_nothing.svg";

function RecentSearchScreen() {
  const myAPIKey = "aa3cfa6eefb1da106652caf207699731";

  const favouriteCitiesList = [
    {
      city: "Mangaluru",
      state: "Karnataka",
      weather: "Rain",
      temp: 29,
    },
    {
      city: "Bengaluru",
      state: "Karnataka",
      weather: "Partially Cloudy",
      temp: 30,
    },
  ];

  const recentCitiesList = [
    {
      city: "Udupi",
      state: "Karnataka",
      weather: "Mostly Sunny",
      temp: 31,
    },
    {
      city: "Mangaluru",
      state: "Karnataka",
      weather: "Rain",
      temp: 29,
    },
    {
      city: "Mysore",
      state: "Karnataka",
      weather: "Mostly Cloudy",
      temp: 32,
    },
    {
      city: "Bengaluru",
      state: "Karnataka",
      weather: "Partially Cloudy",
      temp: 30,
    },
    {
      city: "Ayodhya",
      state: "Uttar Pradesh",
      weather: "Thunder Storm",
      temp: 31,
    },
    {
      city: "Jaipur",
      state: "Rajasthan",
      weather: "Clear Night",
      temp: 24,
    },
  ];

  const loadedRecentCities = useSelector(
    (state) => state?.userDataReducer?.recentLocations
  );

  console.log("FAVVVVS -RECENT", loadedRecentCities);

  const [favouriteOn, setFavouriteOn] = useState(false);
  const [searchPlace, setSearchPlace] = useState("");
  const [stateName, setStateName] = useState("");
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [favouritePlaces, setFavouritePlaces] = useState([]);
  const [favouriteIconArray, setFavouriteIconArrayValue] = useState([]);
  const [latlongValue, setLatLongValue] = useState({ lat: 0, long: 0 });
  const [weatherData, setWeatherData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setFavouritePlaces(favouriteCitiesList);
    setRecentPlaces(recentCitiesList);
  }, []);

  console.log("RECENT FAV PLACES icon val", favouriteIconArray);

  // useEffect(() => {
  //   let tempArray = [];
  //   const weatherDataURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latlongValue?.lat}&lon=${latlongValue?.long}&APPID=${myAPIKey}`;
  //   tempArray = [...recentPlaces, searchPlace];
  //   setRecentPlaces(tempArray);
  //   console.log("recent places", tempArray);

  //   fetch(weatherDataURL)?.then((res) => {
  //     res?.json().then((resp) => {
  //       console.log("ALL DATA", weatherDataURL, resp);
  //     });
  //   });
  // }, [latlongValue]);

  const fetchLatLongValue = (apiURL) => {
    fetch(apiURL).then((res) => {
      res.json().then((resp) => {
        console.log("LAT LONG VAL", apiURL, resp);
        setStateName(resp?.[0]?.state);
        setLatLongValue({ lat: resp?.[0]?.lat, long: resp?.[0]?.lon });
      });
    });
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleText = (e) => {
    setSearchPlace(e.target.value);
  };

  const renderWeatherImages = (weatherType) => {
    let weatherIconToDisplay;
    switch (weatherType) {
      case "Mostly Sunny":
        weatherIconToDisplay = sunny_weather_icon;
        break;
      case "Rain":
        weatherIconToDisplay = perceipitation_icon;
        break;
      case "Mostly Cloudy":
        weatherIconToDisplay = cloudy_icon;
        break;
      case "Partially Cloudy":
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
        className="weather-icon"
        src={weatherIconToDisplay}
        alt="Weather Icon"
      />
    );
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
                  const latLongAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchPlace}&limit=1&APPID=${myAPIKey}`;
                  fetchLatLongValue(latLongAPI);
                }}
              />
            </div>
          </div>

          <nav id="navbar">
            <div class="container">
              <ul id="navdiv">
                <Link to={"/"}>
                  <p class="navs" href="">
                    Home
                  </p>
                </Link>
                <Link to={"/favourite"}>
                  <p class="navs" href="">
                    Favourite
                  </p>
                </Link>
                <Link>
                  <p class="navs current recent-search" href="">
                    Recent Search
                  </p>
                </Link>
              </ul>
            </div>
            <p id="timestamp">Wed 28 Nov 2018 11.35</p>
          </nav>
        </header>
        <div className="separator" />

        {showAlert ? (
          <div className="custom-alert">
            <div className="custom-alert-content">
              <p d="buttons-section">
                Are you sure you want to remove all the recent places?
              </p>
              <div id="buttons-section">
                <button
                  className="buttons"
                  onClick={() => {
                    handleCloseAlert();
                  }}
                >
                  NO
                </button>
                <button
                  className="buttons ok"
                  onClick={() => {
                    const tempArray = [];
                    setRecentPlaces(tempArray);
                    handleCloseAlert();
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {recentPlaces?.length !== 0 ? (
          <div id="header-view">
            <p id="favourite-city-text">You recently searched for</p>
            <p
              id="remove-all-text"
              onClick={() => {
                handleShowAlert();
              }}
            >
              Clear All
            </p>
          </div>
        ) : null}

        {recentPlaces?.length === 0 ? (
          <div id="nothing-view">
            <div>
              <img id="nothing-image" src={nothing_icon} />
              <p>No Favourites Added</p>
            </div>
          </div>
        ) : null}

        <ul>
          {recentPlaces?.map((data, idx) => {
            return (
              <div className="flat-tile">
                <div className="city-names">
                  <p>
                    {data?.city},{data?.state}
                  </p>
                </div>
                <div id="weather-stat-in-area">
                  {renderWeatherImages(data?.weather)}
                  <p className="temperature">{data?.temp}</p>
                  <p id="degree">o</p>
                  <p id="celsius-deg">C</p>
                  <p id="weather-text">{data?.weather}</p>
                </div>

                {JSON.stringify(favouritePlaces)?.includes(
                  JSON.stringify(data)
                ) ? (
                  <div>
                    <img
                      id="fav-icon"
                      src={highlighted_fav_icon}
                      // src={getFavIcon()}
                      alt="favourite-icon"
                      onClick={() => {
                        // setFavouriteOn(!favouriteOn);
                        // const tempFavouritePlacesArray = favouritePlaces;
                        // let tempArray = [];
                        // if (tempFavouritePlacesArray?.includes(data)) {
                        //   tempArray = tempFavouritePlacesArray.filter(
                        //     (obj) => obj !== data
                        //   );
                        //   setFavouritePlaces(tempArray);
                        // }
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      id="fav-icon"
                      src={empty_fav_icon}
                      // src={getFavIcon()}
                      alt="favourite-icon"
                      onClick={() => {
                        // setFavouriteOn(!favouriteOn);
                        // const tempFavouritePlacesArray = favouritePlaces;
                        // let tempArray = [];
                        // if (tempFavouritePlacesArray?.includes(data)) {
                        //   tempArray = tempFavouritePlacesArray.filter(
                        //     (obj) => obj !== data
                        //   );
                        //   setFavouritePlaces(tempArray);
                        // }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </ul>

        <footer></footer>
      </body>
    </div>
  );
}

export default RecentSearchScreen;
