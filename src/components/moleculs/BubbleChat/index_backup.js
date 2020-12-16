import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Fire } from "../../config";

const Chat = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    Fire.database()
      .ref("Prestasi")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allData = [];
          Object.keys(dataSnapshot).map((key) => {
            const dataPrestasi = dataSnapshot[key];
            const newData = [];
            Object.keys(dataPrestasi).map((item) => {
              newData.push({
                id: item,
                data: dataPrestasi[item],
              });
            });
            allData.push({
              id: key,
              data: newData,
            });
          });
          console.log("parsed data : ", allData);
          setInfo(allData);
          console.log("isi data :", info);
        }
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text>ini halaman chat </Text>
      <ScrollView>
        {info.map((index) => {
          return (
            <View key={index.id}>
              <Text>{index.id}</Text>
              {index.data.map((itemIndex) => {
                return (
                  <View key={itemIndex.key} style={styles.list}>
                    <Text style={styles.text}>{itemIndex.data.name}</Text>
                    <Text style={styles.text}>{itemIndex.data.email}</Text>
                    <Text style={styles.text}>{itemIndex.data.prodi}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  list: {
    marginVertical: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});
