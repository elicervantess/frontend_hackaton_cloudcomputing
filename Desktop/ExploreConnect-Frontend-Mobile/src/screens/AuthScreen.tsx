import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Definir los tipos de las rutas
type RootStackParamList = {
  LOGIN: undefined;
  SIGNUP: undefined;
};

// Tipo para el hook de navegación
type AuthScreenNavigationProp = NavigationProp<RootStackParamList, 'LOGIN'>;

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logooficial.png")}
        style={styles.logo}
        resizeMode="contain" // Ajusta la imagen para que no se corte
      />
      <Image
        source={require("../../assets/images/man.png")}
        style={styles.bannerImage}
        resizeMode="contain" // Ajusta la imagen del banner
      />
      <Text style={styles.title}>Descubre y Vive Nuevas Experiencias</Text>
      <Text style={styles.subTitle}>
        Explora los mejores destinos turísticos urbanos, crea itinerarios personalizados 
        y conecta con los lugares más increíbles de tu ciudad. Planifica, reserva y disfruta sin complicaciones.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 20, // Agregar padding para un mejor ajuste
  },
  logo: {
    height: 80, // Ajusta la altura del logo para que no se corte
    marginBottom: 20, // Agrega espacio debajo del logo
  },
  bannerImage: {
    height: 250,
    width: 231,
    marginBottom: 30, // Espacio debajo del banner
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    color: colors.primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: fonts.Medium,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2, // Borde en el contenedor como en el código antiguo
    borderColor: colors.primary, // Color del borde
    width: "80%",
    height: 60,
    borderRadius: 100, // Mantén el borde redondeado en todo el contenedor
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98, // Mismo estilo de borde redondeado para los botones
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});
