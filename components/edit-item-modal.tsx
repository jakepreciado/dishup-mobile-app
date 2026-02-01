import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PantryItem } from '../context/PantryContext';

interface EditItemModalProps {
  visible: boolean;
  onClose: () => void;
  item: PantryItem | null;
  onSubmit: (updatedItem: PantryItem) => void;
}

export default function EditItemModal({ visible, onClose, item, onSubmit }: EditItemModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  // Populate fields when editing an item
  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity?.toString() || '');
      setUnit(item.unit || '');
    }
  }, [item]);

  const handleEdit = () => {
    if (!item) return;
    if (!name.trim()) return;

    onSubmit({
      ...item,
      name: name.trim(),
      quantity: quantity ? Number(quantity) : undefined,
      unit: unit.trim() || undefined,
    });

    // Reset fields and close modal
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
              <Text style={{ fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
                {item ? 'Edit Pantry Item' : 'Add Pantry Item'}
              </Text>

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
                onPress={handleEdit}
                style={{
                  backgroundColor: '#c44a4a',
                  padding: 12,
                  borderRadius: 6,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Update Item</Text>
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
