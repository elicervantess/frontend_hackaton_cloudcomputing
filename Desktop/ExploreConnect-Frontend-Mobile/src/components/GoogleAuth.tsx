import React, { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const clientID = '673871409745-bh4iec9sd4f6rl5fa8vshguko8t59bph.apps.googleusercontent.com';

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: clientID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      authenticateWithBackend(authentication?.accessToken);
    }
  }, [response]);

  const authenticateWithBackend = async (token: string | undefined) => {
    if (token) {
      try {
        const res = await fetch('http://172.20.10.2:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Backend response:', data);

          if (data.valid) {
            setUser(data.user);
            setLoggedIn(true);
            navigation.navigate('HomeScreen' as never);
          } else {
            Alert.alert('Token inválido');
          }
        } else {
          Alert.alert('Error al validar con el backend');
        }
      } catch (error) {
        console.error('Error en la solicitud al backend:', error);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Image source={{ uri: user.picture }} style={styles.profileImage} />
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Botón de Google personalizado */}
      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image
          source={require('../../assets/images/google-icon.png')} // Ruta local del logotipo
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  googleButton: {
    width: '115%',  // Ancho igual al botón de "Iniciar sesión"
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alineación centrada del texto e ícono
    backgroundColor: '#fff',
    borderWidth: 1.5, // Borde ligeramente más grueso
    borderColor: '#888', // Color de borde más oscuro
    borderRadius: 25, // Forma ovalada
    paddingVertical: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 17,
    color: '#444',
    fontFamily: 'Roboto', // O usa otra fuente que se asemeje a Google
    fontWeight: '500', // Ajuste del grosor de la fuente
  },
  logoutButton: {
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoogleAuth;
