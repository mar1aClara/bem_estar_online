import React, { useState, useRef } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Button, 
    Alert, 
    Keyboard 
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

// 🚨 CERTIFIQUE-SE DE QUE ESTE CAMINHO ESTÁ CORRETO
import ubsData from '@/json/ubsPederneiras.json'; 
import Header from '@/components/Header';

// Tipagem para a Referência do MapView
type MapViewRef = MapView | null;

// Tipagem para os dados do JSON
interface UBSData {
    nome: string;
    endereco_busca: string;
    latitude: number;
    longitude: number;
}

// Região inicial (Centro aproximado de Pederneiras)
const InitialRegion: Region = {
    latitude: -22.348, 
    longitude: -48.775,
    latitudeDelta: 0.1, 
    longitudeDelta: 0.1, 
};

// Função auxiliar para remover acentos e converter para minúsculas
const normalizeString = (str: string): string => {
    if (!str) return '';
    return str
        .normalize('NFD') // Decompõe os acentos
        .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
        .toLowerCase();
};


const MapScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState(''); 
    const mapRef = useRef<MapViewRef>(null); 

    // Função de busca que consome o JSON local
    const handleSearch = () => {
        Keyboard.dismiss(); 

        const normalizedQuery = normalizeString(searchQuery); 

        if (!normalizedQuery) {
            Alert.alert('Erro', 'Por favor, digite um local para pesquisar.');
            return;
        }

        // Busca no array de objetos (fazendo o cast para tipagem correta)
        const foundUbs = (ubsData as UBSData[]).find(ubs => {
            // Normaliza os dados do JSON antes de comparar
            const normalizedName = normalizeString(ubs.nome);
            const normalizedAddress = normalizeString(ubs.endereco_busca);

            // Verifica se o termo de busca está contido no nome OU no endereço
            return (
                normalizedName.includes(normalizedQuery) || 
                normalizedAddress.includes(normalizedQuery)
            );
        });

        if (foundUbs) {
            // Se encontrado, define a nova região com zoom detalhado
            const newRegion: Region = {
                latitude: foundUbs.latitude,
                longitude: foundUbs.longitude,
                latitudeDelta: 0.005, 
                longitudeDelta: 0.005, 
            };

            // Move o mapa
            if (mapRef.current) {
                mapRef.current.animateToRegion(newRegion, 1000); 
            }
            setSearchQuery('');
        } else {
            Alert.alert('Não Encontrado', `Nenhuma UBS com o nome ou referência "${searchQuery}" foi encontrada.`);
        }
    };

    return (
        <View style={styles.container}>
            <Header texto="Localização de UBS" />
            
            {/* Container de Pesquisa */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar UBS (ex: Postão, Maria Elena)"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                />
                <Button title="Buscar" onPress={handleSearch} />
            </View>

            {/* MapView e Marcadores */}
            <MapView
                ref={mapRef} 
                style={styles.map}
                initialRegion={InitialRegion}
            >
                {/* Renderiza Marcadores para todas as UBS do JSON */}
                {(ubsData as UBSData[]).map((ubs, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: ubs.latitude, longitude: ubs.longitude }}
                        title={ubs.nome}
                        description={`Ref.: ${ubs.endereco_busca}`}
                        pinColor="blue"
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchContainer: {
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
});

export default MapScreen;