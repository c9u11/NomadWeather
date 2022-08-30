import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import getDayTitle from "../utils/weather";
import Box from "./Box";

export default function Hourly({ data }) {
  if (!data.length) return <></>;
  return (
    <Box title={getDayTitle(data)}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((weather, idx) => {
          if (idx > 24) return null;
          return (
            <View style={styles.hour} key={weather.dt}>
              <Text style={styles.time}>
                {!idx ? "지금" : `${new Date(weather.dt * 1000).getHours()}시`}
              </Text>
              <Image
                style={styles.icon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                }}
              ></Image>
              <Text style={styles.temp}>{parseInt(weather.temp)}°</Text>
            </View>
          );
        })}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  hour: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#ffffff55",
    borderStyle: "solid",
    paddingTop: 10,
  },
  time: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
