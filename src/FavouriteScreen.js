import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFavouriteCities } from "./redux/actions/user-actions.js";
import HomeScreen from "./HomeScreen.js";
// import FavouriteScreen from "./FavouriteScreen.js";
import RecentSearchScreen from "./RecentSearchScreen.js";
import CustomAlert from "./Components/CustomAlert.js";

// import "./App.css";
import "./FavouriteScreen.css";
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

function FavouriteScreen() {
  const dispatch = useDispatch();
  const myAPIKey = "aa3cfa6eefb1da106652caf207699731";

  const loadedFavouriteCities = useSelector(
    (state) => state?.userDataReducer?.favouriteLocations
  );

  console.log("FAVVVVS", loadedFavouriteCities);

  const [favouriteOn, setFavouriteOn] = useState(false);
  const [searchPlace, setSearchPlace] = useState("");
  const [stateName, setStateName] = useState("");
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [favouritePlaces, setFavouritePlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const favCities =
      JSON.stringify(loadedFavouriteCities?.data) === "{}"
        ? []
        : loadedFavouriteCities?.data;

    setFavouritePlaces(favCities);
    //dispatch(setFavouriteCities(tempArray));
  }, []);

  const fetchWeatherDataValue = (apiURL) => {
    fetch(apiURL).then((res) => {
      res.json().then((resp) => {
        console.log("WEATHER DATA", apiURL, resp);
        setWeatherData(resp);
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
              {/* <Link to={"/"}> */}
              <img
                id="search_logo"
                src={search_icon}
                alt="search_logo"
                onClick={() => {
                  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&appid=${myAPIKey}`;
                  fetchWeatherDataValue(weatherURL);
                }}
              />
              {/* </Link> */}
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
                <Link>
                  <p class="navs current" href="">
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

        {showAlert ? (
          <div className="custom-alert">
            <div className="custom-alert-content">
              <p d="buttons-section">
                Are you sure you want to remove all the favourites?
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
                    setFavouritePlaces(tempArray);
                    dispatch(setFavouriteCities(tempArray));
                    handleCloseAlert();
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {favouritePlaces?.length !== 0 ? (
          <div id="header-view">
            <p id="favourite-city-text">
              {favouritePlaces?.length} City added as favourite
            </p>
            <p
              id="remove-all-text"
              onClick={() => {
                // alert("HI");
                handleShowAlert();
              }}
            >
              Remove All
            </p>
          </div>
        ) : null}

        {favouritePlaces?.length === 0 ? (
          <div id="nothing-view">
            <div>
              <img id="nothing-image" src={nothing_icon} />
              <p>No Favourites Added</p>
            </div>
          </div>
        ) : null}

        <ul>
          {favouritePlaces?.map((data, idx) => {
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

                <div>
                  <img
                    id="fav-icon"
                    src={highlighted_fav_icon}
                    alt="favourite-icon"
                    onClick={() => {
                      // setFavouriteOn(!favouriteOn);
                      const tempFavouritePlacesArray = favouritePlaces;
                      let tempArray = [];
                      if (tempFavouritePlacesArray?.includes(data)) {
                        tempArray = tempFavouritePlacesArray.filter(
                          (obj) => obj !== data
                        );
                        setFavouritePlaces(tempArray);
                        dispatch(setFavouriteCities(tempArray));
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </ul>

        <footer></footer>
      </body>
    </div>
  );
}

export default FavouriteScreen;
