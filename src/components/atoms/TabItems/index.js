import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { colors } from "../../../utils/Colors";

const TabItems = ({ title, active, onLongPress, onPress }) => {
  const IconMenu = () => {
    if (title === "Home") {
      return (
        <Icon
          type="MaterialIcons"
          name="home"
          style={styles.iconStyle(active)}
        />
      );
    }
    if (title === "Lowongan") {
      return (
        <Icon
          type="MaterialIcons"
          name="work"
          style={styles.iconStyle(active)}
        />
      );
    }
    if (title === "Konsultasi") {
      return (
        <Icon
          type="MaterialIcons"
          name="chat"
          style={styles.iconStyle(active)}
        />
      );
    }
    if (title === "Akun") {
      return (
        <Icon
          type="MaterialIcons"
          name="person"
          style={styles.iconStyle(active)}
        />
      );
    }
    return (
      <Icon type="MaterialIcons" name="home" style={styles.iconStyle(active)} />
    );
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <IconMenu />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconStyle: (active) => ({
    fontSize: 25,
    color: active ? colors.text.primary : colors.text.inactive,
  }),
  text: (active) => ({
    color: active ? colors.text.active : colors.text.inactive,
    fontFamily: "SFProText-Medium",
  }),
});
