import CardArtigo from "@/components/CardArtigo";
import ModalCard from "@/components/ModalCard";
import Rodape from "@/components/Rodape";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    LogBox,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews",
]);

type ArtigoType = {
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    imagem: string;
};

export default function PaginaInicial() {
    const artigos: ArtigoType[] = require("@/json/artigos.json");
    const [artigoSelecionado, setArtigoSelecionado] = useState<ArtigoType | null>(null);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Minha página</Text>

                    <View style={styles.headerRight}>
                        <MaterialCommunityIcons name="pill" size={22} color="#fff" />
                    </View>
                </View>

                {/* CARD DE PERFIL */}
                <View style={styles.profileCard}>
                    <View style={styles.profileCircle}>
                        <MaterialCommunityIcons name="account" size={55} color="#fff" />
                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push("/editar/editar")}
                    >
                        <Text style={styles.editText}>Editar</Text>
                    </TouchableOpacity>

                    <Text style={styles.profileName}>Fulaninho da Silva</Text>
                </View>

                {/* ENTREGA */}
                <View style={styles.deliverySection}>
                    <Text style={styles.deliveryTitle}>Entrega</Text>

                    <View style={styles.progressBar}>
                        <MaterialCommunityIcons name="truck-delivery" size={24} color="#fff" />
                        <View style={styles.line} />
                        <MaterialCommunityIcons name="map-marker" size={24} color="#fff" />
                    </View>
                </View>

                {/* ARTIGOS */}
                <View style={styles.articleSection}>
                    <Text style={styles.articleTitle}>Artigos para você</Text>

                    <FlatList
                        data={artigos.slice(0, 4)}
                        numColumns={1}
                        keyExtractor={(item) => item.id.toString()}
                        // columnWrapperStyle={{
                        //     justifyContent: "space-between",
                        //     marginBottom: 15,
                        // }}
                        contentContainerStyle={{
                            paddingBottom: 10,
                        }}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => setArtigoSelecionado(item)}
                                style={{ width: "100%", height: 180 }}
                            >
                                <CardArtigo titulo={item.titulo} imagem={item.imagem} />
                            </Pressable>
                        )}
                    />

                    {artigoSelecionado && (
                        <ModalCard
                            imagem={artigoSelecionado.imagem}
                            titulo={artigoSelecionado.titulo}
                            subtitulo={artigoSelecionado.subtitulo}
                            texto={artigoSelecionado.texto}
                            onClose={() => setArtigoSelecionado(null)}
                        />
                    )}

                    <TouchableOpacity onPress={() => router.navigate("/artigos")}>
                        <Text style={styles.verMais}>Ver todos os artigos</Text>
                    </TouchableOpacity>
                </View>

                <Rodape />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        alignItems: "center",
        paddingTop: 60,
    },
    header: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    profileCard: {
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        padding: 20,
        marginTop: 40,
        position: "relative",
    },
    profileCircle: {
        backgroundColor: "#3f638e",
        borderRadius: 100,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    editButton: {
        position: "absolute",
        right: 20,
        top: 20,
        backgroundColor: "#28578e",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    editText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    profileName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    deliverySection: {
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        marginTop: 30,
        padding: 20,
    },
    deliveryTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
    },
    line: {
        height: 2,
        backgroundColor: "#fff",
        flex: 1,
        marginHorizontal: 10,
    },
    articleSection: {
        backgroundColor: "#1c2d6b",
        borderRadius: 15,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        padding: 20,
    },
    articleTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 15,
    },
    verMais: {
        color: "#cfe8ff",
        marginTop: 10,
        fontWeight: "600",
    },
});