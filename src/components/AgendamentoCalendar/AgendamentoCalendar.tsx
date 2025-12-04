import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MyApp:BookedAppointments';
const PATIENT_ID = "Patricia Esteves";

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

const START_HOUR = 6;
const END_HOUR = 17;
const SLOT_DURATION_MINUTES = 15;

// Função de limpeza de agendamentos expirados (mantida)
const filterExpiredAppointments = (appointments: Appointments): Appointments => {
    const now = new Date().getTime();
    const gracePeriodInMs = 60 * 60 * 1000;
    const filteredAppointments: Appointments = {};

    for (const date in appointments) {
        const remainingAppointments = appointments[date].filter(app => {
            const appointmentTime = new Date(app.isoTime).getTime();
            return now < appointmentTime + gracePeriodInMs;
        });

        if (remainingAppointments.length > 0) {
            filteredAppointments[date] = remainingAppointments;
        }
    }
    return filteredAppointments;
};

export default function AgendamentoCalendar() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [bookedAppointments, setBookedAppointments] = useState<Appointments>({});
    const [loading, setLoading] = useState(true);

    // Carrega e filtra os agendamentos
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

    // Filtra TODOS os agendamentos para mostrar APENAS os da paciente
    const patientAppointmentsByDate = useMemo(() => {
        const patientApps: Appointments = {};
        for (const date in bookedAppointments) {
            const appsForDate = (bookedAppointments[date] || []).filter(
                app => app.patientName === PATIENT_ID
            );
            if (appsForDate.length > 0) {
                patientApps[date] = appsForDate.sort((a, b) => a.isoTime.localeCompare(b.isoTime));
            }
        }
        return patientApps;
    }, [bookedAppointments]);

    // Agendamentos para o dia selecionado
    const selectedDayAppointments = selectedDate
        ? patientAppointmentsByDate[selectedDate] || []
        : [];

    // Mapeamento de datas para o calendário
    const markedDates: any = useMemo(() => {
        const marked: any = Object.keys(patientAppointmentsByDate).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#0c0346' };
            return acc;
        }, {} as any);

        if (selectedDate) {
            marked[selectedDate] = {
                selected: true,
                selectedColor: '#0078ff',
                ...(marked[selectedDate] || {}),
            };
        }
        return marked;
    }, [patientAppointmentsByDate, selectedDate]);

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

                        if (new Date(day.dateString).getTime() < todayNormalized) {
                            setSelectedDate(day.dateString);
                        } else {
                            setSelectedDate(day.dateString);
                        }
                    }}
                />

                <View
                    style={{
                        height: 1,
                        backgroundColor: '#ddd',
                        marginHorizontal: 15
                    }}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>
                        {selectedDate
                            ? `Consultas Agendadas para ${selectedDate}:`
                            : 'Selecione uma data no calendário acima.'}
                    </Text>

                    {selectedDate && (
                        <>
                            {selectedDayAppointments.length > 0 ? (
                                selectedDayAppointments.map((app, index) => (
                                    <View key={index} style={styles.agendamentoCard}>
                                        <View>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Hora:</Text> {app.time}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>CPF:</Text> {app.patientCPF}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Consulta:</Text> {app.patientConsult}</Text>
                                            <Text style={styles.agendamentoText}><Text style={{ fontWeight: 'bold' }}>Tel:</Text> {app.patientPhone || 'N/A'}</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.semAgendamento}>
                                    Vá ao posto ou mande mensagem, entre em contato pelo chat para marcar uma consulta.
                                </Text>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    semAgendamento: {
        fontSize: 16,
        color: '#d9534f',
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
        marginBottom: 10,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0c0346",
        marginLeft: 20,
    },
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
        width: '90%',
    },
    iconButton: {
        padding: 5,
    },
});