import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartScreenGame from "./screens/StartScreenGame";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import { useEffect, useState } from "react";
import Colors from "./util/constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  useEffect(() => {
    async function prepare() {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
    prepare();
  }, []);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };
  const gameOverHandler = () => {
    setGameOver(true);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };
  let screen = <StartScreenGame setUserNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen chosenNumber={userNumber} onGameOver={gameOverHandler} />
    );
    if (gameOver) {
      screen = (
        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onStartNewGame={startNewGameHandler}
        />
      );
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={{ opacity: 0.15 }}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
