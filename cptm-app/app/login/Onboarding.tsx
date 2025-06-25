import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import HeaderLogo from '../../components/Login/HeaderLogo';
import Footer from '../../components/Login/Footer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding1'>;

const Onboarding: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBackground}>
        <HeaderLogo />
      </View>

      <Image source={require('@/assets/images/trem.png')} style={styles.tremImage} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.title}>CPTM</Text>
        <Text style={styles.subtitle}>A CPTM na palma da sua mão.</Text>
        <Image source={require('@/assets/images/logo.png')} style={styles.govLogo} resizeMode="contain" />
      </View>

      <Footer onPress={() => navigation.navigate('Onboarding2')} activeIndex={0} />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBackground: {
    backgroundColor: '#E30613',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  tremImage: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginTop: -40,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 30,
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
