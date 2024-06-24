import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  Button,
} from "react-native";
import * as Location from "expo-location";
import { Camera } from "expo-camera"; // Изменили импорт
import SearchInp from "../../components/SearchInp";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { focus } from "../../values/atom/myAtoms";
import StationMap from "../../components/StationMap";
import SearchMap from "../../components/SearchMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../redux/slices/stations";
import { icons, images } from "../../constants";
import CameraModal from "../../components/CameraModal"; // Изменили импорт

const initialRegion = {
  latitude: 41.2995,
  longitude: 69.2401,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stations.stations);
  const { t } = useTranslation();
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [isFocused, setIsFocused] = useAtom(focus);
  const [searchMap, setSearchMap] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Переменная для отображения модального окна
  const mapRef = useRef(null);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

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

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermissionGranted(true);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      return location.coords;
    } catch (error) {
      console.warn("Ошибка получения местоположения:", error);
      return null;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermissionGranted) {
      (async () => {
        const coords = await getCurrentLocation();
        if (coords && mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      })();
    }
  }, [locationPermissionGranted]);

  useEffect(() => {
    const randomPoints = [
      {
        key: 101234,
        title: `Point 1`,
        coordinate: { latitude: 41.303087, longitude: 69.231691 },
        state: [true, "not_working"],
      },
      {
        key: 523451,
        title: `Point 2`,
        coordinate: { latitude: 41.301385, longitude: 69.253649 },
        state: [false, "not_working"],
      },
      {
        key: 247382,
        title: `Point 3`,
        coordinate: { latitude: 41.31152, longitude: 69.243847 },
        state: ["not_working", "not_working"],
      },
      {
        key: 310239,
        title: `Point 4`,
        coordinate: { latitude: 41.316612, longitude: 69.215128 },
        state: [true, false],
      },
      {
        key: 434850,
        title: `Point 5`,
        coordinate: { latitude: 41.304597, longitude: 69.229359 },
        state: [true, true],
      },
      {
        key: 515932,
        title: `Point 6`,
        coordinate: { latitude: 41.299012, longitude: 69.233501 },
        state: [false, false],
      },
    ];
    const formattedMarkers = randomPoints.map((station) => ({
      key: station.key,
      title: station.title,
      coordinate: {
        latitude: station.coordinate.latitude,
        longitude: station.coordinate.longitude,
      },
      state: station.state,
    }));
    setMarkers(formattedMarkers);
  }, []);

  const getMarkerImageSource = (state) => {
    if (state[0] === true && state[1] === true) {
      return icons.marker_active_active;
    } else if (state[0] === false && state[1] === false) {
      return icons.marker_busy_busy;
    } else if (state[0] === "not_working" && state[1] === "not_working") {
      return icons.marker_notWorking_notWorking;
    } else if (state[0] === true && state[1] === "not_working") {
      return icons.marker_active_notWorking;
    } else if (state[0] === false && state[1] === "not_working") {
      return icons.marker_notWorking_busy;
    } else {
      return icons.marker_active_busy;
    }
  };

  const CustomMarker = ({ marker, getMarkerImageSource }) => {
    const markerImage = getMarkerImageSource(marker.state);
    return (
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}
        title={marker.title}
        image={markerImage}
      />
    );
  };

  const handlePress = async () => {
    setFollowUser(true);
    const coords = await getCurrentLocation();
    if (coords && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const handleScanPress = () => {
    setModalVisible(true); // Показываем модальное окно при нажатии на сканирование
  };

  const handleMapPress = () => {
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
            <TouchableOpacity onPress={handleMapPress}>
              <SearchInp placeholder={t("searchText")} map={searchMap} />
            </TouchableOpacity>
          </View>
        )}
        <View className="absolute b-0 w-[100vw] h-[100vh] z-1">
          <TouchableOpacity
            style={styles.followButton} // Изменено для использования стиля
            onPress={handlePress}
          >
            <Image
              source={icons.locationBtn}
              style={{ width: 80, height: 80 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.screenButton} // Изменено для использования стиля
            onPress={handleScanPress}
          >
            <Image source={icons.screenBtn} style={{ width: 80, height: 80 }} />
          </TouchableOpacity>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            showsCompass={true}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={locationPermissionGranted}
            showsMyLocationButton={false}
            onUserLocationChange={(userLocation) => {
              if (followUser) {
                mapRef.current.animateToRegion(
                  {
                    latitude: userLocation.nativeEvent.coordinate.latitude,
                    longitude: userLocation.nativeEvent.coordinate.longitude,
                    latitudeDelta: initialRegion.latitudeDelta,
                    longitudeDelta: initialRegion.longitudeDelta,
                  },
                  1000
                );
              }
              setFollowUser(false);
            }}
            onMapReady={() => {
              console.log("Карта готова");
              if (locationPermissionGranted) {
                getCurrentLocation().then((coords) => {
                  if (coords && mapRef.current) {
                    mapRef.current.animateToRegion({
                      latitude: coords.latitude,
                      longitude: coords.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    });
                  }
                });
              }
            }}
            mapPadding={{ top: 20, right: 0, bottom: 40, left: 20 }}
          >
            {markers.map((marker) => (
              <CustomMarker
                key={marker.key}
                marker={marker}
                getMarkerImageSource={getMarkerImageSource}
              />
            ))}
          </MapView>
        </View>
        {modalVisible && (
          <CameraModal // Используем CameraModal для сканирования
            modalVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  followButton: {
    position: "absolute",
    bottom: 130,
    right: 0,
    zIndex: 1,
    width: 80,
    height: 80,
  },
  screenButton: {
    position: "absolute",
    bottom: 130,
    right: 60,
    zIndex: 1,
    width: 80,
    height: 80,
  },
});

// const randomPoints = [
//   {
//     key: 0,
//     title: `Point 1`,
//     coordinate: { latitude: 41.303087, longitude: 69.231691 },
//     state: [true, "not_working"],
//   },
//   {
//     key: 1,
//     title: `Point 2`,
//     coordinate: { latitude: 41.301385, longitude: 69.253649 },
//     state: [false, "not_working"],
//   },
//   {
//     key: 2,
//     title: `Point 3`,
//     coordinate: { latitude: 41.31152, longitude: 69.243847 },
//     state: ["not_working", "not_working"],
//   },
//   {
//     key: 3,
//     title: `Point 4`,
//     coordinate: { latitude: 41.316612, longitude: 69.215128 },
//     state: [true, false],
//   },
//   {
//     key: 4,
//     title: `Point 5`,
//     coordinate: { latitude: 41.304597, longitude: 69.229359 },
//     state: [true, true],
//   },
//   {
//     key: 5,
//     title: `Point 6`,
//     coordinate: { latitude: 41.299012, longitude: 69.233501 },
//     state: [false, false],
//   },
// ];

// const handleLocationButtonPress = () => {
//   if (locationPermissionGranted) {
//     getCurrentLocation();
//   } else {
//     requestLocationPermission().then(() => {
//       if (locationPermissionGranted) {
//         getCurrentLocation();
//       }
//     });
//   }
// };

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
