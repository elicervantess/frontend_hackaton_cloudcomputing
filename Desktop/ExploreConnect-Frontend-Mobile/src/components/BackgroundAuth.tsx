// ./src/components/AnimatedBackground.tsx
import React, { useEffect, useMemo } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Svg, { Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  useDerivedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const connectionDistance = 200; // Distancia máxima para conectar dos emojis

// Crear un componente AnimatedLine que permita actualizar las propiedades de la línea en tiempo real
const AnimatedLine = Animated.createAnimatedComponent(Line);

const AnimatedBackground = () => {
  // Lista completa de emojis en Unicode
  const icons = useMemo(
    () => [
      "🏠", "🏖️", "🏔️", "🏙️", "🚗", "✈️", "🚢", "🚆",
      "🏕️", "🗽", "🗼", "🎡", "⛩️", "🕌", "🏰", "🍽️",
      "☕", "🚙", "🏞️", "🗺️", "📍", "🍔", "🍕", "🍣",
      "🍦", "🏨", "🌳", "🚉", "🚁"
    ],
    []
  );

  // Crear posiciones animadas y referencias de conexión
  const iconPositions = icons.map(() => ({
    x: useSharedValue(Math.random() * width),
    y: useSharedValue(Math.random() * height),
  }));

  // Obtener conexiones cercanas como pares de índices
  const connections = useMemo(() => {
    const result = [];
    for (let i = 0; i < iconPositions.length; i++) {
      for (let j = i + 1; j < iconPositions.length; j++) {
        result.push({ from: i, to: j });
      }
    }
    return result;
  }, [iconPositions]);

  // Configurar animación para cada emoji
  useEffect(() => {
    iconPositions.forEach((pos) => {
      pos.x.value = withRepeat(
        withTiming(Math.random() * width, {
          duration: 4000, // Duración aumentada a 10000ms (10 segundos) para movimiento más lento
          easing: Easing.linear,
        }),
        -1,
        true
      );
      pos.y.value = withRepeat(
        withTiming(Math.random() * height, {
          duration: 10000, // Duración aumentada a 10000ms (10 segundos)
          easing: Easing.linear,
        }),
        -1,
        true
      );
    });
  }, []);

  return (
    <View style={styles.background}>
      {/* Dibujar conexiones actualizadas en tiempo real */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        {connections.map(({ from, to }, index) => {
          const fromPosition = iconPositions[from];
          const toPosition = iconPositions[to];

          // Definir propiedades animadas para cada línea
          const animatedProps = useAnimatedProps(() => {
            const dx = fromPosition.x.value - toPosition.x.value;
            const dy = fromPosition.y.value - toPosition.y.value;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance < connectionDistance
              ? {
                  x1: fromPosition.x.value,
                  y1: fromPosition.y.value,
                  x2: toPosition.x.value,
                  y2: toPosition.y.value,
                  opacity: 1,
                }
              : {
                  x1: fromPosition.x.value,
                  y1: fromPosition.y.value,
                  x2: fromPosition.x.value, // Colapsar la línea si está fuera de rango
                  y2: fromPosition.y.value,
                  opacity: 0,
                };
          });

          return (
            <AnimatedLine
              key={index}
              animatedProps={animatedProps}
              stroke="rgba(150, 150, 150, 0.2)"
              strokeWidth="1"
              strokeDasharray="5, 5"
            />
          );
        })}
      </Svg>

      {/* Dibujar emojis animados */}
      {icons.map((icon, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: iconPositions[index].x.value },
            { translateY: iconPositions[index].y.value },
          ],
        }));
        return (
          <Animated.Text
            key={index}
            style={[styles.emoji, animatedStyle]}
          >
            {icon}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E6F3FF",
    zIndex: -1,
  },
  emoji: {
    fontSize: 32,
    position: "absolute",
  },
});

export default AnimatedBackground;
