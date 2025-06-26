import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E2001A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingTop: 4,
          backgroundColor: '#FFFFFF',
          height: Platform.OS === 'android' ? 64 : 80,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          // Android shadow
          elevation: 2,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href:null,
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="train" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statusStation" // Alert 
        options={{
          title: 'Status da Estação',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="map-location-dot" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos" 
        options={{
          title: 'Sos',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu/faleConosco" 
        options={{
          title: 'Fale Conosco',
          href: null,
        }}
      />
      <Tabs.Screen
        name="menu/missaoValores" 
        options={{
          href: null,
          title: 'Sos',
        }}
      />
      <Tabs.Screen
        name="menu/tarifas" 
        options={{
          title: 'Sos',
          href: null,
        }}
      />
      <Tabs.Screen
        name="menu/termosdeuso" 
        options={{
          title: 'Sos',
          href: null,
        }}
      />  
       <Tabs.Screen
        name="Estacoes"
        options={{
          title: 'Estacoes',
          href:null,
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="bars" color={color} />,
        }}
      />
    </Tabs>
  );
}
