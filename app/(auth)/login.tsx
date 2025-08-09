import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const login = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Login</ThemedText>
      <Link href="/register">
        <ThemedText type="link">Register</ThemedText>
      </Link>
      <Link href="/">
        <ThemedText type="link">Home</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});