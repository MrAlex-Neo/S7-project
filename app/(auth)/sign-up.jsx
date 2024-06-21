import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchAuth, fetchCode } from "../../redux/slices/auth";
import { router } from "expo-router";
import { Linking } from "react-native";
import { useAtom } from "jotai";
import { authAtom } from "../../values/atom/myAtoms";
import PrimaryButton from "../../components/PrimaryButton";
import CodeInput from "../../components/CodeInput";
import ImgButton from "../../components/ImgButton";
import PhoneInputSecond from "../../components/PhoneInputSecond";

const SignUp = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [part, setPart] = useState(0);
  const [number, setNumber] = useState("+998");
  const [badResponse, setBadResponse] = useState(false);
  const [btnFirst, setBtnFirst] = useState(true);
  const [btnSec, setBtnSec] = useState(true);
  const [badCode, setBadCode] = useState(false);
  const [authData, setAuthData] = useAtom(authAtom);

  useEffect(() => {
    if (number.length === 12) {
      setBtnFirst(false);
    } else {
      setBtnFirst(true);
    }
    setAuthData((prevUserState) => ({
      ...prevUserState,
      tel: number,
    }));
  }, [number]);

  useEffect(() => {
    // console.log(authData)
    if (authData.authCode.toString().length === 4) {
      setBtnSec(false);
    } else {
      setBtnSec(true);
    }
  }, [authData]);

  const handlerClick = () => {
    setPart(1);
  };

  const sendNumberHandler = async () => {
    try {
      const obj = { phone: authData.tel };
      console.log(obj);
      const response = await dispatch(fetchAuth(obj));
      console.log(response);
      if (!response || !response.payload) {
        setBadResponse(true);
        return console.log("ответ", response);
      }
      if (response) {
        console.log(response.payload.code);
        setAuthData((prevUserState) => ({
          ...prevUserState,
          response_code: response.payload.code,
        }));
        setBadResponse(false);
        setPart(1);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const sendCodeHandler = async () => {
    try {
      const obj = { phone: authData.tel, verification_code: authData.authCode };
      console.log(obj);
      const response = await dispatch(fetchCode(obj));
      console.log(response);
      if (!response || !response.payload) {
        setBadCode(true);
        return console.log("ответ", response);
      }
      if (response) {
        console.log(response.payload.access);
        AsyncStorage.setItem("token", response.payload.access);
        AsyncStorage.setItem("refresh", response.payload.refresh);
        setBadCode(false);
        router.push("/map");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAwareScrollView
        extraScrollHeight={0}
        enableOnAndroid={true}
        keyboardOpeningTime={50}
        enableAutomaticScroll={true}
      >
        <ImgButton
          containerStyles="fixed top-[4vh] left-[4vw]"
          imgStyles="w-[3vh] h-[3vh]"
          textStyles="text-white"
          handlePress={() => (part === 0 ? router.push("/") : setPart(0))}
        />
        {part === 0 ? (
          <View className="w-full flex-col justify-around items-center h-[80vh] px-[4vw] py-[6vh]">
            <Image
              source={images.image5}
              resizeMode="contain"
              className="w-full h-[45vh]"
            />
            <PhoneInputSecond
              title={t("phone_number")}
              value={number}
              handleChangeText={(e) => setNumber(e)}
              otherStyles="w-full"
              badResponse={badResponse}
              mistake={t("badPhoneInputText")}
              isLoading={btnFirst}
              click={sendNumberHandler}
            />
          </View>
        ) : (
          <View className="w-full flex-col flex-1 box-border justify-between items-center px-[4vw] pt-[6vh] pb-[2vh]">
            <View>
              <Text className="font-robotoBold tracking-wider text-2xl mt-[2vh] leading-8">
                {t("enterTheCode")}
              </Text>
              <Text className="font-robotoRegular color-grayColor-300 text-lg mt-[4vh] mb-[4vh]">
                {`${t("checkCode")} --- --- --- -${number[10]}${number[11]} ${t(
                  "checkCode1"
                )} ${authData.response_code}`}
              </Text>
              <CodeInput state="auth" startTimer={btnFirst} />
              {badCode && (
                <Text className="font-robotoRegular text-sm text-red text-center">
                  {t("wrongCode")}
                </Text>
              )}
            </View>
            <PrimaryButton
              title={t("confirm")}
              containerStyles="bg-secondary w-full mr-2"
              textStyles="text-white"
              isLoading={btnSec}
              handlePress={() => sendCodeHandler()}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
