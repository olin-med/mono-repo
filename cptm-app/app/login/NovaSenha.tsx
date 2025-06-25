import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NovaSenhaScreen: React.FC = () => {
  const navigation = useNavigation();
  const [novaSenha, setNovaSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const handleRedefinirSenha = () => {
    if (novaSenha !== repetirSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.wave} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Nova Senha</Text>

        <Text style={styles.label}>Nova senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Insira uma nova senha"
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        <Text style={styles.label}>Repetir senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Repita a nova senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha}>
          <Text style={styles.buttonText}>Redefinir senha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NovaSenhaScreen;

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
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#F2F2F2',
  },
  button: {
    backgroundColor: '#D50000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
