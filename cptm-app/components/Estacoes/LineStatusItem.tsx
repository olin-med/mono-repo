import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Line = {
  id: string;
  name: string;
  status: 'normal' | 'reduced' | 'stopped';
  color: string;
};

type Props = {
  line: Line;
  onPress?: (line: Line) => void;
};

const statusColor = {
  normal: '#4CAF50',
  reduced: '#FFC107',
  stopped: '#F44336',
};

const statusLabel = {
  normal: 'Operação Normal',
  reduced: 'Operação Reduzida',
  stopped: 'Operação Paralisada',
};

export default function LineStatusItem({ line, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress?.(line)}>
      <View style={[styles.colorBar, { backgroundColor: line.color }]} />
      <Text style={styles.name}>{line.name}</Text>
      <View style={styles.rightContent}>
        <Text style={styles.status}>{statusLabel[line.status]}</Text>
        <View style={[styles.dot, { backgroundColor: statusColor[line.status] }]} />
        <Icon name="chevron-right" size={30} color="#888" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  colorBar: {
    width: 6,
    height: 32,
    marginRight: 12,
    marginLeft: 4,
    borderRadius: 2,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    marginRight: 6,
    color: '#444',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 0,
  },
});
