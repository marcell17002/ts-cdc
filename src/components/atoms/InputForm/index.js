import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { colors, fonts } from "../../../utils";
import Gap from "../Gap";

const InputForm = ({ title, placeHolder, value, onChangeText, secure }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Gap height={10} />
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    color: colors.text.secondary,
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  textInput: {
    backgroundColor: colors.input.secondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.input.primary,
    paddingLeft: 10,
  },
});
