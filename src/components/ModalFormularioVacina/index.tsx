// import React, { useState } from "react";
// import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";
// import Button from "../Button";
// import Vacinas from '../../json/vacinas.json'; 

// export default function ModalFormularioVacina() {
//     //------------------- Interface de dados local para a Unidade de Saúde------------------------//
// interface UnitVaccineData {
//     id: string; 
//     name: string; 
//     dueDate: string; 
//     hora: string; 
// }

// //----------------------Dados iniciais (separados dos dados do paciente)----------------------//
// const initialUnitSchedule: UnitVaccineData[] = Vacinas.map(vac => ({
//     id: vac.id,
//     name: vac.name,
//     dueDate: vac.dueDate,
//     hora: vac.hora,
// }));

// //-------------------------Função para formatar a entrada de hora no formato HH:MM------------//
// const formatTimeInput = (text: string) => {
//     // Remove all non-digit characters
//     const digits = text.replace(/[^0-9]/g, '');

//     // Apply HH:MM formatting
//     if (digits.length > 2) {
//         // Insere o ':' após os dois primeiros dígitos
//         return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
//     }
//     return digits.slice(0, 4);
// };
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [currentVaccine, setCurrentVaccine] = useState<Partial<UnitVaccineData>>({}); 
//      const [schedule, setSchedule] = useState<UnitVaccineData[]>(initialUnitSchedule);
//      const isEditing = !!currentVaccine.id && schedule.some(v => v.id === currentVaccine.id);
//     //--------------------------Abre o formulário (sempre simulado)--------------------------//
//         const openForm = (vaccine?: UnitVaccineData) => {
//             if (vaccine) {
//                 setCurrentVaccine(vaccine);
//             } else {
//                 // Incluído 'hora: ""' no estado inicial
//                 setCurrentVaccine({ id: Date.now().toString(), name: '', dueDate: new Date().toLocaleDateString('pt-BR'), hora: '' });
//             }
//             setIsModalVisible(true);
//         };
    
//         //----------------------------Salva o novo/agendamento editado----------------------------//
//         const handleSaveVaccine = () => {
//             // Alerta modificado para checar a 'hora' também
//             if (!currentVaccine.name || !currentVaccine.dueDate || !currentVaccine.hora) {
//                 Alert.alert( "Todos os campos são obrigatórios.");
//                 return;
//             }
    
//             if (isEditing) {
//                 // Edição Local
//                 setSchedule(prev => prev.map(v => 
//                     v.id === currentVaccine.id ? { ...v, ...currentVaccine as UnitVaccineData } : v
//                 ));
//                 Alert.alert( "Dados atualizados com sucesso!");
//             } else {
//                 // Criação Local
//                 setSchedule(prev => [...prev, currentVaccine as UnitVaccineData]);
//                 Alert.alert("Novos dados criados com sucesso!");
//             }
    
//             setIsModalVisible(false);
//             setCurrentVaccine({});
//         };
    
//         // ------------------------NOVO: Função para Excluir Agendamento-------------------------//
//         const handleDeleteVaccine = (vaccineId: string) => {
//             Alert.alert(
//                 "Confirmar Exclusão",
//                 "Tem certeza que deseja excluir este agendamento? Esta ação é irreversível.",
//                 [
//                     {
//                         text: "Cancelar",
//                         style: "cancel"
//                     },
//                     {
//                         text: "Excluir",
//                         onPress: () => {
//                             // Filtra o agendamento a ser excluído
//                             setSchedule(prev => prev.filter(v => v.id !== vaccineId));
//                         },
//                         style: "destructive"
//                     }
//                 ]
//             );
//         };
    
//         // ------------------Chamado pelo botão "Editar Agendamento" do card-------------------//
//         const handleUnitAction = (vaccineId?: string) => {
//             const vacToEdit = schedule.find(v => v.id === vaccineId);
//             if (vacToEdit) {
//                 openForm(vacToEdit);
//             }
//         };
    
//         //-------------------------Handler específico para o campo hora com formatação-----------//
//         const handleHoraChange = (text: string) => {
//             const formattedText = formatTimeInput(text);
//             setCurrentVaccine(prev => ({ ...prev, hora: formattedText }));
//         };

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={isModalVisible}
//             onRequestClose={() => setIsModalVisible(false)}
//         >
//             <View style={styles.modalCenteredView}>
//                 <View style={styles.modalView}>
//                     <Text style={styles.modalTitle}>{isEditing ? "Editar Horário" : "Criar Novo Horário"}</Text>

