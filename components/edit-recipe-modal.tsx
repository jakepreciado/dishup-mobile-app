// components/edit-recipe-modal.tsx
import { Recipe } from '@/context/RecipeContext';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditRecipeModalProps {
    visible: boolean;
    recipe: Recipe | null;
    onClose: () => void;
    onSubmit: (updatedRecipe: Recipe) => void;
}

export default function EditRecipeModal({ visible, recipe, onClose, onSubmit }: EditRecipeModalProps) {
    const [name, setName] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    // Prefill the form when the recipe changes
    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setCookTime(recipe.cookTime?.toString() || '');
            setIngredients(recipe.ingredients.join('\n'));
            setInstructions(recipe.instructions);
        }
    }, [recipe]);

    const handleSave = () => {
        if (!recipe) return;

        const updatedRecipe: Recipe = {
            ...recipe,
            name: name.trim(),
            cookTime: cookTime ? Number(cookTime) : undefined,
            ingredients: ingredients.split('\n').map((i) => i.trim()).filter(Boolean),
            instructions: instructions.trim(),
        };

        onSubmit(updatedRecipe);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // adjusts height/padding
                keyboardVerticalOffset={Platform.OS === 'ios' ? -75 : 0} // tweak offset to fit your header
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxHeight: '90%' }}>
                        <ScrollView>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                                Edit Recipe
                            </Text>

                            <TextInput
                                placeholder="Recipe Name"
                                placeholderTextColor="#00000080"
                                value={name}
                                onChangeText={setName}
                                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 10 }}
                            />

                            <TextInput
                                placeholder="Cook Time (minutes)"
                                placeholderTextColor="#00000080"
                                value={cookTime}
                                onChangeText={setCookTime}
                                keyboardType="numeric"
                                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 10 }}
                            />

                            <TextInput
                                placeholder="Ingredients (one per line)"
                                placeholderTextColor="#00000080"
                                value={ingredients}
                                onChangeText={setIngredients}
                                multiline
                                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 10, height: 100 }}
                            />

                            <TextInput
                                placeholder="Instructions"
                                placeholderTextColor="#00000080"
                                value={instructions}
                                onChangeText={setInstructions}
                                multiline
                                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 10, height: 100 }}
                            />

                            <TouchableOpacity
                                onPress={handleSave}
                                style={{
                                    backgroundColor: '#c44a4a',
                                    padding: 12,
                                    borderRadius: 6,
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 16 }}>Update Recipe</Text>
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
