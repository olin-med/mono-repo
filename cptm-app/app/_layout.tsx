// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Image } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from '@/components/ui/CustomHeader';

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
          header: () => <CustomHeader />,
      }}>
        {/* A rota (tabs) usará o header definido acima.
            O botão de voltar não aparecerá aqui porque é a primeira tela do stack. */}
        <Stack.Screen
          name="(tabs)"
          options={{
            // Escondemos o título de texto para mostrar apenas a logo
          }}
        />

        {/* A tela de Login não terá header */}
        <Stack.Screen
          name="login/Login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/Cadastro"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/NovaSenha"
          options={{
            headerShown: false,
          }}
        />  
        <Stack.Screen
          name="login/AuthScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/Perfil"
          options={{
            headerShown: true,
          }}/>

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
