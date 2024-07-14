import { View, TextInput, Image, Platform } from "react-native";
import { useEffect, useState } from "react";
import { icons } from "../constants";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";

const SearchInput = ({ placeholder, map, unBar }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useAtom(focus);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    // console.log(isFocused)
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      search: true,
    })); // Используйте метод set для обновления состояния

    // console.log(map, 'map')
    if (map === true) {
      setIsFocused((prevUserState) => ({
        ...prevUserState,
        map: true,
      }));
    }
    // console.log(focus)
  };

  const handleBlur = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      search: false,
    }));
    return false;
    // console.log(focus)
  };

  return (
    <View className="w-full">
      <Image
        source={icons.search}
        className="w-[4vh] h-auto absolute top-[10%] left-[2.5vw] z-10"
        resizeMode="contain"
      />
      <TextInput
        className={`w-full rounded-xl bg-grayColor-400 text-base font-robotoRegular p-[2vh] pl-[12vw] ${
          isFocused ? "border-blue-500" : "" // Пример добавления стиля при фокусе
        }`}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!map ? map : true}
        onPress={() =>
          unBar && Platform.OS !== "android"
            ? setIsFocused((prevUserState) => ({
                ...prevUserState,
                map: true,
              }))
            : null
        }
      />
    </View>
  );
};

export default SearchInput;
