import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { icons, images } from "../../constants";
import { useTranslation } from "react-i18next";
const DownloadIMG = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(user_menu)", params: { screen: "UpdateUser" } }], // Сброс стека и переход на вкладку "profile"
      })
    );
  };
  return (
    <SafeAreaView className="bg-black absolute b-0 h-full justify-between mt-[4vh] py-[4vh]">
      <View className="w-full px-[5vw] bg-black">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={resetStack}>
            <Image
              source={icons.backBtnWhite}
              className="w-[6vw] h-[5.1vw] p-[2vw]"
            />
          </TouchableOpacity>
          <Text className="font-robotoMedium text-xl ml-[4vw] color-white">
            {t("download_img_1")}
          </Text>
        </View>
      </View>
      <View className="w-[100vw] h-[40vh] items-center bg-grayColor-900">
        <Image
          source={images.userPhotoDefault}
          className="w-[40vh] h-[40vh] rounded-full"
        />
      </View>
      <View className="flex-row justify-around">
        <TouchableOpacity className="items-center mb-[4vh] justify-between">
          <Image source={icons.change_photo} className="w-[8vw] h-[8vw]" />
          <Text className="color-white font-robotoMedium text-xs text-center mt-[1vh]">
            {t("download_img_2")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center mb-[4vh] justify-between">
          <Image source={icons.delete_photo} className="w-[8vw] h-[8vw]" />
          <Text className="color-white font-robotoMedium text-xs text-center mt-[1vh]">
            {t("download_img_3")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DownloadIMG;
