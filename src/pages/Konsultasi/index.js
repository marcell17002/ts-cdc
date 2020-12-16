import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Gap } from "../../components/atoms";
import { Headers, ListContact } from "../../components/moleculs";
import { base_url, colors, fonts, getData } from "../../utils";

const Konsultasi = ({ navigation }) => {
  const [listChat, setListChat] = useState([]);
  const [listChatPair, setListChatPair] = useState([]);
  const [profile, setProfile] = useState({});
  const [listPerson, setListPerson] = useState({});

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
        getListConsultant(res.token, res.id);
        getListPairConsultant(res.token, res.id);
      }
    });
  };

  const getListConsultant = (token, idSender) => {
    axios
      .get(`${base_url}/v1/chat_history/posts/idSender/${idSender}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response) {
          const oldData = response.data.data;
          const data = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            await axios
              .get(`${base_url}/v1/auth/user/${oldData[key].idReceiver}`, {
                headers: {
                  Authorization: `bearer ${token}`,
                },
              })
              .then((response) => {
                const adapter = response.data.data;
                data.push({
                  id: key,
                  receiverData: response.data.data,
                  idUser: response.data.data._id,
                  name: response.data.data.name,
                  image: adapter.image,
                  ...oldData[key],
                });
                console.log("isi response get profile : ", data);
              })
              .catch((error) => {
                console.log("error get profile : ", error.message);
              });
          });
          await Promise.all(promises);
          setListChat(data);
          console.log("isi listChat bew: ", data);
          console.log("data baru setelah di parse : ", data);
        }
        console.log("list chat : ", response.data.data);
      })
      .catch((error) => {
        console.log("error disini : ", error.message);
      });
  };
  const getListPairConsultant = (token, idSender) => {
    axios
      .get(`${base_url}/v1/chat_history/posts/idReceiver/${idSender}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response) {
          const oldData = response.data.data;
          const data = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            await axios
              .get(`${base_url}/v1/auth/user/${oldData[key].idSender}`, {
                headers: {
                  Authorization: `bearer ${token}`,
                },
              })
              .then((response) => {
                data.push({
                  id: key,
                  receiverData: response.data.data,
                  idUser: response.data.data._id,
                  name: response.data.data.name,
                  image: response.data.data.image,
                  ...oldData[key],
                });
              })
              .catch((error) => {
                console.log("error get profile : ", error.message);
              });
          });
          await Promise.all(promises);
          setListChatPair(data);
          console.log("isi listChatPair: ", listChat);
          console.log("data baru setelah di parse : ", data);
        }
        console.log("list chat : ", response.data.data);
      })
      .catch((error) => {
        console.log("error disini : ", error.message);
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
        console.log("error get profile : ", error.message);
      });
  };
  return (
    <View style={styles.bg}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Headers title="Konsultasi" />
          <View style={styles.container}>
            <Gap height={20} />
            <TouchableOpacity
              onPress={() => navigation.navigate("ListKonsultan")}
            >
              <View style={styles.banchat}>
                <Image
                  source={require("../../assets/kk.png")}
                  style={styles.bigimage}
                />
              </View>
            </TouchableOpacity>

            <View>
              <Gap height={20} />
              <Text style={styles.title}> Chat </Text>
              <Gap height={20} />
              <ScrollView showsVerticalScrollIndicator={false}>
                {listChat.map((item) => {
                  console.log("LIST CHAT : ", listChat);
                  return (
                    <ListContact
                      key={item._id}
                      photo={item.image}
                      name={item.name}
                      profession={item.lastChat}
                      onPressProfile={() =>
                        navigation.navigate("Konsultan", item.idReceiver)
                      }
                      onPressChat={() => navigation.navigate("Chat", item)}
                    />
                  );
                })}
                {listChatPair.map((item) => {
                  return (
                    <ListContact
                      key={item._id}
                      photo={item.image}
                      name={item.name}
                      onPressProfile={() =>
                        navigation.navigate("Konsultan", item.idReceiver)
                      }
                      profession={item.lastChat}
                      onPressChat={() => navigation.navigate("Chat", item)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Konsultasi;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
    //alignItems: "center",
  },
  title: {
    color: colors.text.subTitle,
    fontSize: 20,
    fontFamily: fonts.semiBold,
  },
  banchat: {
    width: 140,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
});
