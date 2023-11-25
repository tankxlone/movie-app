import React from "react";
import { Dimensions, Image, Text, Pressable, View } from "react-native";
import HTML from "react-native-render-html";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ item: movie }) => {
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

  const navigation = useNavigation();

  return (
    <View className="mb-2 space-y-4" key={movie.item.show.id}>
      <View className="p-4" key={movie.item.show.id}>
        <Pressable onPress={() => navigation.push("Movie", movie)}>
          <View className="space-y-2 mr-4">
            <View className="flex-row mb-2">
              {movie.item.show.image && movie.item.show.image.original ? (
                <Image
                  source={{
                    uri: movie.item.show.image.original,
                  }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
              ) : (
                <Image
                  source={require("../assets/images/no-pictures.png")}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
              )}
              <Text className="text-white text-3xl font-semibold p-4">
                {movie.item.show.name}
              </Text>
            </View>
            <View className="w-[380px]">
              <HTML
                contentWidth={width * 0.33}
                source={{ html: movie.item.show.summary }}
                tagsStyles={tagsStyles}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieCard;
