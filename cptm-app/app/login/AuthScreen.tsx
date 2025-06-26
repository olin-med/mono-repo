import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { router } from 'expo-router';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Entrar</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login/Cadastro')}
        >
          <Text style={styles.buttonText}>Entrar com Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.buttonText}>Não se Identificar</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('@/assets/images/trem.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E30613',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  logo: {
    width: 60,
    height: 60,
  },
  body: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E30613',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  footerImage: {
    width: '100%',
    height: 180,
    marginTop: 30,
  },
});
