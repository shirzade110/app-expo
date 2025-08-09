import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.mainTile}>
        <ThemedText type="title">About Page!</ThemedText>
        <HelloWave />
      </View>

      <Link href="/(tabs)">
        <ThemedText>Home page</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTile: {
    flexDirection: "row",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    color: "white",
  },
});
