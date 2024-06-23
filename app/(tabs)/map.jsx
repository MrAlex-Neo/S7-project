import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import SearchInp from "../../components/SearchInp";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms";
import StationMap from "../../components/StationMap";
import SearchMap from "../../components/SearchMap";

const Map = () => {
  const { t } = useTranslation();
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isFocused, setIsFocused] = useAtom(focus);
  const [searchMap, setSearchMap] = useState(false);
  const initialRegion = {
    latitude: 41.2995,
    longitude: 69.2401,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const randomPoints = [
    // { latitude: 41.307129, longitude: 69.250271 },
    { latitude: 41.303087, longitude: 69.231691 },
    // { latitude: 41.293191, longitude: 69.226208 },
    // { latitude: 41.306143, longitude: 69.258194 },
    // { latitude: 41.311258, longitude: 69.26387 },
    // { latitude: 41.312709, longitude: 69.233765 },
    // { latitude: 41.295798, longitude: 69.24915 },
    // { latitude: 41.297592, longitude: 69.219187 },
    { latitude: 41.301385, longitude: 69.253649 },
    // { latitude: 41.298681, longitude: 69.256328 },
    { latitude: 41.31152, longitude: 69.243847 },
    // { latitude: 41.300563, longitude: 69.265701 },
    // { latitude: 41.292478, longitude: 69.235732 },
    // { latitude: 41.310612, longitude: 69.225128 },
    // { latitude: 41.309439, longitude: 69.251141 },
    // { latitude: 41.296612, longitude: 69.260572 },
    // { latitude: 41.294521, longitude: 69.241978 },
    { latitude: 41.304597, longitude: 69.229359 },
    { latitude: 41.299012, longitude: 69.233501 },
    // { latitude: 41.297035, longitude: 69.263248 },
  ];

  const mapRef = useRef(null);

  useEffect(() => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: false,
      search: false,
    }));
  }, []);
  useEffect(() => {
    if (!isFocused.map) {
      setSearchMap(false);
    } else {
      setSearchMap(true);
    }
  }, [isFocused.map]);

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

  const handleMarkerPress = (index) => {
    console.log(index);
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

  const filterVisiblePoints = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const latMin = latitude - latitudeDelta / 2;
    const latMax = latitude + latitudeDelta / 2;
    const lonMin = longitude - longitudeDelta / 2;
    const lonMax = longitude + longitudeDelta / 2;

    const visible = randomPoints.filter((point) => {
      return (
        point.latitude >= latMin &&
        point.latitude <= latMax &&
        point.longitude >= lonMin &&
        point.longitude <= lonMax
      );
    });

    setMarkers(
      visible.map((point, index) => ({
        key: index.toString(),
        coordinate: {
          latitude: point.latitude,
          longitude: point.longitude,
        },
        title: `Point ${index + 1}`,
      }))
    );
  };

  useEffect(() => {
    if (currentRegion) {
      filterVisiblePoints(currentRegion);
    }
  }, [currentRegion]);

  const handlePress = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      map: true,
    }));
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="h-full">
        {isFocused.station ? (
          <StationMap />
        ) : isFocused.map ? (
          <SearchMap />
        ) : (
          <View className="absolute z-20 w-[93vw] bottom-[2vh] mx-[3.5vw] rounded-md p-[2vw] bg-white">
            <TouchableOpacity onPress={handlePress}>
              <SearchInp placeholder={t("searchText")} map={searchMap} />
            </TouchableOpacity>
          </View>
        )}
        <View className="absolute b-0 w-[100vw] h-[100vh] z-1">
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            showsCompass={true}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={locationPermissionGranted}
            onMapReady={() => {
              console.log("Карта готова");
              getCurrentLocation();
            }}
            onRegionChangeComplete={(region) => {
              setCurrentRegion(region);
            }}
            mapPadding={{ top: 60, right: 20, bottom: 40, left: 20 }}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                title={marker.title}
                onPress={() => handleMarkerPress(marker.key)}
              >
                <Image
                  source={require("../../assets/s7/icons/flag.png")}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
