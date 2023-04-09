import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Colors from "../util/constants/colors";
import { FlatList, useWindowDimensions } from "react-native";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumberBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum === exclude
    ? generateRandomNumberBetween(min, max, exclude)
    : rndNum;
}

let min = 1;
let max = 100;

export default function GameScreen({ chosenNumber, onGameOver }) {
  const initGuess = generateRandomNumberBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [guessRounds, setGuessRounds] = useState([initGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, chosenNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (direction === "lower") {
      if (currentGuess < chosenNumber) {
        Alert.alert("Don't lie", "", [{ text: "Sorry!", style: "cancel" }]);
        return;
      }
      max = currentGuess;
    } else if (direction === "greater") {
      if (currentGuess > chosenNumber) {
        Alert.alert("Don't lie", "", [{ text: "Sorry!", style: "cancel" }]);
        return;
      }
      min = currentGuess + 1;
    }
    const newNumber = generateRandomNumberBetween(min, max, currentGuess);
    setCurrentGuess(newNumber);
    setGuessRounds((prev) => [newNumber, ...prev]);
  }

  const guessRoundLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={{ marginBottom: 12 }}>
          Higher or lower ?
        </InstructionText>
        <View style={{ flexDirection: "row" }}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <AntDesign name="pluscircle" size={24} color={Colors.accent500} />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Entypo
              name="circle-with-minus"
              size={24}
              color={Colors.accent500}
            />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        {/* <InstructionText style={{ marginBottom: 12 }}>
          Higher or lower ?
        </InstructionText> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <AntDesign name="pluscircle" size={24} color={Colors.accent500} />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Entypo
              name="circle-with-minus"
              size={24}
              color={Colors.accent500}
            />
          </PrimaryButton>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guess) => (
          <Text key={guess}>{guess}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem roundNumber={guessRoundLength - index} guess={item} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    // padding: 16,
  },
});
