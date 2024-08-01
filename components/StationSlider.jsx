import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import Pagination from "./Pagination";
import { icons } from "../constants";
import { useTranslation } from "react-i18next";
import StationInputBox from "./StationInputBox";

const StationSlider = () => {
  const [path, setPath] = useState(0);
  const { t, i18 } = useTranslation();
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const myArray = [
    {
      title: t("stationSlider_3"),
      img: icons.battery,
      size:
        Platform.OS !== "android" ? "w-[5vw] h-[3.8vh]" : "w-[5vw] h-[4vh]",
    },
    {
      title: t("stationSlider_4"),
      img: icons.zip,
      size: Platform.OS !== "android" ? "w-[4vw] h-[3.6vh]" : "w-[4vw] h-[4.1vh]",
      cost: "50",
      const_1: t('kw')
    },
    {
      title: t("stationSlider_5"),
      img: icons.som,
      size: Platform.OS !== "android" ? "w-[10.58vw] h-[2vh]" : "w-[10.2vw] h-[2.1vh]",
      cost: "50 000",
      const_1: t('sum')
    },
    {
      title: t("stationSlider_6"),
      img: icons.stateClock,
      size: Platform.OS !== "android" ? "w-[3.41vh] h-[3.4vh]" : "w-[3.42vh] h-[3.4vh]",
      cost: "90",
      const_1: t('min')
    },
    {
      title: t("stationSlider_6"),
      img: icons.persent,
      size: Platform.OS !== "android" ? "w-[3vh] h-[2.5vh]" : "w-[3.6vh] h-[3vh]",
      cost: "80",
      const_1: '%'
    },
  ];

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          console.log("left");
          handleSwipe("left");
        } else if (gestureState.dx < -50) {
          console.log("right");
          handleSwipe("right");
        }
      },
    })
  ).current;

  const handleSwipe = (direction) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setPath((prevPath) => {
        if (direction === "left" && prevPath > 0) {
          return prevPath - 1;
        } else if (direction === "right" && prevPath < myArray.length - 1) {
          return prevPath + 1;
        } else if (direction === "right" && prevPath === myArray.length - 1) {
          return 0;
        } else {
          return myArray.length - 1;
        }
        // return prevPath;
      });
    });
  };

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <Animated.View
      className="flex-row justify-between border-2 border-grayColor-600 mt-[2vh] rounded-2xl px-[4vw] py-[3vh]"
      {...panResponder.panHandlers}
      style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}
    >
      <View>
        <View className="flex-row justify-between">
          <View>
            <Text>{t("stationSlider_1")}</Text>
            <View className="flex-row items-center h-[6vh]">
              <Image
                source={myArray[path].img}
                className={myArray[path].size}
              />
              <Text className="font-robotoMedium text-lg ml-[1vw]">
                {myArray[path].title}
              </Text>
            </View>
          </View>
          {path === 0 ? (
            ""
          ) : (
            <StationInputBox text={myArray[path].cost} text_1={myArray[path].const_1}/>

)}
        </View>
        <View className="flex-row items-end justify-between w-full">
          <Text className="w-[60vw] font-robotoRegular text-xs color-grayColor-500">
            {t("stationSlider_2")}
          </Text>
          <Pagination
            sum={myArray.length}
            active={path + 1}
            slider={true}
            otherStyles="gap-1"
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default StationSlider;
