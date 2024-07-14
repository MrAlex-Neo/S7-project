import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
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
import WalletInput from "../../components/WalletInput";
import { useEffect } from "react";
import LottieView from "lottie-react-native";
import animation from "../../assets/s7/animation.json"

const Wallet = () => {
  const navigation = useNavigation();
  const { t, i18 } = useTranslation();
  const [activeButton, setActiveButton] = useState(null); // Индекс активной кнопки
  const [part, setPart] = useState(0);
  const [sum, setSum] = useState("30000");
  const [inputValue, setInputValue] = useState("");

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

  useEffect(() => {
    setInputValue(sum);
  }, [sum]);
  const handleValueChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <>
      <SafeAreaView className="bg-white h-[100vh] absolute bottom-0 w-[100vw] pb-[1vh] justify-between">
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
              handlePress={() =>
                towardPage.profile ? resetStack() : navigation.goBack()
              }
            />
            <Text className="font-robotoMedium text-xl ml-[4vw]">
              {t("purse")}
            </Text>
          </View>
          <Text className="font-robotoRegular text-base mt-[3vh] color-grayColor-300">
            {part === 0 ? t("turnKindWallet") : t("purse_1")}
          </Text>
          {part === 0 ? (
            <View className="py-[1vh]">
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                {[
                  { icon: icons.click, height: "" },
                  { icon: icons.payme, height: "" },
                  { icon: icons.paynet, height: "" },
                ].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(index)}
                  >
                    <View
                      className={`flex-row justify-between items-center p-[3vh] border-2 border-grayColor-400 rounded-2xl mt-[2vh]
                  `}
                    >
                      <Image
                        source={item.icon}
                        className={`h-[${item.height}]`}
                      />
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
          ) : (
            <>
              <View>
                <WalletInput sum={sum} onValueChange={handleValueChange} />
              </View>
              <View className="flex-row justify-between mt-[2vh]">
                <Text className="font-robotoMedium text-xs">
                  {`1${t("kw")}. 1000 ${t("sum")}`}
                </Text>
                <Text className="font-robotoMedium text-xs">
                  {`30.000 ${t("sum")} ≈ 30${t("kw")}.`}
                </Text>
              </View>
              <View className="flex-row justify-between mt-[2vh] flex-wrap">
                {[10000, 20000, 50000, 100000, 200000, 500000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    className="w-[30%] items-center border-2 border-grayColor-600 mt-[2vh] py-[1vh] rounded-2xl"
                    onPress={() => setSum(amount)}
                  >
                    <Text className="font-robotoMedium text-lg">
                      {amount
                        .toString()
                        .replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
        <PrimaryButton
          title={t("next")}
          containerStyles="bg-secondary w-[90%] mx-auto"
          textStyles="text-white"
          handlePress={() => {
            console.log("save");
            setPart((prev) => prev + 1);
          }}
          isLoading={part === 0 ? isDisabled : false} // Управляем состоянием disabled
        />
      </SafeAreaView>
      {part === 2 ? (
        <View
          className="absolute justify-center w-full h-[100%] z-20"
          style={{ backgroundColor: "rgba(108, 122, 137, 0.5)" }}
        >
          <View className="bg-white w-[86vw] mx-[7vw] items-center px-[5vw] py-[10vw] rounded-xl">
            <LottieView
              source={animation}
              autoPlay
              loop
              className="h-[60vw] w-[60vw] mb-[2vh]"
            />
            <Text className="font-semibold text-2xl color-secondary text-center mb-[2vh]">
              {t("purse_2")}
            </Text>
            <Text className="font-robotoRegular text-base color-grayColor-300 text-center mb-[4vh]">
              {`${t("purse_3")} ${inputValue
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${t("sum")}`}
            </Text>
            <PrimaryButton
              title={t("purse_4")}
              containerStyles="bg-secondary w-[65vw] px-[0] py-[2vh] mr-[1vw]"
              textStyles="text-white text-center font-robotoRegular text-sm"
              handlePress={resetStack}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default Wallet;
