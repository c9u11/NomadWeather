import { View, StyleSheet, Text, Dimensions } from "react-native";
import { BlurView } from "expo-blur";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export default function Box({ title, children }) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={styles.blur}>
        <View style={styles.title}>
          <Text style={styles.whiteText}>{title}</Text>
        </View>
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  blur: {
    padding: 15,
    backgroundColor: "#00000038",
  },
  title: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ffffff55",
    borderStyle: "solid",
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  whiteText: {
    color: "white",
  },
});
