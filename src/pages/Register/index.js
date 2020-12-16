import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Button, Gap, Loading } from "../../components/atoms";
import {
  colors,
  fonts,
  storeData,
  getData,
  useForm,
  base_url,
} from "../../utils";
import { showMessage, hideMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [form, setForm] = useForm({
    name: "",
    email: "",
    profession: "",
    number: "",
    password: "",
  });

  const onContinue = () => {
    console.log("isi form : ", form);
    if (form.password === confirmPass) {
      setLoading(true);
      axios
        .post(`${base_url}/v1/auth/user`, form)
        .then((response) => {
          setLoading(false);
          showMessage({
            message: "Silahkan login",
            type: "success",
            color: colors.text.title,
          });
          setForm("reset");
          const data = {
            ...form,
            token: response.data.token,
          };
          storeData("user", data);
          navigation.navigate("Login");
          console.log("data berhasil dikirim ke db", data);
        })
        .catch((error) => {
          setLoading(false);
          showMessage({
            message: error.message,
            type: "default",
            backgroundColor: colors.error,
            color: colors.text.title,
          });
        });
    } else {
      showMessage({
        message: "Password tidak valid",
        type: "default",
        backgroundColor: colors.error,
        color: colors.text.title,
      });
    }
  };
  return (
    <>
      <View style={styles.background}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo_app.png")}
            style={styles.image}
          />
          <Gap height={20} />
          <Text style={styles.titleHeader}>Register</Text>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.subContent}>
              <Text style={styles.username}>Nama</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.name}
                onChangeText={(value) => setForm("name", value)}
                placeholder="Masukkan Nama"
              />
              <Gap height={20} />
              <Text style={styles.username}>Username</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.email}
                onChangeText={(value) => setForm("email", value)}
                placeholder="Masukkan Username"
              />
              <Gap height={20} />
              <Text style={styles.username}>Pekerjaan</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.profession}
                onChangeText={(value) => setForm("profession", value)}
                placeholder="Masukkan pekerjaan terakhir"
              />
              <Gap height={20} />
              <Text style={styles.username}>No. Telp</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                keyboardType={"number-pad"}
                value={form.number}
                onChangeText={(value) => setForm("number", value)}
                placeholder="Masukkan no. telpon aktif"
              />
              <Gap height={20} />
              <Text style={styles.username}>Password</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={form.password}
                onChangeText={(value) => setForm("password", value)}
                placeholder="Masukkan Password"
                secureTextEntry={true}
              />
              <Gap height={20} />
              <Text style={styles.username}>Confirm Password</Text>
              <Gap height={20} />
              <TextInput
                style={styles.textInput}
                value={confirmPass}
                onChangeText={(value) => setConfirmPass(value)}
                placeholder="Masukkan Kembali Password"
                secureTextEntry={true}
              />
              <Gap height={40} />
              <View style={styles.button}>
                <Button label="Daftar" onPress={() => onContinue()} />
              </View>
              <View style={styles.login}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.subCategoryTextRight}>
                    Sudah punya akun? Masuk disini
                  </Text>
                </TouchableOpacity>
              </View>
              <Gap height={20} />
            </View>
          </ScrollView>
        </View>
      </View>

      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginVertical: "8%",
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
    marginTop: "5%",
  },
  username: {
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
  login: {
    fontSize: 8,
    fontFamily: fonts.reguler,
    color: colors.text.primary,
    alignItems: "center",
  },
});
