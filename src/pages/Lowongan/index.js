import { Icon, Right } from "native-base";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { Category, Gap } from "../../components/atoms";
import { Headers } from "../../components/moleculs";
import Card from "../../components/moleculs/Card";
import { base_url, colors, fonts, getData } from "../../utils";

const Lowongan = ({ navigation }) => {
  const [lowongan, setLowongan] = useState([]);
  const [internship, setInternship] = useState([]);
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        getDataLoker(res.token);
        getDataBerita(res.token);
        getDataInternship(res.token);
      }
    });
  };
  const getDataLoker = (token) => {
    axios
      .get(`${base_url}/v1/event/posts/lowongan`, {
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
  const getDataBerita = (token) => {
    axios
      .get(`${base_url}/v1/event/posts/berita`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setBerita(response.data.data);
        console.log("data berita berhasil diretrives", response.data.data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };

  const getDataInternship = (token) => {
    axios
      .get(`${base_url}/v1/event/posts/internship`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setInternship(response.data.data);
        console.log("data internship berhasil diretrives", response.data.data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };

  return (
    <View style={styles.bg}>
      <Headers title="Lowongan" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={15} />

        <View style={styles.bundle}>
          <View style={styles.iconBundle}>
            <Icon type="MaterialIcons" name="search" style={styles.InfoIcon} />
          </View>
          <View>
            <Text style={styles.textBundle}>Cari disini...</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Gap height={20} />
          <View style={styles.subCategory}>
            <Text style={styles.subCategoryTextLeft}>Lowongan Kerja</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Internship", { category: "lowongan" })
              }
            >
              <Text style={styles.subCategoryTextRight}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <View style={styles.scrollCategory}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {lowongan.map((item) => {
                return (
                  <>
                    <Card
                      key={item._id}
                      photo={item.image}
                      title={item.tittle}
                      desc={item.desc}
                      date={item.creeatedAt}
                      desc={item.desc}
                      onPress={() => navigation.navigate("LokerDetail", item)}
                    />
                    <Gap width={20} />
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View style={styles.container}>
          <Gap height={20} />
          <View style={styles.subCategory}>
            <Text style={styles.subCategoryTextLeft}>Internship</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Internship", { category: "internship" })
              }
            >
              <Text style={styles.subCategoryTextRight}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <View style={styles.scrollCategory}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {internship.map((item) => {
                return (
                  <>
                    <Card
                      key={item._id}
                      title={item.tittle}
                      photo={item.image}
                      desc={item.desc}
                      date={item.creeatedAt}
                      desc={item.desc}
                      onPress={() => navigation.navigate("LokerDetail", item)}
                    />
                    <Gap width={20} />
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View style={styles.container}>
          <Gap height={20} />
          <View style={styles.subCategory}>
            <Text style={styles.subCategoryTextLeft}>Berita</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Internship", { category: "berita" })
              }
            >
              <Text style={styles.subCategoryTextRight}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <Gap height={20} />
          <View style={styles.scrollCategory}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {berita.map((item) => {
                return (
                  <>
                    <Card
                      key={item._id}
                      title={item.tittle}
                      photo={item.image}
                      desc={item.desc}
                      date={item.creeatedAt}
                      desc={item.desc}
                      onPress={() => navigation.navigate("LokerDetail", item)}
                    />
                    <Gap width={20} />
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Lowongan;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  container: {
    marginHorizontal: 12,
  },
  subCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subCategoryTextLeft: {
    fontSize: 20,
    fontFamily: fonts.reguler,
    color: colors.text.subTitle,
  },
  subCategoryTextRight: {
    fontSize: 16,
    fontFamily: fonts.reguler,
    color: colors.text.info,
  },
  scrollCategory: {
    flexDirection: "row",
    height: 202,
  },
  bundle: {
    height: 40,
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 20,
  },
  iconBundle: {
    marginLeft: 16,
    marginRight: 12,
    color: colors.primaryGrey,
  },
  textBundle: {
    fontFamily: fonts.reguler,
    color: colors.text.info,
    fontSize: 14,
    flexWrap: "wrap",
  },
});