//                     <TextInput
//                         placeholder="Nome da vacina"
//                         placeholderTextColor="#000"
//                         style={styles.input}
//                         value={currentVaccine.name || ''}
//                         onChangeText={(text) => setCurrentVaccine(prev => ({ ...prev, name: text }))}
//                     />
//                     <TextInput
//                         placeholder="Data de agendamento"
//                         placeholderTextColor="#000"
//                         style={styles.input}
//                         value={currentVaccine.dueDate || ''}
//                         onChangeText={(text) => setCurrentVaccine(prev => ({ ...prev, dueDate: text }))}
//                     />


//                     <TextInput
//                         placeholder="Horário de agendamento"
//                         placeholderTextColor="#000"
//                         style={styles.input}
//                         keyboardType="numeric" // Força o teclado numérico
//                         maxLength={5} // Max 5 caracteres (HH:MM)
//                         value={currentVaccine.hora || ''}
//                         onChangeText={handleHoraChange} // Chama a função de formatação
//                     />

//                     <View style={styles.modalButton}>
//                         <Button texto="Confirmar" cor="#28578e" onPress={handleSaveVaccine} />
//                         <Button texto="Cancelar" cor="#AAA" onPress={() => setIsModalVisible(false)} />
//                     </View>

//                 </View>
//             </View>
//         </Modal>
//     )
// }


// const styles = StyleSheet.create({
//     modalCenteredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
//     modalView: { 
//         backgroundColor: 'white', 
//         borderRadius: 15, 
//         padding: 30, 
//         alignItems: 'center', 
//         width: '90%',
//     },
//     modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#0c0346' },
//     input: { 
//         height: 45, 
//         width: '100%', 
//         borderColor: '#ccc', 
//         borderWidth: 1, 
//         marginBottom: 15, 
//         paddingHorizontal: 15, 
//         borderRadius: 8,
//         color: '#0c0346'
//     },
//     modalButton: { 
//      justifyContent: 'space-around', 
//      width: '100%', 
//      marginTop: 15, 
//      gap: 10,
//     },

// })

import React, { Dispatch, SetStateAction } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Input from "../InputVacinas";
import Button from "../Button";

interface UnitVaccineData {
    id: string;
    name: string;
    dueDate: string;
    hora: string;
}

interface ModalFormularioProps {
    visible: boolean;
    isEditing: boolean;
    vaccine: Partial<UnitVaccineData>;
    onChange: Dispatch<SetStateAction<Partial<UnitVaccineData>>>;
    onChangeHora: (text: string) => void;
    onSave: () => void;
    onClose: () => void;
}

export default function ModalFormularioVacina({
    visible,
    isEditing,
    vaccine,
    onChange,
    onChangeHora,
    onSave,
    onClose
} : ModalFormularioProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.center}>
                <View style={styles.box}>
                    <Text style={styles.title}>
                        {isEditing ? "Editar Horário" : "Criar Novo Horário"}
                    </Text>

                    <Input
                        placeholder="Nome da vacina"
                        value={vaccine.name}
                        onChangeText={(text:string) => onChange({ ...vaccine, name: text })}
                    />

                    <Input
                        placeholder="Data do agendamento"
                        value={vaccine.dueDate}
                        onChangeText={(text: string) => onChange({ ...vaccine, dueDate: text })}
                    />

                    <Input
                        placeholder="Horário (HH:MM)"
                        keyboardType="numeric"
                        maxLength={5}
                        value={vaccine.hora}
                        onChangeText={onChangeHora}
                    />

                    <View style={styles.buttons}>
                        <Button texto="Confirmar" cor="#28578e" onPress={onSave} />
                        <Button texto="Cancelar" cor="#AAA" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    center: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.7)" 
    },
    box: { 
        backgroundColor: "white", 
        padding: 30, 
        borderRadius: 15, 
        width: "90%" 
    },
    title: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "#0c0346" 
    },
    buttons: { 
        marginTop: 10, 
        gap: 10 
    },
});
