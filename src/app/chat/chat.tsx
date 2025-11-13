import SetaVoltar from "@/components/SetaVoltar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Como posso ajudar?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Mensagem recebida ✅",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <View style={styles.container}>
      
    <View style={styles.header}>
      <SetaVoltar color="#000"/>
      <Text style={styles.headerText}>CHAT</Text>
    </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={input}
          onChangeText={setInput}
        />
        <Pressable style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0c0346" 
  },

  header:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff", 
    padding: 10,
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
  headerText: { 
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },

  userMsg: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },

  botMsg: {
    backgroundColor: "#cfe8ff",
    alignSelf: "flex-start",
    borderRadius: 10,
  },

  messageText: { color: "#000" },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  button: {
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: "#0078ff",
    borderRadius: 10,
    justifyContent: "center",
  },

  buttonText: { color: "#fff", fontWeight: "bold" },
});
