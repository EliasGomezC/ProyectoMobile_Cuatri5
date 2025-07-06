import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProfileScreen = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
        const data = await AsyncStorage.getItem('userData');
        if (data) setUsuario(JSON.parse(data));
        } catch (err) {
        console.error('Error al leer usuario:', err);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const onRefresh = async () => {
        setLoading(true);
        await fetchUser();
        setLoading(false);
    };

    if (!usuario) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0E415C" />
        </View>
        );
    }

    return (
        <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
        <View style={styles.profileHeader}>
            {usuario.profilePicture ? (
            <Image source={{ uri: usuario.profilePicture }} style={styles.avatar} />
            ) : (
            <View style={[styles.avatar, styles.placeholder]}>
                <Text style={styles.initials}>
                {usuario.name?.[0]}
                {usuario.lastName?.[0]}
                </Text>
            </View>
            )}
            <Text style={styles.name}>
            {usuario.name} {usuario.lastName} {usuario.secondLastName}
            </Text>
            <Text style={styles.role}>
                {usuario.role === 'admin' ? 'Administrator' : 'Driver'}
            </Text>
        </View>

        <View style={styles.card}>
            <IconRow icon={<MaterialIcons name="email" size={20} color="#0E415C" />} label="Email" value={usuario.email} />
            <IconRow icon={<Feather name="phone" size={20} color="#0E415C" />} label="Phone Number" value={usuario.phoneNumber} />
            <IconRow icon={<FontAwesome5 name="id-card" size={20} color="#0E415C" />} label="Status" value={usuario.status} />
            <IconRow icon={<MaterialIcons name="date-range" size={20} color="#0E415C" />} label="Registered Date" value={new Date(usuario.registrationDate).toLocaleDateString()} />
        </View>

        <View style={[styles.card, styles.licenseCard]}>
            <Text style={styles.licenseTitle}>Driver license</Text>
            {usuario.license ? (
            <TouchableOpacity onPress={() => Linking.openURL(usuario.license)}>
                <Image source={{ uri: usuario.license }} style={styles.licenseImage} />
            </TouchableOpacity>
            ) : (
            <Text style={styles.noLicense}>Without license image</Text>
            )}
        </View>
        </ScrollView>
    );
};

const IconRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        {icon}
        <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || '—'}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2faff',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f2faff',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    placeholder: {
        backgroundColor: '#d0eaf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initials: {
        fontSize: 36,
        fontWeight: '700',
        color: '#0E415C',
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0E415C',
    },
    role: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3a6b80',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 13,
        color: '#6e8da3',
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0E415C',
    },
    licenseCard: {
        alignItems: 'center',
    },
    licenseTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#0E415C',
    },
    licenseImage: {
        width: 260,
        height: 160,
        borderRadius: 12,
    },
    noLicense: {
        fontSize: 14,
        color: '#999',
    },
    });

export default ProfileScreen;
