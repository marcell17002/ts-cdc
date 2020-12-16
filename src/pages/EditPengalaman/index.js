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

const EditPengalaman = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [dataPengalaman, setDataPengalaman] = useState(route.params);

  const onSave = () => {
    if (
      !dataPengalaman.pengalaman.trim() ||
      !dataPengalaman.jenisPengalaman.trim() ||
      !dataPengalaman.periode.trim() ||
      !dataPengalaman.jabatan.trim() ||
      !dataPengalaman.instansi.trim()
    ) {
      showMessage({
        message: "dont let blank input",
        type: "default",
        backgroundColor: colors.error,
        color: colors.text.title,
      });
      return;
    } else {
      setLoading(true);
      getData("login_log").then((res) => {
        if (res) {
          const data = {
            pengalaman: dataPengalaman.pengalaman,
            jenisPengalaman: dataPengalaman.jenisPengalaman,
            periode: dataPengalaman.periode,
            jabatan: dataPengalaman.jabatan,
            instansi: dataPengalaman.instansi,
            pemilik: dataPengalaman.pemilik,
          };
          console.log("isi data update : ", dataPengalaman._id);
          updateProfile(res.token, dataPengalaman._id, data);
        }
      });
    }
  };

  const updateProfile = (token, id, dataUser) => {
    axios
      .put(`${base_url}/v1/profile/post/${id}`, dataUser, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        showMessage({
          message: "Data telah diubah !",
          type: "success",
          color: colors.text.title,
        });
        navigation.navigate("Akun");
        console.log("data berhasil diupdate ke db", response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error : ", error.response.data);
        showMessage({
          message: error.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.text.title,
        });
      });
  };
  const changeText = (key, value) => {
    setDataPengalaman({
      ...dataPengalaman,
      [key]: value,
    });
  };
  return (
    <>
      <View style={styles.container}>
        <Headers
          child="isSave"
          title=" Pengalaman"
          onPressBack={() => navigation.goBack()}
          onPressSave={() => onSave()}
        />
        <Gap height={20} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputForm}>
            <InputForm
              title="Pengalaman"
              placeHolder="Judul Pengalaman"
              value={dataPengalaman.pengalaman}
              onChangeText={(value) => changeText("pengalaman", value)}
            />
            <InputForm
              title="Jenis Pengalaman"
              placeHolder="Jenis Pengalaman"
              value={dataPengalaman.jenisPengalaman}
              onChangeText={(value) => changeText("jenisPengalaman", value)}
            />
            <InputForm
              title="Periode"
              placeHolder="Periode"
              value={dataPengalaman.periode}
              onChangeText={(value) => changeText("periode", value)}
            />
            <InputForm
              title="Jabatan"
              placeHolder="Jabatan"
              value={dataPengalaman.jabatan}
              onChangeText={(value) => changeText("jabatan", value)}
            />
            <InputForm
              title="Instansi"
              placeHolder="Instansi"
              value={dataPengalaman.instansi}
              onChangeText={(value) => changeText("instansi", value)}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default EditPengalaman;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  inputForm: {
    marginHorizontal: 20,
  },
});
