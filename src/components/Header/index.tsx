import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SetaVoltar from "../SetaVoltar";
import React from "react";




export default function Header({texto} : {texto?: string}) {
    return (
        <View style={styles.header}>
                <SetaVoltar color="#fff" />
            <Text style={styles.headerTitle} numberOfLines={1}>{texto}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#28578e',
    },
    backButton: {
        paddingRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
});