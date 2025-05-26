import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const adminDriverScreen = () => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
        const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '123456789',
        phoneNumber: '',
        role: 'Driver' // valor por defecto
    });

    const handleSubmit = async () => {
    const { name, lastName, phoneNumber, email, role } = formData;

    if (!name || !lastName || !phoneNumber || !email || !role) {
        alert('❗Todos los campos son obligatorios');
        return;
    }

    try {
        const response = await fetch('http://192.168.1.115:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Usuario registrado correctamente');
            setModalVisible(false);
        } else {
            console.error('❌ Error en el servidor:', data);
            alert(data.error || '❌ Error al registrar el usuario');
        }
    } catch (error) {
        console.error('❌ Error de red:', error);
        alert('❌ No se pudo conectar con el servidor');
    }
};
    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} />
                }
            >
                <Text style={styles.title}>Users Admins</Text>
            </ScrollView>

            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="plus" size={28} color="white" />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
                            <AntDesign name="closecircle" size={24} color="#0E415C" />
                        </TouchableOpacity>
                        <Text style={styles.brandTitle}>Register people</Text>
                        <View style={{width:'100%'}}>
                            <View style={styles.namesInput}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Name*</Text>
                                        <TextInput
                                            style={styles.inputName}
                                            placeholder="Cold..."
                                            placeholderTextColor="#1B5574"
                                            value={formData.name}
                                            onChangeText={(text) => setFormData({...formData, name: text})}
                                        />
                                    </View>
                                
            
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Last Name*</Text>
                                        <TextInput
                                            style={styles.lastNameInput}
                                            placeholder="Truck..."
                                            placeholderTextColor="#1B5574"
                                            value={formData.lastName}
                                            onChangeText={(text) => setFormData({...formData, lastName: text})}
                                        />
                                </View>
                            </View>
                            <Text style={styles.label}>Phone Number*</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="663-123-4567"
                                placeholderTextColor="#1B5574"
                                maxLength={10}
                                keyboardType="phone-pad"
                                value={formData.phoneNumber}
                                onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                            />
                            <Text style={styles.label}>Email*</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ColdTruck@gmail.com"
                                placeholderTextColor="#1B5574"
                                value={formData.email}
                                onChangeText={(text) => setFormData({...formData, email: text})}
                            />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Rol*</Text>
                        </View>
                        <View style={styles.roleContainer}>
                            <TouchableOpacity
                                style={[styles.roleButton, formData.role === 'Administrator' && styles.roleButtonActive]}
                                onPress={() => setFormData({...formData, role: 'Administrator'})}
                            >
                                <Text style={[styles.roleText, formData.role === 'Administrator' && styles.roleTextActive]}>Administrator</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.roleButton, formData.role === 'Driver' && styles.roleButtonActive]}
                                onPress={() => setFormData({...formData, role: 'Driver'})}
                            >
                                <Text style={[styles.roleText, formData.role === 'Driver' && styles.roleTextActive]}>Driver</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
        height: '100%',
        backgroundColor: '#e3f6fd',
        position: 'relative', // <--- esto
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0E415C'
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 10,
        backgroundColor: "#0E415C",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
        modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        paddingTop: 25,
        paddingBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        backgroundColor: '#ffffffcc',
        borderColor: '#0E415C',
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        width: '100%',
        marginBottom: 15,
        color: '#0E415C',
        fontSize: 15,
    },
    namesInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputName: {
        flex: 1,
        backgroundColor: '#ffffffcc',
        borderColor: '#0E415C',
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        width: '100%',
        marginBottom: 15,
        color: '#0E415C',
        fontSize: 15,
    },
    lastNameInput: {
        flex: 1,
        backgroundColor: '#ffffffcc',
        borderColor: '#0E415C',
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        width: '100%',
        marginBottom: 15,
        color: '#0E415C',
        fontSize: 15,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
        height: '100%',
        minWidth:'%48',
        marginBottom: 20,
        maxWidth: '100%',
    },
    label: {
        fontSize: 16,
        color: '#222',
        marginBottom: 5,
        fontWeight: '500',
    },
    linkText: {
        color: '#0E415C',
        fontSize: 16,
        marginTop: 10,
        justifyContent: 'center',
    },
    brandTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0E415C',
        marginBottom: 24,
        textAlign: 'center',
    },
    registerBtn: {
        backgroundColor: '#0E415C',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    registerText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 25,
    },
    roleButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0E415C',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    roleButtonActive: {
        backgroundColor: '#53849A',
        borderColor: '#0E415C',
    },
    roleText: {
        color: '#666',
        fontSize: 15,
        fontWeight: '500',
    },
    roleTextActive: {
        color: 'white',
    },
});

export default adminDriverScreen;
