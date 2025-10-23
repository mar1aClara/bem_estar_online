import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EsqueciSenha() {
    const [email, setEmail] = useState("");

    const handleSendCode = async () => {
        if (!email) return Alert.alert("Erro", "Digite seu e-mail");

        try {
            // simulação de envio (como se fosse uma API)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            Alert.alert("Sucesso", "Código enviado para o seu e-mail!");
            router.push({ pathname: "/codigoSenha", params: { email } });
        } catch {
            Alert.alert("Erro", "Não foi possível enviar o código.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>ESQUECI A SENHA</Text>

                <Text style={styles.label}>Digite seu e-mail para gerar o código:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: "center",
        paddingTop: 60,
    },
    loginBox: {
        backgroundColor: "#678ab2",
        borderRadius: 10,
        padding: 20,
        width: "85%",
        marginTop: 80,
    },
    loginTitle: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#28578e",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});