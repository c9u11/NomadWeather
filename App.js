import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Hourly from "./components/Hourly";

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
        {!Object.keys(weather).length ? (
          <View style={styles.dashboard}>
            <Text style={styles.cityName}>{city}</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.currentTemp}>--</Text>
              <Text style={{ ...styles.currentTemp, ...styles.tempUnit }}>
                °
              </Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.dashboard}>
              <Text style={styles.cityName}>{city}</Text>
              <View style={styles.tempContainer}>
                <Text style={styles.currentTemp}>
                  {parseInt(weather.current.temp)}
                </Text>
                <Text style={{ ...styles.currentTemp, ...styles.tempUnit }}>
                  °
                </Text>
              </View>
              <Text style={styles.description}>
                {weather.current.weather[0].description}
              </Text>
              <Text style={styles.description}>
                최고:{parseInt(weather.daily[0].temp.max)}° 최저:
                {parseInt(weather.daily[0].temp.min)}°
              </Text>
            </View>
            <Hourly data={weather.hourly}></Hourly>
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
  dashboard: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "300",
    color: "white",
  },
  tempContainer: {
    paddingHorizontal: 35,
  },
  currentTemp: {
    fontWeight: "200",
    fontSize: 100,
    color: "white",
  },
  tempUnit: {
    fontSize: 100,
    position: "absolute",
    top: 0,
    right: 0,
  },
  description: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    marginVertical: 3,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
});
