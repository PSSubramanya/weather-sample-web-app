import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./HomeScreen.js";
import FavouriteScreen from "./FavouriteScreen.js";
import RecentSearchScreen from "./RecentSearchScreen.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/favourite" element={<FavouriteScreen />} />
      <Route path={"/recent"} element={<RecentSearchScreen />} />
    </Routes>
  );
}

export default App;
