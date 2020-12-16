import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Gap } from "../../components/atoms";
import { Headers, ListContact } from "../../components/moleculs";
import { base_url, colors, fonts, getData } from "../../utils";
import { Icon } from "native-base";

const ListKonsultan = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [person, setPerson] = useState([]);
  const [holder, setHolder] = useState([]);

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        getUserProfile(res.token);
      }
    });
  };

  const getUserProfile = (token) => {
    axios
      .get(`${base_url}/v1/auth/users`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(async (response) => {
        const oldData = response.data.data;
        const data = [];

        Object.keys(oldData).map(async (key) => {
          data.push({
            id: key,
            idUser: response.data.data[key]._id,
            profession: response.data.data[key].profession,
            ...oldData[key],
          });
        });
        await setPerson(data);
        setHolder(data);
        console.log("data parsed : ", data);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };
  const handleChange = (item) => {
    setInput(item);

    if (input.length > 0) {
      const newData = holder.filter((items) => {
        const itemData = `${items.name.toUpperCase()}`;
        const textData = item.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setPerson(newData);
    }
  };
  const searchFilter = (value) => {
    setValue(value);
    const newData = experience.filter((item) => {
      const itemData = `${item.name.toUpperCase()} ${item.profession.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setExperience(newData);
  };
  return (
    <View style={styles.bg}>
      <View>
        <Headers
          child="isBack"
          title="Konsultan Karir"
          onPressBack={() => navigation.goBack()}
        />
        <Gap height={15} />

        <View style={styles.container}>
          <View style={styles.bundle}>
            <View style={styles.iconBundle}>
              <Icon
                type="MaterialIcons"
                name="search"
                style={styles.InfoIcon}
              />
            </View>
            <TextInput
              placeholder="Cari disini ..."
              value={input}
              onChangeText={(value) => handleChange(value)}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Gap height={20} />
              <Text style={styles.title}> Look someone you search .. </Text>
              <Gap height={20} />
            </View>
            {person.map((datas) => {
              return (
                <ListContact
                  key={datas.idUser}
                  photo={datas.image}
                  name={datas.name}
                  profession={datas.profession}
                  onPressProfile={() =>
                    navigation.navigate("Konsultan", datas.idUser)
                  }
                  onPressChat={() => navigation.navigate("Chat", datas)}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ListKonsultan;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
  },
  bundle: {
    height: 40,
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    //marginHorizontal: 20,
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
  title: {
    color: colors.text.inactive,
    fontSize: 20,
    fontFamily: fonts.semiBold,
    textAlign: "center",
  },
});
