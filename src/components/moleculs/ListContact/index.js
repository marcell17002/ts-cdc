import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { fonts, colors } from "../../../utils";

const ListContact = ({
  onPressProfile,
  onPressChat,
  name,
  profession,
  photo,
}) => {
  return (
    <View style={styles.contact}>
      <TouchableOpacity onPress={onPressProfile}>
        <Image source={{ uri: photo }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.info} onPress={onPressChat}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textProfesion}>{profession}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListContact;

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    marginBottom: 15,
  },
  image: {
    resizeMode: "contain",
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  info: {
    marginLeft: 15,
  },
  textName: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    color: colors.text.secondary,
  },
  textProfesion: {
    fontSize: 13,
    fontFamily: fonts.reguler,
    color: colors.text.secondary,
  },
});
