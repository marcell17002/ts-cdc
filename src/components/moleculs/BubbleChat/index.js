import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Thumbnail, Subtitle, Text } from "native-base";
import { colors } from "../../../utils";

const BubbleChat = ({ isSender, message, time, photo }) => {
  return (
    <View>
      {isSender ? (
        <View style={styles.largeBundle_receiver}>
          <Card style={styles.root_receiver}>
            <CardItem button style={styles.content_receiver}>
              <View style={styles.information_sender}>
                <View style={styles.chatBundle_sender}>
                  <Text style={styles.msg_receiver}>{message}</Text>
                </View>
                <Subtitle style={styles.time_receiver}>{time}</Subtitle>
              </View>
            </CardItem>
          </Card>
        </View>
      ) : (
        <View style={styles.largeBundle_sender}>
          <Thumbnail
            small
            source={{
              uri: photo,
            }}
            style={styles.img_sender}
          />
          <Card style={styles.root_sender}>
            <CardItem button style={styles.content_sender}>
              <View style={styles.information_sender}>
                <View style={styles.chatBundle_sender}>
                  <Text style={styles.msg_sender}>{message}</Text>
                </View>
                <Subtitle style={styles.time_sender}>{time}</Subtitle>
              </View>
            </CardItem>
          </Card>
        </View>
      )}
    </View>
  );
};

export default BubbleChat;

const styles = StyleSheet.create({
  largeBundle_receiver: {
    flexDirection: "row",
    marginVertical: "2%",
    marginLeft: "40%",
    justifyContent: "flex-end",
  },
  content_receiver: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 8,
    backgroundColor: colors.lighBlue,
  },
  root_receiver: {
    marginTop: 8,
    marginBottom: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 8,
    marginRight: "4%",
  },
  msg_receiver: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: "right",
  },

  time_receiver: {
    color: colors.text.secondary,
    fontSize: 10,
    textAlign: "right",
  },

  //sender
  largeBundle_sender: {
    flexDirection: "row",
    marginVertical: "2%",
  },

  img_sender: {
    marginTop: "2%",
    marginLeft: "4%",
  },

  root_sender: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: "2%",
    marginRight: "40%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 24,
  },

  content_sender: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 24,
    backgroundColor: colors.secondaryGrey,
  },

  msg_sender: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: "right",
  },

  time_sender: {
    color: colors.text.secondary,
    fontSize: 10,
    textAlign: "right",
  },
});
