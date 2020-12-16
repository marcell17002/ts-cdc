import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image } from "react-native";
import { Category, Gap, Input } from "../../components/atoms";
import { colors } from "../../utils/Colors";
import { fonts } from "../../utils/Fonts";
import { ScrollView } from "react-native-gesture-handler";
import Banner from "../../components/moleculs/Banner";
import { base_url, getData } from "../../utils";

const Home = ({ navigation }) => {
  const [event, setEvent] = useState([]);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        getEvent(res.token);
        getProfile(res.token, res.id);
      }
    });
  };
  const getEvent = (token) => {
    axios
      .get(`${base_url}/v1/event/posts`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setEvent(response.data.data);
        console.log("data berhasil diretrive ", response.data.data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  const getProfile = (token, id) => {
    axios
      .get(`${base_url}/v1/auth/user/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data.data);
        console.log("data profile diretrive ", response.data.data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  return (
    <ScrollView>
      <View style={styles.bg}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.subHeaderContent}>
              <Text style={styles.headerText}>
                Hello, {"\n"}
                {profile.name}
              </Text>
            </View>
            <View>
              <Image
                source={require("../../assets/logo_app.png")}
                style={styles.headerImage}
              />
            </View>
          </View>
        </View>
        {/* <Gap height={20} />
        <View style={styles.filtering}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Category label="Semua" active />
            <Category label="Soft Skill" />
            <Category label="Hard Skill" />
            <Category label="Seminar" />
            <Category label="Seminar" />
            <Category label="Seminar" />
          </ScrollView>
        </View> */}

        <View style={styles.container}>
          <View>
            {event.map((item) => {
              return (
                <Banner
                  key={item.id}
                  photo={item.image}
                  title={item.tittle}
                  category={item.category}
                  date={item.createdAt}
                  onPress={() => navigation.navigate("HomeDetail", item)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
  },
  header: {
    height: 150,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginHorizontal: 16,
    marginVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeaderContent: {
    maxWidth: "40%",
  },
  headerText: {
    color: colors.text.title,
    fontFamily: fonts.semiBold,
    flexWrap: "wrap",
    flex: 1,
    fontSize: 24,
  },
  headerImage: {
    width: 218,
    height: 88,
  },
  filtering: {
    flexDirection: "row",
    marginRight: 20,
  },
});
