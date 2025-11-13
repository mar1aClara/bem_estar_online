import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

type props = {
    color : string
}

export default function SetaVoltar({color} : props) {
    return (
        <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={30} color={color} />
        </Pressable>
    )
}