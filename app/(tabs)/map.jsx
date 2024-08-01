import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Text,
} from "react-native";
import SearchInp from "../../components/SearchInp";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms";
import { mistake } from "../../values/atom/myAtoms";
import StationMap from "../../components/StationMap";
import SearchMap from "../../components/SearchMap";
import { useDispatch, useSelector } from "react-redux";
import { icons, images } from "../../constants";
import CameraModal from "../../components/CameraModal"; // Изменили импорт
import MapComponent from "../../components/MapComponent";
import RouteChoose from "../../components/RouteChoose";
import MistakeMap from "../../components/MistakeMap";

const Map = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useAtom(focus);
  const [isMistake, setIsMistake] = useAtom(mistake);
  const [searchMap, setSearchMap] = useState(false);

  useEffect(() => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: false,
      search: false,
    }));
  }, [setIsFocused]);

  useEffect(() => {
    setSearchMap(isFocused.map);
  }, [isFocused.map]);

  const handleMapPress = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: true,
    }));
  };

  return (
    <SafeAreaView className="bg-white h-[100vh] absolute bottom-0 w-[100vw]">
      <View className="h-full">
        {isFocused.station ? (
          <StationMap />
        ) : isFocused.map ? (
          <SearchMap />
        ) : (
          <View className="absolute z-20 w-[93vw] bottom-[2vh] mx-[3.5vw] rounded-2xl p-[2vw] bg-white">
            <TouchableOpacity onPress={handleMapPress}>
              <SearchInp
                placeholder={t("searchText")}
                map={searchMap}
                unBar={true}
              />
            </TouchableOpacity>
          </View>
        )}

        <MapComponent />
        {isFocused.camera && (
          <View style={styles.container}>
            <TouchableOpacity
              className="bg-grayColor-300 w-[15vw] h-[15vw] my-[4vh] mx-[5vw] rounded-full justify-center items-center"
              style={{ zIndex: 1 }}
              onPress={() => {
                setIsFocused((prevUserState) => ({
                  ...prevUserState,
                  camera: false,
                }));
              }}
            >
              <Image source={icons.backBtnWhite} className="w-[6vw] h-[5vw]" />
            </TouchableOpacity>

            <CameraModal // Используем CameraModal для сканирования
              modalVisible={isFocused.camera}
            />
          </View>
        )}
        {isFocused.route && (
          <View style={styles.container}>
            <RouteChoose latitude="41.304597" longitude="69.229359" />
          </View>
        )}
        {isMistake.badToken && <MistakeMap />}
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    zIndex: 99,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  mistake: {
    position: "absolute",
    zIndex: 99,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60, 60, 60, 0.9)",
  },
});
