import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { CardHome } from "@/components/CardHome";

export default function PaginaInicial() {

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem vindo(a) de volta...</Text>
                <MaterialCommunityIcons name="pill" size={22} color="#fff" />
            </View>
                
            <Pressable style={styles.cardPressable}> 
                <CardHome title="Calendário" subtitle="Acesse o calendário de horários disponíveis!" nameIcon="calendar" />
            </Pressable>

            <Pressable style={styles.cardPressable}>
                <CardHome title="Localização" subtitle="Unidades mais próximas de você!" nameIcon="map" />
            </Pressable>

            <Pressable style={styles.cardPressable}>
                <CardHome title="Minha Carteira Online" subtitle="Confira as vacinas disponíveis!" nameIcon="wallet"/>
            </Pressable>

            <Pressable style={styles.cardPressable}>
                <CardHome title="Medicamentos" subtitle="Solicite medicamentos aqui!" nameIcon="plus-thick"/>
            </Pressable>

            <Pressable style={styles.cardPressable} onPress={() => router.navigate('/(drawer)/(tabs)/chat')}>
                <CardHome title="Bate-papo" subtitle="Fale conosco aqui!" nameIcon="chat"/>
            </Pressable>

            
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
        alignItems:'center',
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
    },
    // card: {
    //     backgroundColor: "#28578e85",
    //     borderRadius: 15,
    //     width: "90%",
    //     alignItems: "center",
    //     padding: 20,
    //     marginBottom: 20,
    // },
    // bigNumber: {
    //     color: "#fff",
    //     fontSize: 42,
    //     fontWeight: "bold",
    // },
    // smallText: {
    //     color: "#cfe8ff",
    //     fontSize: 16,
    // },
    // doctorName: {
    //     color: "#fff",
    //     fontWeight: "600",
    //     fontSize: 16,
    //     marginTop: 5,
    // },
    // cardPressable: {
    //     backgroundColor: "#28578e85",
    //     borderRadius: 15,
    //     width: "90%",
    //     padding: 20,
    //     marginBottom: 20,
    // },
    // row: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     gap: 15,
    // },
    // cardTitle: {
    //     color: "#fff",
    //     fontWeight: "bold",
    //     fontSize: 16,
    //     marginBottom: 4,
    // },
    // cardSubtitle: {
    //     color: "#cfe8ff",
    //     fontSize: 13,
    // },
    // iconContainer: {
    //     width: 45,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // iconCircle: {
    //     backgroundColor: "#ff1248",
    //     borderRadius: 50,
    //     height: 45,
    //     width: 45,
    // },
    // textContainer: {
    //     flex: 1,
    // }
   
});