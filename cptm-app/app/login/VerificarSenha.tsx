import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { authService } from '@/services/api';

const VerificarCodigo: React.FC = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(34);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (!/^\d$/.test(text) && text !== '') return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerificar = async () => {
    const otp = code.join('');

    if (otp.length !== 6) {
      Alert.alert('Erro', 'Por favor, insira o código completo.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos de senha.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        email,
        otp,
        new_password: newPassword,
      });

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/login'),
        },
      ]);
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      Alert.alert('Erro', 'Código inválido ou senha inválida.');
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
        <Text style={styles.title}>Código Enviado</Text>
        <Text style={styles.description}>
          Por favor, insira o código enviado para o e-mail{' '}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref!)}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <Text style={styles.label}>Nova Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirmar Nova Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme a nova senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerificar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verificar e Redefinir ➔</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.timerText}>Pedir novo código em {timer}s</Text>
      </View>
    </SafeAreaView>
  );
};

export default VerificarCodigo;
