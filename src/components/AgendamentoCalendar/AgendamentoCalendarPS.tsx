import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert, TextInput, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const STORAGE_KEY = '@MyApp:BookedAppointments';

type AppointmentDetail = {
    time: string;
    patientName: string;
    patientPhone: string;
    patientCPF: string;
    patientConsult: string;
    date: string;
    isoTime: string;
};
type Appointments = {
    [date: string]: AppointmentDetail[];
};

// Constantes de horário (6:00 às 17:00, intervalo de 15 minutos)
const START_HOUR = 6;
const END_HOUR = 17;
const SLOT_DURATION_MINUTES = 15;

const filterExpiredAppointments = (appointments: Appointments): Appointments => {
    const now = new Date().getTime();
    const gracePeriodInMs = 60 * 60 * 1000;
    const filteredAppointments: Appointments = {};

    for (const date in appointments) {
        const remainingAppointments = appointments[date].filter(app => {
            const appointmentTime = new Date(app.isoTime).getTime();
            // Mantém se o tempo atual for MENOR que (horário agendado + 1 hora)
            return now < appointmentTime + gracePeriodInMs;
        });

        if (remainingAppointments.length > 0) {
            filteredAppointments[date] = remainingAppointments;
        }
    }
    return filteredAppointments;
};

