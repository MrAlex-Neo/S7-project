import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Keyboard,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms";
import { error } from "../../values/atom/myAtoms";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabIcon = ({ icon, color, name, focused }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(-50);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: Platform.OS === "android" ? 35 : 40,
          height: Platform.OS === "android" ? 35 : 40,
        }}
      />
      <Text className={`font-robotoMedium text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </Animated.View>
  );
};

const TabsLayout = () => {
  const { t } = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setVisible] = useAtom(focus);
  const [isError, setIsError] = useAtom(error);
  const [hasToken, setHasToken] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setHasToken(!!token);
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (visible.map) {
          setVisible((prevUserState) => ({
            ...prevUserState,
            search: true,
          }));
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setVisible((prevUserState) => ({
          ...prevUserState,
          search: false,
        }));
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [visible.map]);

  const handleTabPress = (e) => {
    if (!hasToken) {
      e.preventDefault();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* {false && (
        <View style={styles.mistake} className="bottom-0 items-center justify-center">
          <Text>asdasd</Text>
          <TouchableOpacity>

          </TouchableOpacity>
        </View>
      )} */}

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#19B775",
          tabBarInactiveTintColor: "#A2A2A2",
          tabBarStyle: [
            {
              backgroundColor: "#ffffff",
              borderTopColor: "#A2A2A2",
              paddingBottom: Platform.OS === "android" ? 0 : 25,
              height: Platform.OS === "android" ? 70 : 100,
              display: `${
                visible.search || visible.map || visible.camera || visible.route
                  ? "none"
                  : ""
              }`,
            },
            isKeyboardVisible && styles.hidden,
          ],
        }}
      >
        <Tabs.Screen
          name="map"
          options={{
            title: t("map"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={!focused ? icons.map : icons.mapActive}
                color={color}
                name={t("map")}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stations"
          options={{
            title: t("stations"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={!focused ? icons.stations : icons.stationsActive}
                color={color}
                name={t("stations")}
                focused={focused}
              />
            ),
          }}
          // listeners={{
          //   tabPress: handleTabPress,
          // }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: t("favourites"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={!focused ? icons.favourites : icons.favouritesActive}
                color={color}
                name={t("favourites")}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("profile"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={!focused ? icons.profile : icons.profileActive}
                color={color}
                name={t("profile")}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  mistake: {
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(40, 40, 40, 0.6)",
  },
});

export default TabsLayout;
