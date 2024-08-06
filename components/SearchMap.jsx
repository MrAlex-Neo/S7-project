import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Keyboard,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";

import * as Location from "expo-location";
import SearchInp from "./SearchInp";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import StationCard from "./StationCard";

const SearchMap = () => {
  const { t, i18 } = useTranslation();
  const [isFocused, setIsFocused] = useAtom(focus);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const handleStateChange = ({ nativeEvent }) => {
    const { translationY } = nativeEvent;
    console.log(translationY);
    if (nativeEvent.state === State.END) {
      if (translationY > 20 * (Platform.OS === "ios" ? 8.5 : 10)) {
        // Плавное скрытие контейнера
        Animated.timing(translateY, {
          toValue: 800, // значение, при котором контейнер будет полностью скрыт
          duration: 500, // Длительность анимации
          useNativeDriver: true,
        }).start(() => {
          setIsFocused((prevUserState) => ({
            ...prevUserState,
            map: false,
          }));
          Keyboard.dismiss();
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView
      className={`absolute z-20  ${
        Platform.OS === "ios" ? "h-[85vh]" : "h-[90vh] pb-[12vh]"
      } top-[10vh] right-0 w-[100%]`}
    >

        <Animated.View
          className="w-[100%] p-[4vw] pt-[1vh] pb-0 rounded-3xl rounded-br-none rounded-bl-none bg-white"
          id="main"
          style={{
            transform: [{ translateY }],
          }}
        >
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleStateChange}
            activeOffsetY={[-9999, 0]} // Проверяем с меньшими значениями
          >
            <View className="h-[6vh]">
              <Animated.View
                id="child"
                className="border-2 m-2 rounded-full w-[10vw] mx-auto"
              />
            </View>
          </PanGestureHandler>
          <SearchInp placeholder={t("searchText")} map={true} otherStyles="mb-[2vh]" />
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            className="flex-col"
          >
            <StationCard busy={true} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={false} />
            <StationCard busy={true} />
          </ScrollView>
        </Animated.View>
    </GestureHandlerRootView>
  );
};

export default SearchMap;
