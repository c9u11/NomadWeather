import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import DashBoard from "./components/DashBoard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "2231422ed43d5e60f7e3ea2a0e7e997a";

export default function App() {
  const [city, setCity] = useState("위치 정보 알 수 없음");
  const [weather, setWeather] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=kr`
    );
    const json = await response.json();
    setWeather(json || {});
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={(function () {
          switch (weather?.current?.weather[0]?.main) {
            case "Clear":
              return require("./assets/weather/Clear.jpeg");
            case "Clouds":
              return require("./assets/weather/Clouds.jpeg");
            case "Drizzle":
              return require("./assets/weather/Drizzle.jpeg");
            case "Rain":
              return require("./assets/weather/Rain.jpeg");
            case "Snow":
              return require("./assets/weather/Snow.jpeg");
            case "Thunderstorm":
              return require("./assets/weather/Thunderstorm.jpeg");
            default:
              return require("./assets/weather/Loading.jpeg");
          }
        })()}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <DashBoard data={weather} city={city}></DashBoard>
        {!Object.keys(weather).length ? null : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Hourly data={weather.hourly}></Hourly>
            <Daily data={weather.daily}></Daily>
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "skyblue",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    resizeMode: "cover",
  },
});
