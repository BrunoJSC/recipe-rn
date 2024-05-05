import { Image, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Recipe() {
  const { id, strMealThumb } = useLocalSearchParams();
  return (
    <View>
      <Text>Recipe</Text>
      <Text>{id}</Text>

      <Image
        source={{ uri: strMealThumb as string }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
