import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Headers } from "../../components/moleculs";
import { base_url, colors, fonts } from "../../utils";
import { Icon } from "native-base";
import { Gap, Separator } from "../../components/atoms";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const LokerDetail = ({ navigation, route }) => {
  const data = route.params;
  return (
    <View style={styles.container}>
      <Headers
        child="isBack"
        title="Lowongan Kerja"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={20} />
        <View style={styles.DetailPage}>
          <Image
            source={{
              uri: `${base_url}/${data.image}`,
            }}
            style={styles.bigimage}
          />
          <Gap height={20} />

          <View>
            <Text style={styles.Title}>Loker : {data.tittle}</Text>
            <Gap height={16} />

            <View>
              <Text style={styles.DetailText}>category: {data.category}</Text>
              <Gap height={10} />
              <Text style={styles.DetailText}>{data.desc}</Text>
              <Gap height={16} />

              {/* <View>
                <Text style={styles.subTitle}>Job Description :</Text>
                <Gap height={16} />
                <Text style={styles.DetailText}>
                  1. Mapping the potential market to increase company business
                </Text>
                <Gap height={8} />
                <Text style={styles.DetailText}>
                  2. Self sevice to preospective customers
                </Text>
                <Gap height={8} />
                <Text style={styles.DetailText}>
                  3. Make contact and develop good rapport with customer
                </Text>
                <Gap height={8} />
                <Text style={styles.DetailText}>
                  4. Maintain records of customer activity and follow up in
                  resolving
                </Text>
                <Gap height={8} />
                <Text style={styles.DetailText}>
                  5. Exercise good judgement in the administration of optional
                  pricing programs
                </Text>
                <Gap height={16} />
              </View> */}
            </View>

            <View>
              <Text style={styles.subTitle}>{data.author}</Text>
              <Gap height={16} />

              {/* <Text style={styles.DetailText}>1. Maximum 27 years old</Text>
              <Gap height={8} />
              <Text style={styles.DetailText}>
                2. Candidate must posses at least Bachelor’s Degree in any field
              </Text>
              <Gap height={8} />
              <Text style={styles.DetailText}>
                3. Fresh Graduates or must have a hands on experiences logistic
                and transportation max 2 years
              </Text>
              <Gap height={8} />
              <Text style={styles.DetailText}>
                4. Able to communicate effectively in English both verbal and
                written
              </Text> */}
              <Gap height={8} />
              <Gap height={40} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LokerDetail;

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
  subTitle: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.semiBold,
  },
});
