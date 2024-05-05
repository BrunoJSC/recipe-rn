import { useState } from 'react';

import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useMeal } from '@/hooks/useMeal';
import { Input } from '@/components/input';
import { Link } from 'expo-router';

export default function Index() {
  const { mealsData } = useMeal();
  const [data, setData] = useState([]);

  console.log(data);

  return (
    <SafeAreaView className="flex-1 justify-center bg-olive-green">
      <View className="p-2">
        <Input />
      </View>
      <FlatList
        data={mealsData}
        renderItem={({ item }) => {
          return (
            <Link
              href={`/recipe/${item.idMeal}`}
              className="flex-1 m-2 justify-center items-center"
              asChild
            >
              <TouchableOpacity>
                <Image
                  source={{ uri: item.strMealThumb }}
                  className="w-full h-32 flex-row justify-between"
                />
                <Text>{item.strMeal}</Text>
              </TouchableOpacity>
            </Link>
          );
        }}
        numColumns={2}
        keyExtractor={(item) => item.idMeal.toString()}
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        className="w-full bg-red-500"
      />
    </SafeAreaView>
  );
}
