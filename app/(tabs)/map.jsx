import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import SearchInp from "../../components/SearchInp";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms";

import StationMap from "../../components/StationMap";
import SearchMap from "../../components/SearchMap";

const Map = () => {
  const { t, i18 } = useTranslation();
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const mapRef = useRef(null);
  const [isFocused, setIsFocused] = useAtom(focus);
  const initialRegion = {
    latitude: 41.2995,
    longitude: 69.2401,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: false,
      search: false,
    }));
  }, []);

  const requestLocationPermission = async () => {
    setLocationPermissionGranted(true);

    // try {
    //   if (Platform.OS === "android") {
    //     const agree = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //       {
    //         title: "Разрешение на доступ к местоположению",
    //         message:
    //           "Нам необходимо разрешение для определения вашего текущего местоположения.",
    //         buttonNeutral: "Спросить позже",
    //         buttonNegative: "Отмена",
    //         buttonPositive: "OK",
    //       }
    //     );

    //     if (agree === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log(LocationServicesDialogBox)
    //       console.log("Разрешение получено");
    //       setLocationPermissionGranted(true);
    //       // Включение службы геолокации на Android
    //       LocationServicesDialogBox.checkLocationServicesIsEnabled({
    //         message: "<h2>Требуется включение геолокации</h2>Приложению необходимо включить службы геолокации для определения вашего текущего местоположения.",
    //         ok: "OK",
    //         cancel: "Отмена",
    //       }).then(() => {
    //         console.log("Геолокация включена");
    //       }).catch((error) => {
    //         console.log("Ошибка включения геолокации:", error.message);
    //       });
    //     } else {
    //       console.log("Разрешение отклонено");
    //     }
    //   } else {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status === "granted") {
    //       console.log("Разрешение получено");
    //       setLocationPermissionGranted(true);
    //     } else {
    //       console.log("Разрешение отклонено");
    //     }
    //   }
    // } catch (error) {
    //   console.warn("Ошибка запроса разрешений:", error);
    // }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("Текущее местоположение:", location.coords);
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.warn("Ошибка получения местоположения:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermissionGranted) {
      getCurrentLocation();
    }
  }, [locationPermissionGranted]);

  return (
    <SafeAreaView className="bg-white h-full">
      <View>
        {isFocused.station ? (
          <StationMap />
        ) : isFocused.map ? (
          <SearchMap />
        ) : (
          <View className="absolute z-20 w-[93vw] bottom-[2vh] mx-[3.5vw] rounded-md p-[2vw] bg-white">
            <SearchInp placeholder={t("searchText")} map={true} />
          </View>
        )}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsCompass={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={locationPermissionGranted}
          // showsMyLocationButton={locationPermissionGranted}
          onMapReady={() => {
            console.log("Карта готова");
            getCurrentLocation();
          }}
          // myLocationButtonEnabled={true}
          customMapStyle={{
            showsMyLocationButton: true,
          }}
          mapPadding={{ top: 40, right: 20, bottom: 40, left: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
