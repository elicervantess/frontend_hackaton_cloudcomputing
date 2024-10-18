import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { register } from '../api'; // Importar la función de la API

// Definir los tipos de las rutas
type RootStackParamList = {
  LOGIN: undefined;
  SIGNUP: undefined;
  HOME: undefined;
};

type SignupScreenNavigationProp = NavigationProp<RootStackParamList, 'SIGNUP'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false); // Estado para el toggle de "Tienes un lugar para rentar?"
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleRegister = async () => {
    if (!email || !name || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    
    const response = await register(email, name, password, isOwner);

    if (response) {
      navigation.navigate('HOME');
    } else {
      alert('Error en el registro. Inténtalo de nuevo.');
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Comienza</Text>
        <Text style={styles.headingText}>tu aventura</Text>
      </View>

      {/* form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email} 
            onChangeText={setEmail} 
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"user"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Nombre Completo"
            placeholderTextColor={colors.secondary}
            value={name} 
            onChangeText={setName} 
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password} 
            onChangeText={setPassword} 
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar contraseña"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
          />
        </View>

        {/* Toggle para "Tienes un lugar para rentar?" */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Tienes un lugar para rentar?</Text>
          <Switch
            value={isOwner}
            onValueChange={(value) => setIsOwner(value)}
            thumbColor={isOwner ? colors.primary : colors.gray}
            trackColor={{ false: colors.gray, true: colors.primary }}
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButtonWrapper} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.loginText}> Registrarse</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.continueText}>o continuar con</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../../assets/images/google-icon.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Registrarse con Google</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Si ya tienes una cuenta!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.signupText, { textDecorationLine: 'underline' }]}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrar contenido verticalmente
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 20,
  },
  textContainer: {
    marginVertical: 20,
    alignItems: "flex-start", // Alinear los textos a la izquierda
    width: "100%", // Ocupa todo el ancho disponible
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    textAlign: "left",
  },
  formContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%", // Hacer que el contenedor del formulario ocupe todo el ancho
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 30, // Aumentar el padding horizontal
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10, // Aumentar el padding vertical para hacer los campos más gruesos
    marginVertical: 10,
    width: "100%", // Inputs más anchos
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    padding: 15, // Aumentar el padding del botón
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    width: "100%",
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
});
