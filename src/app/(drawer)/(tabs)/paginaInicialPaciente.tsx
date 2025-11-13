import { CardHome } from "@/components/CardHome";
import Rodape from "@/components/Rodape";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PaginaInicial() {

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem vindo(a) de volta...</Text>
                <MaterialCommunityIcons name="pill" size={22} color="#fff" />
            </View>

            <Pressable style={styles.cardPressable} onPress={() => router.navigate('/(drawer)/(tabs)/calendario')}>
                <CardHome title="Calendário" subtitle="Acesse o calendário de horários disponíveis!" nameIcon="calendar" />
            </Pressable>

            <Pressable style={styles.cardPressable} onPress={() => router.navigate('/localizacao/localizacao')}>
                <CardHome title="Localização" subtitle="Unidades mais próximas de você!" nameIcon="map" />
            </Pressable>

            <Pressable style={styles.cardPressable}>
                <CardHome title="Minha Carteira Online" subtitle="Confira as vacinas disponíveis!" nameIcon="wallet" />
            </Pressable>

            <Pressable style={styles.cardPressable} onPress={() => router.navigate('/medicamentos/medicamentos')}>
                <CardHome title="Medicamentos" subtitle="Solicite medicamentos aqui!" nameIcon="plus-thick"/>
            </Pressable>

            <Pressable style={styles.cardPressable} onPress={() => router.navigate('/chat/chat')}>
                <CardHome title="Bate-papo" subtitle="Fale conosco aqui!" nameIcon="chat"/>
            </Pressable>

            <Rodape />

        </View>

    );
}

const styles = StyleSheet.create({
    cardPressable: {
        backgroundColor: "#28578e85",
        borderRadius: 15,
        width: "90%",
        padding: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: 'center',
        paddingVertical: 40,
        paddingBottom: 100,
    },
    header: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});