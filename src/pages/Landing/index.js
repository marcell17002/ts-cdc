import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Gap } from "../../components/atoms";
import { colors, fonts } from "../../utils";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Image
          source={require("../../assets/logo_app.png")}
          style={StyleSheet.image}
        />
      </View>
      <View style={styles.second}>
        <Text style={styles.titleHeader}>Grow up your career</Text>
      </View>
      <View style={styles.third}>
        <Button
          label="Daftar"
          isWide
          secondary
          onPress={() => navigation.navigate("Register")}
        />
        <Gap height={10} />
        <Button
          label="Masuk"
          isWide
          likeBg
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 218,
    height: 88,
  },
  titleHeader: {
    fontSize: 32,
    fontFamily: fonts.semiBold,
    color: colors.text.title,
    textAlign: "center",
  },
  first: {
    flex: 1,
    marginTop: 40,
  },
  second: {
    flex: 3,
    marginHorizontal: 50,
    justifyContent: "center",
  },
  third: {
    flex: 2,
  },
});
