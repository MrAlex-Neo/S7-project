import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, Platform } from "react-native";
import { icons } from "../../constants";
import CircleAnimation from "../../components/CircleAnimation";
import PrimaryButton from "../../components/PrimaryButton";
import { images } from "../../constants";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Charge_page = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [step, setStep] = useState(2);
  const [popup, setPopup] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStep((prevStep) => (prevStep === 2 ? 0 : prevStep + 1));
  //   }, 2000);
  //   return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  // }, []);
  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(other)", params: { screen: "Charge_end" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  // [] означает, что useEffect будет запущен только один раз при монтировании

  return (
    <SafeAreaView className="bg-white absolute bottom-0 h-[100vh]">
      <View className={`justify-between w-full flex-1 pb-[2vh] px-[5vw] bg-white ${
          Platform.OS !== "android" ? "pt-[2vh]" : "pt-[4vh]"
        }`}>
        <View className="flex-row justify-between">
          <Text className="font-robotoMedium text-xl">
            {t("charging_process")}
          </Text>
          <Image source={icons.chat}  className="w-[6vw] h-[6vw]"/>
        </View>
        <CircleAnimation step={step} kw="30" />
        <View className="p-[5vw] border-2 border-grayColor-600 rounded-xl bg-grayColor-200">
          <View className="flex-row justify-between">
            <View className="items-center w-[50%] pb-[4vh] pt-[2vh] border-b-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">
                {t("charging_time")}
              </Text>
              <Text className="font-robotoBold text-xl">00:14:56</Text>
            </View>
            <View className="items-center w-[50%] pb-[4vh] pt-[2vh] border-b-2 border-l-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">{t("percent")}</Text>
              <Text className="font-robotoBold text-xl">40%</Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="items-center w-[50%] pt-[4vh] pb-[2vh] ">
              <Text className="font-robotoRegular text-sm">
                {t("stationSlider_4")}
              </Text>
              <Text className="font-robotoBold text-xl">12.24 Amp</Text>
            </View>
            <View className="items-center w-[50%] pt-[4vh] pb-[2vh] border-l-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">{t("amount")}</Text>
              <Text className="font-robotoBold text-xl">$5.25</Text>
            </View>
          </View>
        </View>
        <PrimaryButton
          title={t('charge_page_4')}
          containerStyles="bg-secondary w-full mr-2"
          textStyles="text-white"
          isLoading={false}
          handlePress={() => setPopup(true)}
        />
      </View>
      {popup ? (
        <View
          className="absolute justify-center w-full h-[100%] z-20"
          style={{ backgroundColor: "rgba(108, 122, 137, 0.5)" }}
        >
          <View className="bg-white w-[90vw] mx-[5vw] items-center px-[5vw] py-[10vw] rounded-xl">
            <Image
              source={images.popupBatery}
              className="h-[8vh] w-[8vh] mb-[2vh]"
            />
            <Text className="font-robotoRegular text-2xl text-center mb-[2vh]">
              {t("charge_page_1")}
            </Text>
            <Text className="font-robotoRegular text-sm text-center mb-[4vh]">
              {`${t("charge_page_2")} 50%`}
            </Text>
            <View className="w-full flex-row justify-between mx-4">
              <PrimaryButton
                title={t('cancel')}
                containerStyles="bg-secondary w-[38vw] px-[0] py-[1.4vh] mr-[1vw]"
                textStyles="text-white text-center font-robotoRegular text-sm"
                handlePress={() => setPopup(false)}
              />
              <PrimaryButton
                title={t('charge_page_3')}
                containerStyles="bg-white border-red border-2 w-[38vw] px-[0] py-[1.4vh] ml-[1vw]"
                textStyles="text-red text-center font-robotoRegular text-sm"
                handlePress={resetStack}
              />
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Charge_page;
