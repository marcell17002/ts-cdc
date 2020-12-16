import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Headers } from "../../components/moleculs";
import { colors, fonts } from "../../utils";
import { Icon } from "native-base";
import { Gap, Separator } from "../../components/atoms";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const InternDetail = ({ navigation }) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Headers 
        child="isBack"
        title="Internship" 
        onPressBack={() => navigation.goBack()} />
      
      <Gap height={20} />
      <View style={styles.DetailPage}>
        <Image 
          source={require("../../assets/intern.png")}
          style={styles.bigimage}/>
        <Gap height={20} />
        
        <View>
          <Text style={styles.Title}>
          Internship : COSMOGOV Fisip Unpad
          </Text>
          <Gap height={16} />
        
        <View>        
          <Text style={styles.DetailText}>
          Halo, Unpaders!
          </Text>
          <Gap height={10} />  
          <Text style={styles.DetailText}>
          COSMOGOV sedang membuka kesempatan untuk kamu yang mencari pengalaman
          </Text>
          <Gap height={16} />  

          <View>
            <Text style={styles.subTitle}>
                Requirements : 
            </Text>
            <Gap height={16} />
            <Text style={styles.DetailText}>
                1. A growth mindset, pro-active, creative, and systematic thinker
            </Text>  
            <Gap height={8} />
            <Text style={styles.DetailText}>
                2. Proficient in English
            </Text>
            <Gap height={8} />
            <Text style={styles.DetailText}>
                3. Wiling to learn about digital hospitality business and tourism in general
            </Text>
            <Gap height={8} />
            <Text style={styles.DetailText}>
                4. Need to adapt to company’s remote-working system and internal tools
            </Text>
            <Gap height={8} />
            <Text style={styles.DetailText}>
                5. Candidates are courages to prepare an initiative project/research related to their specialisation and hospitality industry in general
            </Text>
            <Gap height={16}/>
          </View>
        </View>
    
      </View>
    </View>

        
      </View>  

  
  </ScrollView>
  );
};

export default InternDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex:1,
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
    fontSize:20,
    color: colors.text.secondary,
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.semiBold,
  }

});
