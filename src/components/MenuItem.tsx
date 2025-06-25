// src/components/MenuItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useRouter } from 'expo-router';

import Arrow from '../../assets/icons/arrow.svg'; // ícone de seta

interface Props {
  icon: React.FC<SvgProps>;
  label: string;
  route: string; // ✅ nova prop: rota de destino
}

export const MenuItem = ({ icon: Icon, label, route }: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(route)}>
      <View style={styles.item}>
        <Icon width={24} height={24} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
        <Arrow width={24} height={24} />
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
