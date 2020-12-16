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

const Akun = ({ navigation }) => {
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
        getProfile(res.token, res.id);
        getExperience(res.token, res.id);
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
        console.log("data profile image diretrive ", response.data.data.image);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  return (
    <View style={styles.bg}>
      <View style={styles.main}>
        <Headers
          child="logOut"
          title="Profile"
          onPressLogOut={() => navigation.navigate("Login")}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={15} />
          <View style={styles.bundle}>
            <Image source={{ uri: photo }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.textName}>{profile.name} </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile", profile)}
              >
                <Icon name="pencil" style={styles.iconEdit} />
              </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddPengalaman")}
                >
                  <Icon name="add-outline" style={styles.iconAdd} />
                </TouchableOpacity>
              </View>
            </View>
            {experience.map((item) => {
              return (
                <View style={styles.detailPengalaman}>
                  <Icon name="folder" style={styles.iconEdit} />
                  <TouchableOpacity
                    style={styles.detailInfo}
                    onPress={() => navigation.navigate("EditPengalaman", item)}
                  >
                    <Text style={styles.periode}>{item.periode}</Text>
                    <View style={styles.titleBundle}>
                      <Text style={styles.titles}>{item.pengalaman}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  main: {
    marginBottom: 40,
  },
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
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
