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
        name="file"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="train-subway" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="map-location-dot" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos" // Alert 
        options={{
          title: 'Sos',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="siren" color={color} />,
        }}
      />
    </Tabs>
  );
}
