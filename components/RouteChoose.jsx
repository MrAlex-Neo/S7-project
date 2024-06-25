import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";
import { icons } from "../constants";

const RouteChoose = ({ latitude, longitude }) => {
  const { t, i18n } = useTranslation();
  const [isFocused, setIsFocused] = useAtom(focus);

  const openYandexMaps = () => {
    const yandexMapsURL = `yandexmaps://maps.yandex.ru/?ll=${longitude},${latitude}`;
    Linking.canOpenURL(yandexMapsURL).then((supported) => {
      if (supported) {
        return Linking.openURL(yandexMapsURL);
      } else {
        const storeURL = `https://apps.apple.com/ru/app/yandex-maps/id313877526`; // URL для App Store или Google Play
        return Linking.openURL(storeURL);
      }
    });
  };

  const openGoogleMaps = () => {
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.canOpenURL(googleMapsURL).then((supported) => {
      if (supported) {
        return Linking.openURL(googleMapsURL);
      } else {
        const storeURL = `https://play.google.com/store/apps/details?id=com.google.android.apps.maps`; // URL для Google Play
        return Linking.openURL(storeURL);
      }
    });
  };

  const open2GIS = () => {
    const twoGisURL = `dgis://2gis.ru/routeSearch/rsType/car/to/${longitude},${latitude}`;
    Linking.canOpenURL(twoGisURL).then((supported) => {
      if (supported) {
        return Linking.openURL(twoGisURL);
      } else {
        const storeURL = `https://apps.apple.com/ru/app/2gis-карты-городской-путеводитель/id481627348`; // URL для App Store или Google Play
        return Linking.openURL(storeURL);
      }
    });
  };

  return (
    <View style={styles.container} className="justify-end py-[4vh] px-[4vw]">
      <View className="bg-white items-center p-[4vw] rounded-xl mb-[1vh]">
        <Text className="font-semibold text-lg mb-[1vh]">{t("route_choose")}</Text>
        <View className="flex-row justify-start w-full">
          <TouchableOpacity onPress={openYandexMaps} className="w-[25%] items-center">
            <Image source={icons.test_route} className="w-[15vw] h-[15vw]" />
            <Text className="text-center mt-[0.5vh] font-robotoRegular text px-[1vw]">Yandex maps</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGoogleMaps} className="w-[25%] items-center">
            <Image source={icons.test_route} className="w-[15vw] h-[15vw]" />
            <Text className="text-center mt-[0.5vh] font-robotoRegular text px-[1vw]">Google maps</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={open2GIS} className="w-[25%] items-center">
            <Image source={icons.test_route} className="w-[15vw] h-[15vw]" />
            <Text className="text-center mt-[0.5vh] font-robotoRegular text px-[1vw]">2GIS</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PrimaryButton
        title={t("close")}
        containerStyles="bg-grayColor-800 w-[92vw] p-[2vh] rounded-xl opacity-80"
        textStyles="text-black"
        handlePress={() => {
          setIsFocused((prevUserState) => ({
            ...prevUserState,
            route: false,
          }));
        }}
      />
    </View>
  );
};

export default RouteChoose;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(108, 122, 137, 0.5)",
  },
});
