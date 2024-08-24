import { View, Text, StyleSheet, Platform } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

const Marker_map = ({ state, power }) => {
  const { t, i18n } = useTranslation();
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");

  useEffect(() => {
    console.log(state);
    if (state.one === true) {
      setOne("secondary");
    } else if (state.one === false) {
      setOne("red");
    } else {
      setOne("gray");
    }

    if (state.two === true) {
      setTwo("secondary");
    } else if (state.two === false) {
      setTwo("red");
    } else {
      setTwo("gray");
    }
  }, [state]);

  // Здесь создаем динамический стиль на основе текущего состояния
  const dynamicStyles = {
    borderRightColor: styles[one] ? styles[one].color : "gray",
    borderLeftColor: styles[two] ? styles[two].color : "gray",
    borderTopColor: styles[one] ? styles[one].color : "gray",
    borderBottomColor: styles[two] ? styles[two].color : "gray",
  };

  return (
    <View className="justify-center items-center">
      <View
        style={[styles.marker, dynamicStyles, Platform.OS === "android" ? styles.child : '']}
        className={`bg-white ${
          Platform.OS !== "android" ? "rounded-full w-[14vw] h-[14vw] " : ""
        } absolute z-10 justify-center items-center`}
      ></View>
        <View className="bg-white w-[1vw] h-[2vw] absolute z-50 top-0"></View>
        <View className="bg-white w-[1vw] h-[2vw] absolute z-50 bottom-0"></View>
      <View
        style={[Platform.OS === "android" ? styles.child : '']}
        className={`bg-white ${
          Platform.OS !== "android" ? " w-[14vw] h-[14vw] " : ""
        } rounded-full justify-center items-center`}
      >
        <Text style={[Platform.OS === "android" ? styles.text : styles.text_1]} className="font-robotoMedium">
          {power}
        </Text>
        <Text style={[Platform.OS === "android" ? styles.text : styles.text_1]} className="font-robotoMedium">
          {t("kw")}
        </Text>
      </View>
    </View>
  );
};

export default Marker_map;

const styles = StyleSheet.create({
  marker: {
    borderWidth: 5,
    transform: "rotate(45deg)",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderRadius: 25,
  },
  child: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 13,
    lineHeight: 13,
  },
  text_1: {
    fontSize: 15,
    lineHeight: 15,
  },
  secondary: {
    color: "#19B775", // Зеленый цвет
  },
  red: {
    color: "red", // Красный цвет
  },
  gray: {
    color: "#DADADA", // Серый цвет
  },
});
