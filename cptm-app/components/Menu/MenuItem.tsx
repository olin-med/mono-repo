import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { routes } from '@/constants/Route';
import * as Linking from 'expo-linking';
// import Arrow from '@/assets/images/icons/arrow.svg';

interface Props {
  label: string;
  route: keyof typeof routes | string;
  children?: React.ReactNode;
}

export const MenuItem = ({ label, route, children }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    if (typeof route === 'string' && route.startsWith('http')) {
      // Open external link
      Linking.openURL(route).catch(err =>
      console.error("Failed to open URL:", err)
    );
    } else if (typeof route === 'string' && routes[route as keyof typeof routes]) {
      // Internal navigation using route as key
      const url = routes[route as keyof typeof routes];
      router.push(url);
    }
  };

  if (typeof route === 'string' && route.startsWith('http')) {
    return (
      <Pressable onPress={handlePress}>
        <View style={styles.item}>
          {children}
          <Text style={styles.label}>{label}</Text>
          {/* <Arrow width={24} height={24} /> */}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.item}>
        {children}
        <Text style={styles.label}>{label}</Text>
        {/* <Arrow width={24} height={24} /> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
  },
});
