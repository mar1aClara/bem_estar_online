import CardArtigo from "@/components/CardArtigo";
import useTaskContext from "@/components/Context/useTaskContext";
import ModalCard from "@/components/ModalCard";
import Rodape from "@/components/Rodape";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ArtigoType = {
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    imagem: string;
};

export default function PaginaInicial() {
    const { pacientes, currentUserId, deletePaciente } = useTaskContext();
    const profile = pacientes.find((p) => p.id === currentUserId);
    console.log("PaginaInicial - profile:", profile);

    const artigos: ArtigoType[] = require("@/json/artigos.json");
    const [artigoSelecionado, setArtigoSelecionado] = useState<ArtigoType | null>(null);

    const confirmarExclusao = () => {
        Alert.alert(
            "Excluir conta",
            "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita!",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: (excluir)
                }
            ]
        );
    };

    const excluir = () => {
        if (!currentUserId) return;
        deletePaciente(currentUserId);
        router.navigate("/telaLogin/telaLogin"); // ou a rota que você quiser
    };

     const confirmarSaida = () => {
        Alert.alert(
          "Sair da conta",
          "Tem certeza que deseja sair?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Sair", style: "destructive", onPress: (sairDoApp) }
          ]
        );
      };
      const sairDoApp = () => {
        router.replace('/telaLogin/telaLogin');
      }

    return (
        <View style={styles.container}>

            <FlatList
                data={artigos.slice(0, 4)}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.flatListRow}
                ListHeaderComponent={
                    <>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Minha página</Text>
                                <View style={styles.headerRight}>
                                    <MaterialCommunityIcons name="pen" size={22} color="#fff" />
                                    <TouchableOpacity onPress={confirmarSaida} >
                                        <MaterialCommunityIcons name="exit-to-app" size={22} color="#fff" />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={styles.profileCard}>

                                {profile && profile.foto ? (
                                    <Image
                                        source={{ uri: profile.foto }}
                                        style={{ width: 90, height: 90, borderRadius: 100 }}
                                    />
                                ) : (
                                    <MaterialCommunityIcons name="account" size={55} color="#fff" />
                                )}
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => router.navigate("/editar/editarPaciente")}
                                >
                                    <Text style={styles.editText}>Editar</Text>
                                </TouchableOpacity>
                                {profile && profile.nome ? (
                                    <Text
                                        style={styles.profileName}
                                    >
                                        {profile.nome}</Text>) : null}
                            </View>

                            <View style={styles.articleSection}>
                                <Text style={styles.articleTitle}>Artigos para você</Text>
                            </View>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setArtigoSelecionado(item)}
                        style={{ width: "48%", marginBottom: 5 }}
                    >
                        <CardArtigo
                            titulo={item.titulo}
                            imagem={item.imagem}
                            largura="100%"
                            altura={160}
                        />
                    </Pressable>
                )}
                ListFooterComponent={
                    <>
                        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => router.navigate('/artigos')}>
                            <Text style={styles.verMais}>Ver todos os artigos</Text>
                        </TouchableOpacity>



                        <TouchableOpacity
                            style={styles.buttonDelete}
                            onPress={confirmarExclusao}
                        >
                            <Text style={styles.textButtonDelete}>
                                Excluir Conta
                            </Text>
                        </TouchableOpacity>

                        <Rodape />
                    </>
                }
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
        paddingTop: 60,
        alignItems: "center",
    },
    buttonDelete: {
        backgroundColor: "#ff4d4d",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },

    textButtonDelete: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    header: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
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
        marginBottom: 30,
        position: "relative",
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
    articleSection: {
        width: "100%",
        paddingHorizontal: 20,
    },
    articleTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    flatListRow: {
        justifyContent: "space-between",
        marginBottom: 5,
        paddingHorizontal: 20,
    },
    verMais: {
        color: "#cfe8ff",
        fontWeight: "600",
        marginBottom: 30,
    },
});
