import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

export interface Recipe {
  id: string;
  name: string;
  cookTime?: number;          // minutes
  ingredients: string[];     // simple list for now
  instructions: string;      // full text
}

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  deleteRecipe: (id: string) => void;
  editRecipe: (recipe: Recipe) => void;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => { },
  deleteRecipe: () => { },
  editRecipe: () => { },
});

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // ✅ Async code goes in useEffect
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const stored = await AsyncStorage.getItem('recipes');
        if (stored) setRecipes(JSON.parse(stored));
      } catch (e) {
        console.log('Error loading recipes', e);
      }
    };
    loadRecipes();
  }, []);

  const addRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: uuid.v4().toString(),
    };

    const updated = [...recipes, newRecipe];
    setRecipes(updated);
    await AsyncStorage.setItem('recipes', JSON.stringify(updated));
  };

  const editRecipe = async (updatedRecipe: Recipe) => {
    const updated = recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updated);
    await AsyncStorage.setItem('recipes', JSON.stringify(updated));
  };

  const deleteRecipe = async (id: string) => {
    const updated = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updated);
    await AsyncStorage.setItem('recipes', JSON.stringify(updated));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        deleteRecipe,
        editRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
