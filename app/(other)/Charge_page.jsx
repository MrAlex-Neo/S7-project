import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, Platform } from "react-native";
import { icons } from "../../constants";
import CircleAnimation from "../../components/CircleAnimation";
import PrimaryButton from "../../components/PrimaryButton";
import { images } from "../../constants";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { activeStation } from "../../values/atom/myAtoms";
import { useAtom } from "jotai";

const Charge_page = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [step, setStep] = useState(2);
  const [popup, setPopup] = useState(false);
  const [active, setActive] = useAtom(activeStation);
  // const websocketUrl = active.websocket_url.replace("localhost", "s7energy.uz");
  const [webSocket, setWebSocket] = useState(null); // Состояние для хранения WebSocket
  const [message, setMessage] = useState("");
  const [socetActive, setSocetActive] = useState("");
  console.log(active);
  useEffect(() => {
    if (!active || !active.websocket_url) {
      console.error("WebSocket URL not found");
      return;
    }
    console.log("active.websocket_url", active.websocket_url);
    const websocketUrl = active.websocket_url.replace(
      "localhost",
      "s7energy.uz"
    );
    console.log("websocketUrl", websocketUrl);

    if (webSocket) {
      webSocket.close(); // Закрываем текущее WebSocket соединение перед созданием нового
      setSocetActive(false);
    }

    const ws = new WebSocket(websocketUrl);
    setWebSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket соединение установлено");
      // Можно отправить сообщение на сервер, если нужно
      // ws.send(JSON.stringify({ type: "START_CHARGING" }));
      // ws.send(JSON.stringify([{ id: 2 }]));
      setSocetActive(true);
      console.log("ws.readyState", ws.readyState === WebSocket.OPEN);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено сообщение от WebSocket:", data);

      // Пример обработки сообщения
      if (data.type === "CHARGE_STATUS") {
        setStep(data.step); // Обновляем шаг процесса зарядки
      }
    };
    ws.onclose = (event) => {
      console.log(
        "WebSocket закрыт, код:",
        event.code,
        "причина:",
        event.reason
      );
    };

    ws.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    // Здесь мы не закрываем WebSocket автоматически при размонтировании компонента
    // return () => {
    //   ws.close();
    // };
  }, [active.websocket_url]);

  useEffect(() => {
    if (socetActive) {
      let message = [
        2,
        "05b7e2ba-0001-76c1-98eb-d24170053f9a",
        "BootNotification",
        {
          chargePointVendor: active.manufacturer,
          chargePointModel: active.model,
          chargePointSerialNumber: active.id,
          firmwareVersion: "V1.3@cbe040c+58,F0.gl,ws,ESP32",
        },
      ];
      sendMessage(message);
    }
  }, [socetActive]);

  const sendMessage = (messageToSend) => {
    console.log("sendMessage");
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify(messageToSend));
      console.log("Сообщение отправлено:", messageToSend);
    } else {
      console.log("WebSocket не подключен или не готов к отправке сообщений");
    }
  };

  // Функция для закрытия WebSocket соединения
  const closeWebSocketConnection = () => {
    if (webSocket) {
      webSocket.close();
      console.log("WebSocket соединение закрыто вручную");
      setWebSocket(null); // Сбрасываем состояние
    }
  };

  const resetStack = () => {
    console.log("resetStack");
    closeWebSocketConnection();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(other)", params: { screen: "Charge_end" } }], // Сброс стека и переход на вкладку "map"
      })
    );
  };
  // [] означает, что useEffect будет запущен только один раз при монтировании

  return (
    <SafeAreaView className="bg-white absolute bottom-0 h-[100vh]">
      <View
        className={`justify-between w-full flex-1 pb-[2vh] px-[5vw] bg-white ${
          Platform.OS !== "android" ? "pt-[2vh]" : "pt-[4vh]"
        }`}
      >
        <View className="flex-row justify-between">
          <Text className="font-robotoMedium text-xl">
            {t("charging_process")}
          </Text>
          <Image source={icons.chat} className="w-[6vw] h-[6vw]" />
        </View>
        <CircleAnimation step={step} kw="30" />
        <View className="p-[5vw] border-2 border-grayColor-600 rounded-xl bg-grayColor-200">
          <View className="flex-row justify-between">
            <View className="items-center w-[50%] pb-[4vh] pt-[2vh] border-b-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">
                {t("charging_time")}
              </Text>
              <Text className="font-robotoBold text-xl">00:14:56</Text>
            </View>
            <View className="items-center w-[50%] pb-[4vh] pt-[2vh] border-b-2 border-l-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">{t("percent")}</Text>
              <Text className="font-robotoBold text-xl">40%</Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="items-center w-[50%] pt-[4vh] pb-[2vh] ">
              <Text className="font-robotoRegular text-sm">
                {t("stationSlider_4")}
              </Text>
              <Text className="font-robotoBold text-xl">12.24 Amp</Text>
            </View>
            <View className="items-center w-[50%] pt-[4vh] pb-[2vh] border-l-2 border-grayColor-600">
              <Text className="font-robotoRegular text-sm">{t("amount")}</Text>
              <Text className="font-robotoBold text-xl">$5.25</Text>
            </View>
          </View>
        </View>
        <PrimaryButton
          title={t("charge_page_4")}
          containerStyles="bg-secondary w-full mr-2"
          textStyles="text-white"
          isLoading={false}
          handlePress={() => {
            sendMessage(JSON.stringify({ id: 2 }));
            setPopup(true);
          }}
        />
      </View>
      {popup ? (
        <View
          className="absolute bottom-0 justify-center w-full h-[100vh] z-20"
          style={{ backgroundColor: "rgba(108, 122, 137, 0.5)" }}
        >
          <View className="bg-white w-[90vw] mx-[5vw] items-center px-[5vw] py-[10vw] rounded-xl">
            <Image
              source={images.popupBatery}
              className={`h-[8.1vh] w-[8.1vh] mb-[2vh] `}
            />
            <Text className="font-robotoRegular text-2xl text-center mb-[2vh]">
              {t("charge_page_1")}
            </Text>
            <Text className="font-robotoRegular text-sm text-center mb-[4vh]">
              {`${t("charge_page_2")} 50%`}
            </Text>
            <View className="w-full flex-row justify-between mx-4">
              <PrimaryButton
                title={t("cancel")}
                containerStyles="bg-secondary w-[38vw] px-[0] py-[1.4vh] mr-[1vw]"
                textStyles="text-white text-center font-robotoRegular text-sm"
                handlePress={() => setPopup(false)}
              />
              <PrimaryButton
                title={t("charge_page_3")}
                containerStyles="bg-white border-red border-2 w-[38vw] px-[0] py-[1.4vh] ml-[1vw]"
                textStyles="text-red text-center font-robotoRegular text-sm"
                handlePress={resetStack}
              />
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Charge_page;
