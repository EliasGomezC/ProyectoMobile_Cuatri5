import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const apiKey = '5b3ce3597851110001cf62486b568c6b7213474cb53c4d52de715431'; // ← TU CLAVE DE ORS

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  // Permisos y ubicación en tiempo real
    useEffect(() => {
        let subscriber;

        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permiso denegado');
            return;
        }

        subscriber = await Location.watchPositionAsync(
                {
                accuracy: Location.Accuracy.High,
                timeInterval: 2000,
                distanceInterval: 5,
                },
                (loc) => {
                setLocation(loc.coords);
                }
            );
        })();

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, []);

  // Auto-centrar el mapa
    useEffect(() => {
        if (location && mapRef.current) {
        mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        }
    }, [location]);

    const handleMapPress = (event) => {
        if (markers.length < 2) {
        setMarkers([...markers, event.nativeEvent.coordinate]);
        }
    };

    const resetMap = () => {
        setMarkers([]);
        setRoute([]);
        setRouteData(null);
    };

    const getRouteFromAPI = async (start, end) => {
        try {
        const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
            method: 'POST',
            headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            coordinates: [
                [start.longitude, start.latitude],
                [end.longitude, end.latitude],
            ],
            instructions: true,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        const instructions = data.features[0].properties.segments[0].steps;

        console.log('📍 Instrucciones paso a paso:');
        instructions.forEach((step, index) => {
            console.log(`${index + 1}. ${step.instruction} (${step.distance} m)`);
        });

        const routeCoords = data.features[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
        }));

        setRoute(routeCoords);
        setRouteData(data);
        } catch (error) {
        console.error('❌ Error al obtener la ruta:', error.message);
        Alert.alert('Error', error.message);
        }
    };

    const handleCreateRoute = () => {
        if (markers.length < 2) {
        Alert.alert('Selecciona 2 puntos en el mapa');
        return;
        }
        getRouteFromAPI(markers[0], markers[1]);
    };

    const handleSaveRoute = () => {
    // Aquí guardas la ruta (puede ser en Firebase, AsyncStorage, etc.)
        console.log("Ruta guardada");
    };


    return (
        <View style={styles.container}>
        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
                latitude: 32.5222,
                longitude: -117.0192,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            onPress={handleMapPress}
            showsUserLocation={true}
            followsUserLocation={true}
        >
            {markers.map((marker, index) => (
            <Marker
                key={index}
                coordinate={marker}
                title={`Punto ${index + 1}`}
            />
            ))}

            {route.length > 0 && (
                <Polyline coordinates={route} strokeColor="#0275d8" strokeWidth={6} />
            )}

        </MapView>

        <View style={styles.buttons}>
            <TouchableOpacity onPress={resetMap} style={styles.btnReset}>
                <Text style={{color: 'white', fontWeight: '800'}}>Reset Route</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateRoute} style={styles.btnCreate}>
                <Text style={{color: 'white', fontWeight: '800'}}>Create Route</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSaveRoute} style={styles.btnSave}>
                <Text style={{color: 'white', fontWeight: '800'}}>Save Route</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttons: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnReset: {
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#d9534f',
    },
    btnCreate: {
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#0275d8',
    },
    btnSave: {
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#5cb85c',
    }
});
