import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { InputChat } from "../../components/moleculs";
import { setDateChat } from "../../utils";

const Profile = () => {
  const chatSend = () => {
    const today = new Date();
    const uid = (r = Math.random().toString(36).substring(7));
    const data = {
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatID = 1;
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${uid}/${chatID}`;
    const urlMessageReceiver = `messages/${uid - 10}/${chatID}`;

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: uid,
    };
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalIndicator={false}>
          <View>
            <Text>hello</Text>
          </View>
        </ScrollView>
      </View>
      <InputChat />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
