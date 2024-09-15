import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAtom } from "jotai";
import { towardPage } from "../../values/atom/myAtoms";
import { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Bill from "../../components/Bill";
import PrimaryButton from "../../components/PrimaryButton";
import StationInfoItem from "../../components/StationInfoItem";
import StationSlider from "../../components/StationSlider";
import { CommonActions } from "@react-navigation/native";
import { fetchAuthMe } from "../../redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { activeStation } from "../../values/atom/myAtoms";

const Station_info = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t, i18 } = useTranslation();
  const [, setToward] = useAtom(towardPage);
  const user = useSelector((state) => state.auth?.data);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "map" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };

  return (
    <SafeAreaView className="bg-white h-[100vh] pt-[4vh] absolute bottom-0">
      <View className="w-full flex-1 pb-[1vh] px-[5vw]">
        <View className="flex-row items-center">
          <ImgButton
            containerStyles="p-0"
            imgStyles="w-[4vh] h-[4vh]"
            textStyles="text-white"
            handlePress={resetStack} // Вызов resetStack без анонимной функции
          />
        </View>
        <View className="py-[2vh] flex-col justify-between h-full">
          <View>
            <Text className="font-robotoMedium text-xl">
              {t("station_info_1")}
            </Text>
            <StationInfoItem />
            <StationSlider />
          </View>
          <View>
            <Text className="font-robotoMedium text-xl">
              {t("station_info_3")}:
            </Text>
            <View className="flex-row border-2 border-grayColor-600 mt-[2vh] rounded-2xl py-[3vh] px-[3vw]">
              <Image source={icons.green_purse} className="w-[6vh] h-[6vh]" />
              <View className="flex-col justify-between w-[66vw] ml-[3vw]">
                <View className="flex-row justify-between ">
                  <Text className="font-robotoRegular text-base">
                    {t("station_info_2")}
                  </Text>
                  <Text className="font-robotoMedium text-base">
                    {user?.data?.balance} {t("sum")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setToward((prevUserState) => ({
                      ...prevUserState,
                      profile: false,
                    }));
                    router.push("/Wallet");
                  }}
                >
                  <Text className="color-secondary">{t("pursebtn")}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <PrimaryButton
              title={t("next")}
              containerStyles="bg-secondary w-full my-[2vh]"
              textStyles="text-white"
              isLoading={false}
              handlePress={() => router.push("Charge_page")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Station_info;
