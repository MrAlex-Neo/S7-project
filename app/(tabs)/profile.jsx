import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { towardPage } from "../../values/atom/myAtoms";
import { userData } from "../../values/atom/myAtoms";

const Profile = () => {
  const { t, i18 } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);
  const [toward, setToward] = useAtom(towardPage);
  const [user, setUser] = useAtom(userData)


  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    console.log("profile", data?.data);
    setUser(prev => ({
      ... prev,
      name: data.data.first_name,
      surname: data.data.last_name
    }))
  }, [data]);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full flex-1 justify-between pb-[1vh] pt-[7vh] px-[5vw] bg-white">
        <View>
          <Text className="text-2xl font-robotoMedium mb-[2vh]">
            {t("profile")}
          </Text>
          <View className="flex-col gap-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Image
                  source={images.user}
                  className="w-[10vh] h-[10vh] rounded-full"
                />
                <View>
                  {data && data?.data?.first_name ? (
                    <Text className="font-robotoMedium text-xl">
                      {`${data.data.first_name} ${data.data.last_name}`}
                    </Text>
                  ) : (
                    <Text className="font-robotoMedium text-xl">
                      {`${t("name")} ${t("surname")}`}
                    </Text>
                  )}
                  {data && data?.data?.phone ? (
                    <Text className="font-robotoMedium text-xs text-grayColor-500 mt-[0.5vh]">
                      {`+${data.data.phone.replace(
                        /(\d{1,3})(\d{1,2})(\d{1,3})(\d{1,2})(\d{1,2})/,
                        "$1 $2 $3 $4 $5"
                      )}`}
                    </Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push("/UpdateUser")}>
                <Image source={icons.pencil} className="w-[3vh] h-[3vh] mr-[2vw]" />
              </TouchableOpacity>
            </View>
            <View className="bg-secondary px-[6vw] pt-[2vh] pb-[2.5vh] rounded-xl flex-col">
              <View className=" flex-row items-center">
                <Image source={icons.purse} className="w-[6vh] h-[6vh]" />
                <Text className="color-white ml-[4vw] text-lg font-robotoMedium">
                  5.878.550 сум
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setToward((prevUserState) => ({
                    ...prevUserState,
                    profile: true,
                  }));
                  router.push("/Wallet");
                }}
              >
                <View
                  className="mt-[3vh] px-[4vw] rounded-2xl py-[1vh] bg-white"
                  style={{ alignSelf: "flex-start" }}
                >
                  <Text className="text-base font-robotoMedium">
                    {t("pursebtn")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-between">
              <View className="flex-col w-[47%] bg-grayColor-200 border-2 border-grayColor-600 p-[4vw] rounded-lg mb-[2.2vh]">
                <TouchableOpacity onPress={() => router.push("/History")}>
                  <Image source={icons.history} className="w-[7vw] h-[7vw]" />
                  <Text className="text-base mt-[0.5vh] font-robotoMedium">
                    {t("history")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-col w-[47%] bg-grayColor-200 border-2 border-grayColor-600 p-[4vw] rounded-lg mb-[2.2vh]">
                <TouchableOpacity onPress={() => router.push("/Settings")}>
                  <Image source={icons.settings} className="w-[7vw] h-[7vw]" />
                  <Text className="text-base mt-[0.5vh] font-robotoMedium">
                    {t("settings")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-col w-[47%] bg-grayColor-200 border-2 border-grayColor-600 p-[4vw] rounded-lg mb-[2.2vh]">
                <TouchableOpacity onPress={() => router.push("/FAQ")}>
                  <Image source={icons.faq} className="w-[7vw] h-[7vw]" />
                  <Text className="text-base mt-[0.5vh] font-robotoMedium">
                    {t("FAQ")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-col w-[47%] bg-grayColor-200 border-2 border-grayColor-600 p-[4vw] rounded-lg mb-[2.2vh]">
                <TouchableOpacity onPress={() => router.push("/Help")}>
                  <Image source={icons.help} className="w-[7vw] h-[7vw]" />
                  <Text className="text-base mt-[0.5vh] font-robotoMedium">
                    {t("help")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-center font-robotoMedium text-xs color-grayColor-100">
            v 1. 0. 0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
