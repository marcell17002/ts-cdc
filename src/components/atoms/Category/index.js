import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/Colors";

const Category = ({ label, onPress, active }) => {
  return (
    <TouchableOpacity style={styles.container(active)} onPress={onPress}>
      <Text style={styles.text(active)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: (active) => ({
    backgroundColor: active ? colors.primaryBlue : colors.primaryWhite,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: active ? 0 : 1,
    borderColor: active ? null : colors.primaryBlue,
    marginLeft: 15,
  }),
  text: (active) => ({
    textAlign: "center",
    fontSize: 16,
    color: active ? colors.text.title : colors.text.primary,
  }),
});
