import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";


type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type Props =  {
    title: string;
    subtitle: string;
    nameIcon: IconName; 
    
};

export function CardHome({title, subtitle, nameIcon} : Props) {
    return (
            <View style={styles.row}>
                <MaterialCommunityIcons name={nameIcon} size={50} color="#fff"/>
                <View>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
       
    },
    cardTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 4,
    },
    cardSubtitle: {
        color: "#cfe8ff",
        fontSize: 13,
    }

});