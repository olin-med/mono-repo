import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

// import Arrow from '../../assets/icons/arrow.svg';

interface Props {
  label: string;
  route: string;
  children?: React.ReactNode;
}

export const MenuItem = ({ label, route, children }: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(route as any)}>
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
