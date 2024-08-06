import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInp.jsx";
import { useTranslation } from "react-i18next";
import StationCard from "../../components/StationCard.jsx";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../redux/slices/stations.js";

const Stations = () => {
  const { t, i18 } = useTranslation();
  const [visible, setVisible] = useAtom(focus);
  const dispatch = useDispatch();
  const stations = useSelector((state) => state.stations.items); // Assuming stations.items is where the stations list is stored
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllStations();
  }, []);

  async function getAllStations() {
    const response = await dispatch(fetchStations());
    setList(response.payload.results); // Assuming response.payload contains the stations list
    console.log('response.payload', response.payload)
  }

  return (
    <SafeAreaView className="bg-white w-[100vw] h-[100%] pt-[4vh] absolute top-0">
      <View className={`w-full flex-1 px-[5vw] bg-white`}>
        <Text className={`text-2xl font-robotoMedium mt-[2vh]`}>
          {t("stations")}
        </Text>
        <View className="py-[2vh]">
          <SearchInput placeholder={t("searchText")} />
        </View>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {list.length > 0 ? (
            <View
              className={`flex-col ${
                Platform.OS === "android" ? "pb-[10vh]" : "pb-[8vh]"
              }`}
            >
              {list.map((elem, id) => (
                <StationCard key={id} busy={true} /> // Adjust the props passed to StationCard as needed
              ))}
            </View>
          ) : (
            <Text className="p-[1vh] font-robotoRegular text-xl">
              Ошибка в получении списка
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Stations;
