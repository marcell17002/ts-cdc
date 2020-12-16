import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image } from "react-native";
import { Headers } from "../../components/moleculs";
import { base_url, colors, getData } from "../../utils";
import { Icon, Row } from "native-base";
import { Gap, InputForm, Separator } from "../../components/atoms";
import { ScrollView } from "react-native-gesture-handler";
import Card2 from "../../components/moleculs/Card2";

const Internship = ({ navigation, route }) => {
  const { category } = route.params;
  const [lowongan, setLowongan] = useState([]);
  console.log("lihat semua :", category);

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        getDataLowongan(res.token);
      }
    });
  };
  const getDataLowongan = (token) => {
    axios
      .get(`${base_url}/v1/event/posts/${category}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setLowongan(response.data.data);
        console.log("data loker berhasil diretrives", response.data.data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Headers
          child="isBack"
          title={category}
          onPressBack={() => navigation.goBack()}
        />

        <View style={styles.Card2}>
          <Gap height={20} />
          {lowongan.map((item) => {
            return (
              <>
                <Card2
                  onPress={() => navigation.navigate("LokerDetail", item)}
                  photo={item.image}
                  title={item.tittle}
                />
                <Gap height={20} />
              </>
            );
          })}
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
    </ScrollView>
  );
};

export default Internship;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  subCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
});
