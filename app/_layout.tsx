import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Drawer from "expo-router/drawer";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { setUsername } from "@/redux/usernameSlice";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const username = useSelector((state: any) => state.username.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state: any = store.getState();
      if (state.username.value == "") {
        Toast.show("You've successfully logged out!", {
          duration: Toast.durations.SHORT,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "black",
          headerStyle: {
            elevation: 10,
            shadowOpacity: 0.4,
          },
          drawerStyle: {
            width: Platform.OS == "web" ? 300 : "80%",
          },

          headerRight: () => {
            return (
              username != "" && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setUsername(""));
                  }}
                  style={{
                    paddingHorizontal: 5,
                    marginRight: 5,
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
              )
            );
          },
        }}
      >
        <Drawer.Screen
          options={{
            title: "Home",
            drawerIcon: () => <AntDesign name="home" size={24} color="black" />,
          }}
          name="index"
        />

        <Drawer.Screen
          options={{
            title: "Profile",
            drawerIcon: () =>
              username == "" ? (
                <AntDesign name="lock" size={24} color="black" />
              ) : (
                <AntDesign name="user" size={24} color="black" />
              ),
            drawerItemStyle:
              username == ""
                ? {
                    opacity: 0.5,
                  }
                : null,
          }}
          name="profile"
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <App />
      </RootSiblingParent>
    </Provider>
  );
}
