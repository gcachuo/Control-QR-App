import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import { useEffect, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        navigation.navigate("Home");
      } else {
        setIsLoggedIn(false);
        navigation.navigate("Login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName={"Login"}
      screenOptions={{ headerTitle: "Control QR" }}
    >
      {!isLoggedIn && (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ isLoggedIn }}
        />
      )}
      {isLoggedIn && (
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
