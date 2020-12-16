import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "../../atoms";

const InputChat = ({ value, onChangeText, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <Button label="Send" onPress={onButtonPress} />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  container: { padding: 16, flexDirection: "row", backgroundColor: "grey" },
  input: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    maxHeight: 45,
  },
});
