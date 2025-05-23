import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ name: '', password: '' });

  const handleLogin = async () => {
    try {
      // Lógica de autenticación aquí
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../images/logo.jpg')} style={styles.logo} />

      {/* Título y slogan */}
      <Text style={styles.brandTitle}>ColdTruck</Text>
      <Text style={styles.slogan}>Refrigerated trailer transport monitoring and management system</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#1B5574"
        onChangeText={(name) => setForm({ ...form, name })}
        value={form.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#1B5574"
        secureTextEntry
        onChangeText={(password) => setForm({ ...form, password })}
        value={form.password}
      />

      {/* Botón de Login */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Navegación extra */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HomeTabs', { role: 'Driver' })}>
        <Text style={styles.linkText}>Enter as Driver</Text>
      </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HomeTabs', { role: 'Administrator' })}>
        <Text style={styles.linkText}>Enter as Administrator</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3f6fd', // Fondo tipo cielo frío
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: 120,
    padding: 30,
    height: '100%',
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0E415C',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0E415C',
    marginBottom: 4,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 14,
    color: '#1B5574',
    marginBottom: 30,
    textAlign: 'center',
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
  loginBtn: {
    backgroundColor: '#0E415C',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#0E415C',
    fontSize: 16,
    marginTop: 10,
  },
});

export default LoginScreen;
