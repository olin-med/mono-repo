import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Footer from '../../components/Login/Footer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding2'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>CPTM</Text>
        <Text style={styles.subtitle}>
          Utilize o Aplicativo da CPTM para encontrar rotas, consultar situação das linhas, e muito mais!
        </Text>
        <Image source={require('@/assets/images/logo.png')} style={styles.govLogo} resizeMode="contain" />
      </View>

      <Footer
        onPress={() => navigation.navigate('AuthScreen')}
        activeIndex={1}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

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
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
  govLogo: {
    width: 100,
    height: 40,
    marginTop: 20,
  },
});
