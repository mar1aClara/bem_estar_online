import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TelaLogin() {
    return (
        <View style={styles.container}>

            <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>LOGIN</Text>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu e-mail'
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                />

                <TouchableOpacity style={styles.button} onPress={() => router.navigate('/(drawer)/(tabs)/paginaInicial')}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => router.navigate('/cadastroEscolha')}>
                        <Text style={styles.link}>Cadastre-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.navigate('/esqueciSenha')}>
                        <Text style={styles.link}>Esqueci a senha.</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0346',
        alignItems: 'center',
        paddingTop: 60
    },
    loginBox: {
        backgroundColor: '#678ab2',
        borderRadius: 10,
        padding: 20,
        width: '85%',
        marginTop: 80,
    },
    loginTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#28578e',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
})


