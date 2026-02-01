import { Recipe } from '@/context/RecipeContext';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (recipe: Recipe) => void;
}

export default function AddRecipeModal({ visible, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      id: uuid.v4().toString(),
      name: name.trim(),
      cookTime: Number(cookTime) || 0,
      ingredients: ingredients
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
    });

    setName('');
    setCookTime('');
    setIngredients('');
    setInstructions('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // adjusts height/padding
        keyboardVerticalOffset={Platform.OS === 'ios' ? -75 : 0} // tweak offset to fit your header
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 10,
              width: '85%',
            }}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                Add Recipe
              </Text>

              <TextInput
                placeholder="Recipe name"
                placeholderTextColor="#00000080"
                value={name}
                onChangeText={setName}
                style={inputStyle}
              />

              <TextInput
                placeholder="Cook time (minutes)"
                placeholderTextColor="#00000080"
                value={cookTime}
                onChangeText={setCookTime}
                keyboardType="numeric"
                style={inputStyle}
              />

              <TextInput
                placeholder="Ingredients (one per line)"
                placeholderTextColor="#00000080"
                value={ingredients}
                onChangeText={setIngredients}
                multiline
                style={[inputStyle, { height: 80 }]}
              />

              <TextInput
                placeholder="Instructions"
                placeholderTextColor="#00000080"
                value={instructions}
                onChangeText={setInstructions}
                multiline
                style={[inputStyle, { height: 100 }]}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: '#c44a4a',
                  padding: 12,
                  borderRadius: 6,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Add Recipe</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={{ alignItems: 'center', marginTop: 10 }}
              >
                <Text style={{ color: '#666' }}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 8,
  marginBottom: 10,
  borderRadius: 6,
};
