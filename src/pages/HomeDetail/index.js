import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Headers } from "../../components/moleculs";
import { base_url, colors, fonts } from "../../utils";
import { Icon } from "native-base";
import { Gap, Separator } from "../../components/atoms";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const HomeDetail = ({ navigation, route }) => {
  const dataEvent = route.params;
  console.log("isi data event :", dataEvent);
  return (
    <View style={styles.container}>
      <Headers
        child="isBack"
        title={dataEvent.tittle}
        onPressBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={20} />
        <View style={styles.DetailPage}>
          <Image
            source={{
              uri: `${base_url}/${dataEvent.image}`,
            }}
            style={styles.bigimage}
          />
          <Gap height={20} />

          <View>
            <Text style={styles.Title}>{dataEvent.tittle}</Text>

            <Gap height={20} />
            <View>
              <View style={styles.descInfo}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View>
                    <Icon
                      type="MaterialIcons"
                      name="info"
                      style={styles.InfoIcon}
                    />
                  </View>
                  <Gap width={8} />
                  <View>
                    <Text style={styles.descInfoText}>
                      {dataEvent.category}
                    </Text>
                  </View>
                </ScrollView>
              </View>

              <Gap height={6} />
              <View style={styles.descInfo}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View>
                    <Icon
                      type="MaterialIcons"
                      name="event"
                      style={styles.InfoIcon}
                    />
                  </View>
                  <Gap width={8} />
                  <View>
                    <Text style={styles.descInfoText}>
                      {dataEvent.createdAt}
                    </Text>
                  </View>
                </ScrollView>
              </View>

              <Gap height={20} />
              <Text style={styles.DetailText}>{dataEvent.desc}</Text>
              <Gap height={10} />
              {/* <Text style={styles.DetailText}>
                Webinar ini GRATIS! Dapatkan materi menarik serta sertifikat
                dari Theta Statistical Consulting.
              </Text>
              <Gap height={10} />
              <Text style={styles.DetailText}>
                Jumlah peserta terbatas! Daftarkan dirimu melalui link di bawah
                ini:
              </Text>
              <Gap height={10} />
              <Text style={styles.DetailText}>
                bit.ly/form_pendaftaran_forecasting
              </Text> */}
              <Gap height={40} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  bigimage: {
    width: 360,
    height: 360,
    borderRadius: 10,
    resizeMode: "contain",
  },
  InfoIcon: {
    fontSize: 28,
    color: colors.primary,
  },
  descInfoText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.medium,
  },
  DetailText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: fonts.medium,
  },
  DetailPage: {
    marginHorizontal: 16,
  },
  Title: {
    fontSize: 20,
    color: colors.text.secondary,
    fontFamily: fonts.semiBold,
  },
});
