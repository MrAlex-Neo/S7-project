import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { towardPage } from "../../values/atom/myAtoms";
import { useNavigation } from "@react-navigation/native";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../components/PrimaryButton";
import { CommonActions } from "@react-navigation/native";

const Wallet = () => {
  const navigation = useNavigation();
  const { t, i18 } = useTranslation();
  const [activeButton, setActiveButton] = useState(null); // Индекс активной кнопки
  const [part, setPart] = useState(0);

  const handlePress = (index) => {
    setActiveButton(index);
  };
  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "profile" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };

  const isDisabled = activeButton === null;

  return (
    <SafeAreaView className="bg-white h-full pb-[1vh] justify-between">
      <View className="w-full flex-1 px-[5vw] pt-[10vh] bg-white">
        <View className="flex-row items-center">
          <ImgButton
            containerStyles="p-0"
            imgStyles="w-[3vh] h-[3vh]"
            textStyles="text-white"
            handlePress={() =>
              towardPage.profile
                ? resetStack()
                : navigation.goBack()
            }
          />
          <Text className="font-robotoMedium text-xl ml-[4vw]">
            {t("purse")}
          </Text>
        </View>
        <Text className="font-robotoRegular text-base mt-[3vh] color-grayColor-300">
          {t('turnKindWallet')}
        </Text>
        <View className="py-[1vh]">
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {[
              { icon: icons.click, height: "5vh" },
              { icon: icons.payme, height: "4vh" },
              { icon: icons.paynet, height: "3.88vh" },
            ].map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(index)}>
                <View
                  className={`flex-row justify-between items-center p-[3vh] border-2 border-grayColor-400 rounded-2xl mt-[2vh]
                  `}
                >
                  <Image source={item.icon} className={`h-[${item.height}]`} />
                  <View
                    className={`border-4 border-secondary h-[4vh] w-[4vh] rounded-full ${
                      activeButton === index ? "bg-secondary" : ""
                    }`}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <PrimaryButton
        title={t("next")}
        containerStyles="bg-secondary w-[90%] mx-auto"
        textStyles="text-white"
        handlePress={() => console.log("save")}
        isLoading={part === 0 ? isDisabled : false} // Управляем состоянием disabled
      />
    </SafeAreaView>
  );
};

export default Wallet;
