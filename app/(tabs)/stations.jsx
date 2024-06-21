import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useTransition } from "react";
import SearchInput from "../../components/SearchInp.jsx";
import { useTranslation } from "react-i18next";
import StationCard from "../../components/StationCard.jsx";

const Stations = () => {
  const { t, i18 } = useTranslation();
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full flex-1 py-[7vh] px-[5vw] bg-white">
        <Text className="text-2xl font-robotoMedium mb-[2vh]">
          {t("stations")}
        </Text>
        <SearchInput placeholder={t("searchText")} />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View className="flex-col pt-[1vh]">
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={true} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Stations;
