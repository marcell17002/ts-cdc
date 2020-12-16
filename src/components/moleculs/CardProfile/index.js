import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "native-base";
import { colors, fonts } from "../../../utils";

const CardProfile = ({ label, iconName }) => {
  return (
    <View style={styles.cardProfile}>
      <View>
        <Icon type="Ionicons" name={iconName} style={styles.icon} />
      </View>
      <View style={styles.textBundle}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  cardProfile: {
    flexDirection: "row",
    marginTop: 20,
  },
  icon: {
    fontSize: 20,
    color: colors.primary,
  },
  textBundle: {
    marginLeft: 15,
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.reguler,
    color: colors.text.secondary,
  },
});
