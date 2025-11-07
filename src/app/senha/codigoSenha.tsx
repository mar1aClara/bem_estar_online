import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CodigoSenha() {
    const { email } = useLocalSearchParams(); // pega o e-mail vindo da tela anterior
    const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 dígitos
    const inputsRef = useRef([]);

    // Função de digitação e navegação automática entre campos
    const handleChange = (text: string, index: number) => {
        // Se o usuário colar o código completo (ex: "123456")
        if (text.length > 1) {
            const chars = text.split("");
            const newCode = [...code];
            for (let i = 0; i < chars.length && index + i < newCode.length; i++) {
                if (/^[0-9]$/.test(chars[i])) {
                    newCode[index + i] = chars[i];
                }
            }
            setCode(newCode);
        }

        // Permite apenas números ou campo vazio
        if (/^[0-9]$/.test(text) || text === "") {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

        }
    };

    // Função simulada de verificação (sem backend)
    const handleVerify = async () => {
        const fullCode = code.join("");

        if (fullCode.length < 6) {
            return Alert.alert("Erro", "Digite o código completo.");
        }

        try {
            // Simula um pequeno atraso de rede
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Qualquer código é aceito (modo simulação)
            Alert.alert("Sucesso", "Código verificado!");
            router.push({ pathname: "/senha/novaSenha", params: { email } });
        } catch {
            Alert.alert("Erro", "Não foi possível verificar o código.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>VERIFICAR CÓDIGO</Text>
                <Text style={styles.label}>
                    Digite o código que enviamos para o seu e-mail:
                </Text>

                <View style={styles.codeContainer}>
                    {code.map((num, index) => (
                        <TextInput
                            key={index}
                            //   ref={(ref) => (inputsRef.current[index] = ref)}
                            style={styles.codeInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={num}
                            onChangeText={(text) => handleChange(text, index)}
                            textAlign="center"
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ==================== ESTILOS ====================

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
        textAlign: "center",
        marginBottom: 15,
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    codeInput: {
        width: 45,
        height: 55,
        backgroundColor: "#fff",
        borderRadius: 8,
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
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
