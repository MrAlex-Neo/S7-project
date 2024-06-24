import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { images } from "../../constants";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, fetchCode, fetchUpdate } from "../../redux/slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { regAtom } from "../../values/atom/myAtoms";
import CodeInput from "../../components/CodeInput";
import ImgButton from "../../components/ImgButton";
import PhoneInputFirst from "../../components/PhoneInputFirst";
import PrimaryButton from "../../components/PrimaryButton";
import { CheckBox } from "react-native-elements";

const SignIn = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);
  const { t } = useTranslation();
  const [number, setNumber] = useState("+998");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [part, setPart] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [badResponse, setBadResponse] = useState(false);
  const [badCode, setBadCode] = useState(false);
  const [badResponseOne, setBadResponseOne] = useState(false);
  const [badResponseTwo, setBadResponseTwo] = useState(false);
  const [btnFirst, setBtnFirst] = useState(true);
  const [btnSec, setBtnSec] = useState(true);
  const [btnThird, setBtnThird] = useState(true);
  const [regData, setRegData] = useAtom(regAtom);
  const [mistake, setMistake] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    if (isChecked && number.length === 12) {
      setBtnFirst(false);
    } else {
      setBtnFirst(true);
    }
    setRegData((prevUserState) => ({
      ...prevUserState,
      tel: number,
    }));
  }, [isChecked, number]);

  useEffect(() => {
    if (regData.regCode.toString().length === 4) {
      setBtnSec(false);
    } else {
      setBtnSec(true);
    }
  }, [regData]);

  useEffect(() => {
    if (name.length > 2 && surname.length > 2) {
      setBtnThird(false);
    } else {
      setBtnThird(true);
    }
    setRegData((prevUserState) => ({
      ...prevUserState,
      name: name,
      surname: surname,
    }));
  }, [name, surname]);

  const sendNumberHandler = async () => {
    try {
      const obj = { phone: regData.tel };
      const response = await dispatch(fetchRegister(obj));
      if (!response || !response.payload) {
        setBadResponseOne(true);
        if (response.error.message) {
          setMistake(response.error.message)
        }
        return console.log("ответ", response);
      }
      if (response) {
        console.log(response.payload.code);
        setRegData((prevUserState) => ({
          ...prevUserState,
          response_code: response.payload.code,
        }));
        setPart(1);
        setBadResponseOne(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendCodeHandler = async () => {
    try {
      const obj = { phone: regData.tel, verification_code: regData.regCode };
      const response = await dispatch(fetchCode(obj));
      if (!response || !response.payload) {
        setBadResponseTwo(true);
        setBadCode(true);
        return console.log("ответ", response);
      }
      if (response) {
        console.log(response.payload.access);
        AsyncStorage.setItem("token", response.payload.access);
        AsyncStorage.setItem("refresh", response.payload.refresh);
        setBadCode(false);
        setPart(2);
        setBadResponseTwo(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendUserInputsHandler = async () => {
    try {
      console.log(regData.name)
      console.log(regData.surname)
      const obj = { first_name: regData.name, last_name: regData.surname };
      const response = await dispatch(fetchUpdate(obj));
      if (!response || !response.payload) {
        return console.log("ответ", response);
      }
      if (response) {
        console.log(response.payload.status);
        router.push("/map");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAwareScrollView extraScrollHeight={0} enableOnAndroid={true} keyboardOpeningTime={50} enableAutomaticScroll={true}>
        <ImgButton
          containerStyles="absolute top-[4vh] left-[2vw]"
          imgStyles="w-[3vh] h-[3vh]"
          textStyles="text-white"
          handlePress={() => {
            setBadCode(false);
            part === 0 ? router.push("/") : setPart(0);
          }}
        />
        <View className="flex-1 justify-between h-[100vh] px-[4vw] py-[6vh] pb-[2vh]">
          {part === 0 ? (
            <>
              <Image source={images.image5} resizeMode="contain" className="w-full h-[35vh]" />
              <View>
                <Text className="font-robotoBold tracking-wider text-xl leading-8">{t("hello")}</Text>
                <Text className="font-robotoMedium text-grayColor-300 text-base mt-[1vh] mb-[4vh]">
                  {t("phone_number_sing_in")}
                </Text>
                <PhoneInputFirst
                  title={t("phone_number")}
                  value={number}
                  handleChangeText={setNumber}
                  otherStyles=""
                  badResponse={badResponseOne}
                  mistake={mistake}
                  // mistake={t("badPhoneInputText")}
                  keyboardType="numeric"
                />
                <View className="flex-row items-center mt-[2vh]">
                  <CheckBox checked={isChecked} onPress={() => setIsChecked(!isChecked)} containerStyle={{ padding: 0, margin: 0 }} wrapperStyle={{ margin: 0, padding: 0 }} />
                  <View>
                    <Text className="font-robotoRegular text-sm">{`${t("regCheckBox1")} `}</Text>
                    <Text className="text-blue-100" onPress={() => Linking.openURL("https://mralex-neo.github.io/nurb/")}>{`${t("regCheckBox2")}`}</Text>
                  </View>
                </View>
              </View>
              <PrimaryButton
                title={t("next")}
                containerStyles="bg-secondary w-full mr-2"
                textStyles="text-white"
                isLoading={btnFirst}
                handlePress={sendNumberHandler}
              />
            </>
          ) : part === 1 ? (
            <>
              <View>
                <Text className="font-robotoBold tracking-wider text-2xl mt-[2vh] leading-8">{t("enterTheCode")}</Text>
                <Text className="font-robotoRegular text-grayColor-300 text-lg mt-[4vh] mb-[4vh]">
                  {`${t("checkCode")} --- --- --- -${number[10]}${number[11]} ${t("checkCode1")} ${regData.response_code}`}
                </Text>
                <CodeInput state="reg" startTimer={btnFirst} mistake={badResponseTwo} />
                {badCode && (
                  <Text className="font-robotoRegular text-sm text-red text-center">{t("wrongCode")}</Text>
                )}
              </View>
              <PrimaryButton
                title={t("confirm")}
                containerStyles="bg-secondary w-full mr-2"
                textStyles="text-white"
                isLoading={btnSec}
                handlePress={sendCodeHandler}
              />
            </>
          ) : (
            <>
              <View>
                <Text className="text-center font-robotoBold tracking-wider text-2xl leading-8 py-[3vh]">{t("registration")}</Text>
                <PhoneInputFirst
                  title={t("name")}
                  handleChangeText={setName}
                  otherStyles=""
                  placeholder="..."
                  badResponse={badResponse}
                  mistake={t("badPhoneInputText")}
                  keyboardType="default"
                />
                <PhoneInputFirst
                  title={t("surname")}
                  placeholder="..."
                  handleChangeText={setSurname}
                  otherStyles=""
                  badResponse={badResponse}
                  mistake={t("badPhoneInputText")}
                  keyboardType="default"
                />
              </View>
              <PrimaryButton
                title={t("next")}
                containerStyles="bg-secondary w-full mr-2"
                textStyles="text-white"
                isLoading={btnThird}
                handlePress={sendUserInputsHandler}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
