import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Headers } from "../../components/moleculs";
import { base_url, colors, getData, useForm } from "../../utils";
import { Icon } from "native-base";
import { Gap, InputForm, Loading, Separator } from "../../components/atoms";
import ImagePicker from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";

const EditProfile = ({ navigation, route }) => {
  const [dataProfile, setDataProfile] = useState(route.params);
  dataProfile.image = { uri: dataProfile.image };
  const [photoLocal, setPhotoLocal] = useState(
    "https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg"
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [photo, setPhoto] = useState();

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { quality: 0.5, maxHeight: 80, maxWidth: 80 },
      (response) => {
        if (response.didCancel || response.error) {
          showMessage({
            message: "oops, sepertinya anda tidak jadi upload foto ?",
            type: "default",
            backgroundColor: colors.error,
            color: colors.title,
          });
        } else {
          const source = `data:${response.type};base64, ${response.data}`;
          const sourceLocal = { uri: response.uri };
          setPhoto(source);
          setPhotoLocal(response.uri);
          console.log("data sourceLokal : ", sourceLocal);
          console.log("data source : ", source);
        }
      }
    );
  };

  const onSave = () => {
    if (
      !dataProfile.password.trim() ||
      !dataProfile.name.trim() ||
      !dataProfile.email.trim() ||
      !dataProfile.number.trim() ||
      !dataProfile.profession.trim()
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
            name: dataProfile.name,
            email: dataProfile.email,
            password: dataProfile.password,
            image: photo,
            profession: dataProfile.profession,
            number: dataProfile.number,
          };
          console.log("data : ", data);
          updateProfile(res.token, res.id, data);
          navigation.navigate("Login");
        }
      });
    }
  };

  const updateProfile = (token, id, dataUser) => {
    axios
      .put(`${base_url}/v1/auth/user/${id}`, dataUser, {
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
    setDataProfile({
      ...dataProfile,
      [key]: value,
    });
  };
  return (
    <>
      <View style={styles.container}>
        <Headers
          child="isSave"
          title="Edit Profile"
          onPressBack={() => navigation.goBack()}
          onPressSave={() => onSave()}
        />
        <Gap height={20} />
        <TouchableOpacity style={styles.bundle} onPress={getImage}>
          <View style={styles.imageBundle}>
            <Image source={{ uri: photoLocal }} style={styles.image} />
          </View>
          <View style={styles.iconBundle}>
            <Icon name="pencil" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <Gap height={20} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputForm}>
            <InputForm
              title="Pekerjaan"
              placeHolder="Masukkan Pekerjaan"
              value={dataProfile.profession}
              onChangeText={(value) => changeText("profession", value)}
            />
            <InputForm
              title="Nama"
              placeHolder="Masukkan Nama"
              value={dataProfile.name}
              onChangeText={(value) => changeText("name", value)}
            />
            <InputForm
              title="No Telpon"
              placeHolder="Masukkan Nomor Telpon"
              value={dataProfile.number}
              onChangeText={(value) => changeText("number", value)}
            />
            <InputForm
              title="E-mail"
              placeHolder="Masukkan E-mail"
              value={dataProfile.email}
              onChangeText={(value) => changeText("email", value)}
            />
            <InputForm
              title="Password"
              placeHolder="Masukkan Password"
              onChangeText={(value) => changeText("password", value)}
              secure={true}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: "contain",
  },
  bundle: {
    alignItems: "center",
  },
  imageBundle: {
    alignItems: "center",
  },
  iconBundle: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: "10%",
  },
  icon: {
    fontSize: 20,
    color: colors.primaryWhite,
    paddingLeft: "13%",
  },
  inputForm: {
    marginHorizontal: 20,
  },
});
