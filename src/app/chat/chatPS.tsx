import SetaVoltar from "@/components/SetaVoltar";
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Olá. Gostaria de marcar uma consuta para sábado, há alguma vaga disponível?", sender: "user" },
    ]);

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        const journalistResponse: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "bot",
        };

        setMessages((prev) => [...prev, journalistResponse]);
        setInput("");
        setTimeout(() => {
            const patientReply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Entendo, obrigado pela informação.",
                sender: "user",
            };
            setMessages((prev) => [...prev, patientReply]);
        }, 1500);
    };
    const renderMessage = ({ item }: { item: Message }) => (
        <View
            style={[
                styles.message,
                item.sender === "user" ? styles.patientMsg : styles.journalistMsg,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >

            <View style={styles.header}>
                <SetaVoltar />
                <Text style={styles.headerText}>ATENDIMENTO EMERGENCIAL</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10 }}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite aqui..."
                    value={input}
                    onChangeText={setInput}
                />
                <Pressable style={styles.button} onPress={sendMessage}>
                    <Text style={styles.buttonText}>Responder</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346"
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
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

    // Sua resposta (jornalista/bot) aparece à direita
    journalistMsg: {
        backgroundColor: "#fff",
        alignSelf: "flex-end",
    },

    // Mensagem do paciente (user) aparece à esquerda
    patientMsg: {
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