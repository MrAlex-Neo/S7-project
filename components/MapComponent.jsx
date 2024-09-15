import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text,
} from "react-native";
import MapView, { PROVIDER_OSM, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Location from "expo-location";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";
import { charge } from "../values/atom/myAtoms";
import { icons } from "../constants";
import { fetchStations } from "../redux/slices/stations";
import { useIsFocused } from "@react-navigation/native";
import { error } from "../values/atom/myAtoms";
import { activeStation } from "../values/atom/myAtoms";
import AnimatedButton from "./AnimatedButton";
import { router } from "expo-router";
import Marker_map from "./Marker_map";

const initialRegion = {
  latitude: 41.2995,
  longitude: 69.2401,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = ({}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stations.stations.items);
  const { t } = useTranslation();
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [isFocused, setIsFocused] = useAtom(focus);
  const [followUser, setFollowUser] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [stations, setStations] = useState([]);
  const mapRef = useRef(null);
  const [charging, setCharging] = useAtom(charge);
  const [isError, setIsError] = useAtom(error);
  const [active, setActive] = useAtom(activeStation);

  const memoizedMarkers = useMemo(() => markers, [markers]);

  // const areStationsEqual = (oldStations, newStations) => {
  //   if (oldStations.length !== newStations.length) {
  //     return false;
  //   }
  //   for (let i = 0; i < oldStations.length; i++) {
  //     if (
  //       oldStations[i].key !== newStations[i].key ||
  //       oldStations[i].title !== newStations[i].title ||
  //       oldStations[i].coordinate.latitude !==
  //         newStations[i].coordinate.latitude ||
  //       oldStations[i].coordinate.longitude !==
  //         newStations[i].coordinate.longitude ||
  //       oldStations[i].state[0] !== newStations[i].state[0] ||
  //       oldStations[i].state[1] !== newStations[i].state[1]
  //     ) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  useEffect(() => {
    dispatch(fetchStations());
  }, []);

  useEffect(() => {
    try {
      // console.log('data.results', data.results)
      if (data.results) {
        let array = [];
        for (let index = 0; index < data.results.length; index++) {
          const station = data.results[index];
          // console.log("station", station);
          array.push({
            charge_point_id: station.charge_point_id,
            key: station.charge_point_id,
            title: station.location.name,
            websocket_url: station.websocket_url,
            manufacturer: station.manufacturer,
            model: station.model,
            coordinate: {
              latitude: parseFloat(station.latitude), // Преобразуем в float, если это строки
              longitude: parseFloat(station.longitude),
            },
            state: [true, "not_working"],
          });
        }
        setStations(array);
      }
    } catch (error) {
      console.log(error);
      setIsError((prev) => ({
        ...prev,
        state: true,
      }));
    }
  }, [data.results]);

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
      setIsError((prev) => ({
        ...prev,
        state: true,
      }));
      return null;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // useEffect(() => {
  //   if (!locationPermissionGranted) {
  //     mapRef.current.animateToRegion({
  //       latitude: initialRegion.latitude,
  //       longitude: initialRegion.longitude,
  //       latitudeDelta: initialRegion.latitudeDelta,
  //       longitudeDelta: initialRegion.longitudeDelta,
  //     });
  //   }
  // }, [locationPermissionGranted]);

  useEffect(() => {
    if (stations.length > 0) {
      // console.log('stations', stations)
      const formattedMarkers = stations.map((station) => ({
        charge_point_id: station.charge_point_id,
        websocket_url: station.websocket_url,
        manufacturer: station.manufacturer,
        model: station.model,
        key: station.key,
        title: station.title,
        coordinate: {
          latitude: station.coordinate.latitude,
          longitude: station.coordinate.longitude,
        },
        state: station.state,
      }));
      setMarkers(formattedMarkers);
    }
  }, [stations]);

  const getMarkerImageSource = (state) => {
    let obj = {
      one: state[0],
      two: state[1],
    };
    return obj;
  };

  const CustomMarker = ({ marker, getMarkerImageSource }) => {
    const isFocused = useIsFocused();
    const obj = getMarkerImageSource(marker.state);
    // console.log("marker", marker);

    return (
      <>
        {/* {Platform.OS === "android" && isFocused ? (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            image={markerImage}
            className="bg-black"
            onPress={() => {
              setActive((prev) => ({
                ...prev,
                id: marker.charge_point_id,
              }));
              setIsFocused((prevUserState) => ({
                ...prevUserState,
                map: false,
                station: true,
              }));
            }}
          />
        ) : ( */}
        {isFocused && (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            tracksViewChanges={false}
            onPress={() => {
              setActive((prev) => ({
                ...prev,
                id: marker.charge_point_id,
                websocket_url: marker.websocket_url,
                manufacturer: marker.manufacturer,
                model: marker.model,
              }));
              setIsFocused((prevUserState) => ({
                ...prevUserState,
                map: false,
                station: true,
              }));
            }}
          >
            {/* <Image source={markerImage} className="w-[30vw] h-[30vw]" /> */}
            <Marker_map state={obj} power={20} />
          </Marker>
        )}
        {/* )} */}
      </>
      // <Marker
      //   key={marker.key}
      //   coordinate={marker.coordinate}
      //   title={marker.title}
      //   image={markerImage}
      //   className="bg-black"
      //   onPress={() => {
      //     setIsFocused((prevUserState) => ({
      //       ...prevUserState,
      //       map: false,
      //       station: true,
      //     }));
      //   }}
      // />
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  const handleMapPress = (event) => {
    Platform.OS !== "android"
      ? !event.nativeEvent.action &&
        setIsFocused((prevUserState) => ({
          ...prevUserState,
          station: false,
        }))
      : setIsFocused((prevUserState) => ({
          ...prevUserState,
          station: false,
        }));
  };

  return (
    <View className="absolute b-0 w-[100vw] h-[100%] z-1">
      <TouchableOpacity
        className={`absolute right-[1vw] z-10 ${
          Platform.OS === "android" ? "bottom-[10vh]" : "bottom-[8vh]"
        }`}
        onPress={handlePress}
      >
        <Image source={icons.locationBtn} style={{ width: 80, height: 80 }} />
      </TouchableOpacity>
      {charging.state ? (
        <AnimatedButton />
      ) : // <TouchableOpacity
      //   className={`absolute z-[10] ${
      //     Platform.OS === "android" ? "bottom-[13vh]" : "bottom-[10vh]"
      //   } left-[5vw] bg-secondary justify-center items-center rounded-lg w-[14vw] h-[9vw]`}
      // >
      //   <Text className="text-white font-robotoRegular text-xl pl-[1vw] pb-[0.2vw]">
      //     {charging.sum}%
      //   </Text>
      // </TouchableOpacity>
      null}
      <TouchableOpacity
        className={`absolute z-[10] right-[17vw] ${
          Platform.OS === "android" ? "bottom-[10vh]" : "bottom-[8vh]"
        }`}
        onPress={() => router.push("/CameraPage")}
      >
        <Image source={icons.screenBtn} style={{ width: 80, height: 80 }} />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsCompass={true}
        provider={PROVIDER_OSM} // Использование OSM вместо Google Maps
        showsUserLocation={locationPermissionGranted}
        showsMyLocationButton={false}
        onPress={handleMapPress}
        onUserLocationChange={(userLocation) => {
          if (followUser) {
            mapRef.current.animateToRegion(
              {
                latitude: userLocation.nativeEvent.coordinate.latitude,
                longitude: userLocation.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              1000
            );
          }
          setFollowUser(false);
        }}
        onMapReady={() => {
          // console.log("Карта готова");
          if (locationPermissionGranted) {
            getCurrentLocation().then((coords) => {
              if (coords && mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }
            });
          }
        }}
        // mapPadding={{ top: 20, right: 0, bottom: 40, left: 20 }}
      >
        {memoizedMarkers.map((marker) => (
          <CustomMarker
            key={marker.key} // и здесь
            marker={marker}
            getMarkerImageSource={getMarkerImageSource}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  followButton: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 0 : 20,
    right: 0,
    zIndex: 1,
    width: 80,
    height: 80,
  },
  screenButton: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 0 : 20,
    right: 60,
    zIndex: 1,
    width: 80,
    height: 80,
  },
  chargeButton: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 0 : 20,
    left: 15,
    zIndex: 1,
    width: 60,
    height: Platform.OS === "android" ? 35 : 40,
  },
});

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
