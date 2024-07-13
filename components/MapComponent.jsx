import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import MapView, { PROVIDER_OSM, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { useAtom } from "jotai";
import { focus } from "../values/atom/myAtoms";
import { icons } from "../constants";
import { fetchStations } from "../redux/slices/stations";

const initialRegion = {
  latitude: 41.2995,
  longitude: 69.2401,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = () => {
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

  const areStationsEqual = (oldStations, newStations) => {
    if (oldStations.length !== newStations.length) {
      return false;
    }
    for (let i = 0; i < oldStations.length; i++) {
      if (
        oldStations[i].key !== newStations[i].key ||
        oldStations[i].title !== newStations[i].title ||
        oldStations[i].coordinate.latitude !==
          newStations[i].coordinate.latitude ||
        oldStations[i].coordinate.longitude !==
          newStations[i].coordinate.longitude ||
        oldStations[i].state[0] !== newStations[i].state[0] ||
        oldStations[i].state[1] !== newStations[i].state[1]
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    dispatch(fetchStations());
  }, []);

  useEffect(() => {
    if (data.results) {
      let array = [];
      for (let index = 0; index < data.results.length; index++) {
        const station = data.results[index];
        array.push({
          key: station.charge_point_id,
          title: station.location.name,
          coordinate: {
            latitude: parseFloat(station.latitude), // Преобразуем в float, если это строки
            longitude: parseFloat(station.longitude),
          },
          state: [true, "not_working"],
        });
      }

      if (!areStationsEqual(stations, array)) {
        setStations(array);
      }
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
      return null;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (!locationPermissionGranted) {
      mapRef.current.animateToRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      });
    }
  }, [locationPermissionGranted]);

  useEffect(() => {
    if (stations.length > 0) {
      const formattedMarkers = stations.map((station) => ({
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
    console.log("Координаты маркера:", marker.coordinate);
    const markerImage = getMarkerImageSource(marker.state);
  
    return (
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}
        title={marker.title}
        onPress={() => {
          setIsFocused((prevUserState) => ({
            ...prevUserState,
            map: false,
            station: true,
          }));
        }}
      >
        <Image source={markerImage} className="w-[25vw] h-[25vw]" />
      </Marker>
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

  const handleScanPress = () => {
    setIsFocused((prevUserState) => ({
      ...prevUserState,
      camera: true,
    }));
  };

  return (
    <View className="absolute b-0 w-[100vw] h-[100vh] z-1">
      <TouchableOpacity
        style={styles.followButton}
        className="absolute mb-[15vh]"
        onPress={handlePress}
      >
        <Image source={icons.locationBtn} style={{ width: 80, height: 80 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screenButton}
        className="absolute mb-[15vh]"
        onPress={handleScanPress}
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
          console.log("Карта готова");
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
        mapPadding={{ top: 20, right: 0, bottom: 40, left: 20 }}
      >
        {markers.map((marker) => (
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
  container: {
    flex: 1,
    justifyContent: "start",
    zIndex: 99,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  followButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
    width: 80,
    height: 80,
  },
  screenButton: {
    position: "absolute",
    bottom: 0,
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
