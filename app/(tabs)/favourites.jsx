import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import SearchInput from "../../components/SearchInp.jsx";
import { useTranslation } from "react-i18next";
import StationCard from "../../components/StationCard.jsx";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms.js";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth.js";

const Favourites = () => {
  const dispatch = useDispatch();
  const { t, i18 } = useTranslation();
  const [visible, setVisible] = useAtom(focus);
  const [list, setList] = useState(null);

  useEffect(() => {
    myFavouritesStations();
  }, []);

  async function myFavouritesStations() {
    const response = await dispatch(fetchAuthMe());
    if (response.payload.data.saved) {
    } else {
      setList(null);
    }
  }

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
          {list !== null && list.length > 0 ? (
            <View
              className={`flex-col ${
                Platform.OS === "android" ? "pb-[10vh]" : "pb-[8vh]"
              }`}
            >
              {list.map(elem => {
                return <StationCard busy={true} />
              })}
              {/* <StationCard busy={true} />
              <StationCard busy={true} />
              <StationCard busy={false} />
              <StationCard busy={true} />
              <StationCard busy={false} />
              <StationCard busy={false} />
              <StationCard busy={true} />
              <StationCard busy={true} />
              <StationCard busy={true} />
              <StationCard busy={false} />
              <StationCard busy={true} />
              <StationCard busy={false} />
              <StationCard busy={false} />
              <StationCard busy={true} /> */}
            </View>
          ) : (
            <Text className="p-[1vh] font-robotoRegular text-xl">У вас пока нет избранных станций</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
