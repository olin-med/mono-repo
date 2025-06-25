import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LineStatusItem from './LineStatusItem';
import { useRouter } from 'expo-router';

type Line = {
  id: string;
  name: string;
  status: 'normal' | 'reduced' | 'stopped';
  color: string;  
};

type GroupProps = {
  group: {
    name: string;
    lines: Line[];
  };
};

const logoMap: Record<string, any> = {
  cptm: require('@/assets/images/cptmLogoSmall.png'),
  metro: require('@/assets/images/Metro-SP_icon.png'),
  viamobilidade: require('@/assets/images/Viamobilidade_icone.svg.png'),
  viaquatro: require('@/assets/images/Viaquatro_icone.svg.png'),
};

export default function TransportGroup({ group }: GroupProps) {
  const router = useRouter();

  const handlePress = (line: Line) => {
    let lineNumber = parseInt(line.id);
    if (lineNumber >= 7) {
      lineNumber -= 1;
    }

    router.push({
      pathname: '/estacao',
      params: {
        lineId: lineNumber.toString(),
        color: line.color,
        name: line.name,
      },
    });
  };

  const normalizedGroupName = group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const logo = logoMap[normalizedGroupName];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {logo && <Image source={logo} style={styles.logo} />}
        <Text style={styles.title}>{group.name}</Text>
      </View>
      {group.lines.map(line => (
        <LineStatusItem key={line.id} line={line} onPress={handlePress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  logo: {
    width: 24,
    height: 24,
  },
});