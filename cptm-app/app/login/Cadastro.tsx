import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { authService } from '../../services/api';
import { router } from 'expo-router';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [necessidadeEspecial, setNecessidadeEspecial] = useState('');
  const [qualNecessidade, setQualNecessidade] = useState('');
  const [atendimentoEstacao, setAtendimentoEstacao] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const validateForm = () => {
    if (!nome || !email || !telefone || !necessidadeEspecial || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    if (email !== confirmarEmail) {
      Alert.alert('Erro', 'Os emails não coincidem');
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (necessidadeEspecial === 'sim' && !qualNecessidade) {
      Alert.alert('Erro', 'Por favor, indique qual necessidade especial');
      return false;
    }

    return true;
  };

  const handleEnviar = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authService.register({
        nome,
        email,
        telefone,
        necessidadeEspecial,
        qualNecessidade: necessidadeEspecial === 'sim' ? qualNecessidade : undefined,
        atendimentoEstacao: necessidadeEspecial === 'sim' ? atendimentoEstacao : undefined,
        senha,
      });

      console.log('Registration response:', response);
      
      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Erro',
        'Não foi possível realizar o cadastro. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>Nome completo: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: João da Silva"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />

        <Text style={styles.label}>Email: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: joao.silva@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Text style={styles.label}>Confirmar email: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: joao.silva@gmail.com"
          keyboardType="email-address"
          value={confirmarEmail}
          onChangeText={setConfirmarEmail}
          editable={!loading}
        />

        <Text style={styles.label}>Telefone: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="11 99999 9999"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
          editable={!loading}
        />

        <Text style={styles.label}>Você possui alguma necessidade especial? <Text style={styles.required}>*</Text></Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={necessidadeEspecial}
            onValueChange={(itemValue) => setNecessidadeEspecial(itemValue)}
            enabled={!loading}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Sim" value="sim" />
            <Picker.Item label="Não" value="nao" />
          </Picker>
        </View>

        {necessidadeEspecial === 'sim' && (
          <>
            <Text style={styles.label}>Se sim, indique qual(is):</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={qualNecessidade}
                onValueChange={(itemValue) => setQualNecessidade(itemValue)}
                enabled={!loading}
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Deficiência Visual" value="visual" />
                <Picker.Item label="Deficiência Auditiva" value="auditiva" />
                <Picker.Item label="Mobilidade Reduzida" value="mobilidade" />
              </Picker>
            </View>

            <Text style={styles.label}>Necessita de atendimento nas estações?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={atendimentoEstacao}
                onValueChange={(itemValue) => setAtendimentoEstacao(itemValue)}
                enabled={!loading}
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Sim" value="sim" />
                <Picker.Item label="Não" value="nao" />
              </Picker>
            </View>
          </>
        )}

        <Text style={styles.label}>Senha: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          editable={!loading}
        />

        <Text style={styles.label}>Confirmar senha: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleEnviar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={() => router.push('/login/Login')}
          disabled={loading}
        >
          <Text>Já possui cadastro? <Text style={styles.loginText}>Entrar</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#D50000',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
    color: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    color: '#333',
    fontWeight: '600',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D50000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginText: {
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
