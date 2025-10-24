import { router } from "expo-router";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CodigoSenha from "./codigoSenha";

export default function EsqueciSenha() {
    const passwordVerify = async () => {

        try {
            // Simula um pequeno atraso de rede
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Qualquer código é aceito (modo simulação)
            Alert.alert("Sucesso", "Senha Cadastrada!");
            router.push({ pathname: "/telaLogin", params: {}});
        } catch {
            Alert.alert("Erro", "Não foi possível cadastrar senha.");
        }
    };
    return (  
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>REDEFINA SUA SENHA</Text>

                <Text style={styles.label}>Nova senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                />

                <Text style={styles.label}>Confirmação de senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                />

                <TouchableOpacity style={styles.button} onPress={(passwordVerify)}>
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