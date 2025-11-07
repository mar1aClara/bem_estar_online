import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CadastroUnidSaude() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={{ backgroundColor: '#0c0346' }}>
            <View style={styles.registerBox}>

                <Text style={styles.registerTitle}>CADASTRO UNIDADE DE SAÚDE</Text>

                <View style={styles.inputGrid}>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Nome da Unidade:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o nome da unidade de saude'
                            placeholderTextColor="#999"
                        />

                    </View>

                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite a senha'
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>Confirme a Senha:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirme sua senha'
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                        />
                    </View>
                    
                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o telefone'
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                        />

                    </View>
                    
                    <View style={styles.inputColumn}>
                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Informe a cidade'
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputColumnFull}>
                        <Text style={styles.label}>CNPJ:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o CNPJ'
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            maxLength={14}
                        />

                    </View>


                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/telaLogin')}
                >
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#0c0346',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    registerBox: {
        backgroundColor: '#678ab2',
        borderRadius: 15,
        padding: 30,
        width: '90%',
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5.46,
        elevation: 9,
    },
    registerTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#28578e',
        paddingBottom: 5,
    },
 
    inputGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
   
    inputColumn: {
        width: '48%',
        marginBottom: 10,
    },
   
    inputColumnFull: {
        width: '100%',
        marginBottom: 10,
    },
   
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
 
    input: {
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#28578e',
    },
    button: {
        backgroundColor: '#28578e',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 25,
        width: '80%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowRadius: 3.84,
        elevation: 5,
    },
   
    buttonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 20,
    },
 
});

