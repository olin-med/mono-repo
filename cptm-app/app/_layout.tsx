// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '@/components/ui/CustomHeader';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Frutiger-Bold': require('@/assets/fonts/FrutigerLTStd-Bold.otf'),
    'Frutiger-Roman': require('@/assets/fonts/FrutigerLTStd-Roman.otf'),
    'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          header: () => <CustomHeader />, // ✅ global header
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true, title: "Menu" }}/>
        
        {/* ❌ disables the header for the login screen */}
        <Stack.Screen
          name="login/Login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>


      <StatusBar style="light" />
    </ThemeProvider>
  );
}
