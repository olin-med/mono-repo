import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { authService } from '@/services/api';

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviarCodigo = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira o email.');
      return;
    }

    try {
      setLoading(true);
      await authService.requestPasswordRecovery({ email });

      Alert.alert('Sucesso', 'Código de recuperação enviado para o email.');

      // Redirect to VerificarSenha, passing the email (use useLocalSearchParams on the target screen)
      router.push({
        pathname: '/login/VerificarSenha',
        params: { email },
      });
    } catch (error) {
      console.error('Erro ao enviar código de recuperação:', error);
      Alert.alert('Erro', 'Não foi possível enviar o código. Verifique o email e tente novamente.');
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

      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o email registrado"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleEnviarCodigo}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Enviando...' : 'Enviar código ➔'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarSenha;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#D50000',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
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
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 30,
  },
  label: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#D50000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
