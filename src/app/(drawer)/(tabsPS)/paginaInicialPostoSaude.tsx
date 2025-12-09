import { CardHome } from "@/components/CardHome";
import Rodape from "@/components/Rodape";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PaginaInicialPosto() {

    const getPressableStyle = (pressed: boolean, isLarge: boolean) => [
        styles.cardBase, 
        isLarge ? styles.cardLarge : styles.cardStandard,
        { opacity: pressed ? 0.7 : 1 },
    ];

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem vindo(a) de volta...</Text>
            </View>

            <Pressable
                style={({ pressed }) => getPressableStyle(pressed, false)}
                onPress={() => router.navigate('/medicamentos/medicamentosPS')}
            >
                <CardHome title="Medicamentos" subtitle="Solicite medicamentos aqui!" nameIcon="plus-thick" />
            </Pressable>

            <Pressable
                style={({ pressed }) => getPressableStyle(pressed, false)}
                onPress={() => router.navigate('/chat/chatPS')}
            >
                <CardHome title="Bate-papo" subtitle="Fale conosco aqui!" nameIcon="chat" />
            </Pressable>

            <Pressable
                style={({ pressed }) => getPressableStyle(pressed, true)}
                onPress={() => router.navigate('/(drawer)/(tabsPS)/calendarioPS')}
            >
                <CardHome title="Calendário" subtitle="Acesse o calendário de horários disponíveis!" nameIcon="calendar" />
            </Pressable>  
            <Rodape />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 15,
        justifyContent: 'space-between', 
    },
    header: {
        width: "97%", 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30, 
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    cardBase: {
        backgroundColor: "#28578e85",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        width: "97%",
        justifyContent: 'center', 
    },
    cardStandard: {
        height: 120,
    },
    cardLarge: {
        height: 180,
    },
});