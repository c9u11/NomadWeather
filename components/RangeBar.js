import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RangeBar({ start, end }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#ff7e71", "#ffb25f", "#ffeb68"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={{ ...styles.range, left: `${start}%`, width: `${end - start}%` }}
      ></LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#00000038",
    overflow: "hidden",
  },
  range: {
    position: "absolute",
    height: 7,
    borderRadius: 7,
    backgroundColor: "linear-gradient(to right top, )",
  },
});
