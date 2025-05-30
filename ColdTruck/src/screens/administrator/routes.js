import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const adminRoutesScreen = () => {
    const [modalVisiblePlus, setModalVisiblePlus] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Search Routes..."
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} />
                }
            >
                <Text style={styles.title}>Routes Admins</Text>
            </ScrollView>

            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisiblePlus(true)}>
                <AntDesign name="plus" size={28} color="white" />
            </TouchableOpacity>

            {/* MODAL */}
            <Modal
                visible={modalVisiblePlus}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => setModalVisiblePlus(false)} style={{ alignSelf: 'flex-end' }}>
                        <AntDesign name="closecircle" size={24} color="#09569c" />
                    </TouchableOpacity>
                        <Text>Ola</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 15,
        height: '100%',
        backgroundColor: '#e3f6fd',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#046bc8'
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 10,
        backgroundColor: "#046bc8",
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
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowOffset: { height: 2, width: 0 },
        elevation: 2,
        marginTop: 0,
        marginBottom: 8,
        paddingHorizontal: 10,
        zIndex: 1001,
    },
    inputSearch: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    filterButton: {
        marginLeft: 10,
        backgroundColor: '#046bc8',
        padding: 10,
        borderRadius: 20,
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        paddingTop: 15,
        paddingBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
});

export default adminRoutesScreen;
