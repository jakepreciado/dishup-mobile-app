// /app/view-recipe/[id].tsx
import { RecipeContext } from '@/context/RecipeContext';
import { capitalizeWords } from '@/utils/helperFunctions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string;

  const { recipes } = useContext(RecipeContext);

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.push('/recipes')}>
        <Text style={{ color: '#2f95dc', marginTop: 10, marginBottom: 10 }}>← Back</Text>
      </TouchableOpacity>

      {/* Recipe title */}
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 10 }}>
        {capitalizeWords(recipe.name)}
      </Text>

      {/* Cook time */}
      <Text style={{ color: '#666', marginBottom: 20 }}>
        Cook time: {recipe.cookTime ?? ''} min
      </Text>

      {/* Ingredients */}
      <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Ingredients:</Text>
      {recipe.ingredients.map((ing, idx) => (
        <Text key={idx}>• {ing}</Text>
      ))}

      {/* Instructions */}
      <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 20, marginBottom: 5 }}>
        Instructions:
      </Text>
      <Text>{recipe.instructions}</Text>
    </ScrollView>
  );
}
