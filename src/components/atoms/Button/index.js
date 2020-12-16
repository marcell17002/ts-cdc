import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../utils";

const Button = ({ label, onPress, isWide, likeBg, secondary }) => {
  const SecButton = () => {
    if (likeBg)
      return (
        <TouchableOpacity style={styles.secButton} onPress={onPress}>
          <Text style={styles.text(secondary)}>{label}</Text>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity
        style={styles.container(isWide, secondary)}
        onPress={onPress}
      >
        <Text style={styles.text(secondary)}>{label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SecButton />
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (isWide, secondary) => ({
    paddingVertical: 10,
    backgroundColor: secondary ? colors.primaryWhite : colors.primaryBlue,
    borderRadius: 50,
    marginHorizontal: isWide ? "-40%" : 70,
  }),
  text: (secondary) => ({
    textAlign: "center",
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: secondary ? colors.primary : colors.text.title,
    paddingVertical: 5,
  }),
  secButton: {
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginHorizontal: "-40%",
  },
});
