import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../util/constants/colors";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary800,
    marginTop: deviceWidth < 380 ? 25 : 50,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
});
