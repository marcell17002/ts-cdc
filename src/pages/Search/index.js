import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { Separator } from "../../components/atoms";
import { getData } from "../../utils";

const Search = () => {
  const [consultant, setConsultant] = useState([]);
  const [value, setValue] = useState("");
  const [holder, setHolder] = useState([]);

  const [profile, setProfile] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then((res) => {
      if (res) {
        getExperience(res.token);
      }
    });
  };

  const getExperience = (token) => {
    axios
      .get("http://10.0.2.2:4000/v1/auth/users", {
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
  const searchFilter = (value) => {
    setValue(value);
    const newData = experience.filter((item) => {
      const itemData = `${item.name.toUpperCase()} ${item.profession.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setExperience(newData);
  };
  const headerSearch = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={(value) => searchFilter(value)}
        autoCorrect={false}
        value={value}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={experience}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{ source: { uri: item.url_foto } }}
            title={item.name}
            subtitle={item.name}
            onPress={() => navigate("Chat", item)}
          />
        )}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => {
          return <Separator />;
        }}
        ListHeaderComponent={headerSearch}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
