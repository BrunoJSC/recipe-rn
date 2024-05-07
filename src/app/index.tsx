import React from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMeal } from '@/hooks/useMeal';
import { Input } from '@/components/input';
import { Link, router } from 'expo-router';
import { MealProps } from '@/context/meal-context';

export default function Index() {
  const { mealsData, searchMeal, loading, searchResults } = useMeal();
  const [searchTerm, setSearchTerm] = React.useState<string>('');


  return (
    <SafeAreaView className="flex-1 justify-center bg-zinc-800">
      <View className="p-2">
        <Input
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search for a meal"
        />

        <TouchableOpacity
          onPress={() => searchMeal(searchTerm)}
          className="bg-white text rounded-md mt-2"
        >
          <Text className="black text-lg font-inter-bold text-center p-2">
            {loading ? 'Loading...' : 'Meals'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        renderItem={({ item }) => {
          return (
            <Link
              href={`/recipe/${item.idMeal as MealProps['idMeal']}`}
              className="flex-1 m-2 justify-center items-center bg-white rounded-lg"
              asChild
            >
              <TouchableOpacity>
                <Image
                  source={{ uri: item.strMealThumb }}
                  className="w-full h-32 flex-row justify-between"
                />
                <View>
                  <Text className="text-lg font-bold text-black p-2">
                    {item.strMeal}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        }}
        numColumns={2}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        className="w-full"
      />
    </SafeAreaView>
  );
}
