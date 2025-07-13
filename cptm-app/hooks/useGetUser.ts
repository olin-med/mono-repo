import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService, User } from "@/services/api";

export function useGetUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('@auth_token');
                if (!token) {
                    setError('Usuário não autenticado');
                    setUser(null);
                    return;
                }
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (err) {
                setError('Não foi possível carregar o perfil.');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return { user, loading, error };
}