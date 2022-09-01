import { View, Text, StyleSheet, Image } from "react-native";
import { getWeekTempRange, getCenterRange } from "../utils/weather";
import Box from "./Box";
import RangeBar from "./RangeBar";

const week = ["일", "월", "화", "수", "목", "금", "토"];

export default function Daily({ data }) {
  if (!data.length) return <></>;
  const date = new Date();
  const { min, max } = getWeekTempRange(data);
  return (
    <Box title="🗓 8일간의 일기예보">
      {data.map((weather, idx) => {
        let day = "오늘";
        if (idx) {
          date.setDate(date.getDate() + 1);
          day = week[date.getDay()];
        }
        const centerRange = getCenterRange(
          min,
          max,
          weather.temp.min,
          weather.temp.max
        );
        return (
          <View key={weather.dt} style={styles.container}>
            <Text style={styles.day}>{day}</Text>
            <Image
              style={styles.icon}
              source={{
                uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
              }}
            ></Image>
            <View style={styles.tempContainer}>
              <Text style={{ ...styles.temp, color: "#ccc" }}>
                {Math.floor(weather.temp.min)}°
              </Text>
              <RangeBar
                start={centerRange.start * 100}
                end={centerRange.end * 100}
              ></RangeBar>
              <Text style={styles.temp}>{Math.floor(weather.temp.max)}°</Text>
            </View>
          </View>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopWidth: 0.5,
    borderTopColor: "#ffffff55",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  day: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    width: 40,
  },
  icon: {
    width: 50,
    height: 50,
  },
  tempContainer: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  temp: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    width: 40,
    textAlign: "center",
  },
});
