import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import CarteiraVacinacao from "@/components/CarteiraVacinacao";
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import ModalFormularioVacina from "@/components/ModalFormularioVacina";
import Vacinas from "@/json/vacinas.json";

interface UnitVaccineData {
    id: string;
    name: string;
    dueDate: string;
    hora: string;
}

const initialUnitSchedule = Vacinas.map(v => ({ ...v }));

const CarteiraUnidadeSaude = () => {
    const [schedule, setSchedule] = useState(initialUnitSchedule);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentVaccine, setCurrentVaccine] = useState<Partial<UnitVaccineData>>({});
    const isEditing = !!currentVaccine.id;

    const openForm = (v?: UnitVaccineData) => {
        setCurrentVaccine(v ?? { id: Date.now().toString(), name: "", dueDate: "", hora: "" });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        if (!currentVaccine.name || !currentVaccine.dueDate || !currentVaccine.hora) {
            return Alert.alert("Todos os campos são obrigatórios.");
        }

        if (isEditing) {
            setSchedule(prev => prev.map(v => (v.id === currentVaccine.id ? currentVaccine as any : v)));
        } else {
            setSchedule(prev => [...prev, currentVaccine as any]);
        }

        setIsModalVisible(false);
    };

    const handleHoraChange = (text: string) => {
        const digits = text.replace(/[^0-9]/g, "");
        const formatted = digits.length > 2
            ? `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
            : digits;

        setCurrentVaccine(prev => ({ ...prev, hora: formatted }));
    };


    const handleDelete = (id: string) => {
        Alert.alert("Excluir", "Tem certeza?", [
            { text: "Cancelar" },
            {
                text: "Excluir", style: "destructive", onPress: () =>
                    setSchedule(prev => prev.filter(v => v.id !== id))
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Header texto="Carteira Digital - Unidade de Saúde" />

            <FloatingButton onPress={() => openForm()} />

            <CarteiraVacinacao
                schedule={schedule}
                isEditable
                onUnitAction={(id) => {
                    const v = schedule.find(v => v.id === id);
                    if (v) openForm(v);
                }}
                onDeleteAction={handleDelete}
            />

            <ModalFormularioVacina
                visible={isModalVisible}
                isEditing={isEditing}
                vaccine={currentVaccine}
                onChange={setCurrentVaccine}
                onChangeHora={handleHoraChange}
                onSave={handleSave}
                onClose={() => setIsModalVisible(false)}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0c0346",
    },
});

export default CarteiraUnidadeSaude;
