import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D50000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 60,
    height: 60,
  },
});
