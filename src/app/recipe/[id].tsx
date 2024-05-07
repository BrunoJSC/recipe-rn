import React from 'react';

import {
  Animated,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMeal } from '@/hooks/useMeal';
import { ArrowLeftIcon, Circle, Star } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import ScrollView = Animated.ScrollView;

export default function Recipe() {
  const [show, setShow] = React.useState(false);
  const { id } = useLocalSearchParams();
  const { searchResults, addFavorite } = useMeal();

  const mealId = searchResults.find((m) => m.idMeal === id);

  const handleOpenLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error de resposta!', error);
    }
  };

  const measures = Array.from({ length: 20 }, (_, i) =>
    mealId ? mealId[`strMeasure${i + 1}`] : '',
  );

  const ingredients = Array.from({ length: 20 }, (_, i) =>
    mealId ? mealId[`strIngredient${i + 1}`] : '',
  );

  const mappedIngredients = ingredients.filter((i) => i !== '');
  const mappedMeasures = measures.filter((m) => m !== '');

  return (
    <View className="flex-1 bg-zinc-800">
      <ScrollView className="w-full h-full">
        <View className="w-full h-64  items-center justify-center">
          <View className="w-full z-50">
            <TouchableOpacity
              className="p-4 -mt-20"
              onPress={() => router.back()}
            >
              <ArrowLeftIcon size={32} color={colors.red[500]} />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4 -mt-20 absolute right-0"
              onPress={() => addFavorite(mealId?.idMeal || '')}
            >
              <Star size={32} color={colors.red[500]} />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: mealId?.strMealThumb }}
            className="w-full h-full object-cover absolute top-0 left-0 z-0"
          />
        </View>

        <View className="-mt-8 p-2">
          <Text className="font-inter-bold text-white text-7xl">
            {mealId?.strMeal}
          </Text>

          <View>
            <Text className="font-inter-medium text-white text-xl">
              {mealId?.strArea} - {mealId?.strCategory}
            </Text>

            <Text className="text-white">{mealId?.strTags}</Text>
          </View>
        </View>

        <View className="p-4 w-full">
          <Text className="font-inter-semibold text-white text-2xl">
            Instructions
          </Text>

          <Text
            className="font-inter-medium text-white text-lg"
            onPress={() => setShow(!show)}
          >
            {show
              ? mealId?.strInstructions
              : mealId?.strInstructions.slice(0, 190)}
          </Text>

          <View className="mt-10 flex-col ">
            <Text className="font-inter-semibold text-white text-2xl">
              Ingredients
            </Text>

            <View className="flex-col mt-2">
              {mappedIngredients.map((ingredient, index) => (
                <View key={index} className="flex-row items-center gap-4">
                  <Circle size={10} color={colors.white} className="mr-5" />
                  <Text className="font-inter-medium text-white text-lg">
                    {mappedMeasures[index]} - {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <TouchableOpacity
              className="p-4 w-full rounded-lg items-center justify-center mt-4 bg-white"
              onPress={() => handleOpenLink(mealId?.strYoutube || '')}
            >
              <Text className="font-inter-semibold text-black text-lg">
                Youtube{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
