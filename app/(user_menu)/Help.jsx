import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useNavigation, CommonActions } from "@react-navigation/native";

const Help = () => {
  const navigation = useNavigation()
  const { t, i18 } = useTranslation();

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "profile" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  return (
    <SafeAreaView className="bg-white h-[100vh] w-[100vw] absolute bottom-0">
      <View className="w-full flex-1 pb-[1vh] px-[5vw] pt-[4vh] bg-white">
        <View className="flex-row items-center">
          <ImgButton
            containerStyles="p-0"
            imgStyles="w-[3vh] h-[3vh]"
            textStyles="text-white"
            handlePress={resetStack}
          />
          <Text className="font-robotoMedium text-xl ml-[4vw]">
            {t("help")}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <View className="flex-row items-center p-[3vh] border-2 border-grayColor-400 rounded-2xl mt-[4vh]">
              <Image source={icons.callUs} className="w-[5vh] h-[5vh]" />
              <Text className="ml-[5vw] text-lg font-robotoMedium">
                {t('contactUs')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="flex-row items-center p-[3vh] border-2 border-grayColor-400 rounded-2xl mt-[2vh]">
              <Image source={icons.tg} className="w-[5vh] h-[5vh]" />
              <Text className="ml-[5vw] text-lg font-robotoMedium">
                Telegram
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Help;
