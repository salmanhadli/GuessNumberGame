import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../util/constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export default ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }

  if (height < 450) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER !</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.jpg")}
          ></Image>
        </View>
        <Text style={{ fontSize: 24, marginBottom: 24 }}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    overflow: "hidden",
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
