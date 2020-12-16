import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const Input = ({ label, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "green",
  },
});
