import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type props = {
  imagem: string;
  titulo: string;
  subtitulo: string;
  texto: string;
  onClose: () => void;
};

export default function ModalCard({ imagem, titulo, subtitulo, texto, onClose }: props) {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Pressable style={styles.buttonIcon} onPress={onClose}>
                <MaterialCommunityIcons name="close-circle-outline" size={25} color="#0c0346"/>
            </Pressable>
          
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image source={{ uri: imagem }} style={styles.image} />
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.subtitle}>{subtitulo}</Text>
            <Text style={styles.text}>{texto}</Text>
          </ScrollView>

          </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    width: "95%",
    height: "80%",
    borderRadius: 12,
    padding: 20,
    elevation: 5, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
    scrollContent: {
        flexGrow: 1,
    },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "justify",
  },
  buttonIcon: {
    alignSelf: "flex-end",
    paddingVertical: 2,
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 1,
  }
});
