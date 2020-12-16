import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Gap, Loading } from "../../components/atoms";
import {
  colors,
  fonts,
  useForm,
  storeData,
  getData,
  base_url,
} from "../../utils";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    email: "",
    password: "",
  });
  const onContinue = () => {
    console.log("isi form : ", form);
    setLoading(true);
    axios
      .post(`${base_url}/v1/auth/login`, form)
      .then((response) => {
        setLoading(false);
        showMessage({
          message: "Login Success!",
          type: "success",
          color: colors.text.title,
        });
        setForm("reset");
        const data = {
          email: form.email,
          id: response.data.id,
          token: response.data.token,
        };
        storeData("login_log", data);
        navigation.replace("MainApp");
        console.log("data berhasil dikirim ke db", data);
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          message: "Username dan Password tidak ditemukan",
          type: "default",
          backgroundColor: colors.error,
          color: colors.text.title,
        });
      });
  };
  return (
    <>
      <View style={styles.background}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo_app.png")}
            style={styles.image}
          />
          <Gap height={28} />
          <Text style={styles.titleHeader}> Masuk</Text>
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.subContent}>
              <Text style={styles.title}>Username</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.email}
                onChangeText={(value) => setForm("email", value)}
                placeholder="Masukkan Username"
              />
              <Gap height={20} />
              <Text style={styles.title}>Password</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.password}
                onChangeText={(value) => setForm("password", value)}
                placeholder="Masukkan Password"
                secureTextEntry={true}
              />
            </View>
          </ScrollView>
          <View style={styles.button}>
            <Button label="Masuk" onPress={() => onContinue()} />
          </View>

          <View style={styles.register}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.subCategoryTextRight}>
                Belum punya akun? Daftar disini
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={20} />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginVertical: "10%",
  },
  image: {
    width: 218,
    height: 88,
  },
  titleHeader: {
    fontSize: 32,
    fontFamily: fonts.semiBold,
    color: colors.text.title,
  },
  content: {
    backgroundColor: colors.primaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  subContent: {
    marginHorizontal: 20,
    marginTop: "10%",
    flex: 1,
  },
  title: {
    color: colors.text.subTitle,
    fontSize: 20,
    fontFamily: fonts.reguler,
  },
  textInput: {
    backgroundColor: colors.input.primary,
    borderRadius: 10,
    opacity: 0.9,
    paddingLeft: 20,
  },
  button: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginVertical: "5%",
  },
  register: {
    fontSize: 8,
    fontFamily: fonts.reguler,
    color: colors.text.primary,
    alignItems: "center",
  },
});
