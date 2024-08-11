import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImgButton from "../../components/ImgButton";
import { useTranslation } from "react-i18next";
import FaqItem from "../../components/FaqItem";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { fetchFaq } from "../../redux/slices/faq";
import { useDispatch } from "react-redux";

const FAQ = () => {
  const navigation = useNavigation();
  const { t, i18 } = useTranslation();
  const [list, setList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getFAQ();
  }, []);

  async function getFAQ() {
    const response = await dispatch(fetchFaq());
    console.log("faq", response);
    setList(response.payload); // Assuming response.payload contains the stations list
  }

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)", params: { screen: "profile" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  return (
    <SafeAreaView className="bg-white h-[100vh] absolute bottom-0">
      <View
        className={`w-full flex-1 pb-[1vh] px-[5vw] bg-white ${
          Platform.OS !== "android" ? "pt-[2vh]" : "pt-[4vh]"
        }`}
      >
        <View className="flex-row items-center">
          <ImgButton
            containerStyles="p-0"
            imgStyles="w-[4vh] h-[4vh]"
            textStyles="text-white"
            handlePress={resetStack}
          />
          <Text className="font-robotoMedium text-xl ml-[4vw]">{t("FAQ")}</Text>
        </View>
        <View className="mt-[4vh] pb-[2vh]">
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {list !== null &&
              list.map((elem, id) => {
                return (
                  <FaqItem
                    question={elem.question}
                    answer={elem.answer}
                  />
                );
              })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FAQ;
