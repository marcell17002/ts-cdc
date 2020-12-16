import { Icon } from "native-base";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/Colors";
import { fonts } from "../../../utils/Fonts";

const Headers = ({
  child,
  title,
  onPressBack,
  onPressSave,
  onPressNext,
  onPressLogOut,
  iconName,
}) => {
  const Head = () => {
    if (child === "isBack") {
      return (
        <View style={styles.headerBack}>
          <View style={styles.position}>
            <TouchableOpacity onPress={onPressBack}>
              <Icon name="arrow-back" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBack}>
            <Text style={styles.text}>{title} </Text>
          </View>
        </View>
      );
    }
    if (child === "isSave") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.text}>{title} </Text>
          </View>
          <TouchableOpacity onPress={onPressSave}>
            <Icon name="checkmark" style={styles.icon} />
          </TouchableOpacity>
        </View>
      );
    }
    if (child === "logOut") {
      return (
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-back" style={styles.icon_logout} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.text}>{title} </Text>
          </View>
          <TouchableOpacity onPress={onPressLogOut}>
            <Icon name="log-out" style={styles.icon} />
          </TouchableOpacity>
        </View>
      );
    }
    if (child === "custom") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.text}>{title} </Text>
          </View>
          <TouchableOpacity onPress={onPressNext}>
            <Icon name={iconName} style={styles.icon} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.headerBack}>
        <View style={styles.titleBack}>
          <Text style={styles.text}>{title} </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Head />
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  position: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerBack: {
    height: 72,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    fontSize: 34,
    color: colors.text.title,
    marginHorizontal: 16,
  },
  icon_logout: {
    fontSize: 34,
    color: colors.primary,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: colors.text.title,
    textAlign: "center",
  },
  title: {
    flex: 1,
  },
  titleBack: {
    position: "absolute",
    flex: 1,
    alignSelf: "center",
    marginVertical: "5%",
  },
});
