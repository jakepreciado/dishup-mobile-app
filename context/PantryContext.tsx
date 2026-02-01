// context/PantryContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

export interface PantryItem {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
}

interface PantryContextType {
  pantryItems: PantryItem[];
  addItem: (item: Omit<PantryItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  editItem: (item: PantryItem) => void;
}

export const PantryContext = createContext<PantryContextType>({
  pantryItems: [],
  addItem: () => { },
  deleteItem: () => { },
  editItem: () => {},
});

export const PantryProvider = ({ children }: { children: ReactNode }) => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('pantryItems');
      if (stored) setPantryItems(JSON.parse(stored));
    })();
  }, []);

  const addItem = async (item: Omit<PantryItem, 'id'>) => {
    const newItem = { ...item, id: uuid.v4().toString() };
    const updated = [...pantryItems, newItem];
    setPantryItems(updated);
    await AsyncStorage.setItem('pantryItems', JSON.stringify(updated));
  };

  const editItem = async (updatedItem: PantryItem) => {
    const updated = pantryItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setPantryItems(updated);
    await AsyncStorage.setItem('pantryItems', JSON.stringify(updated));
  };

  const deleteItem = async (id: string) => {
    const updated = pantryItems.filter((item) => item.id !== id);
    setPantryItems(updated);
    await AsyncStorage.setItem('pantryItems', JSON.stringify(updated));
  };

  return (
    <PantryContext.Provider value={{ pantryItems, addItem, deleteItem, editItem }}>
      {children}
    </PantryContext.Provider>
  );
};
