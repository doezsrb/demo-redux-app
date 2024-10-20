import { View, Text, SafeAreaView } from "react-native";

import { useSelector } from "react-redux";

import UsernameInput from "@/components/UsernameInput";
import { Link } from "expo-router";

export default function HomeScreen() {
  const username = useSelector((state: any) => state.username.value);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 100,
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {username != "" ? (
        <Text style={{ fontSize: 20 }}>
          Welcome,{" "}
          <Link href={"/profile"}>
            <Text
              style={{
                color: "blue",
              }}
            >
              {username}
            </Text>
          </Link>
          !
        </Text>
      ) : (
        <View
          style={{
            flex: 1,

            backgroundColor: "white",

            alignItems: "center",
          }}
        >
          <UsernameInput type="login" />
        </View>
      )}
    </SafeAreaView>
  );
}
