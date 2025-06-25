import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificarCodigo: React.FC = () => {
  const navigation = useNavigation();

  const [code, setCode] = useState(['', '', '', '', '', '']);
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

  const handleVerificar = () => {
    console.log('Código verificado:', code.join(''));
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
          Por favor, insira o código de 6 números enviado para o e-mail {' '}
          <Text style={styles.email}>ia********ad@gmail.com</Text> para resetar sua senha.
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

        <TouchableOpacity style={styles.button} onPress={handleVerificar}>
          <Text style={styles.buttonText}>Verificar ➔</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resendText}>
            Não recebeu o código?{'\n'}
            <Text style={styles.boldText}>Reenviando novamente</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.timerText}>Pedir novo código em {timer}s</Text>
      </View>
    </SafeAreaView>
  );
};

export default VerificarCodigo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#D50000',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
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
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  email: {
    fontWeight: 'bold',
    color: '#D50000',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 55,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#F2F2F2',
  },
  button: {
    backgroundColor: '#D50000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resendText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  timerText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#999',
    fontSize: 12,
  },
});
