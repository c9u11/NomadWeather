import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function DashBoard({ data, city }) {
  if (!Object.keys(data).length)
    return (
      <View style={styles.dashboard}>
        <Text style={styles.cityName}>{city}</Text>
        <View style={styles.tempContainer}>
          <Text style={styles.currentTemp}>--</Text>
          <Text style={{ ...styles.currentTemp, ...styles.tempUnit }}>°</Text>
        </View>
      </View>
    );
  return (
    <View style={styles.dashboard}>
      <Text style={styles.cityName}>{city}</Text>
      <View style={styles.tempContainer}>
        <Text style={styles.currentTemp}>{parseInt(data.current.temp)}</Text>
        <Text style={{ ...styles.currentTemp, ...styles.tempUnit }}>°</Text>
      </View>
      <Text style={styles.description}>
        {data.current.weather[0].description}
      </Text>
      <Text style={styles.description}>
        최고:{parseInt(data.daily[0].temp.max)}° 최저:
        {parseInt(data.daily[0].temp.min)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
