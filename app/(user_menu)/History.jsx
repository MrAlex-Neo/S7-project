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
import { useNavigation } from "@react-navigation/native";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Bill from "../../components/Bill";
import { CommonActions } from "@react-navigation/native";

const History = () => {
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
          <Text className="font-robotoMedium text-xl ml-[4vw]">
            {t("history")}
          </Text>
        </View>
        <View className="py-[2vh]">
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <Bill
              spend={true}
              title="Ташкент, ТЦ Ривьера"
              sum={21600}
              tariff={2000}
              gbT={10.8}
              chargTime={50}
            />
            <Bill spend={false} num={1000000} />
            <Bill spend={false} num={1200} />
            <Bill spend={false} num={9999} />
            <Bill
              spend={true}
              title="Угол самурая"
              sum={12000}
              tariff={3000}
              gbT={20.1}
              chargTime={120}
            />
            <Bill
              spend={true}
              title="ТЦ Минас Тирит"
              sum={1600}
              tariff={2000}
              gbT={2.3}
              chargTime={10}
            />
            <Bill spend={false} num={10000000} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default History;
