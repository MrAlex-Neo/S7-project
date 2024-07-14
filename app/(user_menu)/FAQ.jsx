import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import FaqItem from "../../components/FaqItem";
import { useNavigation, CommonActions } from "@react-navigation/native";

const FAQ = () => {
  const navigation = useNavigation();
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
    <SafeAreaView className="bg-white h-[100vh] absolute bottom-0">
      <View
        className={`w-full flex-1 pb-[1vh] px-[5vw] bg-white ${
          Platform.OS !== "android" ? "pt-[2vh]" : "pt-[4vh]"
        }`}
      >
        <View className="flex-row items-center">
          <ImgButton
            containerStyles="p-0"
            imgStyles="w-[4vh] h-[4vh]"
            textStyles="text-white"
            handlePress={resetStack}
          />
          <Text className="font-robotoMedium text-xl ml-[4vw]">{t("FAQ")}</Text>
        </View>
        <View className="mt-[4vh]">
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <FaqItem
              question="Доступна ли регистрация с других стран?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
            <FaqItem
              question="Каковы способы оплаты топлива через приложение?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
            <FaqItem
              question="Могу ли я заказать доставку зарядки своего авто на дом через ваше приложение?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
            <FaqItem
              question="Как найти ближайшую заправку с помощью вашего приложения?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
            <FaqItem
              question="Какая информация доступна в реальном времени через ваше приложение?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
            <FaqItem
              question="Какие расценки у вас за кВт?"
              answer="К сожалению нет, регистрация аккаунтов выполняется только местными мобильными номерами РУЗ"
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FAQ;
