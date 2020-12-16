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

//dump

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BubbleChat, Headers, InputChat } from "../../components/moleculs";
import { base_url, colors, getChatTime, getData, useChat } from "../../utils";
import { Icon } from "native-base";

const Chat = ({ navigation, route }) => {
  const dataUser = route.params;
  console.log("idi data user : ", dataUser);
  const today = new Date();
  const [chatID, setChatID] = useState("");
  const [idHistory, setIdHistory] = useState("");
  const [local, setLocal] = useState({});
  const { messages, sendMessage, setMessages } = useChat(
    `${local.id}_${dataUser.idUser}`
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    renderData();
  }, []);

  const renderData = async () => {
    const promises = await getData("login_log").then(async (res) => {
      if (res) {
        const idChat = `${res.id}_${dataUser.idUser}`;
        await setChatID(idChat);
        setLocal(res);
        getMessages(res.token, idChat, res.id);
      }
    });
    await Promise.all(promises);
  };

  const setHistory = (token, idChat, idUser) => {
    const dataHistory = {
      chatId: idChat,
      lastChat: input,
      lastDate: getChatTime(today),
      idSender: `${idUser}`,
      idReceiver: `${dataUser.idUser}`,
    };
    console.log("isi data sethis : ", dataHistory);
    axios
      .post(`${base_url}/v1/chat_history/post`, dataHistory, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(async (response) => {
        await setIdHistory(response.data.data._id);
        console.log("buat id baru history success ");
      })
      .catch((error) => {
        console.log("error set history : ", error.message);
      });
  };

  const getMessages = (token, idChat, idUser) => {
    console.log("chat id : ", idChat);
    console.log("token  : ", token);
    console.log("base url : ", `${base_url}/v1/chat/posts/${idChat}`);
    axios
      .get(`${base_url}/v1/chat/posts/${idChat}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          console.log("respon get spesific chat : ", response.data.data);
          setMessages(response.data.data);
        } else {
          setHistory(token, idChat, idUser);
          console.log("respon chat null");
        }
      })
      .catch((error) => {
        console.log("error get message: ", error);
      });
  };

  const handleSubmit = () => {
    const today = new Date();
    const data = {
      chatID: chatID,
      allChat: {
        dateChat: today.getTime(),
        chatText: {
          sendBy: local.id,
          chatTime: getChatTime(today),
          chatContent: input,
        },
      },
    };
    console.log("chat message : ", data);
    sendMessage(data);
    axios
      .post(`${base_url}/v1/chat/post`, data, {
        headers: {
          Authorization: `bearer ${local.token}`,
        },
      })
      .then((response) => {
        setInput("");
        findHistory(local.token);
        console.log("data berhasil dikirim ke db", data);
      })
      .catch((error) => {
        showMessage({
          message: error.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.text.title,
        });
      });
  };
  const updateHistory = (token, idhistory) => {
    const dataHistory = {
      chatId: chatID,
      lastChat: input,
      lastDate: getChatTime(today),
      idSender: `${local.id}`,
      idReceiver: `${dataUser.idUser}`,
    };
    console.log("token : ", token);
    console.log("id history :", idhistory);
    axios
      .put(`${base_url}/v1/chat_history/post/${idhistory}`, dataHistory, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("data history update : ", response.data);
      })
      .catch((error) => {
        console.log("error update history : ", error.message);
      });
  };
  const findHistory = (token) => {
    axios
      .get(`${base_url}/v1/chat_history/posts/chatId/${chatID}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setIdHistory(response.data.data[0]._id);
        updateHistory(token, response.data.data[0]._id);
        const datahistory = response.data.data;
        console.log("hasil new data history : ", datahistory[0]._id);
      })
      .catch((error) => {
        console.log("error find history : ", error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Headers
        title={dataUser.name}
        child="isBack"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((item) => {
          return (
            <BubbleChat
              isSender={item.allChat.chatText.sendBy === local.id}
              key={item._id}
              message={item.allChat.chatText.chatContent}
              time={item.allChat.chatText.chatTime}
            />
          );
        })}
      </ScrollView>
      <View style={styles.textSend}>
        <View style={styles.bundle}>
          <TextInput
            style={styles.input}
            placeholder="Ketik pesannmu disini"
            value={input}
            onChangeText={(value) => setInput(value)}
          />
          <TouchableOpacity style={styles.iconBundle} onPress={handleSubmit}>
            <Icon name="paper-plane-outline" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSend: {
    justifyContent: "center",
    height: 82,
    backgroundColor: colors.primaryWhite,
    elevation: 2,
  },
  bundle: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: colors.input.primary,
    opacity: 0.6,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    maxHeight: 45,
  },
  iconBundle: {
    backgroundColor: colors.input.primary,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    opacity: 0.7,
  },
  icon: {
    fontSize: 24,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
