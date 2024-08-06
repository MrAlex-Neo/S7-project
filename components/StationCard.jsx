import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { color } from "react-native-elements/dist/helpers";
import { router, useNavigation } from "expo-router";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { icons } from "../constants";
import { focus } from "../values/atom/myAtoms";

const StationCard = ({ busy, id }) => {
  const { t, i18 } = useTranslation();
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useAtom(focus);

  const clickHandler = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: false,
      station: true,
    }));
    router.push("/map");
    // navigation.navigate("map")
  };

  return (
    <TouchableOpacity key={id} onPress={clickHandler}>
      <View className="mt-[3vw] border-2 border-grayColor-100 rounded-md p-[2vh]">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center ">
            <Text
              className={`border-2 ${
                busy
                  ? "border-red-500 text-red-500"
                  : "border-secondary text-secondary"
              } p-[1vw] text-center w-[25vw] ${
                Platform.OS !== "android" ? "h-[7vw]" : "h-[8vw]"
              } rounded-md`} 
              style={{borderWidth: 2, borderRadius: 5, borderColor: busy ? '#FF6666' : '#19B775'}}
            >
              {busy ? t("busy") : t("free")}
            </Text>
            <Text
              className="ml-[3vw] font-robotoMedium text-sm w-[30vw]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Riviera, charger №1
            </Text>
          </View>
          <Image source={icons.cardArrow} className="h-[3vh] w-[3vh] -rotate-90" />
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text
              className="mt-[1vh] w-[60vw] text-grayColor-500 text-xs font-robotoRegular"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Toshkent sh. Nodira ko’chasi
            </Text>
            <Text
              className="mt-[1vh] w-[60vw] text-grayColor-500 text-xs font-robotoRegular"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              GB/T DC 2 шт
            </Text>
          </View>
          <View className="items-end">
            <Text className="mt-[1vh] text-grayColor-500 text-xs font-robotoRegular">
              2 000 сум Квт
            </Text>
            <Text className="mt-[1vh] text-grayColor-500 text-xs font-robotoRegular">
              240 Квт
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StationCard;
