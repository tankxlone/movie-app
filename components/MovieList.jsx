import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

import useFetch from "../hook/useFetch";
import MovieCard from "./MovieCard";
import Loading from "./Loading";

const MovieList = () => {
  const { data: movies, isLoading, error } = useFetch("all");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={movies}
          renderItem={(item) => <MovieCard item={item} />}
        />
      )}
    </>
  );
};

export default MovieList;
