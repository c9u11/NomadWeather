import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { getWeekTempRange } from "../utils/weather";
import Box from "./Box";

const week = ["일", "월", "화", "수", "목", "금", "토"];

export default function Daily({ data }) {
  if (!data.length) return <></>;
  const date = new Date();
  const { min, max } = getWeekTempRange(data);
  console.log(min, max);
  return (
    <Box title="🗓 8일간의 일기예보">
      <ScrollView showsHorizontalScrollIndicator={false}>
        {data.map((weather, idx) => {
          let day = "오늘";
          if (idx) {
            date.setDate(date.getDate() + 1);
            day = week[date.getDay()];
          }
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
                <Text style={styles.temp}>{Math.floor(weather.temp.max)}°</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  },
  day: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  icon: {
    width: 50,
    height: 50,
  },
  tempContainer: {
    flex: 1,
    flexDirection: "row",
  },
  temp: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
