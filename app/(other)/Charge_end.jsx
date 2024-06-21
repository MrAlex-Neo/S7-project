import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { images } from "../../constants";
import PrimaryButton from "../../components/PrimaryButton";
import { useTranslation } from "react-i18next";


const Charge_end = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "map" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="justify-center w-full flex-1 pb-[2vh] px-[5vw] pt-[2vh] bg-white">
        <View className="items-center">
          <Image
            source={images.chargesEnd}
            className="w-[60vw] h-[58.8vw] mb-[6vh]"
          />
          <Text className="font-semibold text-2xl text-center color-secondary mb-[3vh]">
            {`${t('charge_end_1')} 50%`}
          </Text>
          <Text className="font-robotoRegular text-sm color-grayColor-300 mx-[12vw] text-center">
            {`${t('charge_end_2')} 45 000 ${t('sum')}`} сум
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={t('close')}
        containerStyles="bg-secondary w-[90vw] mx-[5vw] mb-[4vh]"
        textStyles="text-white"
        isLoading={false}
        handlePress={resetStack}
      />
    </SafeAreaView>
  );
};

export default Charge_end;
