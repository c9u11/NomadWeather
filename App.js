import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
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
    if (!granted) setOk(false);
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
      <View style={styles.container}>
        <DashBoard data={weather} city={city}></DashBoard>
        {!Object.keys(weather).length ? null : (
          <>
            <Hourly data={weather.hourly}></Hourly>
            <Daily data={weather.daily}></Daily>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
});
