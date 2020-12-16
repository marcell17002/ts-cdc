import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { base_url } from "../../../utils";
import { colors } from "../../../utils/Colors";
import { fonts } from "../../../utils/Fonts";
import { Gap } from "../../atoms";

const Card2 = ({ onPress, photo, title }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.subCard}>
          <Image
            source={{
              uri: `${base_url}/${photo}`,
            }}
            style={styles.image}
          />
          <Gap height={10} />
          <Text style={styles.cardText}> {title} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card2;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "yellow",
    width: 172,
    height: 227,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    elevation: 5,
  },
  subCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  image: {
    width: 148,
    height: 148,
    borderRadius: 10,
    resizeMode: "contain",
  },
  cardText: {
    color: colors.text.secondary,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
});
