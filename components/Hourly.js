import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import Box from "./Box";

export default function Hourly({ data }) {
  if (!data.length) return <></>;
  let description = data[0].weather[0].description;
  let title;
  for (let i = 0; i < 24; i++) {
    if (!i) continue;
    if (description !== data[i].weather[0].description) {
      const hour = new Date(data[i].dt * 1000).getHours();
      const description = data[i].weather[0].description;
      title = `⏰ ${hour}:00쯤 ${description} 상태가 예상됩니다.`;
      break;
    }
  }
  if (!title) title = `⏰ 남은 하루 동안 ${description} 상태가 이어지겠습니다.`;
  return (
    <Box title={title}>
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
