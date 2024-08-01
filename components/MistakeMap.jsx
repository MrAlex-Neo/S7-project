import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";
import { mistake } from "../values/atom/myAtoms";
import { useNavigation } from "@react-navigation/native";

const MistakeMap = () => {
  const [isFocused, setIsFocused] = useAtom(focus);
  const [isMistake, setIsMistake] = useAtom(mistake);
  const navigation = useNavigation();
  const handlePress = (state) => {
    setIsMistake((prevUserState) => ({
      ...prevUserState,
      badToken: false,
    }));
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: false,
    }));
    if (state) {
      navigation.popToTop();
    }

    // e.preventDefault();
    // } else {
    //   setIsFocused((prevUserState) => ({
    //     ...prevUserState,
    //     map: false,
    //     station: false,
    //   }));
    //   router.push("Station_info");
    // }
  };
  return (
    <View style={styles.mistake} className="justify-center items-center">
      <View className="bg-grayColor-400 pt-[5vw] w-[90vw] rounded-2xl">
        <Text className="font-robotoRegular text-center text-lg px-[5vw]">
          Вы не зарегистрированны!
        </Text>
        <Text className="font-robotoRegular text-center text-sm pb-[5vw] px-[5vw]">
          Зарегистрируйтесть или войдите в систему
        </Text>
        <View className="w-[90vw] flex-row">
          <TouchableOpacity
            className="w-[50%] justify-center items-center py-[5vw] border-t-2 border-grayColor-700"
            onPress={() => handlePress(false)}
          >
            <Text className="text-blue-200 font-robotoRegular text-lg">
              Отмена
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] justify-center items-center py-[5vw] border-l-2 border-t-2 border-grayColor-700"
            onPress={() => handlePress(true)}
          >
            <Text className="text-blue-200 font-robotoRegular text-lg">
              Войти
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mistake: {
    position: "absolute",
    zIndex: 99,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60, 60, 60, 0.9)",
  },
});
export default MistakeMap;
