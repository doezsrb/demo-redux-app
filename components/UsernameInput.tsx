import { setUsername } from "@/redux/usernameSlice";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";

interface UsernameInputProps {
  type: "login" | "edit";
}
const UsernameInput = ({ type }: UsernameInputProps) => {
  const username = useSelector((state: any) => state.username.value);
  const [inputUsername, setInputUsername] = useState(username);
  const dispatch = useDispatch();
  const onChangeInput = (e: any) => {
    const regex = /^[A-Za-z0-9]+$/;
    if (regex.test(e.nativeEvent.text)) {
      setInputUsername(e.nativeEvent.text);
    }
    if (e.nativeEvent.text == "") {
      setInputUsername(e.nativeEvent.text);
    }
  };
  const submit = () => {
    if (inputUsername != username && inputUsername != "") {
      if (type == "edit") {
        Toast.show("You've successfully edited the username!", {
          duration: Toast.durations.SHORT,
        });
      } else {
        Toast.show("You've successfully logged in!", {
          duration: Toast.durations.SHORT,
        });
      }
      dispatch(setUsername(inputUsername));
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",

        gap: 4,
      }}
    >
      <TextInput
        placeholderTextColor={"gray"}
        placeholder={type == "login" ? "Username" : "New Username"}
        value={inputUsername}
        onChange={onChangeInput}
        style={{
          width: 250,
          borderColor: "black",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity
        style={{
          width: 250,
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderRadius: 5,
          backgroundColor: "black",

          alignItems: "center",
          borderWidth: 0.4,
        }}
        onPress={submit}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {type == "edit" ? "Edit" : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsernameInput;
