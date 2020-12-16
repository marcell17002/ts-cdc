import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Landing,
  Login,
  Register,
  Home,
  Search,
  Chat,
  Konsultan,
  Lowongan,
  Konsultasi,
  Akun,
  EditProfile,
  AddPengalaman,
  EditPengalaman,
  HomeDetail,
  Loker,
  LokerDetail,
  Internship,
  InternDetail,
  ListKonsultan,
} from "../pages";
import { BottomNavigator } from "../components/moleculs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Lowongan" component={Lowongan} />
      <Tab.Screen name="Konsultasi" component={Konsultasi} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Konsultasi"
        component={Konsultasi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Konsultan"
        component={Konsultan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPengalaman"
        component={EditPengalaman}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPengalaman"
        component={AddPengalaman}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loker"
        component={Loker}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Internship"
        component={Internship}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LokerDetail"
        component={LokerDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InternDetail"
        component={InternDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListKonsultan"
        component={ListKonsultan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
