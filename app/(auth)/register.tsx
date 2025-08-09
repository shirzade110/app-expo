import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const register = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Register</ThemedText>
      <Link href="/login">
        <ThemedText type="link">Login</ThemedText>
      </Link>
      <Link href="/">
        <ThemedText type="link">Home</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});