import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { routes } from '@/constants/Route';

// import Arrow from '@/assets/images/icons/arrow.svg';

interface Props {
  label: string;
  route: keyof typeof routes;
  children?: React.ReactNode;
}

export const MenuItem = ({ label, route, children }: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(routes[route])}>
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
