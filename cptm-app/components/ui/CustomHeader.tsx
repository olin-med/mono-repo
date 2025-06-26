import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Image
          source={require('@/assets/icons/logo.png')} // <- replace with your actual path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E2001A',
  },
  inner: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
});
