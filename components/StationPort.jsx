import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { images } from "../constants";

const StationPort = ({ busy, isActive, onPress }) => {
  
  const disabled = busy; // Вы можете динамически изменять это значение

  return (
    <TouchableOpacity
      className={`flex-row justify-between ${
        isActive ? "border-2 border-secondary" : "border-2 border-grayColor-600"
      } mt-[3vh] rounded-2xl px-[3vw]`}
      onPress={onPress}
      disabled={disabled}
    >
      <View className="justify-between py-[2vh]">
        <View>
          <Text className="text-xs font-robotoRegular">Зарядный порт</Text>
          <Text className="text-base font-robotoBold">GB/T 120 кВт</Text>
        </View>
        <Text
          className={`text-xs font-robotoBold ${
            busy ? " bg-grayColor-300" : " bg-secondary"
          } px-[2vw] py-[0.3vh] color-white rounded-lg`}
          style={{ alignSelf: "flex-start" }}
        >
          {busy ? "1 занят" : "1 свободен"}
        </Text>
      </View>
      <View>
        <Image source={images.stationGun} className="w-[33vw]" />
      </View>
    </TouchableOpacity>
  );
};

export default StationPort;
