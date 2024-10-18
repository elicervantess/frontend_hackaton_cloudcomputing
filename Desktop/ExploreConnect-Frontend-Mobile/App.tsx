import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./src/screens/AuthScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen"; // Importa la HomeScreen

// Define los tipos para las rutas
type RootStackParamList = {
  AUTH: undefined;
  LOGIN: undefined;
  SIGNUP: undefined;
  HOME: undefined;  // Añadir la pantalla Home
};

// Crea el stack navigator con rutas tipadas
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantallas en el Stack.Navigator */}
        <Stack.Screen name="AUTH" component={AuthScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={RegisterScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
