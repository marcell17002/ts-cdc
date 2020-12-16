import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CardProfile, Headers } from "../../components/moleculs";
import { base_url, colors, fonts, getData } from "../../utils";
import { Gap, Separator } from "../../components/atoms";

const Konsultan = ({ navigation, route }) => {
  const idUser = route.params;
  console.log("isi dara Params : ", idUser);
  const [localData, setLocalData] = useState({
    email: "",
    id: "",
    token: "",
  });
  const [profile, setProfile] = useState([]);
  const [experience, setExperience] = useState([]);
  const [photo, setPhoto] = useState(
    "https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg"
  );

  useEffect(() => {
    renderData();
    const unsubscribe = navigation.addListener("focus", () => {
      renderData();
    });
    return unsubscribe;
  }, [navigation]);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        setLocalData(res);
        getProfile(res.token, idUser);
        getExperience(res.token, idUser);
      }
    });
  };

  const getExperience = (token, id) => {
    axios
      .get(`${base_url}/v1/profile/posts/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setExperience(response.data.data);
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
        if (response.data.data.image != undefined) {
          setPhoto(response.data.data.image);
        }
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  return (
    <View style={styles.bg}>
      <View style={styles.main}>
        <Headers
          title={profile.name}
          child="isBack"
          iconName="md-chatbubbles"
          onPressBack={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={15} />
          <View style={styles.bundle}>
            <Image source={{ uri: photo }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.textName}>{profile.name} </Text>
            </View>
          </View>
          <Gap height={25} />
          <View style={styles.container}>
            <Text style={styles.title}>Informasi Pribadi</Text>
            <View>
              <CardProfile label={profile.profession} iconName="person" />
              <CardProfile label={profile.email} iconName="mail" />
              <CardProfile label={profile.number} iconName="call" />
            </View>
            <Gap height={30} />
            <View>
              <View style={styles.pengalaman}>
                <Text style={styles.title}>Pengalaman</Text>
              </View>
            </View>
            {experience.map((item) => {
              return (
                <View style={styles.detailPengalaman}>
                  <Icon name="folder" style={styles.iconEdit} />
                  <View style={styles.detailInfo}>
                    <Text style={styles.periode}>{item.periode}</Text>
                    <View style={styles.titleBundle}>
                      <Text style={styles.titles}>{item.pengalaman}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Konsultan;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  main: {
    marginBottom: 40,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 50,
  },
  bundle: {
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    marginTop: 15,
  },
  iconEdit: {
    fontSize: 20,
    color: colors.primary,
  },
  iconAdd: {
    fontSize: 26,
    color: colors.primary,
  },
  textName: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    color: colors.text.secondary,
    marginRight: 3,
  },
  title: {
    color: colors.text.subTitle,
    fontSize: 20,
    fontFamily: fonts.reguler,
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 50,
  },
  pengalaman: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailPengalaman: {
    flexDirection: "row",
    marginTop: 15,
  },
  detailInfo: {
    marginLeft: "5%",
  },
  periode: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.text.secondary,
  },
  titleBundle: {
    flexDirection: "row",
  },
  titles: {
    fontSize: 14,
    fontFamily: fonts.reguler,
    color: colors.text.secondary,
    flexShrink: 1,
    paddingRight: "20%",
  },
});
