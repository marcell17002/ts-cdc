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
  const [idUser, setIdUser] = useState("");
  const [idHistory, setIdHistory] = useState("");
  const [local, setLocal] = useState({});
  const [holder, setHolder] = useState("");
  const { messages, sendMessage, setMessages } = useChat(chatID);
  const [input, setInput] = useState("");

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    getData("login_log").then(async (res) => {
      if (res) {
        // const idChat = `${dataUser.idUser}_${res.id}`; b_a
        await setIdUser(res.id);
        await setLocal(res);
        getChat(res.token, res.id, dataUser.idUser);
      }
    });
  };

  const getChat = (token, idSender, idReceiver) => {
    console.log("token:", token);
    console.log("idSender:", idSender);
    console.log("idReceiver:", idReceiver);
    if (dataUser.chatId === undefined) {
      axios
        .get(`${base_url}/v1/chat/posts/${idReceiver}_${idSender}`, {
          //b_a
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.data.length > 0) {
            console.log("respon get spesific chat b_a : ", response.data.data);
            setChatID(`${idReceiver}_${idSender}`);
            setMessages(response.data.data);
          } else {
            axios
              .get(`${base_url}/v1/chat/posts/${idSender}_${idReceiver}`, {
                //a_b
                headers: {
                  Authorization: `bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.data.data.length > 0) {
                  console.log(
                    "respon get spesific chat a_b: ",
                    response.data.data
                  );
                  setChatID(`${idSender}_${idReceiver}`);
                  setMessages(response.data.data);
                } else {
                  setChatID(`${idSender}_${idReceiver}`);
                  console.log("new communication");
                }
              })
              .catch((error) => {
                console.log("error get message: ", error);
              });
          }
        })
        .catch((error) => {
          console.log("error get message: ", error);
        });
    } else {
      axios
        .get(`${base_url}/v1/chat/posts/${dataUser.chatId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("respon get spesific chat last: ", response.data.data);
          setChatID(dataUser.chatId);
          setMessages(response.data.data);
        })
        .catch((error) => {
          console.log("error get message: ", error);
        });
    }
  };
  const setHistory = (token) => {
    const dataHistory = {
      chatId: chatID,
      lastChat: input,
      lastDate: getChatTime(today),
      idSender: `${local.id}`,
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
        console.log("buat id baru history success ", response.data.data._id);
      })
      .catch((error) => {
        console.log("error set history : ", error.message);
      });
  };

  const getMessages = (token, idReceiver, idSender) => {
    console.log("chat id : ", idChat);
    console.log("token  : ", token);
    console.log("base url : ", `${base_url}/v1/chat/posts/${idChat}`);

    // if (dataUser.chatId.length == 0) {
    //   axios
    //     .get(`${base_url}/v1/chat/posts/${idReceiver}_${idSender}`, {
    //       //b_a
    //       headers: {
    //         Authorization: `bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       if (response.data.data.length > 0) {
    //         console.log("respon get spesific chat : ", response.data.data);
    //         setMessages(response.data.data);
    //       } else {
    //         axios
    //           .get(`${base_url}/v1/chat/posts/${idSender}_${idReceiver}`, {
    //             //a_b
    //             headers: {
    //               Authorization: `bearer ${token}`,
    //             },
    //           })
    //           .then((response) => {
    //             console.log("respon get spesific chat : ", response.data.data);
    //             setMessages(response.data.data);
    //           })
    //           .catch((error) => {
    //             console.log("error get message: ", error);
    //           });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("error get message: ", error);
    //     });
    // } else {
    //   axios
    //     .get(`${base_url}/v1/chat/posts/${dataUser.chatId}`, {
    //       headers: {
    //         Authorization: `bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("respon get spesific chat : ", response.data.data);
    //       setMessages(response.data.data);
    //       setIdChat;
    //     })
    //     .catch((error) => {
    //       console.log("error get message: ", error);
    //     });
    // }
  };

  const findHistory = (token) => {
    axios
      .get(`${base_url}/v1/chat_history/posts/chatId/${chatID}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          setIdHistory(response.data.data[0]._id);
          updateHistory(token, response.data.data[0]._id);
          const datahistory = response.data.data;
          console.log("hasil new data history : ", datahistory[0]._id);
        } else {
          setHistory(token);
        }
      })
      .catch((error) => {
        console.log("error find history : ", error.message);
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
    console.log("id history :", idHistory);
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
        console.log("id history after added:", idHistory);
        findHistory(local.token);

        // if (idHistory == null) {
        //   findHistory(local.token);
        // } else {
        //   console.log("alternative 2 ");
        //   updateHistory(local.token, idHistory);
        // }
        setInput("");
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
              photo={dataUser.image}
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
