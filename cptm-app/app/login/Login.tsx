import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/api';
import { router } from 'expo-router';          // ← the only nav helper you need

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);

      const { access_token } = await authService.login({ email, password });
      await AsyncStorage.setItem('@auth_token', access_token);

      // move to the main area of the app
      router.replace('/menu');                // use replace so user can’t go “back” to login
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert(
        'Erro',
        'Não foi possível fazer login. Verifique suas credenciais e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.wave} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Entrar</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o seu email"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira a senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          onPress={() => router.push('/login/RecuperarSenha')}
          disabled={loading}
        >
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Não possui cadastro?</Text>
          <TouchableOpacity
            onPress={() => router.push('/login/Cadastro')}
            disabled={loading}
          >
            <Text style={styles.footerLink}> Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.bottomButton, loading && styles.buttonDisabled]}
        onPress={() => router.push('/login/AuthScreen')}
        disabled={loading}
      >
        <Text style={styles.bottomButtonText}>Entrar sem Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E30613',
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  wave: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  linkText: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'right',
    color: '#777',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#E30613',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#333',
  },
  footerLink: {
    color: '#E30613',
    fontWeight: 'bold',
  },
  bottomButton: {
    backgroundColor: '#E30613',
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
