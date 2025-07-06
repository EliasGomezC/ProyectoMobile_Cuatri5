import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import conexion from '../../../conexion';

const HistoryDriverScreen = () => {
    const [usuario, setUsuario] = useState(null);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // === Helpers ===
    const fetchTrips = useCallback(async (driverId) => {
        try {
            const resp = await fetch(`http://${conexion}:3000/trips/driver/${driverId}`);
        if (!resp.ok) throw new Error('Network response was not ok');
            const data = await resp.json();
            setTrips(data);
        } catch (err) {
            console.error('Error fetching trips:', err);
        }
    }, []);

    const fetchUserAndTrips = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem('userData');
            if (!stored) return;
            const user = JSON.parse(stored);
            setUsuario(user);
            await fetchTrips(user.id ?? user._id);
        } catch (err) {
            console.error('Error reading userData:', err);
        } finally {
            setInitialLoading(false);
        }
    }, [fetchTrips]);

    useEffect(() => {
        fetchUserAndTrips();
    },[fetchUserAndTrips]);

    const onRefresh = async () => {
        setLoading(true);
        await fetchUserAndTrips();
        setLoading(false);
    };

    if (initialLoading) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0077b6" />
        </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
        <Text style={styles.header}>Travel history</Text>

        {trips.length === 0 && (
            <Text style={styles.empty}>There are no assigned trips to display.</Text>
        )}

        {trips.map((trip) => {
            const origin = trip.IDRute?.origin?.coordinates;
            const dest = trip.IDRute?.destination?.coordinates;
            const hasRoute = origin && dest;
            const region = hasRoute
            ? {
                latitude: (origin[1] + dest[1]) / 2,
                longitude: (origin[0] + dest[0]) / 2,
                latitudeDelta: Math.abs(origin[1] - dest[1]) * 2 || 0.02,
                longitudeDelta: Math.abs(origin[0] - dest[0]) * 2 || 0.02,
                }
            : null;

            const statusColorMap = {
                Completed: '#1b7837',
                'In Transit': '#0077b6',
                Canceled: '#b00020',
                Scheduled: '#ff8800',
            };

            return (
            <View key={trip._id} style={styles.card}>
                {/* Mapa con origen‑destino */}
                {hasRoute && (
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                >
                    <Marker
                        coordinate={{ latitude: origin[1], longitude: origin[0] }}
                        title="Origin"
                    />
                    <Marker
                        coordinate={{ latitude: dest[1], longitude: dest[0] }}
                        pinColor="#ff6b00"
                        title="Destination"
                    />
                </MapView>
                )}

                {/* Info básica */}
                <View style={styles.infoBlock}>
                <Text style={styles.label}>Assigned by:</Text>
                <Text style={styles.value}>{`${trip.IDAdmin?.name ?? ''} ${trip.IDAdmin?.lastName ?? ''}`}</Text>
                </View>

                <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, { color: statusColorMap[trip.status] || '#0E415C' }]}>
                    {trip.status}
                </Text>
                </View>

                <View style={styles.infoRow}>
                <Text style={styles.label}>Estimated distance:</Text>
                <Text style={styles.value}>{trip.estimatedDistance?.toFixed(1)} Meters</Text>
                </View>

                <View style={styles.infoRow}>
                <Text style={styles.label}>Scheduled departure:</Text>
                <Text style={styles.value}>{new Date(trip.scheduledDepartureDate).toLocaleString()}</Text>
                </View>

                <View style={styles.infoRow}>
                <Text style={styles.label}>Scheduled arrive:</Text>
                <Text style={styles.value}>{new Date(trip.scheduledArrivalDate).toLocaleString()}</Text>
                </View>

                <View style={styles.infoRow}>
                <Text style={styles.label}>Truck license plates:</Text>
                <Text style={styles.value}>{trip.IDTruck?.plates ?? 'N/A'}</Text>
                </View>
            </View>
            );
        })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f6fd',
        padding: 20,
        paddingTop: 30,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f6fd',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#0E415C',
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#6e8da3',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    map: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 12,
    },
    infoBlock: {
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    label: {
        color: '#6e8da3',
        fontSize: 13,
    },
    value: {
        color: '#0E415C',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default HistoryDriverScreen;
