import { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const registerScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
        <View>
            <Text style={styles.title}>Register Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 125,
        padding: 20,
        backgroundColor: '#e3f6fd',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0E415C',
    },
});

export default registerScreen;
