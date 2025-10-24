import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

export default function PaginaInicial() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Bem vindo(a) de volta...</Text>
                    <MaterialCommunityIcons name="pill" size={22} color="#fff" />
                </View>

               
                <View style={styles.cardPressable}>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="calendar-alt" size={28} color="#cce0ff" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>Retorno</Text>
                            <Text style={styles.bigNumber}>12</Text>
                            <Text style={styles.doctorName}>Dra. Rafaela</Text>
                        </View>
                    </View>
                </View>

                
                <Pressable style={styles.cardPressable}>
                    <View style={styles.row}>
                        <Entypo name="map" size={40} color="#cce0ff" />
                        <View>
                            <Text style={styles.cardTitle}>Pederneiras-SP</Text>
                            <Text style={styles.cardSubtitle}>Unidades mais próximas de você</Text>
                        </View>
                    </View>
                </Pressable>

                
                <Pressable style={styles.cardPressable}>
                    <View style={styles.row}>
                        <View style={[styles.iconContainer, styles.iconCircle]}>
                            <FontAwesome5 name="id-card" size={20} color="#fff" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>Sua carteira online</Text>
                            <Text style={styles.cardSubtitle}>Verifique as datas de vacinação disponíveis</Text>
                        </View>
                    </View>
                </Pressable>

                
                <Pressable style={styles.cardPressable}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="pill" size={40} color="#cce0ff" />
                        <View>
                            <Text style={styles.cardTitle}>Medicamentos</Text>
                            <Text style={styles.cardSubtitle}>Solicite aqui</Text>
                        </View>
                    </View>
                </Pressable>

                <Pressable style={styles.cardPressable}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="chat" size={40} color="#cce0ff" />
                        <View>
                            <Text style={styles.cardTitle}>Chat</Text>
                            <Text style={styles.cardSubtitle}>Fala conosco aqui</Text>
                        </View>
                    </View>
                </Pressable>

               
                {/* <View style={styles.bottomMenu}>
                    <MaterialCommunityIcons name="home" size={26} color="#fff" />
                    <MaterialCommunityIcons name="calendar" size={26} color="#fff" />
                    <MaterialCommunityIcons name="file-document" size={26} color="#fff" />
                    <MaterialCommunityIcons name="account" size={26} color="#fff" />
                </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
    },
    scrollContent: {
        alignItems: "center",
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
    card: {
        backgroundColor: "#18245c",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    bigNumber: {
        color: "#fff",
        fontSize: 42,
        fontWeight: "bold",
    },
    smallText: {
        color: "#cce0ff",
        fontSize: 16,
    },
    doctorName: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        marginTop: 5,
    },
    cardPressable: {
        backgroundColor: "#18245c",
        borderRadius: 15,
        width: "90%",
        padding: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    cardTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtitle: {
        color: "#cce0ff",
        fontSize: 13,
    },
    iconContainer: {
        width: 45, // 🔹 largura fixa, igual para todos os ícones
        alignItems: "center",
        justifyContent: "center",
    },
    iconCircle: {
        backgroundColor: "#ff3b5c",
        borderRadius: 50,
        height: 45,
        width: 45,
    },
    textContainer: {
        flex: 1,
    }
   
});


// import { Pressable, StyleSheet, Text, View } from "react-native";

// export default function PaginaInicial() {
//     return (
//         <View style={styles.container}>

//             <View>
//                 <Text style={styles.homeTitle}>Bem vindo(a) de volta...</Text>

//                 <Pressable style={styles.box}>
//                     <Text>Minha localização</Text>
//                     <Text>Escolhas as unidades mais próximas de você!</Text>
                    
//                 </Pressable>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#0c0346',
//         alignItems: 'center',
//         paddingTop: 60
//     },
//     box: {
//         backgroundColor: '#28578e85',
//         borderRadius: 10,
//         padding: 20,
//         width: '85%',
//         marginTop: 40,
//     },
//     homeTitle: {
//         fontSize: 22,
//         color: '#fff',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         color: '#fff',
//         fontWeight: '400',

//     },
//     button: {
//         backgroundColor: '#28578e',
//         borderRadius: 8,
//         padding: 12,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 18,
//     }
// })