export default function AgendamentoCalendarPS() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [bookedAppointments, setBookedAppointments] = useState<Appointments>({});
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [slotToBook, setSlotToBook] = useState<string | null>(null);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientCPF, setPatientCPF] = useState('');
    const [patientConsult, setPatientConsult] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState<AppointmentDetail & { originalIsoTime: string } | null>(null);

    const closeModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setAppointmentToEdit(null);
        setSlotToBook(null);
        setPatientName('');
        setPatientCPF('');
        setPatientPhone('');
        setPatientConsult('');
    };

    const saveAppointments = async (newAppointments: Appointments) => {
        try {
            const appointmentsToSave = filterExpiredAppointments(newAppointments);
            const jsonValue = JSON.stringify(appointmentsToSave);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            setBookedAppointments(appointmentsToSave);
        } catch (e) {
            console.error("Failed to save appointments to storage", e);
            Alert.alert("Erro", "Falha ao salvar o agendamento.");
        }
    };

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                if (jsonValue !== null) {
                    const loadedAppointments = JSON.parse(jsonValue);
                    setBookedAppointments(filterExpiredAppointments(loadedAppointments));
                }
            } catch (e) {
                console.error("Failed to load appointments from storage", e);
            } finally {
                setLoading(false);
            }
        };
        loadAppointments();
    }, []);

    const generateAvailableSlots = useCallback((dateString: string) => {
        const dayAppointments = bookedAppointments[dateString] || [];
        const available: string[] = [];
        const date = new Date(dateString);
        const bookedTimes: Date[] = dayAppointments.map(app => new Date(app.isoTime));
        const totalMinutes = (END_HOUR - START_HOUR) * 60;
        const numberOfSlots = totalMinutes / SLOT_DURATION_MINUTES;

        for (let i = 0; i < numberOfSlots; i++) {
            const slotStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), START_HOUR, 0, 0, 0);
            slotStart.setMinutes(i * SLOT_DURATION_MINUTES);
            const slotTimeDisplay = `${slotStart.getHours().toString().padStart(2, '0')}:${slotStart.getMinutes().toString().padStart(2, '0')}`;
            let isAvailable = true;

            if (slotStart.getHours() >= END_HOUR) {
                break;
            }

            for (const bookedStart of bookedTimes) {
                const bookedEnd = new Date(bookedStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

                if (slotStart.getTime() >= bookedStart.getTime() && slotStart.getTime() < bookedEnd.getTime()) {
                    isAvailable = false;
                    break;
                }
            }

            if (isAvailable) {
                available.push(slotTimeDisplay);
            }
        }

        setAvailableSlots(available);
    }, [bookedAppointments]);

    useEffect(() => {
        if (selectedDate) {
            generateAvailableSlots(selectedDate);
        }
    }, [selectedDate, bookedAppointments, generateAvailableSlots]);

    const handleSlotPress = (timeDisplay: string) => {
        if (!selectedDate) return;
        setSlotToBook(timeDisplay);
        setIsEditing(false);
        setAppointmentToEdit(null);
        setPatientName('');
        setPatientCPF('');
        setPatientPhone('');
        setPatientConsult('');
        setModalVisible(true);
    };

    const handleConfirmAction = () => {
        if (!selectedDate || !slotToBook || !patientName.trim() || !patientCPF.trim() || !patientConsult.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios (Nome, CPF e Qual a consulta?).");
            return;
        }

        // 1. Cria o novo objeto de agendamento (editado ou novo)
        const [hourStr, minuteStr] = slotToBook.split(':');
        const newDate = new Date(selectedDate);
        newDate.setHours(parseInt(hourStr), parseInt(minuteStr), 0, 0);
        const newAppointmentISO = newDate.toISOString();

        const newAppointment: AppointmentDetail = {
            time: slotToBook,
            patientName: patientName.trim(),
            patientPhone: patientPhone.trim(),
            patientCPF: patientCPF.trim(),
            patientConsult: patientConsult.trim(),
            date: selectedDate,
            isoTime: newAppointmentISO,
        };

        let updatedAppointments: Appointments;

        if (isEditing && appointmentToEdit) {
            updatedAppointments = { ...bookedAppointments };
            const oldDate = appointmentToEdit.date;
            const originalIsoTime = appointmentToEdit.originalIsoTime;

            let appointmentsOnOldDate = (updatedAppointments[oldDate] || []).filter(
                app => app.isoTime !== originalIsoTime
            );
            updatedAppointments[oldDate] = appointmentsOnOldDate;

            if (appointmentsOnOldDate.length === 0) {
                delete updatedAppointments[oldDate];
            }

            const appointmentsOnNewDate = [
                ...(updatedAppointments[selectedDate] || []),
                newAppointment,
            ].sort((a, b) => a.isoTime.localeCompare(b.isoTime));

            updatedAppointments[selectedDate] = appointmentsOnNewDate;

            Alert.alert("Sucesso!", `Agendamento de ${patientName} editado com sucesso.`);

        } else {
            updatedAppointments = {
                ...bookedAppointments,
                [selectedDate]: [
                    ...(bookedAppointments[selectedDate] || []),
                    newAppointment,
                ].sort((a, b) => a.isoTime.localeCompare(b.isoTime)),
            };
            Alert.alert("Sucesso!", `Agendamento confirmado para ${patientName} em ${selectedDate} às ${slotToBook}.`);
        }

        saveAppointments(updatedAppointments);
        closeModal();
    };

    const handleDeleteAppointment = (appToDelete: AppointmentDetail) => {
        Alert.alert(
            "Confirmação",
            `Deseja realmente excluir a consulta de ${appToDelete.patientName} em ${appToDelete.time}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        const date = appToDelete.date;
                        const updatedDayAppointments = (bookedAppointments[date] || []).filter(
                            app => app.isoTime !== appToDelete.isoTime
                        );

                        const newAppointments = {
                            ...bookedAppointments,
                            [date]: updatedDayAppointments,
                        };

                        if (updatedDayAppointments.length === 0) {
                            delete newAppointments[date];
                        }

                        saveAppointments(newAppointments);
                        Alert.alert("Excluído", "Consulta removida com sucesso.");
                    }
                },
            ]
        );
    };

    // --- FUNÇÃO DE EDIÇÃO ---
    const handleEditAppointment = (appToEdit: AppointmentDetail) => {
        setSelectedDate(appToEdit.date);
        setSlotToBook(appToEdit.time);
        setPatientName(appToEdit.patientName);
        setPatientCPF(appToEdit.patientCPF);
        setPatientPhone(appToEdit.patientPhone);
        setPatientConsult(appToEdit.patientConsult);
        setAppointmentToEdit({ ...appToEdit, originalIsoTime: appToEdit.isoTime });
        setIsEditing(true);
        setModalVisible(true);
    };


    const markedDates: any = {
        ...Object.keys(bookedAppointments).reduce((acc, date) => {
            if (bookedAppointments[date].length > 0) {
                acc[date] = { marked: true, dotColor: '#0c0346' };
            }
            return acc;
        }, {} as any),

        ...(selectedDate && {
            [selectedDate]: {
                selected: true,
                selectedColor: '#0078ff',
                ...(bookedAppointments[selectedDate] && bookedAppointments[selectedDate].length > 0
                    ? { dotColor: '#0c0346', marked: true }
                    : {}),
            },
        }),
    };

    const allBookedAppointments: AppointmentDetail[] = Object.values(bookedAppointments).flat();

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0078ff" />
                <Text style={{ marginTop: 10 }}>Carregando agendamentos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Calendar
                    markedDates={markedDates}
                    theme={{
                        selectedDayBackgroundColor: '#0078ff',
                        todayTextColor: '#0c0346',
                        arrowColor: '#0c0346',
                    }}
                    onDayPress={(day) => {
                        const today = new Date();
                        const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
                        const selectedDay = new Date(day.dateString).getTime();

                        if (selectedDay < todayNormalized) {
                            Alert.alert("Atenção", "Não é possível marcar consultas em dias que já se passaram.");
                            setSelectedDate(null);
                        } else {
                            setSelectedDate(day.dateString);
                        }
                    }}
                />

                <View style={{ height: 1, backgroundColor: '#ddd', marginHorizontal: 15 }} />

                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>
                        {selectedDate ? `Selecione o Horário em ${selectedDate}:` : 'Selecione uma data para agendar'}
                    </Text>
                    {selectedDate && (
                        <FlatList
                            data={availableSlots}
                            keyExtractor={(item) => item}
                            horizontal={false}
                            numColumns={4}
                            ListEmptyComponent={
                                <Text style={styles.semSlot}>Nenhum horário disponível neste dia. Tente outro dia.</Text>
                            }
                            renderItem={({ item: time }) => (
                                <Pressable
                                    style={styles.slotButton}
                                    onPress={() => handleSlotPress(time)}
                                >
                                    <Text style={styles.slotText}>{time}</Text>
                                </Pressable>
                            )}
                            style={styles.list}
                            contentContainerStyle={availableSlots.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}}
                        />
                    )}
                </View>

                <View style={{ height: 1, backgroundColor: '#ddd', marginHorizontal: 15 }} />


                <View style={styles.agendamentosContainer}>
                    <Text style={styles.agendamentosTitle}>Consultas Agendadas</Text>
                    {allBookedAppointments.length > 0 ? (
                        allBookedAppointments
                            .sort((a, b) => a.isoTime.localeCompare(b.isoTime))
                            .map((app, index) => (
                                <View key={index} style={styles.agendamentoCard}>
                                    <View>
                                        <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Data/Hora:</Text> {app.date} às {app.time}</Text>
                                        <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Paciente:</Text> {app.patientName}</Text>
                                        <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>CPF:</Text> {app.patientCPF}</Text>
                                        <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Consulta:</Text> {app.patientConsult}</Text>
                                        <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Tel:</Text> {app.patientPhone || 'N/A'}</Text>
                                    </View>
                                    <View style={styles.actionButtonContainer}>
                                        <Pressable
                                            style={[styles.iconButton, { marginRight: 10 }]}
                                            onPress={() => handleEditAppointment(app)}
                                        >
                                            <FontAwesome name="pencil" size={20} color="#0078ff" />
                                        </Pressable>
                                        <Pressable
                                            style={styles.iconButton}
                                            onPress={() => handleDeleteAppointment(app)}
                                        >
                                            <FontAwesome name="trash" size={20} color="#d9534f" />
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                    ) : (
                        <Text style={styles.semSlot}>Nenhuma consulta agendada.</Text>
                    )}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {isEditing ? 'Editar Agendamento' : 'Confirmar Agendamento'}
                        </Text>
                        <Text style={styles.modalSubtitle}>Dia: {selectedDate} | Hora: {slotToBook}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo do Paciente (Obrigatório)"
                            value={patientName}
                            onChangeText={setPatientName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF (Obrigatório)"
                            value={patientCPF}
                            onChangeText={setPatientCPF}
                            keyboardType="numeric"
                            maxLength={11}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone (Opcional)"
                            value={patientPhone}
                            onChangeText={setPatientPhone}
                            keyboardType="phone-pad"
                            maxLength={11}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a consulta? (Obrigatório)"
                            value={patientConsult}
                            onChangeText={setPatientConsult}
                            keyboardType="default"
                        />
                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                style={[styles.modalButton, styles.buttonCancel]}
                                onPress={closeModal}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.buttonConfirm]}
                                onPress={handleConfirmAction}
                            >
                                <Text style={styles.textStyle}>{isEditing ? 'Salvar Edição' : 'Confirmar'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##0c0346',
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0c0346',
    },
    list: {
        flexGrow: 0,
    },
    slotButton: {
        backgroundColor: '#0078ff',
        padding: 8,
        borderRadius: 8,
        margin: 4,
        flex: 1,
        minWidth: '22%',
        alignItems: 'center',
    },
    slotText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    semSlot: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        paddingVertical: 20,
    },

    agendamentosContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    agendamentosTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#0c0346',
    },
    agendamentoCard: {
        backgroundColor: '#a9d6eb',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    agendamentoText: {
        fontSize: 14,
        color: '#000',
    },
    actionButtonContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 5,
        paddingTop: 73,
    },

    // --- Estilos do Modal ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0c0346',
    },
    modalSubtitle: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonConfirm: {
        backgroundColor: '#0078ff',
    },
    buttonCancel: {
        backgroundColor: '#ccc',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});