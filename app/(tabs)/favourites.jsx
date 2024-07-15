import { View, Text, ScrollView, SafeAreaView, Platform } from "react-native";
import SearchInput from "../../components/SearchInp";
import { useTranslation } from "react-i18next";
import StationCard from "../../components/StationCard";

const Favourites = () => {
  const { t, i18n } = useTranslation();
  

  return (
    <SafeAreaView className="bg-white h-[100vh] pt-[4vh] absolute top-0">
      <View className="w-full flex-1 px-[5vw] bg-white">
        <Text className="text-2xl font-robotoMedium mb-[2vh] mt-[2vh]">
          {t("favourites")}
        </Text>
        <SearchInput placeholder={t("searchText")} />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View className={`flex-col pt-[1vh]  ${Platform.OS === 'android' ? 'pb-[7vh]' : 'pb-[12vh]'}`}>
            <StationCard busy={true} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={true} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={true} />
            <StationCard busy={false} />
            <StationCard busy={false} />
            <StationCard busy={true} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
