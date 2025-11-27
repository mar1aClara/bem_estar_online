import React, { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import CardArtigo from "@/components/CardArtigo";
import ModalCard from "@/components/ModalCard";
import Rodape from "@/components/Rodape";

type ArtigoType = {
  id: number;
  titulo: string;
  subtitulo: string;
  texto: string;
  imagem: string;
};

export default function Artigos() {
  const artigos: ArtigoType[] = require("@/json/artigos.json");

  const [artigoSelecionado, setArtigoSelecionado] = useState<ArtigoType | null>(null);

  return (
    <View style={styles.container}>

      <View style={styles.container2}>
        <FlatList
          data={artigos}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => setArtigoSelecionado(item)}>
              <CardArtigo titulo={item.titulo} imagem={item.imagem} />
            </Pressable>
          )}
          ListFooterComponent={<Rodape />}
          contentContainerStyle={{ paddingBottom: 20 }}
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
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091942",
    alignItems: "center",
  },

  container2: {
    marginTop: 15,
  },
});
