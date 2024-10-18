import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://172.20.10.2:8080';

interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

interface RegisterResponse {
  message: string;
}

interface GoogleLoginResponse {
  valid: boolean;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

// Función para iniciar sesión
export const login = async (email: string, password: string): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    await AsyncStorage.setItem('token', response.data.token); 
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    return null; // Devuelve null en caso de error para manejarlo en la UI
  }
};

// Función para registrarse
export const register = async (
  email: string,
  name: string,
  password: string,
  hasPlace: boolean
): Promise<RegisterResponse | null> => {
  const role = hasPlace ? 'OWNER' : 'USER';
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/signin`, {
      email,
      name,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error('Error en register:', error);
    return null;
  }
};

// Función para iniciar sesión con Google
export const loginWithGoogle = async (token: string): Promise<GoogleLoginResponse | null> => {
  try {
    const response = await axios.post<GoogleLoginResponse>(`${API_URL}/auth/google`, { token });
    if (response.data.valid) {
      await AsyncStorage.setItem('token', token); // Guarda el token si es válido
    }
    return response.data;
  } catch (error) {
    console.error('Error en loginWithGoogle:', error);
    return null;
  }
};

// Función para obtener el token almacenado
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    return null;
  }
};

// Función para cerrar sesión
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error al hacer logout:', error);
  }
};