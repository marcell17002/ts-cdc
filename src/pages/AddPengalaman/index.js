import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Headers } from "../../components/moleculs";
import { base_url, colors, getData, useForm } from "../../utils";
import {
  Button,
  Gap,
  InputForm,
  Loading,
  Separator,
} from "../../components/atoms";
import { showMessage } from "react-native-flash-message";

const AddPengalaman = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    pengalaman: "",
    jenisPengalaman: "",
    periode: "",
    jabatan: "",
    instansi: "",
  });
  const onPost = () => {
    console.log("isi form : ", form);
    setLoading(true);
    getData("login_log").then((res) => {
      if (res) {
        const idUser = res.id;
        const data = {
          ...form,
          pemilik: { id: idUser },
        };
        sendData(res.token, data);
      }
    });
  };
  const sendData = (token, data) => {
    axios
      .post(`${base_url}/v1/profile/post`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        showMessage({
          message: "Data berhasil ditambah",
          type: "success",
          color: colors.text.title,
        });
        setForm("reset");
        navigation.navigate("Akun");
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
  };

  return (
    <>
      <View style={styles.container}>
        <Headers
          child="isBack"
          title=" Pengalaman"
          onPressBack={() => navigation.goBack()}
        />
        <Gap height={20} />
        <ScrollView>
          <View style={styles.inputForm}>
            <InputForm
              title="Pengalaman"
              placeHolder="Judul Pengalaman"
              value={form.pengalaman}
              onChangeText={(value) => setForm("pengalaman", value)}
            />
            <InputForm
              title="Jenis Pengalaman"
              placeHolder="Jenis Pengalaman"
              value={form.jenisPengalaman}
              onChangeText={(value) => setForm("jenisPengalaman", value)}
            />
            <InputForm
              title="Periode"
              placeHolder="Periode"
              value={form.periode}
              onChangeText={(value) => setForm("periode", value)}
            />
            <InputForm
              title="Jabatan"
              placeHolder="Jabatan"
              value={form.jabatan}
              onChangeText={(value) => setForm("jabatan", value)}
            />
            <InputForm
              title="Instansi"
              placeHolder="Instansi"
              value={form.instansi}
              onChangeText={(value) => setForm("instansi", value)}
            />
            <View style={styles.button}>
              <Button label="Tambahkan" onPress={() => onPost()} />
            </View>
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default AddPengalaman;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  inputForm: {
    marginHorizontal: 20,
  },
  button: {
    marginVertical: 30,
  },
});
