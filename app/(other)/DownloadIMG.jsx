import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { fetchAuthMe, fetchUpdate } from "../../redux/slices/auth";
import { icons, images } from "../../constants";

const DownloadIMG = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const data = useSelector((state) => state.auth?.data);
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const resetStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(user_menu)", params: { screen: "UpdateUser" } }],
      })
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleDownload = async () => {
    console.log('handleDownload')
    if (!image) {
      console.log("No image selected");
      return;
    }

    let date = moment().format('YYYYMMDDhhmmss');
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;

    try {
      const res = await FileSystem.downloadAsync(image, fileUri);
      saveFile(res.uri);
      await uploadImage(fileUri); // Upload the image to the server
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  const saveFile = async (fileUri) => {
    console.log('saveFile')

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (err) {
        console.log("Save err: ", err);
      }
    } else if (status === "denied") {
      alert("please allow permissions to download");
    }
  };

  const uploadImage = async (fileUri) => {
    console.log('uploadImage')

    const formData = new FormData();
    formData.append('picture', {
      uri: fileUri,
      name: `${moment().format('YYYYMMDDhhmmss')}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const result = await dispatch(fetchUpdate(formData));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-black absolute b-0 h-full justify-between mt-[4vh] py-[4vh]">
      <View className="w-full px-[5vw] bg-black">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={resetStack}>
            <Image
              source={icons.backBtnWhite}
              className="w-[6vw] h-[5.1vw] p-[2vw]"
            />
          </TouchableOpacity>
          <Text className="font-robotoMedium text-xl ml-[4vw] color-white">
            {t("download_img_1")}
          </Text>
        </View>
      </View>
      <View className="w-[100vw] h-[40vh] items-center bg-grayColor-900">
        <Image
          source={
            data && data?.data?.picture
              ? { uri: data.data.picture }
              : images.userPhotoDefault
          }
          className="w-[40vh] h-[40vh] rounded-full"
        />
      </View>
      <View className="flex-row justify-around">
        <TouchableOpacity
          className="items-center mb-[4vh] justify-between"
          onPress={pickImage}
        >
          <Image source={icons.change_photo} className="w-[8vw] h-[8vw]" />
          <Text className="color-white font-robotoMedium text-xs text-center mt-[1vh]">
            {t("download_img_2")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center mb-[4vh] justify-between"
          onPress={handleDownload}
        >
          <Image source={icons.delete_photo} className="w-[8vw] h-[8vw]" />
          <Text className="color-white font-robotoMedium text-xs text-center mt-[1vh]">
            {t("download_img_3")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DownloadIMG;
