// app/_layout.tsx
import { RecipeProvider } from '@/context/RecipeContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PantryProvider } from '../../context/PantryContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PantryProvider>
        <RecipeProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#c44a4a',
              tabBarStyle: { backgroundColor: '#fff' },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="pantry"
              options={{
                title: 'Pantry',
                tabBarIcon: ({ color, size }) => <Ionicons name="basket" color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="recipes"
              options={{
                title: 'Recipes',
                tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="view-recipes/[id]"
              options={{ href: null }}
            />

          </Tabs>
        </RecipeProvider>
      </PantryProvider>
    </GestureHandlerRootView>
  );
}
