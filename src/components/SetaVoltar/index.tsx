import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

type props = {
    color?: string;
}

export default function SetaVoltar({color}: props) {
  return (
    <Pressable onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color={color} />
    </Pressable>
    );
};