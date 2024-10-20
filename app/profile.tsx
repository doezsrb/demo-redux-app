import UsernameInput from "@/components/UsernameInput";
import { useIsFocused } from "@react-navigation/native";

import { Redirect, router } from "expo-router";
import { useEffect } from "react";

import { Image, SafeAreaView, Text, View } from "react-native";

import { useSelector } from "react-redux";

const Profile = () => {
  const isFocused = useIsFocused();
  const username = useSelector((state: any) => state.username.value);

  useEffect(() => {
    if (username == "") {
      router.push("/");
    }
  }, [username, isFocused]);
  if (username == "") {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 100,
        gap: 5,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{username}</Text>
      <Image
        style={{
          width: 170,
          height: 170,
        }}
        source={require("@/assets/images/user.png")}
      />
      <UsernameInput type="edit" />
    </SafeAreaView>
  );
};

export default Profile;
