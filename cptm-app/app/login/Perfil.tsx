import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { authService, User } from '@/services/api';

export default function ProfileScreen() {
  const [user, setUser] = useState< User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        if (token === null) {
          Alert.alert('Erro', 'Usuário não autenticado');
          setLoading(false);
          return;
        }
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('@auth_token');
          router.replace('/login/Login');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E30613" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user?.nome || 'Não disponível'}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'Não disponível'}</Text>
      </View>
      <View>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{user?.telefone || 'Não disponível'}</Text>
      </View>
      <View>
        <Text style={styles.label}>Necessidade Especial:</Text>
        <Text style={styles.value}>{user?.necessidadeEspecial
          ? user.necessidadeEspecial.charAt(0).toUpperCase() + user.necessidadeEspecial.slice(1)
          : 'Não disponível'}</Text>
      </View>
      {user?.necessidadeEspecial === 'sim' && (
        <View>
          <Text style={styles.label}>Qual Necessidade:</Text>
          <Text style={styles.value}>{user?.qualNecessidade ? user?.qualNecessidade.charAt(0).toUpperCase() + user.qualNecessidade.slice(1) : 'Não disponível'}</Text>
        </View>
      )}
      <View>
        <Text style={styles.label}>Atendimento na Estação:</Text>
        <Text style={styles.value}>{user?.atendimentoEstacao || 'Não disponível'}</Text>
      </View>
      {/* Botão de Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: '#555'}]}
        onPress={() => router.back()}
      >
        <Text style={styles.logoutText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#E30613',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});