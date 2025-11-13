import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type ModalMedicamentoProps = {
    imagem: any;
    titulo: string;
    subtitulo: string;
    texto: React.ReactNode; 
    onClose: () => void;
}; 

export default function ModalMedicamento({ imagem, titulo, subtitulo, texto, onClose }: ModalMedicamentoProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Pressable style={styles.buttonIcon} onPress={onClose}>
                        <MaterialCommunityIcons name="close-circle-outline" size={25} color="#0c0346"/>
                    </Pressable>
                
                    <ScrollView contentContainerStyle={styles.scrollContentModal}>
                        {imagem && <Image source={imagem} style={styles.imageModal} />}
                        <Text style={styles.titleModal}>{titulo}</Text>
                        <Text style={styles.subtitleModal}>{subtitulo}</Text>
                        {texto} 
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: "#fff",
        width: "95%",
        height: "80%",
        borderRadius: 12,
        padding: 20,
        elevation: 5, 
        shadowColor: "#000", 
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        position: "relative",
    },
    scrollContentModal: {
        flexGrow: 1,
    },
    imageModal: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    titleModal: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    subtitleModal: {
        fontSize: 16,
        color: "#666",
        marginBottom: 12,
    },
    buttonIcon: {
        alignSelf: "flex-end",
        paddingVertical: 2,
        position: "absolute",
        top: 10,
        right: 14,
        zIndex: 1,
    },
})