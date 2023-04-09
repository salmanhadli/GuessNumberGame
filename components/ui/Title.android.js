import { Platform, StyleSheet, Text } from "react-native";

export default ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "white",
    borderRadius: 8,
    padding: 12,
  },
});
