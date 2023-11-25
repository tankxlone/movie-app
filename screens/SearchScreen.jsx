import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";

import MovieCard from "../components/MovieCard";
import axios from "axios";
import Loading from "../components/Loading";

const SearchScreen = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchItem}`
      );
      console.log(response.data);
      setSearchResult(response.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchItem]);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* search input */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          value={searchItem}
          onChangeText={(text) => setSearchItem(text)}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <Pressable
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => setSearchItem("")}
        >
          <XMarkIcon size="25" color="white" />
        </Pressable>
      </View>

      {/* search results */}
      {searchLoader ? (
        <Loading />
      ) : searchResult.length > 0 ? (
        <FlatList
          data={searchResult}
          renderItem={(item) => <MovieCard item={item} />}
        />
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
