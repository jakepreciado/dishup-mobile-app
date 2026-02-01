import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PantryItem } from '../context/PantryContext';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<PantryItem, 'id'>) => void;
}

export default function AddItemModal({ visible, onClose, onSubmit }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return; // Require name

    onSubmit({
      name: name.trim(),
      quantity: quantity ? Number(quantity) : undefined,
      unit: unit.trim() || undefined,
    });

    // Reset fields and close
    setName('');
    setQuantity('');
    setUnit('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // adjusts height/padding
        keyboardVerticalOffset={Platform.OS === 'ios' ? -75 : 0} // tweak offset to fit your header
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
            <ScrollView>
              <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Add Pantry Item</Text>

              <TextInput
                placeholder="Item name"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 6 }}
              />
              <TextInput
                placeholder="Quantity (optional)"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 6 }}
              />
              <TextInput
                placeholder="Unit (optional, e.g., oz, cups)"
                value={unit}
                onChangeText={setUnit}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 6 }}
              />

              <TouchableOpacity
                onPress={handleAdd}
                style={{
                  backgroundColor: '#c44a4a',
                  padding: 12,
                  borderRadius: 6,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Add Item</Text>
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
    </Modal >
  );
}
