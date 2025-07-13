// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Image } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Frutiger-Bold': require('@/assets/fonts/FrutigerLTStd-Bold.otf'),
    'Frutiger-Roman': require('@/assets/fonts/FrutigerLTStd-Roman.otf'),
    'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* ✅ Este é o Stack principal que controla TODA a navegação e o header global */}
       <Stack screenOptions={{
        // Define o estilo do header global aqui
        headerStyle: { backgroundColor: '#E2001A' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        // O título é uma imagem por padrão
        headerTitle: () => (
          <Image
            source={require('@/assets/images/logo.png')}
            style={{ width: 32, height: 32, resizeMode: 'contain' }}
          />
        ),
      }}>
        {/* A rota (tabs) usará o header definido acima.
            O botão de voltar não aparecerá aqui porque é a primeira tela do stack. */}
        <Stack.Screen
          name="(tabs)"
          options={{
            // Escondemos o título de texto para mostrar apenas a logo
            headerTitle: () => (
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ width: 32, height: 32, resizeMode: 'contain' }}
              />
            ),
          }}
        />

        {/* A tela de Login não terá header */}
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
