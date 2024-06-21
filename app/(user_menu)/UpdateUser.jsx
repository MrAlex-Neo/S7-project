import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import ImgButton from "../../components/ImgButton";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import PhoneInputFirst from "../../components/PhoneInputFirst";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PrimaryButton from "../../components/PrimaryButton";

const UpdateUser = () => {
  const navigation = useNavigation()
  const { t, i18 } = useTranslation();
  const [number, setNumber] = useState("+998");

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "profile" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  return (
    <SafeAreaView className="bg-white flex-1 pb-[3vh]">
      <KeyboardAwareScrollView
        extraScrollHeight={110}
        enableOnAndroid={true}
        keyboardOpeningTime={50}
        enableAutomaticScroll={true}
      >
        <View className="w-full flex-1 pb-[1vh] px-[5vw] bg-white pt-[10vh]">
          <View className="flex-row items-center">
            <ImgButton
              containerStyles="p-0"
              imgStyles="w-[3vh] h-[3vh]"
              textStyles="text-white"
              handlePress={resetStack}
            />
            <Text className="font-robotoMedium text-xl ml-[4vw]">
              {t("personal_data")}
            </Text>
          </View>
          <View
            className="mx-auto mt-[5vh]"
            style={{ alignSelf: "flex-start" }}
          >
            <TouchableOpacity className="absolute bottom-[-1vh] right-[0vh] z-20">
              <Image
                source={icons.pencilSec}
                className="h-[4vh] w-[4vh] rounded-sm"
              />
            </TouchableOpacity>
            <View
              className="border-2 border-secondary rounded-full z-0"
              style={{ alignSelf: "flex-start" }}
            >
              <Image
                source={images.user}
                className="w-[12vh] h-[12vh] rounded-full"
              />
            </View>
          </View>
          <View className="mt-[6vh]">
            <PhoneInputFirst
              title={t("phone_number")}
              value=""
              otherStyles=""
              editable={false}
              keyboardType="numeric"
            />
            <PhoneInputFirst
              title={t("name")}
              placeholder="..."
              handleChangeText={(text) => console.log(text)}
              otherStyles=""
              badResponse={true}
              mistake={t("badTextInputText")}
              keyboardType="default"
            />
            <PhoneInputFirst
              title={t("surname")}
              placeholder="..."
              handleChangeText={(text) => console.log(text)}
              otherStyles=""
              badResponse={true}
              mistake={t("badTextInputText")}
              keyboardType="default"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <PrimaryButton
        title={t("save")}
        containerStyles="bg-secondary w-[90%] mx-auto"
        textStyles="text-white"
        handlePress={() => console.log("save")}
      />
    </SafeAreaView>
  );
};

export default UpdateUser;
