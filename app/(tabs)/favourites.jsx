import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import SearchInput from "../../components/SearchInp.jsx";
import { useTranslation } from "react-i18next";
import StationCard from "../../components/StationCard.jsx";
import { useAtom } from "jotai";
import { activeStation } from "../../values/atom/myAtoms.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth.js";

const Favourites = () => {
  const dispatch = useDispatch();
  const { t, i18 } = useTranslation();
  const data = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);


  return (
    <SafeAreaView className="bg-white w-[100vw] h-[100%] pt-[4vh] absolute top-0">
      <View className={`w-full flex-1 px-[5vw] bg-white`}>
        <Text className={`text-2xl font-robotoMedium mt-[2vh]`}>
          {t("favourites")}
        </Text>
        <View className="py-[2vh]">
          <SearchInput placeholder={t("searchText")} />
        </View>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {data.data.saved ? (
            <View
              className={`flex-col ${
                Platform.OS === "android" ? "pb-[10vh]" : "pb-[8vh]"
              }`}
            >
              {data.data.saved.map((elem, id) => (
                <StationCard
                  key={id}
                  station={elem}
                  busy={elem.is_enabled === "true"}
                />
              ))}
            </View>
          ) : (
            <Text className="p-[1vh] font-robotoRegular text-xl">
              У вас пока нет избранных станций
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
