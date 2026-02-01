// app/(tabs)/recipes.tsx
import AddRecipeModal from '@/components/add-recipe-modal';
import EditRecipeModal from '@/components/edit-recipe-modal';
import { Recipe, RecipeContext } from '@/context/RecipeContext';
import { capitalizeWords } from '@/utils/helperFunctions';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function Recipes() {
  const router = useRouter();
  const swipeRefs = useRef<{ [key: string]: Swipeable | null }>({});
  const { recipes, addRecipe, deleteRecipe, editRecipe } = useContext(RecipeContext);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [modalVisible, setModalVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [name, setName] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');


  const handleEdit = (recipe: Recipe) => {

    swipeRefs.current[recipe.id]?.close();

    setEditingRecipe(recipe);
    setName(recipe.name);
    setCookTime(recipe.cookTime?.toString() || '');
    setIngredients(recipe.ingredients.join('\n'));
    setInstructions(recipe.instructions);
    setEditModalVisible(true);
  };

  // Filter recipes by search term
  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, recipes]);

  // Show banner when a recipe is added
  const handleAddSuccess = (recipe: Omit<Recipe, 'id'>) => {
    addRecipe(recipe);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  };

  // Swipe buttons: edit and delete
  const renderRightActions = (recipe: Recipe) => (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      {/* Edit button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#2f95dc',
          justifyContent: 'center',
          alignItems: 'center',
          width: 48,
          height: 48,
        }}
        onPress={() => handleEdit(recipe)}
      >
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 48,
          height: 48,
        }}
        onPress={() => deleteRecipe(recipe.id)}
      >
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Success banner */}
      {showBanner && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#4BB543',
            padding: 12,
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Recipe successfully added!
          </Text>
        </View>
      )}

      <View style={{ flex: 1, padding: 20, marginTop: showBanner ? 40 : 0 }}>
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 10 }}>Recipes</Text>

        {/* Search bar */}
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor="#00000080"
          value={search}
          onChangeText={setSearch}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            marginBottom: 10,
            borderRadius: 6,
          }}
        />

        {/* Recipe list */}
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Swipeable
              ref={(ref) => {
                if (ref) swipeRefs.current[item.id] = ref;
              }}
              renderRightActions={() => renderRightActions(item)}
            >
              <TouchableOpacity
                onPress={() =>
                  router.push(`/view-recipes/${item.id}`)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {capitalizeWords(item.name)}
                </Text>
                <Text>{item.cookTime ?? ''} min</Text>
              </TouchableOpacity>
            </Swipeable>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 20 }}>No recipes found</Text>}
        />

        {/* Add Recipe Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#c44a4a',
            padding: 12,
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Add Recipe</Text>
        </TouchableOpacity>

        {/* Add Recipe Modal */}
        <AddRecipeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddSuccess}
        />

        {/* Edit recipe modal */}
        <EditRecipeModal
          visible={editModalVisible}
          recipe={editingRecipe}
          onClose={() => {
            setEditModalVisible(false);
            setEditingRecipe(null);
          }}
          onSubmit={editRecipe}
        />

      </View>
    </View>
  );
}
