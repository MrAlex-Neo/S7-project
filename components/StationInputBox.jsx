import { View, Text, TextInput, Platform } from "react-native";
import React, { useEffect, useState } from "react";

const StationInputBox = ({ text, text_1 }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue();
  }, []);

  const formatInput = (input) => {
    return input + text_1;
  };
  return (
    <View>
      <View>
        <TextInput
          className={`px-[4vw] py-[3vw] rounded-xl font-robotoRegular text-center color-grayColor-300 bg-grayColor-200 border-2 border-gray-200  text-sm ${Platform.OS !== "android" ? "pt-[2vw]" : ""}`}
          //   value={formatInput(value)} // Применяем форматирование к значению
          placeholder={text + text_1}
          keyboardType="numeric"
          onChangeText={(text) => {
            // // Удаляем нецифровые символы и обновляем значение
            // keyboardType === "numeric"
            //   ? handleChangeText(text.replace(/\D/g, ""))
            //   : handleChangeText(text);
          }}
        />
      </View>
    </View>
  );
};

export default StationInputBox;
