import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { authService, User } from '@/services/api';
import { useGetUser } from '@/hooks/useGetUser';
import { goBack } from 'expo-router/build/global-state/routing';

export default function ProfileScreen() {
  const { user, loading, error } = useGetUser();

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
  
  if (error){
    return (
      //Alert with error
      Alert.alert("Erro", error, [
        {
          text: 'Voltar',
          style: 'cancel',
          onPress: () => router.replace('/(tabs)/menu')
        }
      ])
    )
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