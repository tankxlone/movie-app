import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import HTML from "react-native-render-html";
import {
  Dimensions,
  Image,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
const Stack = createNativeStackNavigator();

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: movie } = useRoute();

  const navigation = useNavigation();

  // Define styles for specific HTML tags
  const tagsStyles = {
    p: {
      marginBottom: 2,
      marginTop: -5,
      fontSize: 16,
      lineHeight: 20,
      color: "#fff",
    }, // Adjust these styles as needed
    b: { fontWeight: "bold" },
  };

  return (
    <SafeAreaView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <Stack.Screen
        options={{
          headerTitle: "",
        }}
      />

      <>
        <ScrollView>
          <StatusBar />
          <View>
            {movie.item.show.image && movie.item.show.image.original ? (
              <Image
                source={{
                  uri: movie.item.show.image.original,
                }}
                style={{ width, height: height * 0.88 }}
              />
            ) : (
              <Image
                source={require("../assets/images/no-pictures.png")}
                style={{ width, height: height * 0.88 }}
              />
            )}
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>

          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-wideset">
              {movie?.item?.show?.name}
            </Text>
          </View>

          {movie?.item?.show ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.item?.show?.status} •{" "}
              {movie?.item?.show?.premiered?.split("-")[0] || "N/A"} •{" "}
              {movie?.item?.show?.runtime} min
            </Text>
          ) : null}

          {/* genres  */}
          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.item?.show?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.item.show.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                >
                  {genre} {showDot ? "•" : null}
                </Text>
              );
            })}
          </View>

          {/* description */}

          <View className="w-[380px] m-4">
            <HTML
              contentWidth={width * 0.33}
              source={{ html: movie.item.show.summary }}
              tagsStyles={tagsStyles}
            />
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
}
