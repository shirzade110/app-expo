import { Image } from "expo-image";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useGetPostsQuery } from "../../src/services/api";

export default function HomeScreen() {
  const { data, error, isLoading } = useGetPostsQuery({});
  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text>Error loading data</Text>;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href="/explore">
        <ThemedText type="link">Explore Page</ThemedText>
      </Link>
      <Link href="/about">
        <ThemedText type="link">About Page</ThemedText>
      </Link>
      <Link href="/contact">
        <ThemedText type="link">Contact Page</ThemedText>
      </Link>
      <Link href="/login">
        <ThemedText type="link">Login Page</ThemedText>
      </Link>
      <Link href="/register">
        <ThemedText type="link">Register Page</ThemedText>
      </Link>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, borderBottomWidth: 1 }}>
            {item.title}
          </Text>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
