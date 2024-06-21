import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { icons } from "../../constants";
import CircleAnimation from "../../components/CircleAnimation";

const Charge_page = () => {
  const [step, setStep] = useState(0);

  // [] означает, что useEffect будет запущен только один раз при монтировании

  

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full flex-1 pb-[1vh] px-[5vw] pt-[10vh] bg-white">
        <View className="flex-row justify-between">
          <Text className="font-robotoMedium text-xl">Процесс зарядки</Text>
          <Image source={icons.chat} />
        </View>
        <CircleAnimation step={step} kw='30'/>
      </View>
    </SafeAreaView>
  );
};

export default Charge_page;
