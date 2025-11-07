import React from "react";
import {Text, Image, StyleSheet, View } from "react-native";

export default function CardArtigo({ titulo, imagem }: { titulo: string; imagem: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.title}>{titulo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0D2461",
    borderRadius: 12,
    width: 190,
    height: 160,
    marginBottom: 16,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: 90
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 6
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  }
});
