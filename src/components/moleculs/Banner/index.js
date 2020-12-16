import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/Colors";
import { fonts } from "../../../utils/Fonts";
import { Gap } from "../../atoms";
import { Icon } from "native-base";
import { base_url } from "../../../utils";

const Banner = ({ onPress, title, category, date, photo }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bundleBanner}>
        <View style={styles.banner}>
          <View>
            <Image
              source={{
                uri: `${base_url}/${photo}`,
              }}
              style={styles.bannerImage}
            />
          </View>

          <View style={styles.bannerInfo}>
            <Text style={styles.InfoText}>{title}</Text>
            <Gap height={10} />
            <View style={styles.descInfo}>
              <View>
                <Icon
                  type="MaterialIcons"
                  name="info"
                  style={styles.InfoIcon}
                />
              </View>
              <Gap width={8} />
              <View>
                <Text style={styles.descInfoText}>{category}</Text>
              </View>
            </View>

            <View style={styles.descInfo}>
              <View>
                <Icon
                  type="MaterialIcons"
                  name="event"
                  style={styles.InfoIcon}
                />
              </View>
              <Gap width={8} />
              <View>
                <Text style={styles.descInfoText}>{date}</Text>
                <Text style={styles.descInfoText}>19.00-20.00 WIB</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bundleBanner: {
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    elevation: 2,
    marginTop: 15,
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.primaryGrey,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "contain",
  },
  InfoText: {
    fontFamily: fonts.semiBold,
    color: colors.text.secondary,
    fontSize: 16,
    flexWrap: "wrap",
  },
  bannerInfo: {
    marginHorizontal: 12,
    flex: 1,
  },
  descInfo: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  InfoIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  descInfoText: {
    fontSize: 12,
    color: colors.text.info,
  },
});
