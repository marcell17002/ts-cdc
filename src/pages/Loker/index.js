import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Headers } from "../../components/moleculs";
import { colors } from "../../utils";
import { Icon, Row } from "native-base";
import { Gap, InputForm, Separator } from "../../components/atoms";
import { ScrollView } from "react-native-gesture-handler";
import Card2 from "../../components/moleculs/Card2";

const Loker = ({ navigation }) => {
  return (
    <ScrollView>
        <View style={styles.container}>
        <Headers
          child="isBack"
          title="Lowongan Kerja"
          onPressBack={() => navigation.goBack()}        
        />
      
      <View style={styles.Card2}>
        <Gap height={20} />
        <View style={styles.subCategory}>
            <Card2 onPress={() => navigation.replace("LokerDetail")}/>
            <Card2 onPress={() => navigation.replace("LokerDetail")}/>
        </View>
        <Gap height={20} />
        <View style={styles.subCategory}>
            <Card2 />
            <Card2 />
        </View>
        <Gap height={20} />
        <View style={styles.subCategory}>
            <Card2 />
            <Card2 />
        </View>
        <Gap height={20} />
        <View style={styles.subCategory}>
            <Card2 />
            <Card2 />
        </View>        
      </View>
    </View>
    </ScrollView>
  );
};

export default Loker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  Card: {
      
  },
  subCategory: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 16,
  },

});
